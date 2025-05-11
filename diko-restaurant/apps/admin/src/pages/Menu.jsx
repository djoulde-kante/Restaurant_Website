import { useState } from 'react'
import { useMenu } from '@repo/utils'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ProductForm from '../components/ProductForm'
import toast from 'react-hot-toast'

export default function Menu() {
  const { products, categories, addProduct, updateProduct, deleteProduct, loading } = useMenu()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const handleAddProduct = async (data) => {
    await addProduct(data)
    setIsFormOpen(false)
  }
  
  const handleEditProduct = async (data) => {
    await updateProduct(selectedProduct.id, data)
    setSelectedProduct(null)
    setIsFormOpen(false)
  }
  
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await deleteProduct(id)
        toast.success('Produit supprimé')
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const openEditForm = (product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">
            Gestion du Menu
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Gérez les produits disponibles dans votre menu
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedProduct(null)
              setIsFormOpen(true)
            }}
            className="btn-primary"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Ajouter un produit
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nom
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Catégorie
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Prix
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Disponible
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {categories.find(c => c.id === product.category_id)?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.price} €
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          product.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.available ? 'Oui' : 'Non'}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => openEditForm(product)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                          <span className="sr-only">Supprimer</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedProduct(null)
        }}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        product={selectedProduct}
        categories={categories}
      />
    </div>
  )
}
