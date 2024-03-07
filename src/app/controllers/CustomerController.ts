import { Request, Response } from 'express';

import { customerRepository } from '../repositories/CustomerRepository';
import { Identifier } from '../types/customers/Identifier';

class CustomerController {
  async create(request: Request, response: Response) {
    const bodyMandatoryData = ['email', 'name', 'phone_number', 'position'];

    const bodyDoesntHasMandatory = bodyMandatoryData.filter(item => !request.body[item]);
    if(bodyDoesntHasMandatory.length >= 1) {
      const missingParams: { [key: string]: string } = {};

      bodyDoesntHasMandatory.forEach(item => {
        missingParams[item] = `${item} is required`;
      });

      return response.status(404).json(missingParams);
    }

    return customerRepository.create(request.body)
      .then((res) => response.status(201).json(res))
      .catch((error) => response.status(409).json({ error: error.message }));
  }

  async findAll(request: Request, response: Response) {
    const { order, orderBy, search } = request.query;

    const users = await customerRepository.findAll(order as string ?? 'asc', orderBy as Identifier, search as string);

    return response.json(users);
  }
}

const customerController = new CustomerController();
export { customerController };
