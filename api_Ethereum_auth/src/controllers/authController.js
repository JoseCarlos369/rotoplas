import { createUser, login as loginUser } from '../models/User.js';
import { direccion_ethereum as billetera, firmar } from '../config/web3.js';
import pkg from 'ethereumjs-util';
import Web3 from 'web3';
const { recover } = pkg;

export const register = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  const direccion_ethereum = await billetera();
  const mensaje = 'Algún mensaje para firmar'; // Define tu mensaje aquí
  const firma = await firmar(direccion_ethereum.privateKey, mensaje);
  try {
    const id = await createUser(nombre, correo, contraseña, direccion_ethereum.address, firma);
    res.status(201).json({ 
      id, 
      direccion_ethereum: direccion_ethereum.address, 
      privateKey: direccion_ethereum.privateKey, 
      firma, 
      mensaje});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar el usuario');
  }
};

const web3 = new Web3(process.env.ETHEREUM_PROVIDER_URL);

export const login = async (req, res) => {
  const { correo, contraseña, firma, mensaje } = req.body;

  try {
    const user = await loginUser(correo, contraseña);
    if (!user) {
      res.status(401).send('Correo o contraseña incorrectos');
      return;
    }

    // Convertir el mensaje a un Uint8Array
    const messageBuffer = new TextEncoder().encode(mensaje);
    const messageHash = web3.utils.sha3(messageBuffer);
    const signature = web3.eth.accounts.recover(messageHash, firma);

    if (!signature || !user.direccion_ethereum || signature !== user.direccion_ethereum ) {
      res.status(401).send('La firma no coincide con la dirección de Ethereum del usuario');
      return;
    }
   

    res.status(200).json({
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      direccion_ethereum: user.direccion_ethereum
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al iniciar sesión');
  }
};

export const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'Error logging out', error: err });
    } else {
      res.status(204).send({message: 'Logged out'});
    }
  });
};


