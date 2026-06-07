import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, WS_URL } from "@/lib/api";

export const Route = createFileRoute("/live-command-center")({
  component: LiveMonitoringPage,
});

function LiveMonitoringPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const data = await api.live();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();

    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setEvents((prev) => [
        {
          type: data.type,
          time: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 9),
      ]);

      loadData();
    };

    return () => socket.close();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Live Monitoring
        </h1>

        <p className="text-muted-foreground mt-2">
          Real-time emergency monitoring and coordination.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Incidents"
          value={dashboard?.stats?.total_incidents || 0}
        />

        <StatCard
          title="Active Incidents"
          value={dashboard?.stats?.active_incidents || 0}
        />

        <StatCard
          title="Available Resources"
          value={dashboard?.stats?.available_resources || 0}
        />

        <StatCard
          title="Active Dispatches"
          value={dashboard?.stats?.active_dispatches || 0}
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Incidents */}

        <div className="rounded-xl border bg-card p-5 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            Active Incidents
          </h2>

          <div className="space-y-3">

            {dashboard?.recent_incidents?.map(
              (incident: any) => (
                <div
                  key={incident.id}
                  className="border rounded-lg p-3"
                >
                  <p className="font-semibold">
                    {incident.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    📍 {incident.location}
                  </p>
                </div>
              )
            )}

          </div>

        </div>

        {/* Dispatches */}

        <div className="rounded-xl border bg-card p-5 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            Active Dispatches
          </h2>

          <div className="space-y-3">

            {dashboard?.recent_dispatches?.map(
              (dispatch: any) => (
                <div
                  key={dispatch.id}
                  className="border rounded-lg p-3"
                >
                  <p className="font-semibold">
                    Dispatch #{dispatch.id}
                  </p>

                  <p className="text-sm">
                    Incident #{dispatch.incident_id}
                  </p>

                  <span className="text-orange-600">
                    {dispatch.status}
                  </span>
                </div>
              )
            )}

          </div>

        </div>

        {/* Live Feed */}

        <div className="rounded-xl border bg-card p-5 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            Live Event Feed
          </h2>

          <div className="space-y-3">

            {events.length === 0 ? (
              <p className="text-muted-foreground">
                Waiting for events...
              </p>
            ) : (
              events.map((event, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3"
                >
                  <div className="flex justify-between">

                    <span>
                      {event.type
                        .replaceAll("_", " ")
                        .toUpperCase()}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {event.time}
                    </span>

                  </div>
                </div>
              ))
            )}

          </div>

        </div>

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