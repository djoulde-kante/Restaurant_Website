import Menu from '../models/Menu.js';
import { ApiError } from '../middlewares/errorHandler.js';

// Récupérer tous les items du menu
export const getAllMenuItems = async (req, res, next) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Récupérer un item par son ID
export const getMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      throw new ApiError(404, 'Item non trouvé');
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Créer un nouvel item
export const createMenuItem = async (req, res, next) => {
  try {
    const item = new Menu(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un item
export const updateMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!item) {
      throw new ApiError(404, 'Item non trouvé');
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Supprimer un item
export const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) {
      throw new ApiError(404, 'Item non trouvé');
    }
    res.json({ message: 'Item supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};

// Rechercher des items par catégorie
export const getMenuItemsByCategory = async (req, res, next) => {
  try {
    const items = await Menu.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Rechercher des items par texte
export const searchMenuItems = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      throw new ApiError(400, 'Le paramètre de recherche est requis');
    }
    
    const items = await Menu.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    
    res.json(items);
  } catch (error) {
    next(error);
  }
};