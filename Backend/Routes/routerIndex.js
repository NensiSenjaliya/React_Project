import userRouter from './userRouter.js';
import productRouter from './productRouter.js'
import orderRouter from './orderRouter.js'
import addressRouter from './addressRouter.js'
import payment from './payment.js';
const initRouter=(app)=>{
    app.use('/api/user',userRouter);
    app.use('/api/product',productRouter);
    app.use('/api/order',orderRouter);
    app.use('/api/address',addressRouter);
    
    app.use("/api/payment", payment);


}
 
export {initRouter};