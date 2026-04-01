import { Schema, model} from "mongoose";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import crypto from 'crypto';
interface IUserMethods {
  comparePassword(enteredPassword: string): Promise<boolean>;
  getJWTToken(): string;
  getResetPasswordToken(): string
}

interface IUser extends Document, IUserMethods {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: object;
  createdAt: Date;
  filename: string;
  contentType: string;
  imageBase64: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  
}
const userSchema = new Schema<IUser>({
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

userSchema.pre('save', async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})

// compare password
userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean>{
  return await bcrypt.compare(enteredPassword, this.password);
}
//Generate JWT Token
userSchema.methods.getJWTToken = async function ():Promise< string >{
  const secret = process.env.JWT_SECRET || "your-default-secret";
  const expire = process.env.JWT_EXPIRE || "your-default-time";
  const token = jwt.sign(
    { userId: this._id },
    secret, 
    { expiresIn: expire as StringValue}
  );
  return token;
};
// Get Reset Password token
userSchema.methods.getResetPasswordToken = async function (): Promise<string> {
  const resetToken = crypto.randomBytes(20);
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 15*60*1000;
  return resetToken.toString('hex');
}

const User = mongoose.model("User", userSchema);

export {User};