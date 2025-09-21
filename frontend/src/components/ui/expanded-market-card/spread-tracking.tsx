'use client'

import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { PriceDataPoint } from './types'

interface SpreadTrackingProps {
  data: PriceDataPoint[]
  className?: string
}

const SpreadTracking: React.FC<SpreadTrackingProps> = ({
  data,
  className = ''
}) => {
  const chartConfig = {
    spread: {
      label: "Spread",
      color: "hsl(0, 84%, 60%)",
    },
  }

  // Filter data to only include points with spread information
  const spreadData = data.filter(d => d.spread !== undefined)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Spread Tracking</h3>
        <span className="text-sm text-muted-foreground">
          Bid-Ask Spread
        </span>
      </div>
      
      <div className="h-48 border border-border rounded-lg p-4">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full"
        >
          <LineChart data={spreadData}>
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
              dataKey="spread"
              stroke="var(--color-spread)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-muted-foreground">Current Spread</div>
          <div className="font-semibold">
            {spreadData.length > 0 ? spreadData[spreadData.length - 1].spread?.toFixed(4) : 'N/A'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Avg Spread</div>
          <div className="font-semibold">
            {spreadData.length > 0 
              ? (spreadData.reduce((sum, d) => sum + (d.spread || 0), 0) / spreadData.length).toFixed(4)
              : 'N/A'
            }
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Max Spread</div>
          <div className="font-semibold">
            {spreadData.length > 0 
              ? Math.max(...spreadData.map(d => d.spread || 0)).toFixed(4)
              : 'N/A'
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpreadTracking
