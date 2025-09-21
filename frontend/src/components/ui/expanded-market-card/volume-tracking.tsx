'use client'

import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { PriceDataPoint } from './types'

interface VolumeTrackingProps {
  data: PriceDataPoint[]
  className?: string
}

const VolumeTracking: React.FC<VolumeTrackingProps> = ({
  data,
  className = ''
}) => {
  const chartConfig = {
    volume: {
      label: "Volume",
      color: "hsl(217, 91%, 60%)",
    },
  }

  // Filter data to only include points with volume information
  const volumeData = data.filter(d => d.volume !== undefined)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Volume Tracking</h3>
        <span className="text-sm text-muted-foreground">
          Trading Volume
        </span>
      </div>
      
      <div className="h-48 border border-border rounded-lg p-4">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full"
        >
          <BarChart data={volumeData}>
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
            <Bar
              dataKey="volume"
              fill="var(--color-volume)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-muted-foreground">Current Volume</div>
          <div className="font-semibold">
            {volumeData.length > 0 
              ? volumeData[volumeData.length - 1].volume?.toLocaleString() 
              : 'N/A'
            }
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Avg Volume</div>
          <div className="font-semibold">
            {volumeData.length > 0 
              ? Math.round(volumeData.reduce((sum, d) => sum + (d.volume || 0), 0) / volumeData.length).toLocaleString()
              : 'N/A'
            }
          </div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Peak Volume</div>
          <div className="font-semibold">
            {volumeData.length > 0 
              ? Math.max(...volumeData.map(d => d.volume || 0)).toLocaleString()
              : 'N/A'
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolumeTracking
