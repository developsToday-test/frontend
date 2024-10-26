'use client'

import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type LineChartProps = {
  categories: string[]
  data: { name: string; data: number[] }[]
}

export const LineChart: React.FC<LineChartProps> = ({ categories, data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      categories,
      labels: {
        show: true,
        rotate: -90,
      },
    },
  }

  const series = data.map(({ name, data }) => ({
    name,
    data,
  }))

  return (
    <>
      <ApexChart type="line" options={options} series={series} />
    </>
  )
}
