import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { type ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { GenderXBirth } from "src/components/Character/GenderXBirth";
import Measurements from "src/components/Character/Measurements";
import { type Character } from "src/types/types";

type Props = {
  children: ReactElement;
  isLoading: boolean;
  character: Character | undefined;
};

export const Modal = ({ children, isLoading, character }: Props) => {
  const { t } = useTranslation("characterInfo");

  return (
    <Dialog.Root>
      <Dialog.Trigger
        disabled={isLoading}
        className={`rounded-lg focus:outline-neutral-700 ${
          isLoading ? "pointer-events-none" : ""
        }`}
        asChild
      >
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="modal-overlay"
          className="fixed inset-0 z-20 bg-black/50 data-[state=open]:animate-overlayShow"
        />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-30 max-h-screen w-full translate-x-[-50%] translate-y-[-50%] bg-[linear-gradient(180deg,#17002F_42.19%,#1F2A63_100%)] focus:outline-none data-[state=open]:animate-contentShow sm:h-[371px] sm:rounded-2xl md:max-w-[800px]">
          <Dialog.Trigger className="absolute right-3 top-3 z-10 bg-white hover:opacity-70 sm:top-[-49px] sm:right-0 sm:bg-transparent">
            <Image src="/close.svg" alt="close" width={32} height={32} />
          </Dialog.Trigger>
          <div className="flex h-full w-full flex-col sm:flex-row">
            <div className="relative h-[150px] w-full bg-[#1F2A63] sm:h-full sm:w-[46%] sm:rounded-l-2xl">
              <Image
                src={`/${
                  character?.gender === "male"
                    ? "male"
                    : character?.gender === "female"
                    ? "female"
                    : "non-binary"
                }.svg`}
                alt="avatar"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
              <div className="absolute bottom-4 right-4 flex gap-3 text-xs">
                <GenderXBirth
                  isLoading={isLoading}
                  gender={character?.gender}
                />
                <GenderXBirth
                  isLoading={isLoading}
                  birthYear={character?.birth_year}
                />
              </div>
            </div>
            <div className="w-full px-3 py-7 sm:h-full sm:w-[54%]">
              <h3 className="mb-0 text-center text-2xl font-bold text-white sm:mb-6 sm:text-start sm:text-3xl md:text-4xl">
                {character?.name}
              </h3>
              <div className="mt-3 flex flex-col gap-3 sm:block">
                <div className="mb-0 flex max-w-[256px] flex-col rounded-lg bg-white p-5 sm:mb-[76px]">
                  <span>
                    {t("eye color")} - {character?.eye_color}
                  </span>
                  <span>
                    {t("skin color")} - {character?.skin_color}
                  </span>
                  <span>
                    {t("hair color")} - {character?.hair_color}
                  </span>
                </div>
                <div className="flex gap-6 self-end">
                  {character?.height && character.height !== "unknown" && (
                    <div className="flex h-[70px] w-[83px] items-center justify-center rounded-lg bg-white">
                      <Measurements
                        amount={character.height}
                        metric={t("height")}
                      />
                    </div>
                  )}
                  {character?.mass && character.mass !== "unknown" && (
                    <div className="flex h-[70px] w-[83px] items-center justify-center rounded-lg bg-white">
                      <Measurements
                        amount={character.mass}
                        metric={t("mass")}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
