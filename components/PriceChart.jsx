"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function PriceChart({ productId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(),
        price: parseFloat(item.price),
      }));

      setData(chartData);
      setLoading(false);
    }

    loadData();
  }, [productId]);

  if (loading) {
    return (
      // Changed text color to purple-500
      <div className="flex items-center justify-center py-8 text-purple-500 w-full">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 w-full">
        No price history yet. Check back after the first daily update!
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Updated heading to text-purple-900 */}
      <h4 className="text-sm font-semibold mb-4 text-purple-900">
        Price History
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          {/* Light purple grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
          {/* Purple tinted axis labels */}
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#7e22ce' }} stroke="#d8b4fe" />
          <YAxis tick={{ fontSize: 12, fill: '#7e22ce' }} stroke="#d8b4fe" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #c084fc", // Purple-400 border
              borderRadius: "6px",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#9333ea" // Primary Purple (Purple-600)
            strokeWidth={2}
            dot={{ fill: "#9333ea", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}