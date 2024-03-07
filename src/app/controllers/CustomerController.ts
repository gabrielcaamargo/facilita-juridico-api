import { Request, Response } from 'express';

import { customerRepository } from '../repositories/CustomerRepository';

class CustomerController {
  async findAll(request: Request, response: Response) {
    const { order } = request.query;

    const users = await customerRepository.findAll(order as string ?? 'asc');

    return response.json(users);
  }
}

const customerController = new CustomerController();
export { customerController };
