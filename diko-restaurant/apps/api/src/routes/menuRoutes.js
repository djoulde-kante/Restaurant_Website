import express from 'express';
import {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByCategory,
  searchMenuItems
} from '../controllers/menuController.js';

const router = express.Router();

router.get('/search', searchMenuItems);
router.get('/category/:category', getMenuItemsByCategory);
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;