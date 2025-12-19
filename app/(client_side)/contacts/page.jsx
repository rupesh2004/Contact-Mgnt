"use client";

import { Phone, User, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get("/api/fetchContacts");
                const allContacts =
                    response.data.allContacts || response.data.contacts || [];

                setContacts(allContacts);
                setFilteredContacts(allContacts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchQuery(value);

        const filtered = contacts.filter(
            (c) =>
                `${c.firstName} ${c.lastName}`.toLowerCase().includes(value) ||
                (c.phone || "").includes(value) ||
                (c.email || "").toLowerCase().includes(value)
        );

        setFilteredContacts(filtered);
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Contacts</h1>

                {/* Search Section */}
                <div className="relative flex items-center">
                    {/* Animated Search Input */}
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.input
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 360, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.55, ease: "easeInOut" }}
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search contacts..."
                                className="absolute right-12 rounded-full px-4 py-2 border shadow-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           bg-white text-sm"
                            />
                        )}
                    </AnimatePresence>

                    {/* Search Icon Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setSearchOpen(!searchOpen);
                            setSearchQuery("");
                            setFilteredContacts(contacts);
                        }}
                        className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600
                       flex items-center justify-center shadow-md text-white cursor-pointer"
                    >
                        {searchOpen ? <X size={18} /> : <Search size={18} />}
                    </motion.button>
                </div>
            </div>

            {/* CONTACT GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map((contact) => (
                    <motion.div
                        key={contact._id}
                        whileHover={{ scale: 1.03, y: -4 }}
                        onClick={() => router.push(`/contacts/${contact._id}`)}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl
                       p-5 flex items-center gap-4 cursor-pointer"
                    >
                        <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500
                            flex items-center justify-center">
                            <User className="text-white" />
                        </div>

                        <div className="flex-1">
                            <p className="text-lg font-semibold group-hover:text-blue-600">
                                {contact.firstName} {contact.lastName}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={14} />
                                {contact.phone || "No phone"}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredContacts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No contacts found
                </p>
            )}
        </div>
    );
}
