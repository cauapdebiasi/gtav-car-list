import Layout from "@/components/Layout";
import { TbBrandNextjs, TbBrandTailwind, TbBrandGithub } from "react-icons/tb";

export default function Home({ allItems }) {
  const tech = [
    ["Next JS", TbBrandNextjs, "https://nextjs.org", "#FFF"],
    ["TailwindCSS", TbBrandTailwind, "https://tailwindcss.com", "#07b0ce"],
  ];
  return (
    <Layout>
      <h1 className="font-bold text-4xl my-4">Welcome!</h1>
      <p className="text-red-100">
        This project was created as an assignment for my web programming class
        at my university. While I won&apos;t be implementing any new features,
        feel free to use it as you please.
      </p>
      <hr className="border-[#561a1d] my-2" />
      <h2 className="text-3xl">Technologies used</h2>
      <ul className="flex gap-2 items-center justify-center">
        {tech.map(([techName, TechIcon, link, color]) => (
          <li>
            <a
              title={techName}
              target="_blank"
              href={link}
              style={{ color }}
              className="text-6xl font-light"
            >
              <TechIcon strokeWidth={1} />
            </a>
          </li>
        ))}
      </ul>
      <hr className="border-[#561a1d] my-2" />
      <a
        className="text-2xl w-full flex justify-center text-zinc-500"
        href="https://github.com/cauapdebiasi/gtav-car-list"
      >
        <TbBrandGithub />
      </a>
      <p className="text-zinc-500 text-center">
        API provided by{" "}
        <a
          className="underline"
          target="_blank"
          href="https://forum.cfx.re/t/unofficial-vehicle-api/1099400"
        >
          Jsfour
        </a>
      </p>
      <p className="text-zinc-500 text-center">
        Created by{" "}
        <a
          className="underline"
          target="_blank"
          href="https://github.com/cauapdebiasi"
        >
          Cauã Piuccho Debiasi
        </a>
      </p>
    </Layout>
  );
}
