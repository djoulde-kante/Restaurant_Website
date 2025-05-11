import { useState, useEffect } from 'react'
import { supabase } from '@repo/utils'
import toast from 'react-hot-toast'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    setCategories(data)
  }

  const addCategory = async (categoryData) => {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
    
    if (error) throw error
    setCategories([...categories, data[0]])
    return data[0]
  }

  const updateCategory = async (id, updates) => {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    setCategories(categories.map(c => c.id === id ? data[0] : c))
    return data[0]
  }

  const deleteCategory = async (id) => {
    // Vérifier d'abord si la catégorie est utilisée
    const { data: products, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('category_id', id)

    if (checkError) throw checkError

    if (products.length > 0) {
      throw new Error('Cette catégorie contient des produits et ne peut pas être supprimée')
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    setCategories(categories.filter(c => c.id !== id))
  }

  const uploadImage = async (categoryId, file) => {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `${categoryId}.${fileExt}`

      // Upload de l'image
      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Récupération de l'URL publique
      const { data } = supabase.storage
        .from('categories')
        .getPublicUrl(filePath)

      // Mise à jour de la catégorie avec l'URL de l'image
      await updateCategory(categoryId, { image_url: data.publicUrl })

      return data.publicUrl
    } catch (error) {
      toast.error('Erreur lors de l'upload de l'image')
      throw error
    }
  }

  useEffect(() => {
    fetchCategories().finally(() => setLoading(false))
  }, [])

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    uploadImage,
    fetchCategories
  }
}
