import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { GET_All_Order } from '../../../../rtk/slices/OrderAdmin-slice';

export default function SalesChart() {
const { data : orders } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_All_Order());
  }, [dispatch]);

   // Transform orders data for the chart
   const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // Aggregate sales data by month
    const salesByMonth = orders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleString('en-US', {
        month: 'short',
      });

      if (!acc[month]) {
        acc[month] = {
          name: month,
          Sales: 0,
        };
      }

      // Calculate total sales for the order
      const orderSales = order.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      acc[month].Sales += orderSales;
      return acc;
    }, {});

    // Convert object to array for Recharts
    return Object.values(salesByMonth);
  }, [orders]);

  return (
    <div className="mt-10 mb-10 flex justify-center h-[400px]">
      <BarChart
        width={800}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="Sales" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
