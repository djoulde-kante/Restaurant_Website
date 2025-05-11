export const orderStatusColors = {
  pending: {
    text: 'text-yellow-800',
    bg: 'bg-yellow-100',
    label: 'En attente'
  },
  preparing: {
    text: 'text-blue-800',
    bg: 'bg-blue-100',
    label: 'En préparation'
  },
  ready: {
    text: 'text-green-800',
    bg: 'bg-green-100',
    label: 'Prêt'
  },
  delivered: {
    text: 'text-gray-800',
    bg: 'bg-gray-100',
    label: 'Livré'
  },
  cancelled: {
    text: 'text-red-800',
    bg: 'bg-red-100',
    label: 'Annulé'
  }
}

export default function OrderStatus({ status }) {
  const { text, bg, label } = orderStatusColors[status] || orderStatusColors.pending

  return (
    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${text} ${bg}`}>
      {label}
    </span>
  )
}
