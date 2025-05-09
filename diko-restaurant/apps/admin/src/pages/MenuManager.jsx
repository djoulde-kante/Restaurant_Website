import React, { useState, useEffect, useMemo, memo } from 'react';
import { Button, Card, Modal, Toast, ErrorBoundary } from '@repo/ui';
import { formatPrice, useLogger } from '@repo/utils';
import { useMenuApi } from '@repo/utils';
import { useToast } from '../hooks/useToast';
import MenuItemForm from '../components/MenuItemForm';

const MenuItem = memo(({ item, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          <p className="text-restaurant font-medium mt-2">{formatPrice(item.price)}</p>
        </div>
        <div className="space-x-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit(item)}>
            Modifier
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(item)}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
});

MenuItem.displayName = 'MenuItem';

const MenuManagerContent = () => {
  const { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } = useMenuApi();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { toast, showToast, hideToast } = useToast();
  const { logError, logInfo } = useLogger();

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const data = await getMenu();
      setItems(data);
    } catch (err) {
      logError('Erreur lors du chargement du menu', err);
      setError(err);
      showToast({
        message: 'Erreur lors du chargement du menu',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const menuItemsByCategory = useMemo(() => {
    if (!Array.isArray(items)) return {};
    
    return items.reduce((acc, item) => {
      const category = item.category || 'autre';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, [items]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-restaurant"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error.message || 'Une erreur est survenue'}</p>
        <Button onClick={fetchItems} className="mt-4">Réessayer</Button>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      if (selectedItem) {
        const updated = await updateMenuItem(selectedItem._id, formData);
        setItems(prev => prev.map(item => item._id === selectedItem._id ? updated : item));
        logInfo('Plat mis à jour', { itemId: selectedItem._id, ...formData });
        showToast({
          message: 'Plat mis à jour avec succès',
          type: 'success'
        });
      } else {
        const created = await createMenuItem(formData);
        setItems(prev => [...prev, created]);
        logInfo('Nouveau plat créé', { itemId: created._id, ...formData });
        showToast({
          message: 'Plat ajouté avec succès',
          type: 'success'
        });
      }
      setIsModalOpen(false);
      setSelectedItem(null);
    } catch (err) {
      logError('Erreur lors de la sauvegarde du plat', err, { formData });
      showToast({
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    try {
      await deleteMenuItem(id);
      setItems(prev => prev.filter(item => item._id !== id));
      showToast({
        message: 'Plat supprimé avec succès',
        type: 'success'
      });
    } catch (err) {
      logError('Erreur lors de la suppression du plat', err, { itemId: id });
      showToast({
        message: 'Erreur lors de la suppression',
        type: 'error'
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion du Menu</h1>
        <Button onClick={() => {
          setSelectedItem(null);
          setIsModalOpen(true);
        }}>
          Ajouter un plat
        </Button>
      </div>

      {Object.entries(menuItemsByCategory).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold capitalize mb-4">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map(item => (
              <MenuItem
                key={item._id}
                item={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </div>
        </div>
      ))}

      <Modal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        title={selectedItem ? 'Modifier un plat' : 'Ajouter un plat'}
      >
        <MenuItemForm
          item={selectedItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

const MenuManager = () => (
  <ErrorBoundary>
    <MenuManagerContent />
  </ErrorBoundary>
);

export default MenuManager;