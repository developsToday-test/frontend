import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full w-full bg-gray-100">
      <Link href={'/countries'}>LISTA</Link>
      <Link href={'/countries/BR'}>BR</Link>
    </div>
  )
}
