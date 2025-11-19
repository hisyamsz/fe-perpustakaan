import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ISearchBorrowBook } from "@/types/Borrow";

const borrowServices = {
  getBorrows: (params?: ISearchBorrowBook) =>
    instance.get(`${endpoint.BORROW}/getAll`, { params }),
  searchBorrow: (params?: ISearchBorrowBook) =>
    instance.get(`${endpoint.BORROW}/search`, { params }),
  validateBorrow: (borrowId: number | string) =>
    instance.post(`${endpoint.BORROW}/validate/${borrowId}`),
  returnBorrow: (
    borrowId: number | string,
    payload: { kondisi_buku: string },
  ) => instance.post(`${endpoint.RETURN}/${borrowId}`, payload),
  // User (membuat peminjaman)
  createBorrow: (payload: { buku_id?: number | string }) =>
    instance.post(`${endpoint.BORROW}/create`, payload),
  getBorrowUser: (params?: ISearchBorrowBook) =>
    instance.get(`${endpoint.BORROW}/get`, { params }),
};

export default borrowServices;
