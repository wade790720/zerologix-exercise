import { useState } from "react";
import style from "./App.module.scss";
import Toolbar from "components/Toolbar";
import StockChart from "components/StockChart";
import mockData from "mock/buckets.json";
import { ReactComponent as ZoomIn } from "assets/zoom-In.svg";
import { ReactComponent as ZoomOut } from "assets/zoom-out.svg";
import { Plus, Minus } from "tabler-icons-react"

function App() {
  const [scale, setScale] = useState(1)
  const [buckets, setBuckets] = useState(Array.from(mockData.values()).slice(420)) // 設0為500筆資料
  const scaleMultiplier = 0.8;

  const handleZoomIn = () => {
    setScale(scale / scaleMultiplier)
  };

  const handleZoomOut = () => {
    setScale(scale * scaleMultiplier)
  };

  const handleAddData = () => {
    if (mockData.length - buckets.length - 20 < 0) return
    setBuckets(Array.from(mockData.values()).slice(mockData.length - buckets.length - 20))
  }

  const handleDeleteData = () => {
    if(mockData.length - buckets.length + 20 >= mockData.length) return
    setBuckets(Array.from(mockData.values()).slice(mockData.length - buckets.length + 20))
  }

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <Toolbar>
          <Toolbar.Item onClick={handleZoomIn}>
            <ZoomIn />
          </Toolbar.Item>
          <Toolbar.Item onClick={handleZoomOut}>
            <ZoomOut />
          </Toolbar.Item>
          <Toolbar.Item onClick={handleAddData}>
            <Plus />
          </Toolbar.Item>
          <Toolbar.Item onClick={handleDeleteData}>
            <Minus />
          </Toolbar.Item>
        </Toolbar>
        <div className={style.chart}>
          <div className={style.symbol}>MSFT．NASDAQ</div>
          <StockChart
            width={700}
            height={350}
            buckets={buckets}
            options={{
              scale,
              gridColor: "#131722",
              bullColor: "#3D92FA",
              bearColor: "#FB6C64",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
