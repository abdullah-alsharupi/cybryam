"use client";
import { apifetch } from "@/api";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PropsChartDoctor {
  data: any;
}

const DoctorChart = (props: PropsChartDoctor) => {
  const dats = [
    { name: "shehab alameri", value: 2 },
    { name: "شهاب عبدالحق عبده حسن العامري", value: 1 },
    { name: "Salim alameri", value: 1 },
    { name: "شهاب عبدالحق عبده  العامري", value: 1 },
    { name: "shehab alameri", value: 2 },
    { name: "شهاب عبدالحق عبده حسن العامري", value: 1 },
    { name: "Salim alameri", value: 1 },
    { name: "شهاب عبدالحق عبده  العامري", value: 1 },
    { name: "shehab alameri", value: 2 },
    { name: "شهاب عبدالحق عبده حسن العامري", value: 1 },
  ];

  const data = dats?.filter((item: any) => item.value !== 0);

  const ticks = data?.map((item: { value: any }) => item.value);
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#00BFFF" />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };
  const getTickColor = (index: number) => {
    const colors = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "brown",
      "Violet",
      "gray",
      "olive",
      "dark-cyan",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="h-[440px] w-[100%] relative flex flex-col justify-between">
      <h1 className="text-center text-green-800 text-[20px] font-bold ">
        حصائيات عدد المرضى الأكثر عشرة دكاترة
      </h1>

      <div className="w-[100%] absolute top-0 bottom-0 h-[300px]">
        <ResponsiveContainer className={``}>
          <BarChart
            data={data}
            className="m-5 max-sm:right-0   "
            margin={{ top: 20, bottom: 90 }}
            layout="horizontal"
          >
            <XAxis
              type="category"
              dataKey="name"
              stroke="#ffff"
              interval={0}
              className={``}
              // labelLine={false}

              tick={({ x, y, payload }: { x: any; y: any; payload: any }) => (
                <text
                  className="z-1 text-[12px] absolute top-0 sm:text-[15px]"
                  x={x}
                  y={y+20} // رفع النص 10 بكسل فوق المخطط
                  fill={getTickColor(payload.index)}
                  transform={`rotate(-35, ${x}, ${y})`}
                  textAnchor="start"
                >
                  {payload.value}
                </text>
              )}
            />

            <YAxis
              stroke="#ffff"
              type="number"
              className="hidden"
              tick={{ fill: "black" }}
              domain={[0, data[0].value + 1]}
              ticks={ticks}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Tooltip />
            <defs>
              <linearGradient
                id="colorGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00BFFF" stopOpacity={1} />
                <stop offset="100%" stopColor="#00CED1" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Bar dataKey="value" barSize={30}  fill="url(#colorGradient)">
              <LabelList
                dataKey="value"
                position="top"
                content={renderCustomizedLabel}
                offset={-2}
                fill="dark-red"
                style={{ textAnchor: "middle" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoctorChart;
