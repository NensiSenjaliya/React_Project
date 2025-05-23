import express from 'express';
import * as productcontrol from '../Controllers/productcontrol.js';

const router=express.Router();

router.post('/addproduct',productcontrol.addProduct);
router.get('/products',productcontrol.getproduct);
router.delete('/delete/:id',productcontrol.deleteprod);
router.get('/update/:id',productcontrol.getprodbyid)
router.put('/updateprod/:id',productcontrol.updateprod)
router.get('/search/:key',productcontrol.searchprod)

export default router;