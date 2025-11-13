import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBook, ISearchBookParams } from "@/types/Book";

const bookServices = {
  getBooks: () => instance.get(`${endpoint.BOOK}/getAll`),
  getBookById: (id_buku: string) =>
    instance.get(`${endpoint.BOOK}/get/${id_buku}`),
  addBook: (payload: IBook) =>
    instance.post(`${endpoint.BOOK}/create/`, payload),
  updateBook: (id_buku: string, payload: IBook) =>
    instance.patch(`${endpoint.BOOK}/update/${id_buku}`, payload),
  deleteBook: (id_buku: string) =>
    instance.delete(`${endpoint.BOOK}/delete/${id_buku}`),
  searchBooks: (params?: ISearchBookParams) =>
    instance.get(`${endpoint.BOOK}/search`, { params }),
};

export default bookServices;
