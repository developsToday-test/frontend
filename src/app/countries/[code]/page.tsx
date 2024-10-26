import { LineChart } from "@/components/line-chart";
import { CountryInfo } from "@/types/countries";
import Image from "next/image";
import Link from "next/link";

interface ContentProps {
  params: {
    code: string
  }
}

export default async function Country({
  params: { code },
}: ContentProps) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE}/country/${code}`);
  const data: CountryInfo = await response.json();

  const categories = data.population.map((entry) => entry.year.toString());
  const populationQuantity = data.population.map((entry) => entry.value);

  return (
    <div className="max-w-4xl min-h-screen flex flex-col gap-5 mx-auto pt-10 px-10 lg:px-20 bg-[#141414]">
      <div className="flex items-center gap-3">
        <Link href={"/countries"} className="border-4 size-10 rounded-full flex items-center justify-center font-bold">
          &larr;
        </Link>
        <h1 className="text-4xl">{data.name}</h1>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 justify-between">
        <Image width={400} height={300} src={data.flag} alt={`Flag of ${data.name}`} className="w-full"/>

        <div className="flex flex-col gap-3 bg-[#3f3f3f] rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-2">Borders</h2>
          <ul className="grid grid-cols-2 gap-x-10">
            {data.borders.map((border) => (
              <li key={border.countryCode}>{border.commonName}</li>
            ))}
          </ul>
        </div>
      </div>


      <h2 className="text-xl font-semibold mb-2">Population around of the years</h2>
      <div className="text-black">
        <LineChart categories={categories} data={[{ name: "Population", data: populationQuantity }]} />
      </div>

    </div>
  );
}
