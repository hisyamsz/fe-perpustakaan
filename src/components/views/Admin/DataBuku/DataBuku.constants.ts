import { IBookCategory } from "@/types/Book";

export const COLUMN_LIST_DATABUKU = [
  { name: "JUDUL", uid: "judul", sortable: true },
  { name: "PENULIS", uid: "penulis", sortable: true },
  { name: "KATEGORI", uid: "kategori", sortable: true },
  { name: "PENERBIT", uid: "penerbit", sortable: true },
  { name: "TAHUN", uid: "tahun_terbit", sortable: true },
  { name: "STOK", uid: "stok", sortable: true },
  { name: "AKSI", uid: "aksi" },
];

export const kategoriBuku: IBookCategory[] = [
  { id: "1", name: "Fiksi" },
  { id: "2", name: "Non-Fiksi" },
  { id: "3", name: "Novel" },
  { id: "4", name: "Komik" },
  { id: "5", name: "Biografi" },
  { id: "6", name: "Pelajaran" },
  { id: "7", name: "Ensiklopedia" },
  { id: "8", name: "Teknologi" },
  { id: "9", name: "Agama" },
  { id: "10", name: "Sejarah" },
];
