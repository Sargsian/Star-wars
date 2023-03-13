import { useTranslation } from "next-i18next";
import { Modal } from "src/components/Modal";
import { type Character } from "src/types/types";
import { GenderXBirth } from "./GenderXBirth";
import Measurements from "./Measurements";

type Props = {
  isLoading: boolean;
  character?: Character;
};

export const CharacterCard = ({ isLoading, character }: Props) => {
  const { t } = useTranslation("characterInfo");
  return (
    <Modal character={character} isLoading={isLoading}>
      <div
        className={`h-[137px] rounded-lg bg-[#F0F0F0] pl-[26px] cursor-pointer drop-shadow-[4px_4px_4px_rgba(33,33,33,0.1)] ${
          isLoading ? "pointer-events-none animate-pulse" : ""
        }`}
      >
        <div className="flex">
          {!isLoading ? (
            <h3 className="text-start text-lg font-bold text-[#212121] drop-shadow-md">
              {character?.name}
            </h3>
          ) : (
            <span
              data-testid="skeleton"
              className="mt-2 mb-1 inline-block h-4 w-32 rounded-[11px] bg-gray-300"
            ></span>
          )}
        </div>
        <div className="mt-3 mb-3 flex gap-3">
          <Measurements
            isLoading={isLoading}
            amount={character?.height}
            metric={t("height")}
          />
          <Measurements
            isLoading={isLoading}
            amount={character?.mass}
            metric={t("mass")}
          />
        </div>
        <div className="flex gap-3">
          <GenderXBirth isLoading={isLoading} gender={character?.gender} />
          <GenderXBirth
            isLoading={isLoading}
            birthYear={character?.birth_year}
          />
        </div>
      </div>
    </Modal>
  );
};
