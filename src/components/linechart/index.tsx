"use client";
import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

function LineChart({ data }: { data: any }): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartConfig: ChartConfiguration = {
      type: "line",
      data: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        datasets: [
          {
            data: data.total,
            label: "Doanh thu",
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false,
            tension: 0.2,
            cubicInterpolationMode: "monotone",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          y: {
            display: false,
          },
        },
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, chartConfig);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="h-full w-full flex mx-auto my-auto ">
      <div className="h-full relative rounded-xl w-full my-auto shadow-md ">
        <canvas ref={chartRef} id="myChart" className=" w-full pt-2"></canvas>
      </div>
    </div>
  );
}

export default LineChart;
