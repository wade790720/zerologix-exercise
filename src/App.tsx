import { useRef } from "react";
import style from "./App.module.scss";
import Toolbar from "components/Toolbar";
import StockChart, { StockChartContext } from "components/StockChart";
import data from "mock/buckets.json";
import { ReactComponent as ZoomIn } from "assets/zoom-In.svg";
import { ReactComponent as ZoomOut } from "assets/zoom-out.svg";
import { Plus, Minus } from "tabler-icons-react"

function App() {
  const ref = useRef<StockChartContext>(null)

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <Toolbar>
          <Toolbar.Item onClick={() => ref.current?.zoomIn()}>
            <ZoomIn />
          </Toolbar.Item>
          <Toolbar.Item onClick={() => ref.current?.zoomOut()}>
            <ZoomOut />
          </Toolbar.Item>
          <Toolbar.Item onClick={() => ref.current?.plus()}>
            <Plus />
          </Toolbar.Item>
          <Toolbar.Item onClick={() => ref.current?.minus()}>
            <Minus />
          </Toolbar.Item>
        </Toolbar>
        <div className={style.chart}>
          <div className={style.symbol}>MSFT．NASDAQ</div>
          <StockChart
            ref={ref}
            width={700}
            height={350}
            data={data}
            options={{
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
