const express = require('express');
const router = express.Router();
const auth = require('./auth.service');
const asyncHandler = require('express-async-handler');

router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const token = await auth.login(username, password);
    res.json({ token });
}))

router.patch('/unlock-user/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    await auth.lock_switch(req.user, id)
    res.status(200).json({message: 'User has successfully been unlocked!'})
}))

router.patch('/lock-user/:id', asyncHandler(async (req, res) => {
    const { id } = req.params
    await auth.lock_switch(req.user, id, lock=true)
    res.status(200).json({message: 'User has successfully been locked!'})
}))

module.exports = router;