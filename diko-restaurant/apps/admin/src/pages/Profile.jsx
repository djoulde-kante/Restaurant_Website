import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth, supabase } from '@repo/utils'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      full_name: user?.user_metadata?.full_name || '',
      phone: user?.user_metadata?.phone || ''
    }
  })

  const updateProfile = async (data) => {
    try {
      setLoading(true)
      
      // Mise à jour des métadonnées utilisateur
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: data.full_name,
          phone: data.phone,
          avatar_url: avatarUrl
        }
      })
      
      if (updateError) throw updateError

      // Mise à jour du profil dans la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone: data.phone,
          avatar_url: avatarUrl
        })
        .eq('id', user.id)

      if (profileError) throw profileError

      toast.success('Profil mis à jour')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (event) => {
    try {
      setLoading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}-${Math.random()}.${fileExt}`

      // Upload du fichier
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Récupération de l'URL publique
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      setAvatarUrl(data.publicUrl)
      toast.success('Avatar mis à jour')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Mon Profil
        </h1>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit(updateProfile)} className="space-y-6">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={avatarUrl || 'https://via.placeholder.com/150'}
                      alt="Avatar"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Changer
                  </button>
                </div>
              </div>

              {/* Informations */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    value={user?.email}
                    disabled
                    className="input-primary bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <div className="mt-1">
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
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { required: true })}
                    className="input-primary"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">Le téléphone est requis</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Section Sécurité */}
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Sécurité
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Modifiez votre mot de passe pour sécuriser votre compte.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  supabase.auth.resetPasswordForEmail(user?.email)
                    .then(() => toast.success('Email de réinitialisation envoyé'))
                    .catch(error => toast.error(error.message))
                }}
                className="btn-secondary"
              >
                Changer mon mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
