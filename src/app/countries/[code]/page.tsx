"use client";

import { LineChart } from '@/components/line-chart';
import { CountryInfo } from '@/types/countries';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ContentProps {
  params: Promise<{ code: string }>;
}

export default function Country({ params }: ContentProps) {
  const [code, setCode] = useState<string | null>(null);
  const [data, setData] = useState<CountryInfo | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [populationQuantity, setPopulationQuantity] = useState<number[]>([]);

  useEffect(() => {
    params.then((unwrappedParams) => setCode(unwrappedParams.code));
  }, [params]);

  useEffect(() => {
    async function fetchData() {
      if (code) {
        const response: CountryInfo = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE}/country/${code}`
        ).then((res) => res.json());

        const categories = response.population.map((entry) => entry.year.toString());
        const populationQuantity = response.population.map((entry) => entry.value);

        setData(response);
        setCategories(categories);
        setPopulationQuantity(populationQuantity);
      }
    }

    fetchData();
  }, [code]);

  if (!data) return null;

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-5 bg-[#141414] px-10 pt-10 lg:px-20">
      <div className="flex items-center gap-3">
        <Link href={'/countries'} className="flex size-10 items-center justify-center rounded-full border-4 font-bold">
          &larr;
        </Link>
        <h1 className="text-4xl">{data.name}</h1>
      </div>
      <div className="grid w-full grid-cols-1 justify-between gap-5 md:grid-cols-2">
        <Image
          width={400}
          height={300}
          src={data.flag}
          alt={`Flag of ${data.name}`}
          className="w-full"
        />

        <div className="flex flex-col gap-3 rounded-3xl bg-[#3f3f3f] p-5">
          <h2 className="mb-2 text-xl font-semibold">Borders</h2>
          <ul className="grid grid-cols-2 gap-x-10">
            {data.borders.map((border) => (
              <li key={border.countryCode}>{border.commonName}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mb-2 text-xl font-semibold">
        Population around the years
      </h2>
      <div className="text-black">
        <LineChart
          categories={categories}
          data={[{ name: 'Population', data: populationQuantity }]}
        />
      </div>
    </div>
  );
}
