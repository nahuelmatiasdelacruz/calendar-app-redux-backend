const { Router } = require('express');
const {
  crearUsuario,
  loginUsuario,
  renovarToken,
} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos
  ],
  crearUsuario
);
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos
  ],
  loginUsuario
);
router.get('/renew', [], renovarToken);

module.exports = router;
