// import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import crypto from 'crypto';
import { NextFunction } from "express";
import { Schema, model, Document, CallbackWithoutResultAndOptionalError } from "mongoose";


interface IUserMethods {
  comparePassword(enteredPassword: string): Promise<boolean>;
  getJWTToken(): Promise<string>;         // 👈 Promise<string> since it's async
  getResetPasswordToken(): Promise<string>;
}

export interface IUser extends Document, IUserMethods {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: object;
  createdAt: Date;
  filename: string;
  contentType: string;
  imageBase64: string;
  resetPasswordToken?: string | undefined;
  resetPasswordExpire?: Date | undefined;
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
      public_id: { type: String },
      url: { type: String },
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
});


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
// Compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.getJWTToken = async function (): Promise<string> {
  const secret = process.env.JWT_SECRET || "your-default-secret";
  const expire = process.env.JWT_EXPIRE || "7d";
  const token = jwt.sign(
    { id: this._id },           // ✅ Fix 4: use "id" not "userId" to match auth middleware
    secret,
    { expiresIn: expire as StringValue }
  );
  return token;
};

// Get Reset Password Token
userSchema.methods.getResetPasswordToken = async function (): Promise<string> {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  console.log(this.resetPasswordToken,'\n');
  console.log(resetToken);
  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // ✅ Fix 5: wrap in new Date()
  return resetToken;
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };