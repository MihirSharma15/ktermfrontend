export interface PriceDataPoint {
  timestamp: string
  price: number
  volume?: number
  spread?: number
}

export interface MarketData {
  marketTitle: string
  timeToExpiration: string
  volume: number
  probability: number
  change24h: number
  priceData: PriceDataPoint[]
  spreadData?: PriceDataPoint[]
  volumeData?: PriceDataPoint[]
}

export type TimeFilter = '1h' | '24h' | '7d' | '30d' | '90d' | '1y'

export interface TimeFilterOption {
  value: TimeFilter
  label: string
  hours: number
}

export interface ChartConfig {
  price: {
    label: string
    color: string
  }
  spread?: {
    label: string
    color: string
  }
  volume?: {
    label: string
    color: string
  }
}
