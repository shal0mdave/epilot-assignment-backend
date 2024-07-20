import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
