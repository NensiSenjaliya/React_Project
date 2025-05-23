import express from 'express';
import * as ordercontrol from '../Controllers/ordercontrol.js'

const router=express.Router();
router.post('/createorder',ordercontrol.createOrder);
router.get('/showorder',ordercontrol.getOrders);
router.delete('/delete/:id',ordercontrol.deleteOrder);

export default router;