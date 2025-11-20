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
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {STATS_CARD.map((item, idx) => (
          <Card
            key={idx}
            className="h-32 overflow-hidden transition-all hover:shadow-lg"
          >
            <CardBody className="p-6">
              <div className="flex h-full items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>
                  <div className="text-foreground text-3xl font-bold">
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
                  <item.icon size={32} />
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
