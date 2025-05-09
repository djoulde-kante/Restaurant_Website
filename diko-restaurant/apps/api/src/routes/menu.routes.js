import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// Récupérer tous les items du menu
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer un nouvel item
router.post('/', async (req, res) => {
  const menuItem = new Menu(req.body);
  try {
    const newItem = await menuItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Récupérer un item par ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Item non trouvé' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un item
router.patch('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) return res.status(404).json({ message: 'Item non trouvé' });
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un item
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Item non trouvé' });
    res.json({ message: 'Item supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;