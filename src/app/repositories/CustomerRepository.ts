import { query } from '../../database';
import { ICreateCustomerDto } from '../dtos/customers/CreateCustomerDto';

class CustomerRepository {
  async create(data: ICreateCustomerDto) {
    const { email, name, phone_number, position } = data;

    const customerExists = await query(`
      SELECT *
      FROM customers
      WHERE email = $1
    `, [email]);

    if(customerExists) {
      throw new Error('This email has already been taken');
    }

    const [newCustomer] = await query(`
      INSERT INTO customers(email, name, phone_number, position)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [email, name, phone_number, position]);

    return newCustomer;
  }

  async findAll(order: string) {
    const orderParam = order.toLowerCase() === 'asc' ? 'ASC' :  'DESC';

    const rows = await query(`
      SELECT *
      FROM customers
      ORDER BY created_at ${orderParam}
    `);

    return rows;
  }
}

const customerRepository = new CustomerRepository();
export { customerRepository };
