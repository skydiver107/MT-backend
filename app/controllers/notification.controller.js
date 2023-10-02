const db = require("../models");
const User = db.user;
const Notication = db.notification;

exports.getNotification = async (req, res) => {
  try {
    const notifications = await Notication.findOne({
      where: { userId: req.body.userId },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });

    if (notifications.dataValues.id) {
      res.json({
        success: true,
        message: "Successfully fetched notification!",
        notifications: notifications,
      });
    } else {
      res.json({
        success: false,
        message: "No notification fetched",
        notifications: notifications,
      });
    }
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on fetching notifications",
      error: e,
    });
  }
};
