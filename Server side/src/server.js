import express from 'express';
import cors from 'cors';
import userRoutes from './controller/userController.js';
import productRoutes from './controller/productController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/images",express.static("images"))
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
