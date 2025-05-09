import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import CreateProductForm from '../components/CreateProductForm';
import ProductsList from '../components/ProductsList';
import AnalyticsTab from '../components/AnalyticsTab';
import { useProductStore } from '../stores/useProductStore';

const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircle },
    { id: "products", label: "Products", icon: ShoppingBasket },
    { id: "analytics", label: "Analytics", icon: BarChart },
];

function AdminPage() {
    const [activeTab, setActiveTab] = useState("create");
    const { fetchAllProducts } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts])



    return (
        <div className='min-h-screen relative overflow-hidden'>
            <div className='relative z-10 container mx-auto px-4 py-16'>
                <motion.h1 className='text-4xl font-bold text-center text-primary mb-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Admin Dashboard
                </motion.h1>
                <div className='flex justify-center flex-wrap mb-8 gap-2'>
                    {tabs.map((tab) => (
                        <button key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={` px-4 py-2 rounded-md flex items-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background ${activeTab === tab.id
                                ? 'bg-primary text-primary-foreground focus:ring-primary'
                                : 'bg-border text-foreground/70 hover:bg-border/80 dark:bg-dark-border dark:text-dark-foreground/70 dark:hover:bg-dark-border-hover focus:ring-primary/50'
                                }`}
                        >
                            <tab.icon className='mr-2 h-5 w-5' />
                            {tab.label}
                        </button>
                    ))}
                </div>
                {activeTab === "create" && <CreateProductForm />}
                {activeTab === "products" && <ProductsList />}
                {activeTab === "analytics" && <AnalyticsTab />}
            </div>
        </div>
    )

}

export default AdminPage