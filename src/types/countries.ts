export type Country = {
  countryCode: string
  name: string
}

export type CountryInfo = {
  code: string
  name: string
  flag: string
  borders: { commonName: string; countryCode: string }[]
  population: { year: number; value: number }[]
}
