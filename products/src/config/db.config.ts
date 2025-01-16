import { registerAs } from '@nestjs/config';

export const configDB = registerAs('database', () => {
  return {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT_CONTAINER, 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    nameDb: process.env.POSTGRES_DB,
  };
});
