const { Router }= require('express');
const{ check } = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const {getCheese,postCheese,deleteCheese,putCheese} = require('../controllers/cheese.controller.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { userExistsById, isValidRole } = require('../helpers/db.validators.js');


const router = Router();

router.get('/get',getCheese);
router.delete('/del/:id',[validateJWT,isAdminRole,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userExistsById),
],deleteCheese);

router.post('/post', [ 
 validateJWT, 
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validateDocuments,
  check('id').custom(userExistsById)
], postCheese );
router.put('/put/:id',[
    check('id',"No es un ObjectIDvalido ").isMongoId(),
    check('id').custom(validateDocuments)

],putCheese)


module.exports = router;