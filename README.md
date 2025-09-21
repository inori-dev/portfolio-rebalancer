# 資産配分・リバランス計算アプリ / Portfolio Management & Rebalancing App

## 📊 概要 - Overview

**日本語**
- 資産配分の可視化とリバランス計算を行うWebアプリケーションです。
- 現在の投資状況と目標配分を比較し、最適なポートフォリオ管理をサポートします。

**English**
- A web application for visualizing asset allocation and calculating portfolio rebalancing.
- Compares current investment status with target allocation to support optimal portfolio management.

![資産配分・リバランス計算アプリ](image/1.png)
![資産配分・リバランス計算アプリ](image/2.png)
![資産配分・リバランス計算アプリ](image/3.png)
![資産配分・リバランス計算アプリ](image/4.png)

## ✨ 主な機能 - Key Features

**日本語**
- **📈 資産配分の可視化**: 現在の保有資産を円グラフで表示
- **🎯 目標配分との比較**: 理想的な配分との差分をバーチャートで可視化
- **💰 リバランス計算**: 目標配分に合わせるために必要な増減額を自動計算
- **🔮 将来予測**: 月次積立額と期待リターンを基にした資産推移シミュレーション
- **📁 データ管理**: JSON形式でのインポート/エクスポート機能
- **💾 自動保存**: ブラウザのlocalStorageによる自動データ保存

**English**
- **📈 Asset Allocation Visualization**: Display current holdings in pie charts
- **🎯 Target Allocation Comparison**: Visualize differences from ideal allocation with bar charts
- **💰 Rebalancing Calculation**: Automatically calculate required adjustments to meet target allocation
- **🔮 Future Projection**: Simulate asset growth based on monthly contributions and expected returns
- **📁 Data Management**: Import/export functionality in JSON format
- **💾 Auto-save**: Automatic data saving using browser localStorage

## 🛠️ 技術スタック - Tech Stack

### フロントエンド - Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: React 18 + Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useMemo)

### バックエンド - Backend
- **API**: Python FastAPI
- **CORS**: Cross-Origin Resource Sharing対応 / Cross-Origin Resource Sharing support
- **計算エンジン / Calculation Engine**: 複利計算とポートフォリオ最適化 / Compound interest calculation and portfolio optimization

### データ管理 - Data Management
- **Storage**: Browser localStorage
- **Format**: JSON (インポート/エクスポート対応 / Import/export support)
- **Validation**: フロントエンドでの入力値検証 / Frontend input validation

## 🚀 セットアップ - Setup

### 前提条件 - Prerequisites
- Node.js 18.0 以上 / or higher
- Python 3.8 以上 / or higher
- npm または yarn / or yarn

### フロントエンド - Frontend
```bash
# リポジトリをクローン / Clone the repository
git clone https://github.com/your-username/portfolio-rebalancer.git
cd portfolio-rebalancer

# 依存関係をインストール / Install dependencies
npm install

# 開発サーバーを起動 / Start development server
npm run dev
```

