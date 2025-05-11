import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('role', ['admin', 'staff'])
      .order('full_name')

    if (error) throw error
    setEmployees(data)
  }

  const addEmployee = async (employeeData) => {
    // D'abord créer l'utilisateur dans Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: employeeData.email,
      password: generateRandomPassword(),
      email_confirm: true
    })

    if (authError) throw authError

    // Ensuite créer le profil
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: employeeData.full_name,
        email: employeeData.email,
        phone: employeeData.phone,
        role: employeeData.role
      })
      .select()

    if (error) throw error
    await fetchEmployees()
    return data[0]
  }

  const updateEmployee = async (id, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    setEmployees(employees.map(e => e.id === id ? data[0] : e))
    return data[0]
  }

  const deleteEmployee = async (id) => {
    // Supprimer l'utilisateur dans Auth (cascade sur le profil)
    const { error: authError } = await supabase.auth.admin.deleteUser(id)

    if (authError) throw authError
    setEmployees(employees.filter(e => e.id !== id))
  }

  // Fonction utilitaire pour générer un mot de passe aléatoire
  const generateRandomPassword = () => {
    const length = 12
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return password
  }

  useEffect(() => {
    fetchEmployees().finally(() => setLoading(false))
  }, [])

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees
  }
}
