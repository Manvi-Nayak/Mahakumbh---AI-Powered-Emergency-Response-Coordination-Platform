import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api, WS_URL } from "@/lib/api";

export const Route = createFileRoute("/command-center")({
  component: CommandCenterPage,
});

function CommandCenterPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const data = await api.live();
      setDashboard(data);
    } catch (error) {
      console.error(error);
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
        ...prev.slice(0, 14),
      ]);

      loadData();
    };

    return () => socket.close();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">

      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Emergency Command Center
        </h1>

        <p className="text-muted-foreground mt-2">
          Real-Time Emergency Operations Dashboard
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-5 gap-6 mb-8">

        <StatCard
          title="Incidents"
          value={dashboard?.stats?.total_incidents || 0}
        />

        <StatCard
          title="Active"
          value={dashboard?.stats?.active_incidents || 0}
        />

        <StatCard
          title="Resolved"
          value={dashboard?.stats?.resolved_incidents || 0}
        />

        <StatCard
          title="Resources"
          value={dashboard?.stats?.available_resources || 0}
        />

        <StatCard
          title="Dispatches"
          value={dashboard?.stats?.active_dispatches || 0}
        />

      </div>

      {/* Main Grid */}

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
                  <h3 className="font-semibold">
                    {incident.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    📍 {incident.location}
                  </p>

                  <p className="text-sm">
                    Status: {incident.status}
                  </p>
                </div>
              )
            )}

          </div>

        </div>

        {/* Dispatches */}

        <div className="rounded-xl border bg-card p-5 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            Dispatch Operations
          </h2>

          <div className="space-y-3">

            {dashboard?.recent_dispatches?.map(
              (dispatch: any) => (
                <div
                  key={dispatch.id}
                  className="border rounded-lg p-3"
                >
                  <h3 className="font-semibold">
                    Dispatch #{dispatch.id}
                  </h3>

                  <p>
                    Incident #{dispatch.incident_id}
                  </p>

                  <p className="text-orange-600">
                    {dispatch.status}
                  </p>
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
              <p>Waiting for events...</p>
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

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            AI Emergency Workflow
          </h2>

          <div className="flex flex-wrap gap-3">

            <Step label="Citizen Report" />
            <Step label="AI Analysis" />
            <Step label="Severity Detection" />
            <Step label="Resource Recommendation" />
            <Step label="Dispatch Assignment" />

          </div>

        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            System Status
          </h2>

          <div className="space-y-3">

            <Status
              label="AI Analysis Engine"
              status="ONLINE"
            />

            <Status
              label="WebSocket Server"
              status="ONLINE"
            />

            <Status
              label="Dispatch Engine"
              status="ONLINE"
            />

            <Status
              label="Recommendation Engine"
              status="ONLINE"
            />

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
      <h3 className="text-muted-foreground">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

function Step({
  label,
}: {
  label: string;
}) {
  return (
    <div className="px-4 py-2 rounded-lg bg-orange-100 text-orange-700 font-medium">
      {label}
    </div>
  );
}

function Status({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex justify-between border rounded-lg p-3">
      <span>{label}</span>
      <span className="text-green-600 font-bold">
        {status}
      </span>
    </div>
  );
}