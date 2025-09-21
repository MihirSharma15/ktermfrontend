'use client'

import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { PriceDataPoint, TimeFilter } from './types'

interface PriceChartProps {
  data: PriceDataPoint[]
  timeFilter: TimeFilter
  className?: string
}

const PriceChart: React.FC<PriceChartProps> = ({
  data,
  timeFilter,
  className = ''
}) => {
  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(142, 76%, 36%)",
    },
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Price Chart</h3>
        <span className="text-sm text-muted-foreground">
          Last {timeFilter.toUpperCase()}
        </span>
      </div>
      
      <div className="h-64 border border-border rounded-lg p-4">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full"
        >
          <LineChart data={data}>
            <XAxis 
              dataKey="timestamp" 
              hide
            />
            <YAxis 
              hide
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-muted-foreground">Current Price</div>
          <div className="font-semibold">
            {data.length > 0 ? data[data.length - 1].price.toFixed(4) : 'N/A'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">High</div>
          <div className="font-semibold">
            {data.length > 0 ? Math.max(...data.map(d => d.price)).toFixed(4) : 'N/A'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Low</div>
          <div className="font-semibold">
            {data.length > 0 ? Math.min(...data.map(d => d.price)).toFixed(4) : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceChart
