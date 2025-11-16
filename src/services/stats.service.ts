import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const statsServices = {
  getStat: () => instance.get(`${endpoint.STAT}`),
};

export default statsServices;
