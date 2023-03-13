import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { type Characters } from "src/types/types";
import { type NextPageWithLayout } from "src/pages/_app";
import { CharacterCard, SelectFilter } from "src/components";
import { PrimaryLayout } from "src/components/Layout/Primary/PrimaryLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getStaticProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export enum filterValues {
  brown = "brown",
  red = "red",
  blue = "blue",
  white = "white",
  all = "all",
}

const Characters: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const [charNum, setCharNum] = useState<null | number>(null);
  const router = useRouter();
  const [filterValue, setFilterValue] = useState<filterValues>(
    filterValues.all
  );

  const fetchCharacters = async (page = 1) => {
    const { data } = await Axios.get<Characters>(
      `https://swapi.dev/api/people/?page=${page}`
    );
    setCharNum(data.count);
    return data;
  };
  const { t } = useTranslation("characters");

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
  });

  const filteredData = data?.results.filter((character) => {
    // non expensive calculation so no need for optimization
    if (filterValue === "all") return character;
    if (filterValue === character.eye_color) return character;
  });

  const switchLanguage = () => {
    const language = router.locale === "en" ? "wk" : "en";
    // eslint-disable-next-line
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: language }
    );
  };

  return (
    <>
      <Head>
        <title>{`${t("title")} ${charNum ? `- ${charNum}` : ""}`}</title>
      </Head>
      <div className="relative flex min-h-[calc(100vh-93px)] w-full flex-col bg-[linear-gradient(180deg,#FFFFFF_30.32%,#F5F5F5_100%)] pb-12">
        <span className="absolute right-1/2 top-7 translate-x-[50%] sm:right-40 sm:translate-x-0">
          language: {router.locale}
        </span>
        <h1 className="my-20 text-center text-4xl font-bold drop-shadow-[4px_4px_4px_rgba(33,33,33,0.25)]">
          {isLoading ? (
            <div className="inline-flex gap-4">
              <span>{t("loading")}</span>
              <Image
                className="animate-spin"
                alt="spinner"
                width={40}
                priority
                height={40}
                src="/icon.ico"
              />
            </div>
          ) : !isError ? (
            parse(`<b>${data?.count}</b> ${t("heading")}`)
          ) : (
            <span>{t("error")}</span>
          )}
        </h1>
        {!isError && (
          <div className="px-4 md:px-16 xl:px-[150px]">
            <div className="">
              <label className="mr-4">{t("filter name")}</label>
              <SelectFilter
                defaultValue={filterValue}
                setFilterValue={setFilterValue}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-4 gap-y-4 py-7 md:gap-x-9 md:gap-y-11">
              {!isLoading &&
                !isError &&
                filteredData?.map((char) => {
                  return (
                    <CharacterCard
                      key={char.created}
                      character={char}
                      isLoading={isLoading}
                    />
                  );
                })}

              {isLoading &&
                !isError &&
                Array(10)
                  .fill("")
                  .map((_, i) => (
                    <CharacterCard isLoading={isLoading} key={i} />
                  ))}
            </div>
            <div className="mx-auto flex justify-center">
              <div className="btn-group rounded-3xl">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prevState) => prevState - 1)}
                  className="btn-secondary btn border-none bg-white  shadow-md hover:bg-gray-300"
                >
                  «
                </button>
                <button className="btn-secondary  btn pointer-events-none border-none bg-white shadow-md hover:bg-gray-300">
                  {t("page")} {page}
                </button>
                <button
                  disabled={!data?.next}
                  onClick={() => setPage((prevState) => prevState + 1)}
                  className="btn-secondary btn border-none  bg-white shadow-md hover:bg-gray-300"
                >
                  »
                </button>
              </div>
            </div>
            {isFetching && (
              <span className="relative left-1/2 mx-auto mt-4 inline-block translate-x-[-50%]">
                {t("loading")}...
              </span>
            )}
          </div>
        )}
        <button
          onClick={switchLanguage}
          className="fixed right-5 bottom-5 transition active:scale-95 sm:right-[75px] sm:bottom-[75px]"
        >
          <Image
            src="/switchButton.svg"
            width={80}
            height={80}
            alt="switch language"
          />
        </button>
      </div>
    </>
  );
};

Characters.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Characters;
