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
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
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
    <div className="h-full w-full flex flex-col  mx-auto my-auto  ">
      <h2 className="py-2 px-8 text-xl font-semibold text-black">
        Doanh thu 2024
      </h2>
      <div className="grow   relative   w-full my-auto  shadow-md ">
        <canvas ref={chartRef} id="myChart" className=" w-full pt-2"></canvas>
      </div>
    </div>
  );
}

export default LineChart;
