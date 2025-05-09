import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Toast } from '@repo/ui/components';
import { formatPrice } from '@repo/utils';
import { useCrud } from '@repo/utils/hooks/useApi';
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '@repo/utils';
import { useToast } from '../hooks/useToast';
import MenuItemForm from '../components/MenuItemForm';

const menuEndpoints = {
  getAll: getMenu,
  create: createMenuItem,
  update: updateMenuItem,
  delete: deleteMenuItem,
};

const MenuManager = () => {
  const { items: menuItems, isLoading, error, fetchAll, create, update, remove } = useCrud(menuEndpoints);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    fetchAll().catch(err => {
      showToast({
        message: 'Erreur lors du chargement du menu',
        type: 'error'
      });
    });
  }, [fetchAll, showToast]);

  const handleSubmit = async (formData) => {
    try {
      if (selectedItem) {
        await update(selectedItem._id, formData);
        showToast({
          message: 'Plat mis à jour avec succès',
          type: 'success'
        });
      } else {
        await create(formData);
        showToast({
          message: 'Nouveau plat ajouté avec succès',
          type: 'success'
        });
      }
      setIsModalOpen(false);
      setSelectedItem(null);
    } catch (err) {
      showToast({
        message: 'Erreur lors de la sauvegarde',
        type: 'error'
      });
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    try {
      await remove(id);
      showToast({
        message: 'Plat supprimé avec succès',
        type: 'success'
      });
    } catch (err) {
      showToast({
        message: 'Erreur lors de la suppression',
        type: 'error'
      });
    }
  };

  if (isLoading) return <div className="text-center p-8">Chargement...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="heading-2">Gestion du Menu</h1>
        <Button onClick={() => {
          setSelectedItem(null);
          setIsModalOpen(true);
        }}>
          Ajouter un plat
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item._id} className="relative">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-restaurant font-semibold">
                  {formatPrice(item.price)}
                </span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.isAvailable ? 'Disponible' : 'Indisponible'}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(item)}
                >
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

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

export default MenuManager;