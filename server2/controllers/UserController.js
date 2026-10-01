import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ==================== EMAIL CONFIGURATION ====================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// ==================== SEND EMAIL FUNCTION ====================

const sendEmail = async ({ to, subject, html }) => {
  console.log("EMAIL exists:", Boolean(process.env.EMAIL));
  console.log(
    "EMAIL_PASSWORD exists:",
    Boolean(process.env.EMAIL_PASSWORD)
  );
  console.log("Sending email to:", to);

  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "EMAIL or EMAIL_PASSWORD is missing from .env"
    );
  }

  if (!to) {
    throw new Error("Recipient email is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });

  console.log("Email sent successfully:", info.response);

  return info;
};

//----------------register user--------------------------------//
export const registerUser = async (req, res) => {
  try {

    let {
      name,
      email,
      contact,
      password,
      address,
      pincode,
      age,
    } = req.body;


    // ================= VALIDATION =================

    if (
      !name ||
      !email ||
      !contact ||
      !password ||
      !address ||
      !pincode ||
      !age
    ) {
      return res.status(400).json({
        message: "All fields are required ❌",
      });
    }


    // ================= CLEAN DATA =================

    name = name.trim();
    email = email.trim().toLowerCase();
    contact = contact.trim();
    password = String(password);
    address = address.trim();
    pincode = String(pincode).trim();
    age = String(age).trim();


    // ================= PROFILE IMAGE =================

    const profileImage = req.file
      ? `/uploads/users/${req.file.filename}`
      : "";


    // ================= CHECK USER =================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists ❌",
      });
    }


    // ================= CREATE USER =================

    const newUser = new User({
      name,
      email,
      contact,
      password,
      address,
      pincode,
      age,
      profileImage,
    });


    await newUser.save();


    // ================= SUCCESS =================

    return res.status(201).json({
      message: "User registered successfully ✅",

      user: {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
        profileImage: newUser.profileImage,
        address: newUser.address,
        pincode: newUser.pincode,
        age: newUser.age,
        role: newUser.role,
      },
    });

  } catch (error) {

    console.error(
      "Registration Error:",
      error.message
    );

    return res.status(500).json({
      message: "Registration failed ❌",
      error: error.message,
    });

  }
};


// ======================ADMIN =================//
// ==================== CREATE ADMIN USER ====================

export const createAdminUser = async (req, res) => {
  try {

    let {
      name,
      email,
      contact,
      password,
      address,
      pincode,
      age,
    } = req.body;


    // ================= VALIDATION =================

    if (
      !name ||
      !email ||
      !contact ||
      !password ||
      !address ||
      !pincode ||
      !age
    ) {
      return res.status(400).json({
        message: "All fields are required ❌",
      });
    }


    // ================= CLEAN DATA =================

    name = name.trim();
    email = email.trim().toLowerCase();
    contact = contact.trim();
    password = String(password);
    address = address.trim();
    pincode = String(pincode).trim();
    age = String(age).trim();


    // ================= CHECK EMAIL =================

    const existingUser = await User.findOne({
      email,
    });


    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email ❌",
      });
    }


    // ================= PROFILE IMAGE =================

    const profileImage = req.file
      ? `/uploads/users/${req.file.filename}`
      : "";


    // ================= CREATE ADMIN =================

    const newAdmin = new User({
      name,
      email,
      contact,
      password,
      address,
      pincode,
      age,
      profileImage,

      role: "admin",
    });


    await newAdmin.save();


    // ================= SUCCESS =================

    return res.status(201).json({

      message: "Admin account created successfully ✅",

      user: {

        userId: newAdmin._id,

        name: newAdmin.name,

        email: newAdmin.email,

        contact: newAdmin.contact,

        address: newAdmin.address,

        pincode: newAdmin.pincode,

        age: newAdmin.age,

        profileImage: newAdmin.profileImage,

        role: newAdmin.role,

      },

    });

  } catch (error) {

    console.error(
      "Create Admin Error:",
      error.message
    );

    return res.status(500).json({

      message: "Failed to create admin ❌",

      error: error.message,

    });

  }
};

// ==================== LOGIN USER ====================

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;


    // ==================== VALIDATION ====================

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required ❌",
      });
    }


    // ==================== CLEAN INPUT ====================

    email = email.trim().toLowerCase();
    password = String(password);


    // ==================== FIND USER ====================

    const user = await User.findOne({ email });


    // ==================== CHECK USER ====================

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password ❌",
      });
    }


    // ==================== CHECK PASSWORD ====================

    const isPasswordValid =
      await user.comparePassword(password);


    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password ❌",
      });
    }




// ==================== GENERATE JWT TOKEN ====================

const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);


// ==================== LOGIN SUCCESS ====================

return res.status(200).json({
  message: "Login successful ✅",

  token: token,

  user: {
    userId: user._id,
    name: user.name,
    email: user.email,
    contact: user.contact,
    address: user.address,
    pincode: user.pincode,
    age: user.age,
    role: user.role,
  },
});

} catch (error) {

  console.error(
    "Login Error:",
    error.message
  );

  return res.status(500).json({
    message: "Login failed ❌",
    error: error.message,
  });
}
};