### バックエンド（計算API）- Backend (Calculation API)
```bash
# Pythonの仮想環境を作成 / Create Python virtual environment
python -m venv venv

# 仮想環境を有効化 / Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 依存関係をインストール / Install dependencies
pip install fastapi uvicorn numpy pandas

# APIサーバーを起動 / Start API server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📱 使い方 - How to Use

### 1. 資産入力 - Asset Input

**日本語**
現在の保有資産を各カテゴリ別に入力します：

**English**
Enter your current holdings by asset category:

- 現金・預金 / Cash & Deposits
- 米ドル現金 / USD Cash
- 全世界株式 / Global Stocks
- 日本高配当ETF / Japanese High-Dividend ETF
- 米国高配当ETF / US High-Dividend ETF
- ゴールド / Gold

### 2. 目標配分設定 - Target Allocation Setup

**日本語**
理想的なポートフォリオの配分比率を設定します：

**English**
Set the ideal portfolio allocation ratios:

- 全世界株式 / Global Stocks: 40%
- 日本高配当ETF / Japanese High-Dividend ETF: 20%
- 米国高配当ETF / US High-Dividend ETF: 20%
- ゴールド / Gold: 10%
- 現金・預金 / Cash & Deposits: 10%

### 3. 分析結果確認 - Analysis Results

**日本語**
- **現在配分vs目標配分**: 円グラフで視覚的に比較
- **リバランス分析**: 必要な調整額をバーチャートで表示
- **詳細表**: 各資産クラスの詳細な数値を表形式で確認

**English**
- **Current vs Target Allocation**: Visual comparison with pie charts
- **Rebalancing Analysis**: Display required adjustments with bar charts
- **Detail Table**: View detailed numbers for each asset class in table format

### 4. 将来予測（オプション）- Future Projection (Optional)

**日本語**
- 月次積立額を設定
- 各資産の期待リターンを設定
- 予測期間を指定して将来の資産推移をシミュレーション

**English**
- Set monthly contribution amount
- Configure expected returns for each asset
- Specify projection period to simulate future asset growth

## 📊 スクリーンショット - Screenshots

### 資産入力画面 - Asset Input Screen
**日本語**: 現在の保有資産を簡単に入力できるインターフェース
**English**: User-friendly interface for entering current asset holdings

### 設定画面 - Configuration Screen
**日本語**: 目標配分率、月次積立額、年率期待リターン率を設定
**English**: Configure target allocation ratios, monthly contributions, and expected annual returns

### 分析結果画面 - Analysis Results Screen
**日本語**: 現在配分と目標配分を視覚的に比較
**English**: Visual comparison of current allocation vs target allocation

### 将来予測画面 - Future Projection Screen
**日本語**: 積立投資による資産の成長をシミュレーション
**English**: Simulate asset growth through systematic investment

## 🎯 目標配分（デフォルト）- Target Allocation (Default)

| 資産クラス / Asset Class | 目標配分 / Target | 説明 / Description |
|--------------------------|-------------------|-------------------|
| 全世界株式 / Global Stocks | 40% | 分散投資によるリスク軽減 / Risk reduction through diversification |
| 日本高配当ETF / Japanese High-Dividend ETF | 20% | 国内市場への投資 / Domestic market investment |
| 米国高配当ETF / US High-Dividend ETF | 20% | 米国市場への投資 / US market investment |
| ゴールド / Gold | 10% | インフレヘッジ / Inflation hedge |
| 現金・預金 / Cash & Deposits | 10% | 流動性確保 / Liquidity preservation |

## 🔧 カスタマイズ - Customization

### 目標配分の変更 - Changing Target Allocation
**日本語**: `targetAllocation` オブジェクトを編集することで、独自の目標配分を設定できます。
**English**: Edit the `targetAllocation` object to set your own custom target allocation.

### 新しい資産クラスの追加 - Adding New Asset Classes
**日本語**:
1. 入力フォームにフィールドを追加
2. 計算ロジックに新しい資産を組み込み
3. グラフ表示に新しいカテゴリを追加

**English**:
1. Add fields to the input form
2. Integrate new assets into calculation logic
3. Add new categories to graph displays

## 📈 計算ロジック - Calculation Logic

### リバランス計算 - Rebalancing Calculation
```
目標金額 / Target Amount = 総資産 / Total Assets × 目標配分比率 / Target Allocation Ratio
増減額 / Adjustment Amount = 目標金額 / Target Amount - 現在金額 / Current Amount
```

### 複利計算 - Compound Interest Calculation
```
将来価値 / Future Value = 現在価値 / Present Value × (1 + 年率リターン / Annual Return)^年数 / Years + 積立額の将来価値 / Future Value of Contributions
```

## 🤝 コントリビューション - Contributing

**日本語**:
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

**English**:
1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 🙏 謝辞 - Acknowledgments
- [Next.js](https://nextjs.org/) - React フレームワーク / React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク / CSS Framework
- [Recharts](https://recharts.org/) - データ可視化ライブラリ / Data Visualization Library
- [FastAPI](https://fastapi.tiangolo.com/) - Python Webフレームワーク / Python Web Framework

---
