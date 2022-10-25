const { Users } = require("../models");

class UserRepository {
  findAllUser = async (nickname) => {
    const users = await Users.findAll({where: {nickname}});

    return users;
  };

  createUser = async (nickname, password, salt) => {
    const createUserData = await Users.create({
      nickname,
      password,
      salt,
    });

    return createUserData
  };
}

module.exports = UserRepository;
