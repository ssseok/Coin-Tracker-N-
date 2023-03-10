import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { ConinHistory } from "../api/api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const coinId = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => ConinHistory(`${coinId}`),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ReactApexChart
            // type="candlestick"
            type="line"
            series={[
              // {
              //   name: "Price",
              //   data: data?.map((price) => [
              //     new Date(price.time_open).getTime(),
              //     price.open,
              //     price.high,
              //     price.low,
              //     price.close,
              //   ]) as any,
              // },
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#ff0000", // 상승 시 색상
                    downward: "#3C90EB", // 하락 시 색상
                  },
                },
              },
              title: {
                text: `${coinId} Chart`,
                align: "left",
              },
              chart: {
                type: "candlestick",
                height: 500,
                width: 500,
                // toolbar: {
                //   show: false,
                // },
                background: "transparent",
              },
              // grid: { show: false },
              // stroke: {
              //   curve: "smooth",
              //   width: 3,
              // },
              xaxis: {
                // labels: { show: false },
                // axisBorder: { show: false },
                // axisTicks: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },

              // yaxis: { show: false },
              // fill: {
              //   type: "gradient",
              //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              // },
              // colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(0)}`,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
