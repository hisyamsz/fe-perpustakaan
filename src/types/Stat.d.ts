export interface IStatistic {
  total_buku: string;
  total_anggota: string;
  buku_dipinjam: string;
  buku_terlambat: string;
}

export type UserStatKeys =
  | "dipinjam"
  | "jatuh_tempo"
  | "konfirmasi"
  | "riwayat_peminjaman"
  | "terlambat"
  | "total_peminjaman";

export interface IUserStat {
  dipinjam: number;
  jatuh_tempo: number;
  konfirmasi: number;
  riwayat_peminjaman: number;
  terlambat: number;
  total_peminjaman: number;
}
