const LoginService = require("../services/login.service");

class LoginController {
  LoginService = new LoginService();

  loginPost = async (req, res, next) => {
    try{
    const { nickname, password } = req.body;
    if (req.headers.authorization) {
      res.status(401).send({ errorMessage: "이미 로그인이 되어있습니다." });
      return;
    }

    const LoginUserData = await this.LoginService.findByUserId(
      nickname,
      password
    );
    res.status(200).json({ data: LoginUserData });
  }catch(e){
    res.status(400).send({ errorMessage: "닉네임 또는 비밀번호를 잘못 입력하였습니다"})
  }
}}

module.exports = LoginController;
