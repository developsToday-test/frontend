'use client'
import { Country } from '@/types/countries'
import { FlagOutlined } from '@ant-design/icons'
import { Card, List, Typography } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([])

  async function fetchData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE}/country`,
    ).then((res) => res.json())
    setCountries(response)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="flex w-full max-w-2xl flex-col gap-10 rounded-lg bg-white shadow-md">
        <h1 className="text-4xl">List of countries</h1>
        <div className="mt-3 h-96 overflow-auto pr-10">
          <List
            itemLayout="horizontal"
            dataSource={countries}
            renderItem={(country) => (
              <Link href={`/countries/${country.countryCode}`} passHref>
                <List.Item className="hover:bg-slate-100">
                  <List.Item.Meta
                    title={
                      <div className="flex items-center">
                        <FlagOutlined className="mr-2 text-blue-500" />
                        <span className="text-lg font-semibold">
                          {country.name}
                        </span>
                      </div>
                    }
                    description={
                      <div>
                        <Typography className="block">
                          Code: {country.countryCode}
                        </Typography>
                      </div>
                    }
                    className="px-3"
                  />
                </List.Item>
              </Link>
            )}
          />
        </div>
      </Card>
    </div>
  )
}
