const User = require("../model/User");
const Store = require("../model/Store");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

// Image upload setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'uploads', 'users');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const userName = req.body.userName || 'user';
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);

        const safeUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
        cb(null, `${safeUserName}_${timestamp}${ext}`);
    }
});

const upload = multer({ storage: storage }).single('userImage');

// Create user
const createUser = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Image upload failed' });
        } else if (err) {
            return res.status(500).json({ error: 'Unknown error: Image upload failed' });
        }

        try {
            const {
                userTitle,
                userFullName,
                userName,
                userPassword,
                userType,
                userEmail,
                userNIC,
                userTP,
                userSecondTP,
                userAddress,
                storeId
            } = req.body;

            // Validate required fields
            if (
                !userTitle ||
                !userFullName ||
                !userName ||
                !userPassword ||
                !userType ||
                !userEmail ||
                !userNIC ||
                !userTP ||
                !userAddress ||
                !storeId
            ) {
                return res.status(400).json({ error: "All fields are required" });
            }

            // Validate store existence
            const store = await Store.findByPk(storeId);
            if (!store) {
                return res.status(400).json({ error: "Invalid store ID." });
            }

            // Check if user already exists by NIC
            const existingUser = await User.findOne({ where: { userNIC } });
            if (existingUser) {
                return res.status(400).json({ error: "A user with this NIC already exists." });
            }

            // Handle user image
            let userImage = null;
            if (req.file) {
                userImage = `${req.protocol}://${req.get('host')}/uploads/users/${req.file.filename}`;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

            // Create new user
            const newUser = await User.create({
                userTitle,
                userFullName,
                userName,
                userPassword: hashedPassword,
                userType,
                userEmail,
                userNIC,
                userTP,
                userSecondTP,
                userAddress,
                userImage,
                userStatus: "Active",
                store_storeId: storeId,
            });

            const userWithStore = await User.findByPk(newUser.userId, {
                include: [
                    {
                        model: Store,
                        as: 'store',
                    },
                ],
            });
            // Generate JWT token
            const token = jwt.sign(
                {
                    id: newUser.id,
                    userName: newUser.userName,
                    userType: newUser.userType,
                },
                secretKey,
                { expiresIn: "12h" }
            );

            // Return user data and token
            res.status(201).json({ userWithStore, token });
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                const validationErrors = error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }));
                return res.status(400).json({ error: "Validation error", details: validationErrors });
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ error: "A user with this email or NIC already exists." });
            }

            res.status(500).json({ error: `An internal error occurred: ${error.message}` });
        }
    });
};

// Get all user
const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            include: [
                {
                    model: Store,
                    as: 'store',
                },
            ],
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Store,
                    as: 'store',
                },
            ],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Image upload failed' });
        } else if (err) {
            return res.status(500).json({ error: 'Unknown error: Image upload failed' });
        }

        try {
            const { id } = req.params;
            const {
                userTitle,
                userFullName,
                userName,
                userPassword,
                userType,
                userEmail,
                userNIC,
                userTP,
                userSecondTP,
                userAddress,
                userStatus,
                storeId
            } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Hash new password if provided
            if (userPassword) {
                const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
                user.userPassword = hashedPassword;
            }

            // Handle user image replacement
            let userImage = user.userImage;
            if (req.file) {
                // Delete old image if it exists
                if (userImage) {
                    const oldImagePath = path.join(__dirname, '..', 'uploads', 'users', path.basename(userImage));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                userImage = `${req.protocol}://${req.get('host')}/uploads/users/${req.file.filename}`;
            }

            await user.update({
                userTitle,
                userFullName,
                userName,
                userPassword: user.userPassword,
                userType,
                userEmail,
                userNIC,
                userTP,
                userSecondTP,
                userAddress,
                userStatus,
                userImage,
                store_storeId: storeId
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user image if it exists
        if (user.userImage) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'users', path.basename(user.userImage));
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image file: ${err.message}`);
                    }
                });
            }
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//User login
const userLogin = async (req, res) => {
    try {
        const { userName, userPassword } = req.body;

        if (!userName || !userPassword) {
            return res
                .status(400)
                .json({ error: "Username and password are required." });
        }

        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                userName: user.userName,
                userType: user.userType,
            },
            secretKey,
            { expiresIn: "12h" }
        );

        // Respond with the token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                userName: user.userName,
                userType: user.userType,
                userEmail: user.userEmail,
            },
        });
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    userLogin,
}