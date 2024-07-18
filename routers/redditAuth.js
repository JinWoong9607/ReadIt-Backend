require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET || null;

app.use(express.json());

// 토큰 저장소 초기화
let tokenStore = {
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
    lastRefreshed: 0
};

app.post('/token', async (req, res) => {
    const { code } = req.body;
    console.log('Received code:', code); // 로그 추가
    try {
        console.log('Sending request to Reddit API');
        console.log('REDIRECT_URI:', REDIRECT_URI); // REDIRECT_URI 로깅 추가
        
        const authString = CLIENT_SECRET ? `${CLIENT_ID}:${CLIENT_SECRET}` : `${CLIENT_ID}:`;
        const base64Auth = Buffer.from(authString).toString('base64');

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', REDIRECT_URI);

        const response = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${base64Auth}`
                }
            }
    );

        console.log('Reddit API response:', response.data);

        tokenStore = {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
            lastRefreshed: Date.now()
        };

        res.json(response.data);
        console.log('Token obtained successfully');
    } catch (error) {
        console.error('Error obtaining token:');
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        
        res.status(500).json({ error: 'Failed to obtain token', details: error.message });
    }
});

async function refreshToken() {
    try {
        const response = await axios.post('https://www.reddit.com/api/v1/access_token',
            `grant_type=refresh_token&refresh_token=${tokenStore.refreshToken}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:`).toString('base64')}`
                }
            }
        );

        tokenStore = {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token || tokenStore.refreshToken,
            expiresIn: response.data.expires_in,
            lastRefreshed: Date.now()
        };

        console.log('Token refreshed successfully');
        return tokenStore.accessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error.message);
        throw error;
    }
}

function isTokenExpired() {
    const now = Date.now();
    const expirationTime = tokenStore.lastRefreshed + (tokenStore.expiresIn * 1000);
    return now >= expirationTime;
}

async function makeApiRequest(path) {
    if (isTokenExpired()) {
        await refreshToken();
    }

    try {
        const response = await axios.get(`https://oauth.reddit.com${path}`, {
            headers: {
                'Authorization': `Bearer ${tokenStore.accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshToken();
            const retryResponse = await axios.get(`https://oauth.reddit.com${path}`, {
                headers: {
                    'Authorization': `Bearer ${tokenStore.accessToken}`
                }
            });
            return retryResponse.data;
        }
        throw error;
    }
}

app.get('/api/*', async (req, res) => {
    try {
        const data = await makeApiRequest(req.path);
        res.json(data);
    } catch (error) {
        console.error('API request failed:', error.message);
        res.status(500).json({ error: 'API request failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;