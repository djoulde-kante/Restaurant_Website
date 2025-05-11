import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useStore } from '../store'

export function useOrders() {
  const { user } = useStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async (status = null) => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          *,
          product:products(*)
        ),
        customer:profiles(*)
      `)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    setOrders(data)
  }

  const createOrder = async (orderData) => {
    // First create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: user?.id,
        status: 'pending',
        total: orderData.total
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Then create all order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    await fetchOrders()
    return order
  }

  const updateOrderStatus = async (orderId, status) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    setOrders(orders.map(o => o.id === orderId ? data : o))
    return data
  }

  // Set up real-time subscription
  useEffect(() => {
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, () => {
        fetchOrders()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Fetch initial data
  useEffect(() => {
    fetchOrders().finally(() => setLoading(false))
  }, [])

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    fetchOrders
  }
}
