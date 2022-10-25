const { Users } = require("../models");

class UserRepository {
    findUserById = async(nickname) => {
        const users = await Users.findOne({where: {nickname}});

        return users
    }
}

module.exports = UserRepository;