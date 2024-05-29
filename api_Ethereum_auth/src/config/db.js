import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

let db;

const connectDB = async () => {
  if (!db) {
    try {
      db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      });

      console.log('Base de datos conectada');

 // Realiza una consulta para obtener las tablas de la base de datos
const [rows] = await db.query('SHOW TABLES');
console.log('Tablas en la base de datos:', rows);

    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
      process.exit(1);
    }
  }

  return db;
};

export default connectDB;