import User from "../models/User.js";
import Event from "../models/Event.js";

// ==========================================
// GET ADMIN PROFILE
// ==========================================

export const getAdminProfile = async (req, res) => {
  try {

    const adminId = req.user.userId;

    const admin = await User.findOne({
      _id: adminId,
      role: "admin",
    }).select("-password");


    if (!admin) {
      return res.status(404).json({
        message: "Admin profile not found",
      });
    }


    return res.status(200).json({
      message: "Admin profile retrieved successfully ✅",
      admin,
    });

  } catch (error) {

    console.error(
      "Get Admin Profile Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to get admin profile",
      error: error.message,
    });

  }
};


// ==========================================
// UPDATE ADMIN PROFILE
// ==========================================

export const updateAdminProfile = async (req, res) => {

  try {

    const adminId = req.user.userId;

    const {
      name,
      contact,
      address,
    } = req.body;


    // Find logged-in admin

    const admin = await User.findOne({
      _id: adminId,
      role: "admin",
    });


    if (!admin) {

      return res.status(404).json({
        message: "Admin profile not found",
      });

    }


    // Update Name

    if (name) {
      admin.name = name;
    }


    // Update Contact

    if (contact) {
      admin.contact = contact;
    }


    // Update Address

    if (address) {
      admin.address = address;
    }


    // Update Profile Image

    if (req.file) {

      admin.profileImage =
        `/uploads/users/${req.file.filename}`;

    }


    await admin.save();


    return res.status(200).json({

      message:
        "Admin profile updated successfully ✅",

      admin: {

        userId: admin._id,

        name: admin.name,

        email: admin.email,

        contact: admin.contact,

        address: admin.address,

        pincode: admin.pincode,

        age: admin.age,

        profileImage: admin.profileImage,

        role: admin.role,

      },

    });

  } catch (error) {

    console.error(
      "Update Admin Profile Error:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to update admin profile ❌",

      error: error.message,

    });

  }

};


// ==========================================
// ADMIN DASHBOARD
// ==========================================

export const getDashboardData = async (req, res) => {

  try {

    const currentDate = new Date();


    const totalEvents =
      await Event.countDocuments();


    const totalUsers =
      await User.countDocuments({
        role: "user",
      });


    const upcomingEvents =
      await Event.countDocuments({
        dateTime: {
          $gte: currentDate,
        },
      });


    const completedEvents =
      await Event.countDocuments({
        dateTime: {
          $lt: currentDate,
        },
      });


    const recentEvents =
      await Event.find()
        .sort({
          createdAt: -1,
        })
        .limit(5);


    const recentUsers =
      await User.find({
        role: "user",
      })
        .select("name email")
        .sort({
          createdAt: -1,
        })
        .limit(5);


    return res.status(200).json({

      totalEvents,

      totalUsers,

      upcomingEvents,

      completedEvents,

      recentEvents,

      recentUsers,

    });

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    return res.status(500).json({

      message:
        "Error fetching dashboard data",

      error:
        error.message,

    });

  }

};