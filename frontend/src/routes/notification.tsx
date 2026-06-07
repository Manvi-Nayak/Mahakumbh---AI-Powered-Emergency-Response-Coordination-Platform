import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, AlertTriangle, Radio, CheckCircle } from "lucide-react";
import { WS_URL } from "@/lib/api";

export const Route = createFileRoute("/notification")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const notification = {
        id: Date.now(),
        type: data.type,
        time: new Date().toLocaleTimeString(),
      };

      setEvents((prev) => [
        notification,
        ...prev,
      ]);
    };

    return () => socket.close();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "incident_created":
        return (
          <AlertTriangle className="h-5 w-5 text-red-500" />
        );

      case "dispatch_created":
        return (
          <Radio className="h-5 w-5 text-orange-500" />
        );

      case "dispatch_updated":
        return (
          <CheckCircle className="h-5 w-5 text-green-500" />
        );

      default:
        return (
          <Bell className="h-5 w-5" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 p-8">

      <h1 className="font-display text-4xl font-bold mb-6">
        Notifications Center
      </h1>

      <div className="space-y-4">

        {events.length === 0 && (
          <div className="rounded-xl border bg-card p-6">
            Waiting for live events...
          </div>
        )}

        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border bg-card p-4 shadow"
          >
            <div className="flex items-center gap-3">

              {getIcon(event.type)}

              <div>
                <div className="font-semibold">
                  {event.type.replaceAll("_", " ")}
                </div>

                <div className="text-sm text-muted-foreground">
                  {event.time}
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}