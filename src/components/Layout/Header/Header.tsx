import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const navLinks = [
  { title: "home", link: "/" },
  { title: "characters", link: "/characters" },
];

const Header = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation("header");

  return (
    <header className="navbar gap-2 relative h-[93px] bg-[#1F2A63] px-9 shadow-[0px_4px_16px_rgba(1,28,64,0.8)] lg:px-[157px]">
      <div className="sm:flex-1 flex-auto">
        <Image priority src="/logo.svg" width={150} height={90} alt="logo" />
      </div>
      <div className="text-white flex-auto sm:flex-none">
        <ul className="flex sm:gap-[74px] gap-2 justify-between w-full text-2xl">
          {navLinks.map((navLink, i) => (
            <li key={i}>
              <Link
                className={`relative after:absolute after:bottom-[-15px] after:left-1/2 after:h-[3px] after:translate-x-[-50%] after:rounded after:bg-[#CFDAB0] after:transition-all after:duration-200 ${
                  pathname === navLink.link ? "after:w-[85%]" : "after:w-0"
                } hover:after:w-[85%]`}
                href={navLink.link}
              >
                {t(navLink.title)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
