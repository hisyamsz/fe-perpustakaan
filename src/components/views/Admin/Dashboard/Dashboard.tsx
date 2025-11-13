import { Card, CardBody } from "@heroui/react";
import { FC } from "react";
import { FaBookOpen, FaUsers, FaSyncAlt, FaClock } from "react-icons/fa";
import DashboardRecentActivity from "./DashboardRecentActivity";

const Dashboard: FC = () => {
  const stats = [
    {
      title: "Total Buku",
      value: 1280,
      icon: <FaBookOpen className="text-blue-500" size={28} />,
      textColor: "",
      bgColor: "bg-blue-100",
      size: 28,
    },
    {
      title: "Total Anggota",
      value: 340,
      icon: <FaUsers className="text-green-500" size={28} />,
      textColor: "",
      bgColor: "bg-green-100",
      size: 28,
    },
    {
      title: "Buku Dipinjam",
      value: 210,
      icon: <FaSyncAlt className="text-yellow-500" size={28} />,
      textColor: "",
      bgColor: "bg-yellow-100",
      size: 28,
    },
    {
      title: "Buku Terlambat",
      value: 12,
      icon: <FaClock className="text-red-500" size={28} />,
      textColor: "",
      bgColor: "bg-red-100",
      size: 28,
    },
  ];

  return (
    <section>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
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
                    {item.value}
                  </p>
                </div>
                <div className={`rounded-full p-4 ${item.bgColor}`}>
                  {item.icon}
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
