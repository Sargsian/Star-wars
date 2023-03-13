import Head from "next/head";
import Header from "src/components/Layout/Header/Header";

interface PrimaryLayoutProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
}

export const PrimaryLayout = ({
  children,
  title = "Star Wars - Home",
  description = "Start Wars test task",
  keywords = "Star wars, swapi",
  type = "website",
  url = "https://test-task.ru",
  image,
}: PrimaryLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="noindex,nofollow" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />

        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className="min-h-screen">
        <Header />
        {children}
      </div>
    </>
  );
};
