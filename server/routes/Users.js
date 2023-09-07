const express = require("express");
const router = express.Router();
const Users = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

router.get("/", async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const hash = await bcrypt.hash(password, 10);
        await Users.create({
            username: username,
            password: hash,
        });
        res.status(200).json({ username: username });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username: username });

        if (!user) {
            res.json({ error: "User Doesn't Exist" });
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({ error: "Incorrect Username/Password Combination" });
            return;
        }

        const accessToken = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ accessToken, userId: user._id, username: user.username });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        await Users.deleteMany({});
        res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;