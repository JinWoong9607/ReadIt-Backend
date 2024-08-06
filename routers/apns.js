const apn = require('apn');
const { User } = require('../models');

const sendAPNS = async (userId, message) => {
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.deviceToken) {
      console.log(`No device token found for user ${userId}`);
      return;
    }

    const options = {
      token: {
        key: process.env.APN_KEY_PATH,
        keyId: process.env.APN_KEY_ID,
        teamId: process.env.APN_TEAM_ID,
      },
      production: process.env.NODE_ENV === 'production'
    };

    const apnProvider = new apn.Provider(options);

    const notification = new apn.Notification();
    notification.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    notification.badge = 1;
    notification.sound = "ping.aiff";
    notification.alert = message;
    notification.payload = {'messageFrom': 'ReadIt'};
    notification.topic = process.env.APN_BUNDLE_ID;

    const result = await apnProvider.send(notification, user.deviceToken);
    console.log(result);
    apnProvider.shutdown();
  } catch (error) {
    console.error('Error sending APNS:', error);
  }
};

module.exports = { sendAPNS };