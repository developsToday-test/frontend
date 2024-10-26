"use client"
import { Country } from "@/types/countries";
import { FlagOutlined } from "@ant-design/icons";
import { Card, List, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);

  async function fetchData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE}/country`).then((res) => res.json())
    setCountries(response)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full flex flex-col gap-10 max-w-2xl bg-white shadow-md rounded-lg">
        <h1 className="text-4xl">
          List of countries
        </h1>
        <div className="h-96 overflow-auto pr-10 mt-3">
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
                        <span className="text-lg font-semibold">{country.name}</span>
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
  );
};
