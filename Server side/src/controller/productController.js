import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();
import upload from '../middleWare/multermiddlieware.js';
router.post('/add_product', upload.single('image'), async (req, res) => {
  try {
    const newProduct = await prisma.products.create({
      data: {
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        image_url: req.file.filename
      },
    });
    res.status(200).json({ message: 'Product added successfully', data: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    return res.status(500).json({ error: 'Failed to add product' });
  }
});

router.put('/update_product/:id',upload.single("image"), async (req, res) => {
    try {
    const prodId = parseInt(req.params.id);
    const updatedProduct = await prisma.products.update({
      where: { id: prodId },
      data: {
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        image_url: req.file.filename,
      },
    });
    res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ error: 'Failed to update product' });
  }
});

router.get('/fetch_product', async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      where: { is_deleted: false },
    });
    return res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ message: 'Error fetching products' });
  }
});

router.delete('/delete_product/:id', async (req, res) => {
  try {
    const prodId = parseInt(req.params.id);
    const deletedProduct = await prisma.products.update({
      where: { id: prodId },
      data: { is_deleted: true },
    });
    if (deletedProduct.is_deleted) {
      return res.json({ message: 'Product deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ message: 'Error deleting product' });
  }
});
//this get for show data in input field when updating
router.get('/get_product/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product' });
  }
});

export default router;