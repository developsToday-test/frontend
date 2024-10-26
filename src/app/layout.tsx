import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

export const metadata: Metadata = {
  title: 'Countries',
  description: 'A list of countries',
}

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin-ext'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`container m-auto ${inter.className}`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
