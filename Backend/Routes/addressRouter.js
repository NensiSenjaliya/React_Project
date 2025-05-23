import express from 'express';
import * as addresscontrol from '../Controllers/addresscontrol.js';

const router=express.Router();

router.post('/addaddress',addresscontrol.addAddress);
 router.get('/addresses',addresscontrol.getaddress);
router.delete('/delete/:id',addresscontrol.deleteadd);
router.get('/address/:id',addresscontrol.getaddbyid)
router.put('/updateadd/:id',addresscontrol.updateadd)

export default router;