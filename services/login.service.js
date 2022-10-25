const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/login.repository");
const crypto = require("crypto");

class UserService {
  UserRepository = new UserRepository();

  findByUserId = async (nickname, password) => {
    const user = await this.UserRepository.findUserById(nickname);
    const hashpass = crypto
      .pbkdf2Sync(password, user.salt, 50, 32, "sha512")
      .toString("base64");
    if (!user || hashpass !== user.password) {
      throw new Error("닉네임 또는 비밀번호가 일치하지 않습니다.");
      return;
    }
    return {
      token: jwt.sign({ userId: user.userId }, "seosoohyung-secret-key"),
    };
  };
}

module.exports = UserService;
