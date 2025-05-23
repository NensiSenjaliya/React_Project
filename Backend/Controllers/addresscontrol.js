import addressModel from "../Models/AddressModel.js";
// import {
//     NO_PRODUCT,
//     PRODUCT_FOUND,
//     ADD_PRODUCT_SUCCESSFULLY,
//     INTERNAL_SERVER_ERROR,
//     PRODUCT_DELETED,
//     PRODUCT_UPDATED
// } from "../Messages/prod.js";
import * as addmsg from '../Messages/addmsg.js'
//add product
export const addAddress = async (req, res) => {

    try {
        const { name,
            email,
            number,
            street,
            city,
            country,
            state,
            pincode
        } = req.body;


        const address = new addressModel({
            name,
            email,
            number,
            street,
            city,
            country,
            state,
            pincode
        });
        const addresses = await address.save();
        res.status(200).json({ addresses, message: addmsg.ADD_ADDRESS_SUCCESSFULLY});
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: addmsg.INTERNAL_SERVER_ERROR });

    }
}

//get product
export const getaddress = async (req, res) => {
    try {
        const addresses = await addressModel.find();
        if (addresses.length > 0) {
            // res.send(products)
            res.status(200).json({ addresses, message: addmsg.ADDRESS_FOUND });
        }

    } catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: addmsg.INTERNAL_SERVER_ERROR });

    }
}


//delete product
export const deleteadd = async (req, res) => {
    try {
        const address = await addressModel.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).json({ message:addmsg.NO_ADDRESS }); 
        }

        return res.status(200).json({ message: addmsg.ADDRESS_DELETED }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: addmsg.INTERNAL_SERVER_ERROR });
    }
};


// //get product by id
export const getaddbyid = async (req, res) => {
    try {
        const addId = req.params.id
        const addData = await addressModel.findOne({ _id: addId });
        if (addData) {
            res.status(200).json({ status: true, messge: addmsg.ADDRESS_FOUND, data: addData })
        }
    }

    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message:addmsg.INTERNAL_SERVER_ERROR});

    }
}

//update
export const updateadd = async (req, res) => {
    try {
        const data = await addressModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: req.body
            }
        )
        // res.send(data)
        res.status(200).json({ message: addmsg.ADDRESS_UPDATED ,data:data});
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: addmsg.INTERNAL_SERVER_ERROR });

    }
}
