import express from 'express';
import * as usercontrol from '../Controllers/usercontrol.js';

const router=express.Router();

router.post('/regi',usercontrol.addregi);
router.get('/getdata',usercontrol.getdataregi);
router.delete('/delete/:id',usercontrol.deletebyidregi);
router.put('/update/:id',usercontrol.updatebyidregi);
router.post('/login',usercontrol.getloginuser);
router.post('/google-login', usercontrol.googleLogin);
router.post('/forgot-password',usercontrol.sendForgotPasswordOTP)
router.post('/verify-otp',usercontrol.verifyForgotPasswordOTP)
router.post('/reset-password',usercontrol.resetPassword)

//module.exports=router;
export default router;