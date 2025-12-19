"use client";

import Link from "next/link";
import { Mail, Phone, Github, Linkedin, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 text-gray-300 mt-16"
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Section */}
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-white">ContactManager</h2>
                        <p className="text-sm text-gray-400 mt-3">
                            A modern contact management system to securely store, organize,
                            and access your contacts anytime.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" className="hover:text-white transition">
                                    Contacts
                                </Link>
                            </li>
                            <li>
                                <Link href="/add_contacts" className="hover:text-white transition">
                                    Add Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-3">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="hover:text-white transition">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-3">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail size={16} /> bhosalerupeshh67@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} /> +91 80801 86885
                            </li>
                            <li className="flex items-center gap-3 mt-4">
                                <a href="#" className="hover:text-white transition">
                                    <Github size={18} />
                                </a>
                                <a href="#" className="hover:text-white transition">
                                    <Linkedin size={18} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} ContactManager. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-500" /> using Next.js & Tailwind
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}
