import { Card, CardBody } from "@heroui/react";
import * as React from "react";
import { HOME_INFO } from "../Home.constants";

interface HomeInfoProps {
  propName?: string;
}

const HomeInfo: React.FC<HomeInfoProps> = () => {
  return (
    <section
      className="relative z-10 mx-auto -mt-36 mb-12 w-full px-4 md:-mt-24 lg:px-8"
      aria-labelledby="home-info-heading"
      role="region"
    >
      <h2 id="home-info-heading" className="sr-only">
        Informasi Layanan Perpustakaan SMKN 6 Kota Tangerang Selatan
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {HOME_INFO.map((info, index) => (
          <article
            key={index}
            className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
            role="article"
            aria-label={`Informasi ${info.title}`}
          >
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <info.icon
                    className={`h-8 w-8 ${info.color}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-bold">{info.title}</h3>
                </div>

                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted text-sm leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardBody>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeInfo;
