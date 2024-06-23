import React from 'react'
interface FilterOptionsProps {
  filterStatus: string;
  onFilterChange: (status: string) => void;
}
export default function FilterOptions(filterStatus, onFilterChange) {
  return (
    <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)}>
      <option value="">Tất cả</option>
      <option value="Chưa trả">Chưa trả</option>
      <option value="Đã trả">Đã trả</option>
    </select>
  )
}
