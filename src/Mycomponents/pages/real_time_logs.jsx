import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Visualizations = () => {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pieResponse = await axios.get("http://localhost:5003/pie_chart");
        const barResponse = await axios.get("http://localhost:5003/bar_chart");

        // Assign random colors to each data point
        const pieDataWithColors = pieResponse.data.pie_data.map((entry) => ({
          ...entry,
          color: getRandomColor(),
        }));
        const barDataWithColors = barResponse.data.bar_chart.map((entry) => ({
          ...entry,
          color: getRandomColor(),
        }));

        setPieData(pieDataWithColors);
        setBarData(barDataWithColors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const xOffset = [50, -80, -20, 15,80]; 
  const yOffset = [-60, -20, 85, 80,35];
  return (
    <div className="graphs">
      <div className="pie">
        <div className="representation">
          <h2>Fraud Distribution By Category</h2>
          <PieChart width={900} height={300}>
            <Pie
              data={pieData}
              dataKey="FraudCount"
              nameKey="Category"
              cx="60%"
              cy="40%"
              outerRadius={120}
              fill="#0e4032"
              
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x =
                  cx + radius * Math.cos(-midAngle * RADIAN) + xOffset[index];
                const y =
                  cy + radius * Math.sin(-midAngle * RADIAN) + yOffset[index];

                return (
                  <text
                    x={x}
                    y={y}
                    fill={pieData[index].color}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {pieData[index].Category}
                  </text>
                );
              }}
              labelLine={{ length: 14, stroke: "black" }}
            >
              {pieData.map((entry) => (
                <div
                  key={entry.Category}
                  style={{ backgroundColor: entry.color }}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <div className="bar">
        <div className="representation2">
          <h2>Age Distribution Of Fraudulent Transactions</h2>

          <BarChart
            width={700}
            height={300}
            data={barData}
            margin={{ bottom: 50, left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="AgeRange"
              label={{ value: "Age", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              label={{ value: "Fraud", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
            <Bar className="custom-bar" fill="#5ac493" dataKey="FraudCount">
              {barData.map((entry) => (
                <div
                  key={entry.AgeRange}
                  style={{ backgroundColor: entry.color }}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;