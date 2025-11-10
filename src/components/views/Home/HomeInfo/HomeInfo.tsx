import { Card, CardBody } from "@heroui/react";
import * as React from "react";
import { HOME_INFO } from "../Home.constants";

interface HomeInfoProps {
  propName?: string;
}

const HomeInfo: React.FC<HomeInfoProps> = () => {
  return (
    <section className="relative z-10 container mx-auto -mt-36 mb-12 px-4 md:-mt-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {HOME_INFO.map((info, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-200"
          >
            <CardBody className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <info.icon className={`h-8 w-8 ${info.color}`} />
                <h3 className="text-lg font-bold">{info.title}</h3>
              </div>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HomeInfo;
