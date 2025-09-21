'use client'

import React, { useState, useMemo } from 'react'
import { TrendingUp, TrendingDown, Clock, BarChart3, Percent } from 'lucide-react'
import TimeFilterSelector from './time-filter-selector'
import PriceChart from './price-chart'
import SpreadTracking from './spread-tracking'
import VolumeTracking from './volume-tracking'
import { MarketData, TimeFilter, PriceDataPoint } from './types'
import { filterDataByTime, generateSampleData } from './utils'

interface ExpandedMarketCardProps {
  marketData: MarketData
  className?: string
}

const ExpandedMarketCard: React.FC<ExpandedMarketCardProps> = ({
  marketData,
  className = ''
}) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<TimeFilter>('24h')
  
  const isPositiveChange = marketData.change24h >= 0
  const changeColor = isPositiveChange ? 'text-green-600' : 'text-red-600'
  const changeIcon = isPositiveChange ? TrendingUp : TrendingDown

  // Generate or filter data based on selected time filter
  const filteredData = useMemo(() => {
    // For demo purposes, generate sample data. In real app, this would come from API
    return generateSampleData(marketData.probability / 100, selectedTimeFilter, true, true)
  }, [marketData.probability, selectedTimeFilter])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{marketData.marketTitle}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {React.createElement(changeIcon, { className: `w-5 h-5 ${changeColor}` })}
              <span className={`text-lg font-semibold ${changeColor}`}>
                {isPositiveChange ? '+' : ''}{marketData.change24h.toFixed(2)}%
              </span>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground underline underline-offset-4">
                {marketData.probability}%
              </span>
            </div>
          </div>
        </div>

        {/* Market Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Time to Expiration</div>
              <div className="font-medium">{marketData.timeToExpiration}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Volume</div>
              <div className="font-medium">{marketData.volume.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Probability</div>
              <div className="font-medium">{marketData.probability}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {React.createElement(changeIcon, { className: `w-4 h-4 ${changeColor}` })}
            <div>
              <div className="text-sm text-muted-foreground">24h Change</div>
              <div className={`font-medium ${changeColor}`}>
                {isPositiveChange ? '+' : ''}{marketData.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Market Analysis</h2>
        <TimeFilterSelector
          selectedFilter={selectedTimeFilter}
          onFilterChange={setSelectedTimeFilter}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Chart */}
        <div className="lg:col-span-2">
          <PriceChart
            data={filteredData}
            timeFilter={selectedTimeFilter}
          />
        </div>

        {/* Spread Tracking */}
        <SpreadTracking
          data={filteredData}
        />

        {/* Volume Tracking */}
        <VolumeTracking
          data={filteredData}
        />
      </div>
    </div>
  )
}

export default ExpandedMarketCard
