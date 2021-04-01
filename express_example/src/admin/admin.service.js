const User = require('../users/user.entity');
const { Forbidden } = require('http-errors')
const { ADMIN_ROLE } = require('../commons/util');

class AdminService {
    async lock_switch(user, id, lock=false){
        if(user.role !== ADMIN_ROLE){
            throw Forbidden('Not authorized!') 
        }

        const locked_user = await User.findById(id)
        locked_user.isLocked = lock
        locked_user.save()
    }
}

module.exports = new AdminService();