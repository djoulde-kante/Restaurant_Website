import React from 'react';
import Button from './Button';

const Table = ({
  columns,
  data,
  actions,
  isLoading = false,
  emptyMessage = 'Aucune donnée disponible',
  onSort,
  sortColumn,
  sortDirection,
}) => {
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }

    const value = column.accessor ? item[column.accessor] : item;
    return value?.toString() || '';
  };

  const handleSort = (column) => {
    if (!column.sortable || !onSort) return;
    
    const direction = column.id === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.id, direction);
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-restaurant"></div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:text-gray-700' : ''
                }`}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortColumn === column.id && (
                    <span>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {actions && <th scope="col" className="relative px-6 py-3" />}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={item.id || rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {renderCell(item, column)}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || 'secondary'}
                        size="sm"
                        onClick={() => action.onClick(item)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;