// ==================== FORGOT PASSWORD ====================

export const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;


    // ==================== VALIDATE EMAIL ====================

    if (!email) {
      return res.status(400).json({
        message: "Email is required ❌",
      });
    }

    email = email.trim().toLowerCase();


    // ==================== FIND USER ====================

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({
        message: "User not found ❌",
      });
    }


    // ==================== GENERATE TEMP PASSWORD ====================

    const tempPassword = Math.floor(
      100000 + Math.random() * 900000
    ).toString();


    // ==================== HASH PASSWORD ====================

    const hashedPassword = await bcrypt.hash(
      tempPassword,
      10
    );


    // ==================== UPDATE ONLY PASSWORD ====================

    await User.findByIdAndUpdate(
      user._id,

      {
        password: hashedPassword,
      },

      {
        returnDocument: "after",
        runValidators: false,
      }
    );


    // ==================== SEND EMAIL ====================

    await sendEmail({
      to: user.email,

      subject: "Password Reset - Temporary Password",

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset</h2>

          <p>Hello ${user.name} 👋</p>

          <p>Your temporary password is:</p>

          <h2>${tempPassword}</h2>

          <p>
            Please login using this temporary password.
          </p>

          <p>
            After login, change your password immediately.
          </p>

          <br />

          <p>
            Best regards,<br />
            <b>Event Management Team</b>
          </p>
        </div>
      `,
    });


    // ==================== SUCCESS RESPONSE ====================

    return res.status(200).json({
      message:
        "Temporary password sent to your email successfully ✅",
    });

  } catch (error) {

    console.error(
      "Forgot Password Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to reset password ❌",
      error: error.message,
    });
  }
};


// ==================== CHANGE PASSWORD ====================

export const changePassword = async (req, res) => {
  try {
    let {
      email,
      currentPassword,
      newPassword,
    } = req.body;


    // ==================== VALIDATION ====================

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required ❌",
      });
    }


    currentPassword = String(currentPassword);
    newPassword = String(newPassword);


    // ==================== FIND USER ====================

    let user;


    // Find user using email

    if (email) {

      email = email.trim().toLowerCase();

      user = await User.findOne({ email });

    } else {

      // Find user using JWT token

      const auth = req.headers.authorization;


      if (
        !auth ||
        !auth.startsWith("Bearer ")
      ) {
        return res.status(401).json({
          message:
            "Email or authorization token is required ❌",
        });
      }


      const token = auth.split(" ")[1];


      const decoded = jwt.verify(
        token,
        "secretKey123"
      );


      user = await User.findById(
        decoded.id
      );
    }


    // ==================== CHECK USER ====================

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌",
      });
    }


    // ==================== CHECK CURRENT PASSWORD ====================

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );


    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect ❌",
      });
    }


    // ==================== HASH NEW PASSWORD ====================

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );


    // ==================== UPDATE PASSWORD ====================

    await User.findByIdAndUpdate(
      user._id,

      {
        password: hashedPassword,
      },

      {
        returnDocument: "after",
        runValidators: false,
      }
    );


    // ==================== SUCCESS RESPONSE ====================

    return res.status(200).json({
      message: "Password changed successfully ✅",
    });

  } catch (error) {

    console.error(
      "Change Password Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to change password ❌",
      error: error.message,
    });
  }
};

// getUsers
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// -------------------- GET USER PROFILE --------------------
// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    // Get user ID from token
    const auth = req.headers?.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = auth.split(' ')[1];
    let userId;
    try 
    {
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      userId = decoded.userId;
    } 
    catch (e) 
    {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Find user and exclude password from response
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully ✅',
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role
      }
    });
  } catch (error) {
    console.error('getUserProfile error:', error);
    res.status(500).json({ message: 'Failed to get profile ❌', error: error.message });
  }
};


// -------------------- UPDATE PROFILE --------------------
// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const auth = req.headers?.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token required",
      });
    }

    const token = auth.split(" ")[1];

    let userId;

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      userId = decoded.userId;

    } catch (error) {

      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }


    const { name, email, contact } = req.body;


    // Validation

    if (!name || !email || !contact) {

      return res.status(400).json({
        message: "Name, email and contact are required",
      });

    }


    // Find User

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    // Check Email

    if (email !== user.email) {

      const emailExists = await User.findOne({
        email,
        _id: { $ne: userId },
      });


      if (emailExists) {

        return res.status(400).json({
          message: "Email already in use",
        });

      }

    }


    // Update Details

    user.name = name;
    user.email = email;
    user.contact = contact;


    // ================= PROFILE IMAGE =================

    if (req.file) {

      user.profileImage =
        `/uploads/users/${req.file.filename}`;

    }


    await user.save();


    // Response

    return res.status(200).json({

      message: "Profile updated successfully ✅",

      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        profileImage: user.profileImage,
        role: user.role,
      },

    });


  } catch (error) {

    console.error(
      "updateProfile error:",
      error
    );

    return res.status(500).json({

      message: "Failed to update profile ❌",

      error: error.message,

    });

  }
};

