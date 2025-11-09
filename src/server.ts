import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import paymentRoutes from './routes/payment';
import orderRoutes from './routes/order';
import { Product } from './models/Product';

dotenv.config();

export const server=()=>{
  const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Seed products
const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation', price: 150, category: 'Electronics' }
    ]);
    console.log('Products seeded');
  }
};


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  seedProducts();
});
}