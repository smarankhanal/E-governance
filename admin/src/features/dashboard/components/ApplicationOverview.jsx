import { Card, StatusDonut, WeeklyChart } from "../index";

export default function ApplicationOverview({ weekly, statusBreakdown }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card title="Applications this week" className="lg:col-span-2">
        <WeeklyChart WEEKLY={weekly} />
      </Card>

      <Card title="Applications by status">
        <StatusDonut STATUS_BREAKDOWN={statusBreakdown} />
      </Card>
    </div>
  );
}
