import { Card, CardBody, Skeleton } from "@heroui/react";
import { FC } from "react";
import DashboardRecentActivity from "./DashboardRecentActivity";
import { IStatistic } from "@/types/Stat";
import { STATS_CARD } from "./Dashboard.constants";
import useDashboard from "./useDashboard";

const Dashboard: FC = () => {
  const { dataStats, isPendingStats } = useDashboard();

  return (
    <section>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS_CARD.map((item, idx) => (
          <Card
            key={idx}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>
                  <div className="text-foreground text-2xl font-bold">
                    {isPendingStats ? (
                      <Skeleton className="h-7 w-14 rounded-full" />
                    ) : (
                      <p>{dataStats?.[item.key as keyof IStatistic] ?? 0}</p>
                    )}
                  </div>
                </div>
                <div
                  className={`rounded-full p-4 ${item.bgColor} ${item.textColor}`}
                >
                  <item.icon />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <DashboardRecentActivity />
    </section>
  );
};

export default Dashboard;
