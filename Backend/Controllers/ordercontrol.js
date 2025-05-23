import orderModel from "../Models/orderModel.js";
import * as ordermsg from "../Messages/ordermsg.js"
//add
export const createOrder = async (req, res) => {
    try {
      // console.log("Received order data:", req.body); // ✅ Debugging step
  
      const {
        ProductId,
        ProductName,
        CustomerId,
        CustomerName,
        Qty,
        price,
        Total,
      } = req.body;
  
      if (
        !ProductId ||
        !ProductName ||
        !CustomerId ||
        !CustomerName ||
        !price ||
        !Total
      ) {
        return res.status(400).json({ message:ordermsg.MISSING_FIELDS});
      }
  
      const newOrder = new orderModel({
        ProductId,
        ProductName,
        CustomerId,
        CustomerName,
        Qty,
        price,
        Total,
      });
      await newOrder.save();
  
      res.status(201).json({ message:ordermsg.ORDER_PLACE_SUC});
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message:ordermsg.INTERNAL_SERVER_ERROR});
    }
  };

  //get order
  export const getOrders = async (req, res) => {
    try {
      const orders = await orderModel.find().populate("ProductId CustomerId");
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message:ordermsg.INTERNAL_SERVER_ERROR });
    }
  };
  
  // ✅ Delete an Order
  export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await orderModel.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({ message:ordermsg.ORDER_NOT_FOUND });
      }
  
      res.json({ message:ordermsg.ORDER_DELETE_SUC});
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({message:ordermsg.INTERNAL_SERVER_ERROR });
    }
  };
  