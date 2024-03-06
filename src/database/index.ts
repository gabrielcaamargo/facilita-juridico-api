/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'facilitaroot',
  password: 'facilitaroot',
  database: 'facilitajuridico',
});

client.connect();

exports.query = async (query: string, values?: any) => {
  const { rows } = await client.query(query, values);
  return rows;
};
