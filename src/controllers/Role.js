import { userRole } from '../models/index.js';

class Role {
  static async listAllRoles(req, res, next) {
    try {
      const roles = await userRole.find().exec();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default Role;