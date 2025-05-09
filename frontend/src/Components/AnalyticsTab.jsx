import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import axios from '../lib/axios';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from "./LoadingSpinner";

// Define colors that work reasonably well on both light/dark backgrounds for chart
const chartAxisColor = '#9CA3AF'; // gray-400
const chartLine1Color = '#914ad8'; // primary
const chartLine2Color = '#8c45cb'; // secondary

function AnalyticsTab() {

  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [dailySalesData, setDailySalesData] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axios.get("/analytics");
        setAnalyticsData(res.data.analyticsData);
        // Ensure data has 'name' field for XAxis dataKey
        const formattedSalesData = res.data.dailySalesData.map(d => ({ ...d, name: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }));
        setDailySalesData(formattedSalesData);
      } catch (error) {
        console.error("Error fetching analytics data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [])

  if (isLoading) {
    // Use themed LoadingSpinner
    return (
      <div className="flex justify-center items-center w-full h-64">
        <LoadingSpinner fullscreen={false} />
        <p className="ml-3 text-foreground dark:text-dark-foreground">Loading analytics...</p>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={analyticsData.totalRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          icon={DollarSign}
        />
      </div>

      <motion.div
        className="bg-card/80 dark:bg-dark-card/80 rounded-lg p-6 shadow-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-dark-foreground">Daily Sales & Revenue</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartAxisColor} strokeOpacity={0.3} />
            <XAxis dataKey="name" stroke={chartAxisColor} tick={{ fill: chartAxisColor, fontSize: 12 }} />
            <YAxis yAxisId="left" stroke={chartAxisColor} tick={{ fill: chartAxisColor, fontSize: 12 }} />
            <YAxis yAxisId="right" stroke={chartAxisColor} orientation="right" tick={{ fill: chartAxisColor, fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '8px 12px',
              }}
              labelStyle={{
                color: 'var(--foreground)',
                marginBottom: '4px',
                fontWeight: '600'
              }}
              itemStyle={{ padding: '2px 0' }}
              cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Legend wrapperStyle={{ color: chartAxisColor, paddingTop: '10px' }} />
            <Line yAxisId="left" type="monotone" dataKey="sales" stroke={chartLine1Color} strokeWidth={2} activeDot={{ r: 6 }} name="Sales" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={chartLine2Color} strokeWidth={2} activeDot={{ r: 6 }} name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default AnalyticsTab

const AnalyticsCard = ({ title, value, icon: Icon }) => (
  <motion.div
    className={`bg-card dark:bg-dark-card rounded-lg p-6 shadow-lg overflow-hidden relative`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex justify-between items-start'>
      <div className='z-10'>
        <p className='text-primary/80 font-semibold text-sm mb-1'>{title}</p>
        <h3 className='text-3xl text-foreground dark:text-dark-foreground font-bold'>{value}</h3>
      </div>
      <div className='absolute -top-1 -right-1 text-primary/10 dark:text-primary/20 z-0'>
        <Icon className='h-20 w-20' />
      </div>
    </div>
  </motion.div>
);