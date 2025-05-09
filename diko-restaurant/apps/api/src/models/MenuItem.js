import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['entrée', 'plat', 'dessert', 'boisson'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
