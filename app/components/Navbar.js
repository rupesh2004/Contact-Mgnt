"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, PlusCircle, Home } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const navLinks = [
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Contacts", href: "/contacts", icon: Users },
        { name: "Add Contact", href: "/add_contacts", icon: PlusCircle },
    ];

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ContactManager
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = pathname === link.href;
                            return (
                                <motion.div key={link.name} whileHover={{ y: -2 }}>
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 \
                    ${active
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"}`}
                                    >
                                        <Icon size={18} />
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2 rounded-xl hover:bg-gray-100"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t overflow-hidden"
                    >
                        <div className="flex flex-col px-4 py-4 gap-3">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all \
                    ${active
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100"}`}
                                    >
                                        <Icon size={18} />
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-50">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
