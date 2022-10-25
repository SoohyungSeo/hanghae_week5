
const SignupService = require("../services/signup.service");
const Joi = require('joi');

class SignupController {
  SignupService = new SignupService();

  SignupUser = async (req, res, next) => {
    try{
    const { nickname, password, confirm } = req.body;
    const schema = Joi.object({
      nickname: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      password: Joi.string().min(3).required(),
      confirm: Joi.ref("password"),
    });
    
    await schema.validateAsync(req.body);
    const SignupUserData = await this.SignupService.createUser(
        nickname,
        password,
        confirm
      );
      res.status(201).json({ data: SignupUserData });
    }catch(e){
        return res.status(400).json({code:400, message: e.message})
    }
  };
}

module.exports = SignupController;
