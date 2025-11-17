import { DateValue } from "@heroui/react";
import { IBook } from "./Book";

export interface IBorrowUser {
  nama?: string;
}

export interface IBorrowBook extends IBook {
  book_id?: string | number;
}

export interface IBorrowItem {
  id?: number | string;
  user_id?: number | string;
  buku_id?: number | string;
  tanggal_pinjam?: string | DateValue;
  tenggat_kembali?: string | DateValue;
  valid?: boolean | string;
  status?: "Dipinjam" | "Dikembalikan";
  user?: {
    nama?: string;
  };
  buku?: {
    judul?: string;
  };
}

export interface ISearchBorrowBook {
  page?: string | string[] | number;
  size?: string | string[] | number;
  judul?: string | string[];
  user?: string | string[];
}
