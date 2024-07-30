require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Configuration

const headers = {
    "Content-Type": "application/json",
    'api-key': process.env.GPT4V_KEY
};

router.post('/', (req, res) => {
    const message = req.body.message;
  const payload = {
    "messages": [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are a translator who translates Reddit slang into natural Korean. Please translate the entered chat into natural Korean and provide the translated value."
                }
            ]
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
            "content": [
                {
                    "type": "text",
                    "text": "I had DMGS and cold sorceries. Having a slower weapon like that was a bit troubling for her since she's so fast. And sorceries basically did nothing.\n\nAnd I refuse to use mimic in any situation. Not because it's overpowered, but the exact opposite. I swear my mimic does nothing except strafe and occasionally throw out one spell. And act as a \"free health\" vendor for Malenia."
                }
            ]
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": "\"나는 월광검이랑 냉기 마법 들고 갔는데 말이야. 그 느린 무기가 말레니아한테는 좀 힘들더라고. 걔가 너무 빠르잖아. 마법은 뭐... 거의 먹히지도 않고.\n그리고 난 절대 슬라임 안 써. 슬라임이 너무 쎄서가 아니라 오히려 반대야. 맹세코 내 슬라임은 그냥 왔다갔다 하면서 가끔 주문 한 번 던지는 게 다야. 말레니아한테는 그냥 '공짜 회복 아이템' 수준이라니까.\""
                }
            ]
        },
        {
            "role": "user",
            "content" : [
                {
                    "type" : "text",
                    "text" : message
                }
            ]
        }
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "max_tokens": 800
}

  // Send request to the API
  fetch(process.env.GPT4V_ENDPOINT, {
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