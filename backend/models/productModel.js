const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: {
        filename: "default.png",
      },
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Products = mongoose.model("Products", productModel);

module.exports = Products;
