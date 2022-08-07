# Getting Started with exercise

## Setup

### `yarn install`  
執行安裝套件

### `yarn start`

[http://localhost:3000](http://localhost:3000)

開發模式，每次編輯儲存後會重整畫面。

## Project Structure
```
/src      專案核心
  /assets       靜態資源（Svg、圖片、樣式、字型等）
  /components   元件
  /mock         模擬資料
  /types        TS 全域型別
  /utils        JS 通用工具庫
  App           進入點
```

## Notice
```
/src/App.tsx

const buckets = Array.from(mockData.values()).slice(420); // 控制顯示資料，0為500筆
```
