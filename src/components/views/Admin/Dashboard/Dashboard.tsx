import { Card, CardBody } from "@heroui/react";
import { FC } from "react";
import DashboardRecentActivity from "./DashboardRecentActivity";
import { IStatistic } from "@/types/Stat";
import { STATS_CARD } from "./Dashboard.constants";

interface DashbaordProps {
  dataStat?: IStatistic;
}

const Dashboard: FC<DashbaordProps> = ({ dataStat }) => {
  console.log(dataStat);

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
                  <p className="text-foreground text-2xl font-bold">
                    {dataStat?.[item.key as keyof IStatistic] ?? 0}
                  </p>
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
