const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, maxLength: 25 },
  lastName: { type: String, required: true, maxLength: 25 },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dzpobfxwj/image/upload/v1684687531/odinbook/avatars/robot_ii1k31.png",
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: ["6481fd24ff4d9ca798a531d1"],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
