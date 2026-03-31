import { Schema, model} from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Document } from "mongoose";
import crypto from 'crypto';
interface IUser extends Document{
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: object;
  getJWTToken(): string;
  createdAt: object;
  filename: string,
  contentType: string,
  imageBase64: string,
  resetPasswordToken: string,
  resetPasswordExpire: Date,
}
const userSchema = new Schema<IUser>(
    {
      name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
      },
      email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"],
      },
      password: {
        type: String,
        required: [true, "Enter your password"],
        minLength: [8, "password should be greater than 8 characters"],
        select: false,
      },
      avatar: {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
    },
    role: {
      type: String,
     default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    filename: String,
    contentType: String,
    imageBase64: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    }
)
userSchema.pre<IUser>('save', async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
userSchema.methods.getJWTToken = function (secret: string, expire: number): string {
  const payload = {
    user: this._id,
  }
  return jwt.sign(payload, secret, { expiresIn: expire });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword: string){
  return await bcrypt.compare(enteredPassword, this.password);
}

// Generate Password reset token
userSchema.methods.getResetPasswordToken = function (){
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing the token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set token expiration
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
}
const User = model("User", userSchema);
export {User};