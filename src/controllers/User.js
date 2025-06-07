import { user } from "../models/index.js";

class User {
  static async createUser(req, res, next) {
    try {
      const newUser = req.body;

      console.log("Creating user with data:", newUser);
      const createdUser = await user.create(newUser);
      res.status(200).json(createdUser);
    }catch(error) {
      next(error);
    }
  }

  static async listAllUsers(req, res, next) {
    try {
      const userList = await user.find({}).populate('role').exec();

      res.status(200).json(userList);
    }catch(error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const userId = req.params.id;
    console.log("Deleting user with ID:", userId);

    try {
      const deletedUser = await user.findByIdAndDelete(userId).exec();
      if (!deletedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export default User