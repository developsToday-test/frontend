import { LineChart } from '@/components/line-chart'
import { CountryInfo } from '@/types/countries'
import Image from 'next/image'
import Link from 'next/link'

interface ContentProps {
  params: {
    code: string
  }
}

export default async function Country({ params: { code } }: ContentProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE}/country/${code}`,
  )
  const data: CountryInfo = await response.json()

  const categories = data.population.map((entry) => entry.year.toString())
  const populationQuantity = data.population.map((entry) => entry.value)

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-5 bg-[#141414] px-10 pt-10 lg:px-20">
      <div className="flex items-center gap-3">
        <Link
          href={'/countries'}
          className="flex size-10 items-center justify-center rounded-full border-4 font-bold"
        >
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
        Population around of the years
      </h2>
      <div className="text-black">
        <LineChart
          categories={categories}
          data={[{ name: 'Population', data: populationQuantity }]}
        />
      </div>
    </div>
  )
}
