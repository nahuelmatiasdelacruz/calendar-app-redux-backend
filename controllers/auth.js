const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({email});
    if(usuario) return res.status(400).json({ok: false, msg: 'Ya existe un usuario con ese correo'});

    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);
    await usuario.save();
    const token = await generarJwt(usuario.id,usuario.name);
    return res.status(201).json({ ok: true, uid: usuario.id, name: usuario.name, token});
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ ok: false, msg: 'Hubo un error al grabar el usuario' });
  }
};

const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;
  try{
    const usuario = await Usuario.findOne({email});
    if(!usuario) return res.status(400).json({ok: false, msg: 'El usuario o la contraseña son incorrectos'});

    const validPassword = bcrypt.compareSync(password,usuario.password);
    if(!validPassword) return res.status(400).json({ok: false, msg: 'El usuario o la contraseña son incorrectos'});
    const token = await generarJwt(usuario.id,usuario.name);
    return res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  }catch(e){
    console.log(e.message);
    return res.status(500).json({ok: false, msg: 'Hubo un error en el servidor'});
  }
};

const renovarToken = (req, res = response) => {
  return res.json({ ok: true, msg: 'renew' });
};

module.exports = {crearUsuario,loginUsuario,renovarToken};