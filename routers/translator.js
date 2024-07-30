const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Configuration
const GPT4V_KEY = "99a76d4acb2b424dbe03fb552b7f6fe9";
const GPT4V_ENDPOINT = "https://readitchat.openai.azure.com/openai/deployments/readItTranslator/chat/completions?api-version=2024-02-15-preview";

const headers = {
    "Content-Type": "application/json",
    'api-key': GPT4V_KEY
};

router.post('/', (req, res) => {
  const payload = {
    "messages": req.body.messages,
    "temperature": 0.7,
    "top_p": 0.95,
    "max_tokens": 800
  };

  // Send request to the API
  fetch(GPT4V_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch: ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      res.status(200).json(data);
  })
  .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
  });
});

module.exports = router;