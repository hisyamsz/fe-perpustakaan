export interface IBook {
  id?: number | string;
  judul?: string;
  penulis?: string;
  penerbit?: string;
  tahun_terbit?: number | string;
  kategori?: string;
  // isFeatured?: string | boolean;
  stok?: number | string;
}

export interface IBookCategory {
  id: string;
  name: string;
}

export interface ISearchBookParams {
  page?: string | string[];
  size?: string | string[];
  judul?: string | string[];
  kategori?: string | string[];
  featured?: string | string[];
}
