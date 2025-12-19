"use client";

import {
    Users,
    PlusCircle,
    ShieldCheck,
    Search,
    Cloud,
    Clock,
    Star,
    Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DashboardPage() {
    const [totalContacts, setTotalContacts] = useState(0);
    const  [recentlyAdded, setRecentlyAdded] = useState(0);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/dashboardConfig");
                setTotalContacts(response.data.total);
                setRecentlyAdded(response.data.recentlyAdded);
                setFavorite(response.data.favorite);
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || "Failed to load dashboard data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const features = [
        {
            title: "Add & Manage Contacts",
            desc: "Create, update, and delete contacts with ease.",
            icon: PlusCircle,
        },
        {
            title: "Quick Search",
            desc: "Find contacts instantly using smart search.",
            icon: Search,
        },
        {
            title: "Secure Storage",
            desc: "Your contacts are stored safely and securely.",
            icon: ShieldCheck,
        },
        {
            title: "Cloud Sync",
            desc: "Access your contacts anytime, anywhere.",
            icon: Cloud,
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Centralized overview of your Contact Management System
                </p>
            </motion.div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Total Contacts */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Total Contacts</p>
                            <h2 className="text-4xl font-extrabold">
                                {loading ? "..." : totalContacts}
                            </h2>
                        </div>
                    </div>
                </motion.div>

                {/* Added This Month */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                            <Clock size={26} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Added This Month</p>
                            <h3 className="text-3xl font-bold text-gray-800">
                                {recentlyAdded}
                            </h3>
                        </div>
                    </div>
                </motion.div>

                {/* Favorites */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <Star size={26} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Favorites</p>
                            <h3 className="text-3xl font-bold text-gray-800">{favorite}</h3>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Features */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Features
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
                            >
                                <div className="p-3 w-fit rounded-xl bg-blue-100 text-blue-600 mb-3">
                                    <Icon size={22} />
                                </div>
                                <h3 className="font-semibold text-gray-800">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Activity */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-6 shadow-md"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                        <Activity size={20} />
                    </div>
                    <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                </div>
                <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Added new contact "Rahul Sharma"</li>
                    <li>• Updated phone number for "Anita Patel"</li>
                    <li>• Removed duplicate contact "John Doe"</li>
                </ul>
            </motion.section>
        </div>
    );
}
