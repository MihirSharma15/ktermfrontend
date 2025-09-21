import { PriceDataPoint, TimeFilter, TimeFilterOption } from './types'

const timeFilterOptions: TimeFilterOption[] = [
  { value: '1h', label: '1H', hours: 1 },
  { value: '24h', label: '24H', hours: 24 },
  { value: '7d', label: '7D', hours: 168 },
  { value: '30d', label: '30D', hours: 720 },
  { value: '90d', label: '90D', hours: 2160 },
  { value: '1y', label: '1Y', hours: 8760 },
]

export const filterDataByTime = (
  data: PriceDataPoint[],
  timeFilter: TimeFilter
): PriceDataPoint[] => {
  const filterOption = timeFilterOptions.find(option => option.value === timeFilter)
  if (!filterOption) return data

  const now = new Date()
  const cutoffTime = new Date(now.getTime() - (filterOption.hours * 60 * 60 * 1000))

  return data.filter(point => {
    const pointTime = new Date(point.timestamp)
    return pointTime >= cutoffTime
  })
}

export const generateSampleData = (
  basePrice: number,
  timeFilter: TimeFilter,
  includeSpread: boolean = true,
  includeVolume: boolean = true
): PriceDataPoint[] => {
  const filterOption = timeFilterOptions.find(option => option.value === timeFilter)
  if (!filterOption) return []

  const data: PriceDataPoint[] = []
  const now = new Date()
  const startTime = new Date(now.getTime() - (filterOption.hours * 60 * 60 * 1000))
  
  // Generate data points every hour for longer periods, every 5 minutes for shorter ones
  const intervalMinutes = filterOption.hours <= 24 ? 5 : 60
  const totalPoints = Math.floor((filterOption.hours * 60) / intervalMinutes)
  
  let currentPrice = basePrice
  
  for (let i = 0; i < totalPoints; i++) {
    const timestamp = new Date(startTime.getTime() + (i * intervalMinutes * 60 * 1000))
    
    // Generate realistic price movement
    const randomChange = (Math.random() - 0.5) * 0.02 // ±1% change
    currentPrice += randomChange
    currentPrice = Math.max(0.001, Math.min(0.999, currentPrice)) // Keep within bounds
    
    const dataPoint: PriceDataPoint = {
      timestamp: timestamp.toISOString(),
      price: Number(currentPrice.toFixed(4))
    }
    
    if (includeSpread) {
      dataPoint.spread = Number((Math.random() * 0.01 + 0.001).toFixed(4)) // 0.1% to 1.1% spread
    }
    
    if (includeVolume) {
      dataPoint.volume = Math.floor(Math.random() * 1000000 + 10000) // 10k to 1M volume
    }
    
    data.push(dataPoint)
  }
  
  return data
}
