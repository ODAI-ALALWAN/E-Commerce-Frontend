
import {  BarChart,
    Bar,
    XAxis,

    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, } from 'recharts';


export default function SalesChart() {
    const data = [
        {
          name: 'Jan',
          uv: 4000,
          Sales: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          uv: 3000,
          Sales: 1398,
          amt: 2210,
        },
        {
          name: 'Mrch',
          uv: 2000,
          Sales: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          uv: 2780,
          Sales: 3908,
          amt: 2000,
        },
        {
            name: 'May',
            uv: 2780,
            Sales: 3908,
            amt: 2000,
        },
        {
            name: 'Jun',
            uv: 2780,
            Sales: 10908,
            amt: 2000,
        },

      ];
  return (
    <div className='mt-10 mb-10 flex justify-center h-[400px]'>
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis/>
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="Sales" fill="#8884d8"  />
    </BarChart>
    </div>
  )
}
