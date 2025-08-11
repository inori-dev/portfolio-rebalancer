"use client"

import { useState, useEffect, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, Legend } from 'recharts'
import { Download, Upload, RotateCcw, TrendingUp, Target, Wallet, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssetData {
  totalCashJPY: number
  totalCashUSD: number
  globalIndex: number
  jpHighDivETF: number
  usHighDivETF: number
  gold: number
}

interface TargetAllocation {
  globalIndex: number
  jpHighDivETF: number
  usHighDivETF: number
  gold: number
  cash: number
}

interface MonthlyInvestment {
  totalCashUSD: number
  globalIndex: number
  jpHighDivETF: number
  usHighDivETF: number
  gold: number
  cash: number
}

interface ExpectedReturns {
  totalCashUSD: number
  globalIndex: number
  jpHighDivETF: number
  usHighDivETF: number
  gold: number
  cash: number
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

const DEFAULT_TARGETS: TargetAllocation = {
  globalIndex: 40,
  jpHighDivETF: 20,
  usHighDivETF: 20,
  gold: 10,
  cash: 10
}

const ASSET_NAMES = {
  totalCashUSD: '米ドル現金',
  globalIndex: '全世界株式',
  jpHighDivETF: '日本高配当ETF',
  usHighDivETF: '米国高配当ETF',
  gold: 'ゴールド',
  cash: '現金・預金'
}

export default function PortfolioManager() {
  const [assets, setAssets] = useState<AssetData>({
    totalCashJPY: '',
    totalCashUSD: '',
    globalIndex: '',
    jpHighDivETF: '',
    usHighDivETF: '',
    gold: ''
  })

  const [targets, setTargets] = useState<TargetAllocation>(DEFAULT_TARGETS)
  const [monthlyInvestment, setMonthlyInvestment] = useState<MonthlyInvestment>({
    totalCashUSD: '',
    globalIndex: '',
    jpHighDivETF: '',
    usHighDivETF: '',
    gold: '',
    cash: ''
  })

  const [expectedReturns, setExpectedReturns] = useState<ExpectedReturns>({
    totalCashUSD: '',
    globalIndex: '',
    jpHighDivETF: '',
    usHighDivETF: '',
    gold: '',
    cash: ''
  })

  const [predictionMonths, setPredictionMonths] = useState(60)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('portfolio-data')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setAssets(data.assets || assets)
        setTargets(data.targets || targets)
        setMonthlyInvestment(data.monthlyInvestment || monthlyInvestment)
        setExpectedReturns(data.expectedReturns || expectedReturns)
        setPredictionMonths(data.predictionMonths || predictionMonths)
      } catch (error) {
        console.error('Failed to load stored data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    const data = {
      assets,
      targets,
      monthlyInvestment,
      expectedReturns,
      predictionMonths
    }
    localStorage.setItem('portfolio-data', JSON.stringify(data))
  }, [assets, targets, monthlyInvestment, expectedReturns, predictionMonths])

  const totalAssets = useMemo(() => {
    return (parseFloat(assets.totalCashJPY) || 0) + (parseFloat(assets.totalCashUSD) || 0) + (parseFloat(assets.globalIndex) || 0) + (parseFloat(assets.jpHighDivETF) || 0) + (parseFloat(assets.usHighDivETF) || 0) + (parseFloat(assets.gold) || 0)
  }, [assets])

  const currentAllocation = useMemo(() => {
    if (totalAssets === 0) return []
    
    return [
      { name: ASSET_NAMES.globalIndex, value: parseFloat(assets.globalIndex) || 0, percentage: ((parseFloat(assets.globalIndex) || 0) / totalAssets) * 100, target: targets.globalIndex },
      { name: ASSET_NAMES.jpHighDivETF, value: parseFloat(assets.jpHighDivETF) || 0, percentage: ((parseFloat(assets.jpHighDivETF) || 0) / totalAssets) * 100, target: targets.jpHighDivETF },
      { name: ASSET_NAMES.usHighDivETF, value: parseFloat(assets.usHighDivETF) || 0, percentage: ((parseFloat(assets.usHighDivETF) || 0) / totalAssets) * 100, target: targets.usHighDivETF },
      { name: ASSET_NAMES.gold, value: parseFloat(assets.gold) || 0, percentage: ((parseFloat(assets.gold) || 0) / totalAssets) * 100, target: targets.gold },
      { name: ASSET_NAMES.totalCashUSD, value: parseFloat(assets.totalCashUSD) || 0, percentage: ((parseFloat(assets.totalCashUSD) || 0) / totalAssets) * 100, target: targets.cash / 2 },
      { name: ASSET_NAMES.cash, value: parseFloat(assets.totalCashJPY) || 0, percentage: ((parseFloat(assets.totalCashJPY) || 0) / totalAssets) * 100, target: targets.cash / 2 }
    ]
  }, [assets, totalAssets, targets])

  const rebalanceAnalysis = useMemo(() => {
    if (totalAssets === 0) return []

    return [
      {
        name: ASSET_NAMES.globalIndex,
        current: parseFloat(assets.globalIndex) || 0,
        target: (totalAssets * targets.globalIndex) / 100,
        difference: (parseFloat(assets.globalIndex) || 0) - (totalAssets * targets.globalIndex) / 100
      },
      {
        name: ASSET_NAMES.jpHighDivETF,
        current: parseFloat(assets.jpHighDivETF) || 0,
        target: (totalAssets * targets.jpHighDivETF) / 100,
        difference: (parseFloat(assets.jpHighDivETF) || 0) - (totalAssets * targets.jpHighDivETF) / 100
      },
      {
        name: ASSET_NAMES.usHighDivETF,
        current: parseFloat(assets.usHighDivETF) || 0,
        target: (totalAssets * targets.usHighDivETF) / 100,
        difference: (parseFloat(assets.usHighDivETF) || 0) - (totalAssets * targets.usHighDivETF) / 100
      },
      {
        name: ASSET_NAMES.gold,
        current: parseFloat(assets.gold) || 0,
        target: (totalAssets * targets.gold) / 100,
        difference: (parseFloat(assets.gold) || 0) - (totalAssets * targets.gold) / 100
      },
      {
        name: ASSET_NAMES.totalCashUSD,
        current: parseFloat(assets.totalCashUSD) || 0,
        target: (totalAssets * targets.cash) / 200,
        difference: (parseFloat(assets.totalCashUSD) || 0) - (totalAssets * targets.cash) / 200
      },
      {
        name: ASSET_NAMES.cash,
        current: parseFloat(assets.totalCashJPY) || 0,
        target: (totalAssets * targets.cash) / 200,
        difference: (parseFloat(assets.totalCashJPY) || 0) - (totalAssets * targets.cash) / 200
      }
    ]
  }, [assets, totalAssets, targets])

  const achievementRate = useMemo(() => {
    if (totalAssets === 0) return 0
    
    const achievedValue = rebalanceAnalysis.reduce((sum, item) => {
      return sum + Math.min(item.current, item.target)
    }, 0)
    
    return (achievedValue / totalAssets) * 100
  }, [rebalanceAnalysis, totalAssets])

  const futureProjection = useMemo(() => {
    if (totalAssets === 0 || predictionMonths === 0) return []
    
    const projections = []
    let currentValues = {
      totalCashUSD: parseFloat(assets.totalCashUSD) || 0,
      globalIndex: parseFloat(assets.globalIndex) || 0,
      jpHighDivETF: parseFloat(assets.jpHighDivETF) || 0,
      usHighDivETF: parseFloat(assets.usHighDivETF) || 0,
      gold: parseFloat(assets.gold) || 0,
      cash: parseFloat(assets.totalCashJPY) || 0
    }
    
    for (let month = 0; month <= predictionMonths; month++) {
      if (month > 0) {
        // Apply monthly returns and investments
        Object.keys(currentValues).forEach(key => {
          const assetKey = key as keyof typeof currentValues
          const monthlyReturn = (parseFloat(expectedReturns[assetKey]) || 0) / 12 / 100
          currentValues[assetKey] = currentValues[assetKey] * (1 + monthlyReturn) + (parseFloat(monthlyInvestment[assetKey]) || 0)
        })
      }
      
      const total = Object.values(currentValues).reduce((sum, val) => sum + val, 0)
      
      projections.push({
        month,
        米ドル現金: Math.round(currentValues.totalCashUSD),
        全世界株式: Math.round(currentValues.globalIndex),
        日本高配当ETF: Math.round(currentValues.jpHighDivETF),
        米国高配当ETF: Math.round(currentValues.usHighDivETF),
        ゴールド: Math.round(currentValues.gold),
        現金預金: Math.round(currentValues.cash),
        合計: Math.round(total)
      })
    }
    
    return projections
  }, [assets, monthlyInvestment, expectedReturns, predictionMonths, totalAssets])

  const handleAssetChange = (field: keyof AssetData, value: string) => {
    setAssets(prev => ({ ...prev, [field]: value }))
  }

  const handleTargetChange = (field: keyof TargetAllocation, value: string) => {
    const numValue = Math.max(0, Math.min(100, parseFloat(value) || 0))
    setTargets(prev => ({ ...prev, [field]: numValue }))
  }

  const handleClearAll = () => {
    setAssets({
      totalCashJPY: '',
      totalCashUSD: '',
      globalIndex: '',
      jpHighDivETF: '',
      usHighDivETF: '',
      gold: ''
    })
  }

  const handleExport = () => {
    const data = {
      assets,
      targets,
      monthlyInvestment,
      expectedReturns,
      predictionMonths,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.assets) setAssets(data.assets)
        if (data.targets) setTargets(data.targets)
        if (data.monthlyInvestment) setMonthlyInvestment(data.monthlyInvestment)
        if (data.expectedReturns) setExpectedReturns(data.expectedReturns)
        if (data.predictionMonths) setPredictionMonths(data.predictionMonths)
      } catch (error) {
        alert('ファイルの読み込みに失敗しました')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const targetTotal = Object.values(targets).reduce((sum, val) => sum + val, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ポートフォリオ管理システム
          </h1>
          <p className="text-muted-foreground">
            資産配分の可視化とリバランス計算
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総資産</CardTitle>
              <Wallet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ¥{totalAssets.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">目標達成率</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {achievementRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">配分設定</CardTitle>
              <Calculator className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {targetTotal.toFixed(0)}%
              </div>
              {targetTotal !== 100 && (
                <p className="text-xs text-red-500">※ 合計は100%にしてください</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="input">資産入力</TabsTrigger>
            <TabsTrigger value="allocation">配分設定</TabsTrigger>
            <TabsTrigger value="analysis">分析結果</TabsTrigger>
            <TabsTrigger value="projection">将来予測</TabsTrigger>
          </TabsList>

          {/* Asset Input Tab */}
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>現在の資産状況</CardTitle>
                    <CardDescription>
                      各資産クラスの現在の保有額を入力してください（円建て）
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleClearAll}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      クリア
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      エクスポート
                    </Button>
                    <label className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          インポート
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleImport}
                      />
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalCashJPY">現金・預金</Label>
                    <Input
                      id="totalCashJPY"
                      type="number"
                      min="0"
                      value={assets.totalCashJPY}
                      onChange={(e) => handleAssetChange('totalCashJPY', e.target.value)}
                      placeholder="金額を入力"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalCashUSD">米ドル現金</Label>
                    <Input
                      id="totalCashUSD"
                      type="number"
                      min="0"
                      value={assets.totalCashUSD}
                      onChange={(e) => handleAssetChange('totalCashUSD', e.target.value)}
                      placeholder="金額を入力"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="globalIndex">全世界株式</Label>
                    <Input
                      id="globalIndex"
                      type="number"
                      min="0"
                      value={assets.globalIndex}
                      onChange={(e) => handleAssetChange('globalIndex', e.target.value)}
                      placeholder="金額を入力"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jpHighDivETF">日本高配当ETF</Label>
                    <Input
                      id="jpHighDivETF"
                      type="number"
                      min="0"
                      value={assets.jpHighDivETF}
                      onChange={(e) => handleAssetChange('jpHighDivETF', e.target.value)}
                      placeholder="金額を入力"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="usHighDivETF">米国高配当ETF</Label>
                    <Input
                      id="usHighDivETF"
                      type="number"
                      min="0"
                      value={assets.usHighDivETF}
                      onChange={(e) => handleAssetChange('usHighDivETF', e.target.value)}
                      placeholder="金額を入力"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gold">ゴールド</Label>
                    <Input
                      id="gold"
                      type="number"
                      min="0"
                      value={assets.gold}
                      onChange={(e) => handleAssetChange('gold', e.target.value)}
                      placeholder="金額を入力"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">総資産額</span>
                    <span className="text-xl font-bold">
                      ¥{totalAssets.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Target Allocation Tab */}
          <TabsContent value="allocation">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>目標配分設定</CardTitle>
                  <CardDescription>
                    各資産クラスの目標配分比率を設定してください
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-globalIndex">全世界株式 (%)</Label>
                      <Input
                        id="target-globalIndex"
                        type="number"
                        min="0"
                        max="100"
                        value={targets.globalIndex}
                        onChange={(e) => handleTargetChange('globalIndex', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target-jpHighDivETF">日本高配当ETF (%)</Label>
                      <Input
                        id="target-jpHighDivETF"
                        type="number"
                        min="0"
                        max="100"
                        value={targets.jpHighDivETF}
                        onChange={(e) => handleTargetChange('jpHighDivETF', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target-usHighDivETF">米国高配当ETF (%)</Label>
                      <Input
                        id="target-usHighDivETF"
                        type="number"
                        min="0"
                        max="100"
                        value={targets.usHighDivETF}
                        onChange={(e) => handleTargetChange('usHighDivETF', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target-gold">ゴールド (%)</Label>
                      <Input
                        id="target-gold"
                        type="number"
                        min="0"
                        max="100"
                        value={targets.gold}
                        onChange={(e) => handleTargetChange('gold', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target-cash">現金・預金 (%)</Label>
                      <Input
                        id="target-cash"
                        type="number"
                        min="0"
                        max="100"
                        value={targets.cash}
                        onChange={(e) => handleTargetChange('cash', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">合計</span>
                    <Badge variant={targetTotal === 100 ? "default" : "destructive"}>
                      {targetTotal.toFixed(1)}%
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setTargets(DEFAULT_TARGETS)}
                    className="w-full"
                  >
                    デフォルト設定に戻す
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>将来予測設定</CardTitle>
                  <CardDescription>
                    月次積立額と期待リターンを設定してください
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">月次積立額 (円)</Label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(ASSET_NAMES).map(([key, name]) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={`monthly-${key}`} className="text-xs">{name}</Label>
                          <Input
                            id={`monthly-${key}`}
                            type="number"
                            min="0"
                            value={monthlyInvestment[key as keyof MonthlyInvestment]}
                            onChange={(e) => setMonthlyInvestment(prev => ({ 
                              ...prev, 
                              [key]: e.target.value
                            }))}
                            className="h-8"
                            placeholder="金額"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">年率期待リターン (%)</Label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(ASSET_NAMES).map(([key, name]) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={`return-${key}`} className="text-xs">{name}</Label>
                          <Input
                            id={`return-${key}`}
                            type="number"
                            step="0.1"
                            value={expectedReturns[key as keyof ExpectedReturns]}
                            onChange={(e) => setExpectedReturns(prev => ({ 
                              ...prev, 
                              [key]: e.target.value
                            }))}
                            className="h-8"
                            placeholder="利率%"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="predictionMonths">予測期間 (月)</Label>
                    <Input
                      id="predictionMonths"
                      type="number"
                      min="1"
                      max="360"
                      value={predictionMonths}
                      onChange={(e) => setPredictionMonths(Math.max(1, Math.min(360, parseInt(e.target.value) || 60)))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current vs Target Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>現在の配分 vs 目標配分</CardTitle>
                  <CardDescription>
                    円グラフで現在の配分と目標配分を比較
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {totalAssets > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={currentAllocation}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="percentage"
                          label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                        >
                          {currentAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any, name) => [`${value.toFixed(1)}%`, '現在配分']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-300 flex items-center justify-center text-muted-foreground">
                      資産データを入力してください
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rebalancing Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>リバランス分析</CardTitle>
                  <CardDescription>
                    目標配分に合わせるための増減額
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {totalAssets > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={rebalanceAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          height={80}
                          fontSize={10}
                        />
                        <YAxis 
                          tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                          width={80}
                        />
                        <Tooltip 
                          formatter={(value: any, name) => [
                            `¥${value.toLocaleString()}`, 
                            name === 'difference' ? '増減額' : name
                          ]}
                        />
                        <Bar dataKey="difference" fill="#8884d8">
                          {rebalanceAnalysis.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.difference >= 0 ? '#10B981' : '#EF4444'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-300 flex items-center justify-center text-muted-foreground">
                      資産データを入力してください
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rebalancing Table */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>詳細リバランス表</CardTitle>
                </CardHeader>
                <CardContent>
                  {totalAssets > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">資産クラス</th>
                            <th className="text-right p-2">現在額</th>
                            <th className="text-right p-2">現在比率</th>
                            <th className="text-right p-2">目標額</th>
                            <th className="text-right p-2">目標比率</th>
                            <th className="text-right p-2">増減額</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rebalanceAnalysis.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{item.name}</td>
                              <td className="text-right p-2">¥{item.current.toLocaleString()}</td>
                              <td className="text-right p-2">
                                {((item.current / totalAssets) * 100).toFixed(1)}%
                              </td>
                              <td className="text-right p-2">¥{item.target.toLocaleString()}</td>
                              <td className="text-right p-2">
                                {index === 0 ? targets.globalIndex :
                                 index === 1 ? targets.jpHighDivETF :
                                 index === 2 ? targets.usHighDivETF :
                                 index === 3 ? targets.gold :
                                 index === 4 ? targets.cash / 2 :
                                 index === 5 ? targets.cash / 2 : 0}%
                              </td>
                              <td className={cn(
                                "text-right p-2 font-medium",
                                item.difference >= 0 ? "text-green-600" : "text-red-600"
                              )}>
                                {item.difference >= 0 ? '+' : ''}¥{item.difference.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="h-32 flex items-center justify-center text-muted-foreground">
                      資産データを入力してください
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Future Projection Tab */}
          <TabsContent value="projection">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      将来の資産推移予測
                    </CardTitle>
                    <CardDescription>
                      月次積立と期待リターンに基づく{predictionMonths}ヶ月間の予測
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {Math.round(predictionMonths / 12)}年{predictionMonths % 12}ヶ月
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {futureProjection.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={futureProjection} margin={{ top: 20, right: 30, left: 60, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        label={{ value: '月数', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        label={{ value: '資産額 (円)', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
                        width={80}
                      />
                      <Tooltip 
                        labelFormatter={(label) => `${label}ヶ月後`}
                        formatter={(value: any, name) => [`¥${value.toLocaleString()}`, name]}
                      />
                      <Legend />
                      
                      <Line type="monotone" dataKey="米ドル現金" stroke="#9333EA" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="全世界株式" stroke={COLORS[0]} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="日本高配当ETF" stroke={COLORS[1]} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="米国高配当ETF" stroke={COLORS[2]} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="ゴールド" stroke={COLORS[3]} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="現金預金" stroke={COLORS[4]} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="合計" stroke="#000000" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-400 flex items-center justify-center text-muted-foreground">
                    資産データと予測設定を入力してください
                  </div>
                )}
                
                {futureProjection.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">開始時総資産</div>
                      <div className="font-bold">
                        ¥{futureProjection[0]?.合計.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">{predictionMonths}ヶ月後総資産</div>
                      <div className="font-bold text-green-600">
                        ¥{futureProjection[futureProjection.length - 1]?.合計.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg md:col-span-1 col-span-2">
                      <div className="text-xs text-muted-foreground">予想増加額</div>
                      <div className="font-bold text-blue-600">
                        ¥{(
                          (futureProjection[futureProjection.length - 1]?.合計 || 0) - 
                          (futureProjection[0]?.合計 || 0)
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}