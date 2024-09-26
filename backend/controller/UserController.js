const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

//create user
const createUser = async (req, res) => {
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
            userAddress,
            userImage,
            storeId,
        } = req.body;

        if (
            !userTitle ||
            !userFullName ||
            !userName ||
            !userPassword ||
            !userType ||
            !userEmail ||
            !userNIC ||
            !userTP ||
            !userAddress
        ) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await User.findOne({ where: { userNIC } });
        if (existingUser) {
            return res.status(400).json({ error: "A user with this NIC already exists." });
        }

        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        const newUser = await User.create({
            userTitle,
            userFullName,
            userName,
            userPassword: hashedPassword,
            userType,
            userEmail,
            userNIC,
            userTP,
            userAddress,
            userImage,
            userStatus: "Active",
            store_storeId: storeId,
        });

        // Optional: Generate JWT token on user creation
        const token = jwt.sign(
            {
                id: newUser.id,
                userName: newUser.userName,
                userType: newUser.userType,
            },
            secretKey,
            { expiresIn: "12h" }
        );

        res.status(201).json({ newUser, token });

    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Validation error: Please check the provided data." });
        }
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "A user with this email or NIC already exists." });
        }
        res.status(400).json({ error: `An error occurred: ${error.message}` });
    }
};

// Get all user
const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
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
            userAddress,
            userStatus,
            userImage,
        } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userPassword) {
            const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
            user.userPassword = hashedPassword;
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
            userAddress,
            userStatus,
            userImage,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
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