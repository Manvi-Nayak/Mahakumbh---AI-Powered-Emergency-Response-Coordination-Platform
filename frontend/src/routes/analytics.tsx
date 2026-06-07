import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "@/lib/api";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

const COLORS = [
  "#16a34a",
  "#f97316",
  "#2563eb",
  "#dc2626",
];

function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  const loadData = async () => {
    try {
      const response = await api.live();
      setData(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="p-8">
        Loading Analytics...
      </div>
    );
  }

  const incidentData = [
    {
      name: "Active",
      value: data.stats.active_incidents,
    },
    {
      name: "Resolved",
      value: data.stats.resolved_incidents,
    },
  ];

  const resourceData = [
    {
      name: "Available",
      value: data.stats.available_resources,
    },
    {
      name: "Busy",
      value: data.stats.busy_resources,
    },
  ];

  const dispatchData = [
    {
      name: "Dispatches",
      value: data.stats.active_dispatches,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/20 p-8">

      <h1 className="font-display text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">
            Total Incidents
          </h2>

          <p className="text-4xl font-bold text-orange-500">
            {data.stats.total_incidents}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">
            Available Resources
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {data.stats.available_resources}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">
            Active Dispatches
          </h2>

          <p className="text-4xl font-bold text-blue-500">
            {data.stats.active_dispatches}
          </p>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Incident Status
          </h2>

          <div className="h-80">

            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={incidentData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {incidentData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Resource Status
          </h2>

          <div className="h-80">

            <ResponsiveContainer>
              <BarChart data={resourceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#f97316"
                />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      <div className="mt-6 rounded-xl border bg-card p-6">

        <h2 className="text-xl font-semibold mb-4">
          Dispatch Overview
        </h2>

        <div className="h-80">

          <ResponsiveContainer>
            <BarChart data={dispatchData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}