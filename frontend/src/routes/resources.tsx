import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
});

function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await api.listResources();
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Resource Management
        </h1>

        <p className="text-muted-foreground mt-2">
          Monitor and manage all emergency resources.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Resources"
          value={resources.length}
        />

        <StatCard
          title="Available"
          value={
            resources.filter(
              (r) => r.status === "available"
            ).length
          }
        />

        <StatCard
          title="Busy"
          value={
            resources.filter(
              (r) => r.status === "busy"
            ).length
          }
        />

        <StatCard
          title="Personnel"
          value={
            resources.reduce(
              (acc, r) =>
                acc + r.personnel_count,
              0
            )
          }
        />

      </div>

      {/* Resource Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {resources.map((resource) => (
          <div
            key={resource.id}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">

              <h3 className="text-xl font-bold">
                {resource.name}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  resource.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {resource.status}
              </span>

            </div>

            <div className="space-y-2">

              <p>
                <strong>Type:</strong>{" "}
                {resource.resource_type}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {resource.location}
              </p>

              <p>
                <strong>Personnel:</strong>{" "}
                {resource.personnel_count}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-sm text-muted-foreground">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}