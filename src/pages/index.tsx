import Image from "next/image";
import { useRouter } from "next/router";
import { type ReactElement, type MouseEvent, useState } from "react";
import { PrimaryLayout } from "src/components/Layout/Primary/PrimaryLayout";
import { type NextPageWithLayout } from "src/pages/_app";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import parse from "html-react-parser";
import Head from "next/head";

export const getStaticProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation("hero");

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line
    router.push("/characters");
  };

  const [paddingTop, setPaddingTop] = useState("0%");
  return (
    <>
      <Head>
        <title>
          {`Star Wars - ${t("home")}`}
          <link rel="preload" href="/hero.svg" as="image" />
        </title>
      </Head>
      <div className="flex min-h-[calc(100vh-93px)] w-full flex-col items-center gap-10 bg-red-300 bg-gradient-to-b from-[#1F2A63] to-[#17002F] px-4 py-16 lg:flex-row lg:items-center lg:justify-center lg:gap-2 lg:py-0">
        <div className="w-full text-center text-white lg:w-[500px] lg:text-start">
          <h1 className="mb-10 text-5xl lg:mb-16 lg:text-6xl lg:leading-[84px]">
            {parse(t("heading"))}
          </h1>
          <h4 className="mb-10 text-2xl lg:text-3xl lg:text-[32px]">
            {t("paragraph")}
          </h4>
          <button
            onClick={handleClick}
            className="h-[66px] w-[231px] rounded-xl bg-[#FFC107] text-2xl font-bold text-black shadow-[inset_0px_-9px_0px_rgba(0,0,0,0.18)] transition active:scale-95"
          >
            {t("button")}
          </button>
        </div>
        <div className="relative w-3/4 lg:w-[50%] xl:w-[40%]">
          <div
            className="relative w-full"
            style={{ objectFit: "contain", paddingTop: paddingTop }}
          >
            <Image
              src="/hero.svg"
              alt="hero"
              priority
              fill
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setPaddingTop(
                  `calc(100% / (${naturalWidth} / ${naturalHeight}))`
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
