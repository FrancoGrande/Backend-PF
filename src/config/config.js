import dotenv from 'dotenv';

dotenv.config(); // para trabajar con variables de entorno

export const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}