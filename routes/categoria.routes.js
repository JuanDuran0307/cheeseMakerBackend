const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { postCategoria,
      getCategoria,
      deleteCategoria,
      putCategoria
      } = require('../controllers/categoria.controllers.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { userExistsById, isValidRole } = require('../helpers/db.validators.js');


const router = Router();

/**
 * localhost/api/categorias
 */





// Crear categoria - privado - cualquier persona con un token válido
router.get('/get',getCategoria);
router.delete('/del/:id',[validateJWT,isAdminRole,
      check('id', 'No es un Id valido').isMongoId(),
      check('id').custom(userExistsById),
],deleteCategoria);

router.post('/post', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );
router.put('/put/:id',[
      check('id',"No es un ObjectIDvalido ").isMongoId(),
      check('id').custom(validateDocuments)

],putCategoria)







module.exports = router;