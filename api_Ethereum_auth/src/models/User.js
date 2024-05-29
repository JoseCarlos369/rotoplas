import connectDB from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async (
  nombre,
  correo,
  contraseña,
  direccion_ethereum,
  firma,
) => {
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const db = await connectDB();
    const [rows] = await db.query(
      "INSERT INTO usuarios (nombre, correo, contraseña, direccion_ethereum, firma) VALUES (?, ?, ?, ?, ?)",
      [nombre, correo, hashedPassword, direccion_ethereum, firma]
    );
    return rows.insertId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const login = async (correo, contraseña) => {
  try {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM Usuarios WHERE correo = ?", [
      correo,
    ]);
    const user = rows[0];

    if (user && (await bcrypt.compare(contraseña, user.contraseña))) {
      // Omitir al devolver 
      const { contraseña, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
