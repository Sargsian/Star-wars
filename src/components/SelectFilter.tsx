import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { filterValues } from "src/pages/characters";
import { useTranslation } from "next-i18next";

type Props = {
  setFilterValue: (value: filterValues) => void;
  defaultValue: filterValues;
};

export const SelectFilter = ({ setFilterValue, defaultValue }: Props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");
  return (
    <Select.Root
      onOpenChange={() => setOpen((prev) => !prev)}
      defaultValue={defaultValue}
      onValueChange={(value: filterValues) => setFilterValue(value)}
    >
      <Overlay open={open} />
      <Select.Trigger
        className="relative z-10 inline-flex h-[24px] w-[135px] justify-center rounded bg-[#F2F2F2] shadow-[2px_2px_2px_rgba(33,33,33,0.1)]"
        aria-label="eye-colors"
      >
        <Select.Value placeholder={defaultValue} defaultValue={defaultValue} />
        <Select.Icon className="text-black">
          <ChevronDownIcon className="absolute top-1/2 right-[7px] translate-y-[-50%]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={9}
          className="z-10 overflow-hidden rounded-lg bg-white shadow-[4px_4px_8px_rgba(1,28,64,0.2)]"
        >
          <Select.Viewport>
            <Select.Group className="flex w-[135px] flex-col justify-center gap-3 p-[5px]">
              <SelectItem value={filterValues.brown}>{t("brown")}</SelectItem>
              <SelectItem value={filterValues.red}>{t("red")}</SelectItem>
              <SelectItem value={filterValues.blue}>{t("blue")}</SelectItem>
              <SelectItem value={filterValues.white}>{t("white")}</SelectItem>
              <SelectItem value={filterValues.all}>{t("all")}</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = ({
  children,
  value,
}: {
  children: string;
  value: filterValues;
}) => {
  return (
    <Select.Item
      onClick={(event) => event.stopPropagation()}
      value={value}
      className="data-[s] relative flex h-[25px] cursor-pointer select-none items-center rounded pl-[25px] data-[highlighted]:bg-neutral-200 data-[highlighted]:outline-none"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

const Overlay = ({ open }: { open: boolean }) => {
  const [visible, setVisible] = useState(open);
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
    setVisible(true);
  }, [open]);

  return visible ? (
    <div className="fixed inset-0 z-20" onClick={(e) => e.stopPropagation()} />
  ) : null;
};
