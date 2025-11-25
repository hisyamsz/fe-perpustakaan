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
  status?: "Dipinjam" | "Dikembalikan" | "Diproses";
  user?: {
    nama?: string;
    kelas?: string;
  };
  buku?: {
    judul?: string;
  };
}

export interface IBorrowSummary {
  total: number;
  dipinjam: number;
  dikembalikan: number;
  terlambat: number;
}

export type TFilterBorrow = (items: IBorrowItem[]) => IBorrowSummary;

export interface IBorrowUserResponse {
  data: IBorrowItem[];
  page: number;
  size: number;
  total: number;
}

export interface ISearchBorrowBook {
  page?: string | string[] | number;
  size?: string | string[] | number;
  judul?: string | string[];
  user?: string | string[];
}

export interface IDetailReturn {
  id: number;
  peminjaman_id: number;
  tanggal_dikembalikan: string;
  hari_telat: number;
  kondisi_buku: string;
  denda: string | number;
  peminjaman: {
    id: number;
    user_id: number;
    buku_id: number;
    tanggal_pinjam: string;
    tenggat_kembali: string;
    valid: boolean;
    status: string;
    user: {
      nama: string;
      kelas: string;
    };
    buku: {
      judul: string;
    };
  };
}
