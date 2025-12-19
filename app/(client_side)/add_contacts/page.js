"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Save,
} from "lucide-react";
import axios from "axios";

export default function AddContactPage() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        address: "",
        notes: "",
        favorite: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.post("/api/addContact", formData);

            if (response.status === 201) {
                toast.success("Contact added successfully!");

                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    company: "",
                    jobTitle: "",
                    address: "",
                    notes: "",
                    favorite: false,
                });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.error || "Failed to save contacts"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
            >
                <div className="flex justify-center mb-3">
                    <div className="p-4 rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
                        <User size={40} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Add New Contact
                </h1>

                <p className="text-gray-500 mt-2">
                    Fill in the details below to save a new contact
                </p>
            </motion.div>

            {/* Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6 space-y-6"
            >
                {/* Name */}
                <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                        label="First Name"
                        icon={User}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Last Name"
                        icon={User}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                        label="Email"
                        icon={Mail}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Phone Number"
                        icon={Phone}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Work */}
                <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                        label="Company"
                        icon={Briefcase}
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Job Title"
                        icon={Briefcase}
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />
                </div>

                {/* Address */}
                <InputField
                    label="Address"
                    icon={MapPin}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

                {/* Notes */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Notes
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Additional information..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Favorite */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="favorite"
                        checked={formData.favorite}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
            Mark as favorite
          </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                    <Link
                        href="/contacts"
                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-white transition
              ${
                            loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }
            `}
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Contact
                            </>
                        )}
                    </button>
                </div>
            </motion.form>
        </div>
    );
}

/* Reusable Input Component */
function InputField({ label, icon: Icon, ...props }) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative mt-1">
                <Icon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    {...props}
                    className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>
    );
}
