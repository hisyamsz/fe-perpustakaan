import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const statServices = {
  getStat: () => instance.get(`${endpoint.STAT}`),
};

export default statServices;
