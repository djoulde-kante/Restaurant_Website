import { useState } from 'react'
import { useStore } from '@repo/utils'
import { Dialog } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const addToCart = useStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity
    })
    setIsOpen(false)
    setQuantity(1)
    toast.success('Produit ajouté au panier')
  }

  return (
    <>
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image_url || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price} €</p>
        </div>
        {!product.available && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              Indisponible
            </span>
          </div>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
              <img
                src={product.image_url || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <Dialog.Title className="mt-4 text-lg font-medium text-gray-900">
              {product.name}
            </Dialog.Title>
            
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              {product.description}
            </Dialog.Description>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-medium text-gray-900">
                {(product.price * quantity).toFixed(2)} €
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.available}
                className={`btn-primary ${!product.available && 'opacity-50 cursor-not-allowed'}`}
              >
                <ShoppingCartIcon className="-ml-1 mr-2 h-5 w-5" />
                Ajouter au panier
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
