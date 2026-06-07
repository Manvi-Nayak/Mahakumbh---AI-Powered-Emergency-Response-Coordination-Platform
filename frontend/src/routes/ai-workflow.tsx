import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/ai-workflow")({
  component: AIWorkflowPage,
});

function AIWorkflowPage() {
  const [incidentId, setIncidentId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runWorkflow = async () => {
    try {
      setLoading(true);

      const response = await api.responseWorkflow({
        incident_id: Number(incidentId),
      });

      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          AI Incident Workflow
        </h1>

        <p className="text-muted-foreground mt-2">
          Visualize AI-powered emergency response decisions.
        </p>
      </div>

      {/* Input */}

      <div className="rounded-xl border bg-card p-6 mb-10">

        <label className="block mb-3 font-medium">
          Incident ID
        </label>

        <div className="flex gap-4">

          <input
            value={incidentId}
            onChange={(e) =>
              setIncidentId(e.target.value)
            }
            placeholder="Enter Incident ID"
            className="border rounded-lg p-3 flex-1"
          />

          <button
            onClick={runWorkflow}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg"
          >
            Analyze
          </button>

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-10">
          <p className="text-lg font-medium">
            Running AI Analysis...
          </p>
        </div>
      )}

      {/* Workflow */}

      {result && (

        <div>

          <h2 className="text-2xl font-bold mb-8">
            AI Decision Pipeline
          </h2>

          <div className="flex items-center gap-4 overflow-x-auto pb-4">

            <WorkflowStep
              title="Incident"
              value={`#${result.incident_id}`}
            />

            <Arrow />

            <WorkflowStep
              title="Category"
              value={result.category}
            />

            <Arrow />

            <WorkflowStep
              title="Severity"
              value={`${result.severity}`}
            />

            <Arrow />

            <WorkflowStep
              title="AI Score"
              value={`${result.severity_score}`}
            />

            <Arrow />

            <WorkflowStep
              title="Resources"
              value={
                result.recommended_resources
                  ?.map(
                    (resource: any) =>
                      resource.name ||
                      resource.resource_type
                  )
                  .join(", ") || "None"
              }
            />

            <Arrow />

            <WorkflowStep
              title="Dispatch"
              value="Ready"
            />

          </div>

          {/* AI Summary */}

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <SummaryCard
              title="Incident Category"
              value={result.category}
            />

            <SummaryCard
              title="Severity Level"
              value={result.severity}
            />

            <SummaryCard
              title="Severity Score"
              value={result.severity_score}
            />

          </div>

        </div>

      )}

    </div>
  );
}

function Arrow() {
  return (
    <div className="text-4xl font-bold text-orange-500">
      →
    </div>
  );
}

function WorkflowStep({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="min-w-[220px] rounded-xl border bg-card p-6 shadow-sm">

      <h3 className="text-sm text-muted-foreground mb-3">
        {title}
      </h3>

      <p className="text-xl font-bold break-words">
        {value}
      </p>

    </div>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
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