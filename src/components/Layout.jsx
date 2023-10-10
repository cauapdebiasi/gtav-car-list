import { Meow_Script } from "next/font/google";
import { Outfit } from "next/font/google";
import { playClick, playHover } from "@/components/SoundEffect";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });
const meow = Meow_Script({ weight: "400", subsets: ["latin"] });

export default function Layout({ children }) {
  /** Tab name followed by the pathname
   *
   *  [tabName,ContentHandler,Props]
   */
  const tabs = [
    ["Home", "/"],
    ["All Vehicles", "/all"],
    ["By Class", "/classes"],
    ["By Manufacturer", "/manufacturer"],
  ];

  return (
    <>
    <section className="bg-[#101010]">
      <p className="text-[#9e9e9e] text-center font-medium text-[10px] sm:text-[16px]">--- Choose From our Top End HIGH PERFORMANCE CARS At Great Prices ---</p>
    </section>
      <header className="border-b-4 border-b-[#901412] shadow-xl shadow-[#390b09b6]">
        <div className="relative before:-z-10 before:filter before:hue-rotate-90 before:bg-hero before:top-0 before:left-0 before:absolute before:w-full before:h-full before:bg-no-repeat before:bg-center h-[350px] before:bg-cover flex items-center justify-center ">
          <div className="relative">
            <h1
              style={{ WebkitTextStroke: "thin" }}
              className={`${meow.className} text-[calc(3rem+2vw)] text-transparent drop-shadow-[0px_2px_0px_#c7c5c7] text-center bg-legendary-title bg-clip-text`}
            >
              GTA V Cars list
            </h1>
            <span
              style={{ WebkitTextStroke: "0.05rem black" }}
              className="absolute left-[10%] bottom-[-10%] text-[#8b0409] text-[calc(1rem+1vw)] font-semibold tracking-tight"
            >
              UNOFFICIAL
            </span>
          </div>
        </div>
      </header>
      <main
        className={`mt-[-40px] mx-auto p-1 sm:p-5 w-[clamp(220px,100%,1060px)] text-[#fffdf8] ${outfit.className} bg-[#190101] border-2 border-[#561a1d]`}
      >
        <nav className="flex flex-wrap gap-1 mb-2">
          {tabs.map(([tabName, pathname]) => (
            <Link
              key={tabName}
              onMouseOver={playHover}
              onMouseDown={playClick}
              href={pathname}
              className="red-button-hoverable relative z-10 p-2 flex-grow sm:flex-grow-0"
            >
              {tabName}
            </Link>
          ))}
        </nav>
        {children}
      </main>
    </>
  );
}
