import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBook, ISearchBookParams } from "@/types/Book";

const bookServices = {
  getBooks: (params?: ISearchBookParams) =>
    instance.get(`${endpoint.BOOK}/getAll`, { params }),
  searchBooks: (params?: ISearchBookParams) =>
    instance.get(`${endpoint.BOOK}/search`, { params }),
  getBookById: (id_buku: string) =>
    instance.get(`${endpoint.BOOK}/get/${id_buku}`),
  addBook: (payload: IBook) =>
    instance.post(`${endpoint.BOOK}/create/`, payload),
  updateBook: (id_buku: string, payload: IBook) =>
    instance.patch(`${endpoint.BOOK}/update/${id_buku}`, payload),
  deleteBook: (id_buku: string) =>
    instance.delete(`${endpoint.BOOK}/delete/${id_buku}`),
};

export default bookServices;
