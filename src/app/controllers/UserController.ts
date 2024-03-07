import { Request, Response } from 'express';

import { userRepository } from '../repositories/UserRepository';

class UserController {
  async findAll(request: Request, response: Response) {
    const { order } = request.query;

    const users = await userRepository.findAll(order as string ?? 'asc');

    return response.json(users);
  }
}

const userController = new UserController();
export { userController };
