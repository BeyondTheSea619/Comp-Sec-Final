const mongoose = require("mongoose");

const securityLogSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      // e.g. "login_success", "login_failed", "admin_delete_user",
      //      "file_upload", "register", "account_locked"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SecurityLog", securityLogSchema);
