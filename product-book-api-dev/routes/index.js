const { userGetProfile, userLogin, userRegister, userUpdate, updatePassword } = require('../controller/userController')
const { authentication } = require('../middleware/jwtMiddleware')
const { userValidator } = require('../validators/userValidators')
const { loginValidator } = require('../validators/loginvalidator');
const upload = require('../middleware/imageUpload')
const express = require('express');
const { updateValidator } = require('../validators/updateValidator');
const { deleteImage } = require('../middleware/imageDelete');
const router = express.Router();
const { addContact,getAllContact,updateContact,deleteContect } = require('../controller/contectController')
const { contectValidator } = require('../validators/contectValidators');


router.post('/register', upload.single("profile_pic"), userValidator, userRegister);
router.post('/login', loginValidator, userLogin);
router.get('/get-profile', authentication, userGetProfile);
router.put('/update', upload.single("profile_pic"), authentication, updateValidator, userUpdate);
router.post('/forgate', authentication, updatePassword);
router.post('/add-all-contect', authentication,contectValidator, addContact);
router.get('/get-all-contect', authentication,getAllContact);
router.put('/update-contect/:_id', authentication,updateContact);
router.delete('/delete-contect/:_id', authentication,deleteContect);
module.exports = router;