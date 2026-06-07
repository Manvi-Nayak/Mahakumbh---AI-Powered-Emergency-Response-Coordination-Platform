import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/incidents")({
  component: IncidentsPage,
});

function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const [selectedIncident, setSelectedIncident] =
    useState<any>(null);

  const [selectedResource, setSelectedResource] =
    useState("");

  useEffect(() => {
    loadIncidents();
    loadResources();
  }, []);

  const loadIncidents = async () => {
    try {
      const data = await api.listIncidents();
      setIncidents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadResources = async () => {
    try {
      const data = await api.listResources();

      const available = data.filter(
        (r: any) => r.status === "available"
      );

      setResources(available);
    } catch (err) {
      console.error(err);
    }
  };

  const removeIncident = async (id: number) => {
    try {
      await api.deleteIncident(String(id));
      loadIncidents();
    } catch (err) {
      console.error(err);
    }
  };

  const dispatchResource = async () => {
    if (
      !selectedIncident ||
      !selectedResource
    )
      return;

    try {
      await api.createDispatch({
        incident_id:
          selectedIncident.id,
        resource_id:
          Number(selectedResource),
      });

      alert(
        "Resource dispatched successfully"
      );

      setSelectedIncident(null);
      setSelectedResource("");

      loadIncidents();
      loadResources();
    } catch (err) {
      console.error(err);
      alert("Dispatch failed");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Incident Management
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >

            <div className="flex justify-between mb-4">

              <h3 className="font-bold">
                Incident #{incident.id}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-sm
                ${
                  incident.status ===
                  "resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {incident.status}
              </span>

            </div>

            <h2 className="font-semibold text-xl mb-3">
              {incident.title}
            </h2>

            <p>
              📍 {incident.location}
            </p>

            <p>
              ⚠ {incident.severity}
            </p>

            <p>
              📂 {incident.category}
            </p>

            <div className="mt-4 space-y-2">

              {incident.status !==
                "resolved" && (
                <button
                  onClick={() =>
                    setSelectedIncident(
                      incident
                    )
                  }
                  className="w-full rounded-lg bg-blue-600 text-white py-2"
                >
                  Dispatch Resource
                </button>
              )}

              <button
                onClick={() =>
                  removeIncident(
                    incident.id
                  )
                }
                className="w-full rounded-lg bg-red-500 text-white py-2"
              >
                Delete Incident
              </button>

            </div>

          </div>
        ))}

      </div>

      {selectedIncident && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[450px]">

            <h2 className="text-2xl font-bold mb-4">
              Dispatch Resource
            </h2>

            <p className="mb-4">
              {selectedIncident.title}
            </p>

            <select
              value={selectedResource}
              onChange={(e) =>
                setSelectedResource(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 mb-4"
            >

              <option value="">
                Select Resource
              </option>

              {resources.map(
                (resource) => (
                  <option
                    key={resource.id}
                    value={resource.id}
                  >
                    {resource.name} (
                    {
                      resource.resource_type
                    }
                    )
                  </option>
                )
              )}

            </select>

            <div className="flex gap-3">

              <button
                onClick={
                  dispatchResource
                }
                className="flex-1 bg-green-600 text-white rounded-lg py-2"
              >
                Dispatch
              </button>

              <button
                onClick={() =>
                  setSelectedIncident(
                    null
                  )
                }
                className="flex-1 bg-gray-500 text-white rounded-lg py-2"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}