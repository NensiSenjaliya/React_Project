import { razorpay } from "./rezorpayClient"
import * as ordercontrol from '../Controllers/ordercontrol.js'
import * as ordermsg from "../Messages/ordermsg.js"

export const createPaymentLink = async (orderid) => {
    try {
        const order=await ordercontrol.findOne(orderid)

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: ordermsg.INTERNAL_SERVER_ERROR });
    }
}