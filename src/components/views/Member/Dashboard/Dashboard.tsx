import { FC } from "react";
import { USER_SUMMARY_ITEMS } from "./Dashboard.constants";
import useDashboard from "./useDashboard";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { IUserStat } from "@/types/Stat";

const Dashboard: FC = () => {
  const { dataStatUser, isPendingStatUser } = useDashboard();

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {USER_SUMMARY_ITEMS.map((item, idx) => (
        <Card
          key={idx}
          className="h-32 overflow-hidden transition-all hover:shadow-lg"
        >
          <CardBody className="flex h-full flex-row items-start justify-between p-6">
            <div className="flex h-full flex-col items-stretch justify-between">
              <p className="text-base font-medium text-gray-500">
                {item.title}
              </p>

              <div className="text-foreground mt-2 text-3xl font-bold">
                {isPendingStatUser ? (
                  <Skeleton className="h-10 w-20 rounded-full" />
                ) : (
                  <p>{dataStatUser?.[item.key as keyof IUserStat] ?? 0}</p>
                )}
              </div>
            </div>

            <div
              className={`rounded-full p-3 ${item.bgColor} ${item.textColor}`}
            >
              <item.icon size={32} />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
