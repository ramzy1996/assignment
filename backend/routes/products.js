const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/productModel");
const path = require("path");

// upload image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// get all products
router.get("/", (req, res) => {
  try {
    Products.find().then((product) => res.json(product));
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

// add product
router.post("/add", upload.array("image"), async (req, res) => {
  try {
    const files = req.files;
    if (Array.isArray(files) && files.length > 0) {
      // res.json(req.body);
      // res.json(req.files);
      const newProduct = await new Products({
        sku: req.body.sku,
        quantity: req.body.quantity,
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
        image: req.files,
      });
      newProduct.save().then(() => res.json("New product added successfully"));
      // res.json(newProduct);
    } else {
      const newProduct = await new Products({
        sku: req.body.sku,
        quantity: req.body.quantity,
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
      });
      newProduct.save().then(() => res.json("New product added successfully"));
    }

    // const newProduct = await new Products(req.body);

    // newProduct.save().then(() => res.json("New product added successfully"));
    // res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
});

// find product by id
router.get("/:id", async (req, res) => {
  try {
    await Products.findById(req.params.id).then((product) => res.json(product));
  } catch (error) {
    res.status(500).json(error);
  }
});

// find product by id and update
router.put("/update/:id", upload.array("image"), async (req, res) => {
  try {
    const files = req.files;
    if (Array.isArray(files) && files.length > 0) {
      // res.json(req.body);
      // res.json(req.files);
      await Products.findById(req.params.id).then((product) => {
        product.sku = req.body.sku;
        product.quantity = req.body.quantity;
        product.product = req.body.product;
        product.description = req.body.description;
        product.price = req.body.price;
        product.image = req.files;

        product.save().then(() => res.json("Product is updated successfully"));
      });
      // res.json(newProduct);
    } else {
      await Products.findById(req.params.id).then((product) => {
        product.sku = req.body.sku;
        product.quantity = req.body.quantity;
        product.product = req.body.product;
        product.description = req.body.description;
        product.price = req.body.price;

        product.save().then(() => res.json("Product is updated successfully"));
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// find product by id and delete
router.delete("/:id", async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id).then(() =>
      res.json("Product is deleted successfully")
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

// favourite list
router.put("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product.favourite === false) {
      await product.update({ $set: { favourite: true } });
      res.status(200).json("The product has been liked");
    } else {
      await product.update({ $set: { favourite: false } });
      res.status(200).json("The product has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
