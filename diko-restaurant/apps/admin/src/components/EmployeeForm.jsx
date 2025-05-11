import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function EmployeeForm({ isOpen, onClose, onSubmit, employee }) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: employee || {
      full_name: '',
      email: '',
      phone: '',
      role: 'staff'
    }
  })

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true)
      await onSubmit(data)
      reset()
      onClose()
      toast.success(employee ? 'Employé modifié' : 'Employé ajouté')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {employee ? 'Modifier l\'employé' : 'Ajouter un employé'}
                </Dialog.Title>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      {...register('full_name', { required: true })}
                      className="input-primary"
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">Le nom est requis</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                      })}
                      className="input-primary"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        Email invalide
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', { required: true })}
                      className="input-primary"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        Le numéro de téléphone est requis
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Rôle
                    </label>
                    <select
                      id="role"
                      {...register('role', { required: true })}
                      className="input-primary"
                    >
                      <option value="staff">Personnel</option>
                      <option value="admin">Administrateur</option>
                    </select>
                    {errors.role && (
                      <p className="mt-1 text-sm text-red-600">
                        Le rôle est requis
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                    >
                      {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
