import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full bg-gray-100">
      <Link href={"/countries"}>LISTA</Link>
      <Link href={"/countries/BR"}>BR</Link>
    </div>
  );
}
