import { useTranslation } from "next-i18next";

type Props = {
  gender?: string;
  birthYear?: string;
  isLoading: boolean;
};

export const GenderXBirth = ({ gender, birthYear, isLoading }: Props) => {
  const { t } = useTranslation("characterInfo");

  const translatedGender =
    gender === "male" ? t("male") : gender === "female" ? t("female") : gender;
  return (
    <>
      {isLoading ? (
        <span className="mt-[2px] h-[14px] w-14 rounded-[11px] bg-gray-300"></span>
      ) : (gender && gender !== "unknown") ||
        (birthYear !== "unknown" && birthYear) ? (
        <span
          className={`${
            birthYear
              ? "bg-blue-300"
              : gender === "male"
              ? "bg-green-300"
              : gender === "female"
              ? "bg-purple-300"
              : "bg-yellow-300"
          } inline-block rounded-[11px] px-3 text-xs shadow-[inset_0px_-2px_0px_rgba(0,0,0,0.18)]`}
        >
          {translatedGender || birthYear}
        </span>
      ) : null}
    </>
  );
};
