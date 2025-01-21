import { user } from "../models/index.js";

class User {
  static async createUser(req, res, next) {
    try {
      const newUser = req.body;

      const createdUser = await user.create(newUser);
      res.status(200).json(createdUser);
    }catch(error) {
      next(error);
    }
  }
}

export default User