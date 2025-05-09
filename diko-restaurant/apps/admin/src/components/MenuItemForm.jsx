import React from 'react';
import PropTypes from 'prop-types';
import { Button, ImageUpload } from '@repo/ui';
import { useFormValidation, schemas, useFileUpload } from '@repo/utils';

const MenuItemForm = ({ item = {}, onSubmit, onCancel }) => {
  const {
    data,
    errors,
    handleChange,
    validateForm,
    setData,
    setErrors
  } = useFormValidation({
    name: item.name || '',
    description: item.description || '',
    price: item.price || '',
    category: item.category || 'plat',
    isAvailable: item.isAvailable ?? true,
    image: item.image || ''
  }, schemas.menuItem);

  const { uploadFile, deleteFile, isUploading, error: uploadError } = useFileUpload();

  const handleImageUpload = async (file) => {
    try {
      const result = await uploadFile(file);
      if (!result?.url) {
        throw new Error('URL de l\'image non reçue');
      }
      setData(prev => ({
        ...prev,
        image: result.url
      }));
    } catch (err) {
      console.error('Erreur upload:', err);
      setErrors(prev => ({
        ...prev,
        image: 'Erreur lors du téléchargement de l\'image'
      }));
    }
  };

  const handleImageDelete = async () => {
    // Extraire le nom du fichier de l'URL
    const filename = data.image.split('/').pop();
    try {
      await deleteFile(filename);
      setData(prev => ({
        ...prev,
        image: ''
      }));
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...data,
        price: parseFloat(data.price)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom du plat
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-restaurant focus:ring-restaurant'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={data.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.description
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-restaurant focus:ring-restaurant'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Prix (€)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.price
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-restaurant focus:ring-restaurant'
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.category
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-restaurant focus:ring-restaurant'
            }`}
          >
            <option value="entrée">Entrée</option>
            <option value="plat">Plat principal</option>
            <option value="dessert">Dessert</option>
            <option value="boisson">Boisson</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image du plat
        </label>
        <ImageUpload
          initialImage={data.image}
          onUpload={handleImageUpload}
          onDelete={handleImageDelete}
          isUploading={isUploading}
          error={uploadError}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isAvailable"
          name="isAvailable"
          checked={data.isAvailable}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-restaurant focus:ring-restaurant"
        />
        <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
          Disponible à la vente
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button type="submit">
          {item._id ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

MenuItemForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string,
    isAvailable: PropTypes.bool,
    image: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

MenuItemForm.defaultProps = {
  item: {},
  onCancel: null
};

export default MenuItemForm;