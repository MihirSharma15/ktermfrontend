'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Clock, BarChart3, Percent } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ExpandedMarketCard } from '@/components/ui/expanded-market-card/expanded-market-card'
import { MarketData } from '@/components/ui/expanded-market-card/types'

interface MarketCardProps {
  marketTitle: string
  timeToExpiration: string
  volume: number
  probability: number
  change24h: number
  priceData?: Array<{ time: string; price: number }>
}

const MarketCard: React.FC<MarketCardProps> = ({
  marketTitle,
  timeToExpiration,
  volume,
  probability,
  change24h,
  priceData = []
}) => {
  const isPositiveChange = change24h >= 0
  const changeColor = isPositiveChange ? 'text-green-600' : 'text-red-600'
  const changeIcon = isPositiveChange ? TrendingUp : TrendingDown

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-card border border-border shadow-sm p-6 space-y-4 relative cursor-pointer transition-transform duration-200 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-black/20">
          {/* Market Title - Prominent */}
          <h2 className="absolute top-6 left-6 right-6 text-xl font-bold text-card-foreground leading-tight line-clamp-2">
            {marketTitle}
          </h2>

          {/* 24h Change and Probability - First thing users see */}
          <div className="flex items-center justify-between mt-16">
            <div className="flex items-center gap-2">
              {React.createElement(changeIcon, { className: `w-5 h-5 ${changeColor}` })}
              <span className={`text-lg font-semibold ${changeColor}`}>
                {isPositiveChange ? '+' : ''}{change24h.toFixed(2)}%
              </span>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-card-foreground underline underline-offset-4">
                {probability}%
              </span>
            </div>
          </div>

          {/* Details Box */}
          <div className="bg-muted/50 border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time to Expiration:</span>
              </div>
              <span className="text-sm font-medium">{timeToExpiration}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Volume:</span>
              </div>
              <span className="text-sm font-medium">{volume.toLocaleString()}</span>
            </div>

          </div>

          {/* Line Chart */}
          <div className="h-32 border border-border">
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: isPositiveChange ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)",
                },
              }}
              className="h-full w-full"
            >
              <LineChart data={priceData}>
                <XAxis 
                  dataKey="time" 
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
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] overflow-y-auto sm:max-w-[95vw] lg:max-w-[95vw] xl:max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{marketTitle}</DialogTitle>
        </DialogHeader>
        <ExpandedMarketCard
          marketData={{
            marketTitle,
            timeToExpiration,
            volume,
            probability,
            change24h,
            priceData: priceData.map(point => ({
              timestamp: point.time,
              price: point.price,
              spread: Math.random() * 0.01 + 0.001,
              volume: Math.floor(Math.random() * 1000000 + 10000)
            }))
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default MarketCard
