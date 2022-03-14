import axios from "axios";

// load
export const loadProductsApi = async () => await axios.get("/products");

// create
export const createProductsApi = async (product) =>
  await axios.post("/products/add", product);

