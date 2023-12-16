import {
  findAll,
  findById,
  createOne,
  updateOne,
  deleteOne,
} from "../services/products.service.js";

export const findProducts = async (req, res) => {
  const products = await findAll();
  if (!products.length) {
    res.status(200).json({ message: "No Products Found" });
  } else {
    res.status(200).json({ message: "Products found", products });
  }
};

export const findProductById = async (paramsOrId) => {
  const { pid } = paramsOrId.params || paramsOrId;

  try {
    const product = await findById(pid);

    if (product.error === "Product Not Found") {
      return null;
    }

    return product;
  } catch (error) {
    return null;
  }
};

export const createProduct = async (req, res) => {
  const createdProduct = await createOne(req.body);
  if (createdProduct) {
    res
      .status(200)
      .json({ message: "Product created", product: createdProduct });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await updateOne();
  if (updatedProduct) {
    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  const deletedProduct = await deleteOne();
  if (deletedProduct) {
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
