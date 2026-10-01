import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ==================== USER SCHEMA ====================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
    type: String,
    required: true,
    unique: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    pincode: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: String,
      required: true,
      trim: true
    },

    
    profileImage: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  
  {
    timestamps: true
  }
);


// ==================== HASH PASSWORD ====================

userSchema.pre("save", async function () {
  try {
    // If password is not modified, don't hash again
    if (!this.isModified("password")) {
      return;
    }

    // Hash password
    this.password = await bcrypt.hash(this.password, 10);

  } catch (error) {
    throw error;
  }
});


// ==================== COMPARE PASSWORD ====================

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};


// ==================== CREATE MODEL ====================

const User = mongoose.model("User", userSchema);

export default User;

