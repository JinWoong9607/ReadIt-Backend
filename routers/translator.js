const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

// API Configuration
const headers = {
    "Content-Type": "application/json",
    'api-key': process.env.GPT4V_KEY
};
const endpoint = process.env.GPT4V_ENDPOINT;

// Function to send translation requests to the API
function sendTranslationRequest(payload) {
    return fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return response.json();
    });
}

// POST endpoint
router.post('/', (req, res) => {
    const userMessage = req.body.message;
    const payload = buildPayload(userMessage);

    sendTranslationRequest(payload)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    });
});

function buildPayload(message) {
    return {
        "messages": [
            {
                "role": "system",
                "content": "You are a translator who translates Reddit slang into natural Korean. Please translate the entered chat into natural Korean and provide the translated value."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "I had some fomo so I had to tell myself that I didn't care and that playstation is my real home.\n\nI have a 360 in my closet that I was curious about plugging in but I also have a bird that needs to sleep soooo.....he wins"
                    }
                ]
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "괜히 소외감 느낄까봐 불안해서 신경 쓰였는데, 그냥 무시하기로 했어. 어차피 플레이스테이션이 내 진짜 안식처니까.\n옷장에 있는 Xbox 360을 한번 꺼내볼까 했는데, 마침 우리 집 새가 잘 시간이라... 결국 새한테 져버렸네"
                    }
                ]
            },
                {
                    "role": "user",
                    "content": message
                }],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 800
    };
}

module.exports = router;