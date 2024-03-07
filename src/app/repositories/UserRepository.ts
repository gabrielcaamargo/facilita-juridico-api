import { query } from '../../database';

class UserRepository {
  async findAll(order: string) {
    const orderParam = order.toLowerCase() === 'asc' ? 'ASC' :  'DESC';

    const rows = await query(`
      SELECT *
      FROM users
      ORDER BY created_at ${orderParam}
    `);

    return rows;
  }
}

const userRepository = new UserRepository();
export { userRepository };
