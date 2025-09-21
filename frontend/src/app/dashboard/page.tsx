import MarketCard from "@/components/ui/market-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Generate HECTIC price data with random jumps and spikes
const generateComplexPriceData = (basePrice: number, days: number = 30) => {
  const data = []
  let currentPrice = basePrice
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  for (let i = 0; i < days * 24; i++) { // Hourly data points
    const date = new Date(startDate)
    date.setHours(date.getHours() + i)
    
    // HECTIC price movement simulation
    const timeOfDay = date.getHours()
    const dayOfWeek = date.getDay()
    
    // Market hours volatility - MUCH HIGHER
    const isMarketHours = timeOfDay >= 9 && timeOfDay <= 16
    const marketVolatility = isMarketHours ? 0.08 : 0.03 // Increased volatility
    
    // Weekend effect - but still chaotic
    const weekendEffect = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.6 : 1
    
    // Multiple types of price movements
    const trend = Math.sin(i / (days * 24) * Math.PI * 2) * 0.02 // Stronger cyclical trend
    const randomWalk = (Math.random() - 0.5) * marketVolatility * weekendEffect
    
    // HECTIC SPIKES AND JUMPS
    let spike = 0
    const spikeChance = Math.random()
    
    if (spikeChance > 0.85) { // 15% chance of spike
      spike = (Math.random() - 0.5) * 0.15 // Up to 15% price change
    } else if (spikeChance > 0.75) { // 10% chance of smaller jump
      spike = (Math.random() - 0.5) * 0.08 // Up to 8% price change
    }
    
    // SUDDEN REVERSALS (5% chance)
    const reversalChance = Math.random()
    if (reversalChance > 0.95) {
      spike = -spike * 2 // Reverse direction with double intensity
    }
    
    // FLASH CRASHES/BOOMS (2% chance)
    const flashChance = Math.random()
    if (flashChance > 0.98) {
      spike = Math.random() > 0.5 ? 0.25 : -0.25 // 25% flash move
    }
    
    // VOLATILITY CLUSTERS - periods of extreme movement
    const volatilityCluster = Math.random() > 0.7 ? 3 : 1 // 30% chance of high volatility period
    
    currentPrice += (trend + randomWalk + spike) * volatilityCluster
    
    // Ensure price stays within reasonable bounds but allow more extreme moves
    currentPrice = Math.max(0.005, Math.min(0.995, currentPrice))
    
    data.push({
      time: date.toISOString().slice(0, 16), // YYYY-MM-DDTHH:MM format
      price: Number(currentPrice.toFixed(4))
    })
  }
  
  return data
}

export default function Dashboard() {
  // Generate complex price data for Bitcoin market
  const bitcoinPriceData = generateComplexPriceData(0.68, 14) // 14 days of hourly data
  
  // Generate complex price data for Tesla market
  const teslaPriceData = generateComplexPriceData(0.31, 7) // 7 days of hourly data
  
  // Generate complex price data for Fed rate market
  const fedRatePriceData = generateComplexPriceData(0.89, 21) // 21 days of hourly data

  return (
    <div className="w-full min-h-screen space-y-6 mt-4">
      {/* Header with Filter button, kTerm center, and search */}
      <div className="relative flex items-center justify-between mb-8 max-w-7xl mx-auto px-6">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
        
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-foreground">kTerm</h1>
        
        <div className="w-80">
          <Input 
            type="text" 
            placeholder="Search markets..." 
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        <MarketCard
          marketTitle="Will Bitcoin reach $100K by year end?"
          timeToExpiration="45 days"
          volume={1250000}
          probability={68}
          change24h={12.5}
          priceData={bitcoinPriceData}
        />
        
        <MarketCard
          marketTitle="Tesla Stock Hits $300"
          timeToExpiration="3 days"
          volume={890000}
          probability={31}
          change24h={-5.1}
          priceData={teslaPriceData}
        />
        
        <MarketCard
          marketTitle="Fed Cuts Rates by 0.5%"
          timeToExpiration="12 days"
          volume={2100000}
          probability={89}
          change24h={22.1}
          priceData={fedRatePriceData}
        />
        
        <MarketCard
          marketTitle="Will Apple stock exceed $200 by December 31st?"
          timeToExpiration="28 days"
          volume={1560000}
          probability={42}
          change24h={-3.2}
          priceData={generateComplexPriceData(0.42, 10)}
        />
        
        <MarketCard
          marketTitle="Will the S&P 500 close above 5,500 this month?"
          timeToExpiration="15 days"
          volume={3200000}
          probability={73}
          change24h={8.7}
          priceData={generateComplexPriceData(0.73, 8)}
        />
        
        <MarketCard
          marketTitle="Will unemployment rate drop below 3.5%?"
          timeToExpiration="21 days"
          volume={980000}
          probability={19}
          change24h={-12.3}
          priceData={generateComplexPriceData(0.19, 12)}
        />
        
        <MarketCard
          marketTitle="Will oil prices exceed $90 per barrel?"
          timeToExpiration="7 days"
          volume={2100000}
          probability={56}
          change24h={15.8}
          priceData={generateComplexPriceData(0.56, 6)}
        />
        
        <MarketCard
          marketTitle="Will the housing market crash in 2024?"
          timeToExpiration="35 days"
          volume={750000}
          probability={23}
          change24h={-7.4}
          priceData={generateComplexPriceData(0.23, 18)}
        />
        
        <MarketCard
          marketTitle="Will AI stocks outperform traditional tech this quarter?"
          timeToExpiration="22 days"
          volume={1800000}
          probability={67}
          change24h={9.2}
          priceData={generateComplexPriceData(0.67, 14)}
        />
      </div>
    </div>
  );
}