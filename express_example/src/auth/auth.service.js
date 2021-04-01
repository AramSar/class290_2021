const User = require('../users/user.entity');
const { Locked } = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async validate(username, password) {
        const user = await User.findOne({ username });
        if(user.isLocked ){
            throw new Locked("The user is locked!")
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
            user.loginAttempts += 1
            if(user.loginAttempts >= 3){
                user.loginAttempts = 0
                user.isLocked = true
            }
            user.save()

            throw new Locked("The user is locked!");
        }

        user.loginAttempts = 0
        user.save()
        return user;
    }

    async login(username, password) {
        const user = await this.validate(username, password);

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        return token;
    }

    validateToken(token) {
        const obj = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false
        })

        return { userId: obj.userId, username: obj.username };
    }
}

module.exports = new AuthService();