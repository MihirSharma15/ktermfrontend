'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { TimeFilter, TimeFilterOption } from './types'

interface TimeFilterSelectorProps {
  selectedFilter: TimeFilter
  onFilterChange: (filter: TimeFilter) => void
  className?: string
}

const timeFilterOptions: TimeFilterOption[] = [
  { value: '1h', label: '1H', hours: 1 },
  { value: '24h', label: '24H', hours: 24 },
  { value: '7d', label: '7D', hours: 168 },
  { value: '30d', label: '30D', hours: 720 },
  { value: '90d', label: '90D', hours: 2160 },
  { value: '1y', label: '1Y', hours: 8760 },
]

const TimeFilterSelector: React.FC<TimeFilterSelectorProps> = ({
  selectedFilter,
  onFilterChange,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {timeFilterOptions.map((option) => (
        <Button
          key={option.value}
          variant={selectedFilter === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(option.value)}
          className="min-w-[60px]"
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export default TimeFilterSelector
