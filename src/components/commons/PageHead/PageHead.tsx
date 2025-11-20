import Head from "next/head";

interface PageHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const PageHead = ({
  title = "Perpustakaan SMKN 6 Kota Tangerang Selatan",
  description = "Website perpustakaan SMKN 6 Kota Tangerang Selatan. Temukan buku, kelola peminjaman, dan lihat informasi perpustakaan.",
  url = "https://perpustakaan.smkn6-tangsel.sch.id",
  image = "/images/general/logo-smkn-6.png",
}: PageHeadProps) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="perpustakaan, smkn 6, buku, peminjaman, sekolah, tangerang selatan, smkn 6 tangerang selatan"
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="icon" href="/images/general/logo-smkn-6.png" />
    </Head>
  );
};

export default PageHead;
