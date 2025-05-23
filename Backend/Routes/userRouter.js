import express from 'express';
import * as usercontrol from '../Controllers/usercontrol.js';

const router=express.Router();

router.post('/regi',usercontrol.addregi);
router.get('/getdata',usercontrol.getdataregi);
router.delete('/delete/:id',usercontrol.deletebyidregi);
router.put('/update/:id',usercontrol.updatebyidregi);
router.post('/login',usercontrol.getloginuser);
//module.exports=router;
export default router;