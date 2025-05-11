import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useMenu() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('name')
    
    if (error) throw error
    setProducts(data)
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    setCategories(data)
  }

  const addProduct = async (product) => {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
    
    if (error) throw error
    setProducts([...products, data[0]])
    return data[0]
  }

  const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    setProducts(products.map(p => p.id === id ? data[0] : p))
    return data[0]
  }

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    setProducts(products.filter(p => p.id !== id))
  }

  // Fetch initial data
  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .finally(() => setLoading(false))
  }, [])

  return {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    fetchCategories
  }
}
