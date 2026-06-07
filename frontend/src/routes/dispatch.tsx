import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/dispatch")({
  component: DispatchPage,
});

function DispatchPage() {
  const [dispatches, setDispatches] = useState<any[]>([]);

  useEffect(() => {
    loadDispatches();
  }, []);

  const loadDispatches = async () => {
    try {
      const data = await api.listDispatch();
      setDispatches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    try {
      await api.updateDispatchStatus(
        String(id),
        status
      );

      loadDispatches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dispatch Monitoring
        </h1>

        <p className="text-muted-foreground mt-2">
          Track all active emergency deployments.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Dispatches"
          value={dispatches.length}
        />

        <StatCard
          title="Assigned"
          value={
            dispatches.filter(
              (d) => d.status === "assigned"
            ).length
          }
        />

        <StatCard
          title="En Route"
          value={
            dispatches.filter(
              (d) => d.status === "en_route"
            ).length
          }
        />

        <StatCard
          title="Completed"
          value={
            dispatches.filter(
              (d) => d.status === "completed"
            ).length
          }
        />

      </div>

      {/* Dispatch Cards */}

      <div className="grid md:grid-cols-2 gap-6">

        {dispatches.map((dispatch) => (
          <div
            key={dispatch.id}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >

            <div className="flex justify-between mb-4">

              <div>
                <h3 className="text-xl font-bold">
                  Dispatch #{dispatch.id}
                </h3>

                <p className="text-muted-foreground">
                  Incident #{dispatch.incident_id}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  dispatch.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : dispatch.status === "en_route"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {dispatch.status}
              </span>

            </div>

            {/* Timeline */}

            <div className="space-y-2 mb-6">

              <TimelineStep
                done={true}
                label="Assigned"
              />

              <TimelineStep
                done={
                  dispatch.status === "en_route" ||
                  dispatch.status === "arrived" ||
                  dispatch.status === "completed"
                }
                label="En Route"
              />

              <TimelineStep
                done={
                  dispatch.status === "arrived" ||
                  dispatch.status === "completed"
                }
                label="Arrived"
              />

              <TimelineStep
                done={
                  dispatch.status === "completed"
                }
                label="Completed"
              />

            </div>

            <select
              value={dispatch.status}
              onChange={(e) =>
                updateStatus(
                  dispatch.id,
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="assigned">
                Assigned
              </option>

              <option value="en_route">
                En Route
              </option>

              <option value="arrived">
                Arrived
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

          </div>
        ))}

      </div>

    </div>
  );
}

function TimelineStep({
  done,
  label,
}: {
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-4 w-4 rounded-full ${
          done
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
      />

      <span>{label}</span>
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