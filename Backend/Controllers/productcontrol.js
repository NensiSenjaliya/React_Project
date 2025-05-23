import productModel from "../Models/productModel.js";
import {
    NO_PRODUCT,
    PRODUCT_FOUND,
    ADD_PRODUCT_SUCCESSFULLY,
    INTERNAL_SERVER_ERROR,
    PRODUCT_DELETED,
    PRODUCT_UPDATED
} from "../Messages/prod.js";

//add product
export const addProduct = async (req, res) => {

    try {
        const { name,
            price, category, userid, Company, imgurl
        } = req.body;


        const product = new productModel({
            name,
            price,
            category,
            userid,
            Company: Company,
            imgurl
        });
        const products = await product.save();
        res.status(200).json({ products, message: ADD_PRODUCT_SUCCESSFULLY });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}

//get product
export const getproduct = async (req, res) => {
    try {
        const products = await productModel.find();
        if (products.length > 0) {
            // res.send(products)
            res.status(200).json({ products, message: PRODUCT_FOUND });
        }

    } catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }


}
//delete product
export const deleteprod = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: NO_PRODUCT }); 
        }

        return res.status(200).json({ message: PRODUCT_DELETED }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
    }
};


//get product by id
export const getprodbyid = async (req, res) => {
    try {
        const producId = req.params.id
        const productData = await productModel.findOne({ _id: producId });
        // console.log(productData);

        // const retult = {
        //     productId: productData._id,
        //     ProductName: productData.name,
        //     ProductImage: productData.imgurl
        // }

        if (productData) {
            res.status(200).json({ status: true, messge: PRODUCT_FOUND, data: productData })
        }
    }

    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}

//update
export const updateprod = async (req, res) => {
    try {
        const data = await productModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: req.body
            }
        )
        // res.send(data)
        res.status(200).json({ message: PRODUCT_UPDATED ,data:data});
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}

//search
export const searchprod = async (req, res) => {
    try {
        const data = await productModel.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { Company: { $regex: req.params.key } }
            ]
        });
        res.status(200).json(data)
    }

    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}