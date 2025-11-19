import { FC } from "react";
import { USER_SUMMARY_ITEMS } from "./Dashboard.constants";
import useDashboard from "./useDashboard";
import { Card, CardBody, Skeleton } from "@heroui/react";

const Dashboard: FC = () => {
  const { isPendingSummary, summary } = useDashboard();

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {USER_SUMMARY_ITEMS.map((item, idx) => (
        <Card
          key={idx}
          className="h-30 overflow-hidden transition-all hover:shadow-lg md:h-40"
        >
          <CardBody className="flex h-full flex-row items-start justify-between p-6">
            <div className="flex h-full flex-col items-stretch justify-between">
              <p className="text-base font-medium text-gray-500">
                {item.title}
              </p>

              <div className="text-foreground mt-2 text-3xl font-bold md:text-4xl">
                {isPendingSummary ? (
                  <Skeleton className="h-10 w-20 rounded-full" />
                ) : (
                  <p>{summary[item.key]}</p>
                )}
              </div>
            </div>

            <div
              className={`rounded-full p-3 ${item.bgColor} ${item.textColor}`}
            >
              <item.icon size={36} />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
