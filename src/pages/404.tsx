import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Custom404 = () => {
  const router = useRouter();
  const { t } = useTranslation("notFound");

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <div className="h-screen w-full bg-[#17002F] py-32 sm:p-32">
        <div className="relative mx-auto h-full w-[100%]">
          <Image
            alt="Page Not Found"
            src={"/custom404.svg"}
            priority
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <button
          onClick={handleClick}
          className="mx-auto flex h-[66px] w-[231px] items-center justify-center rounded-xl bg-[#73D677] text-2xl font-bold text-black shadow-[inset_0px_-9px_0px_rgba(0,0,0,0.18)] transition active:scale-95"
        >
          {t('return')}
        </button>
      </div>
    </>
  );
};

export default Custom404;
