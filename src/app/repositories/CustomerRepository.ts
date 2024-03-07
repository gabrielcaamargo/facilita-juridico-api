import { query } from '../../database';
import { ICreateCustomerDto } from '../dtos/customers/CreateCustomerDto';
import { Identifier } from '../types/customers/Identifier';

class CustomerRepository {
  async create(data: ICreateCustomerDto) {
    const { email, name, phone_number, position } = data;

    const customerExists = await query(`
      SELECT *
      FROM customers
      WHERE email = $1
    `, [email]);

    if(customerExists.length >= 1) {
      throw new Error('This email has already been taken');
    }

    const [newCustomer] = await query(`
      INSERT INTO customers(email, name, phone_number, position)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [email, name, phone_number, position]);

    return newCustomer;
  }

  async findAll(order: string, orderBy: Identifier, search?: string) {
    const orderParam = order.toLowerCase() === 'asc' ? 'ASC' :  'DESC';
    const orderByParam = orderBy ?? 'created_at';

    let pgQuery = `
      SELECT *
      FROM customers
      ORDER BY $1 ${orderParam};
    `;

    if(search) {
      pgQuery = `
        SELECT *
        FROM customers
        WHERE
        name ILIKE '%' || $1 || '%'
        OR email ILIKE '%' || $1 || '%'
        OR phone_number ILIKE '%' || $1 || '%'
        ORDER BY $2 ${orderParam};
      `;
    }

    const rows = await query(pgQuery, search ? [search, orderByParam] : [orderByParam]);

    return rows;
  }
}

const customerRepository = new CustomerRepository();
export { customerRepository };
