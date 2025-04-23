import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String,
     required: [true, 'User Name is required'],
     trim: true,
     minLength:2,
     maxlength: 50,
     },
     email: { type: String,
     required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email",],
    },
    password: { type: String,
     required: [true, 'Password is required'],
     trim: true,
     minLength: 6,
     maxlength: 100,
     },
  }, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;