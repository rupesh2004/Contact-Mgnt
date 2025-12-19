"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
    User,
    Phone,
    Mail,
    Building2,
    Briefcase,
    MapPin,
    StickyNote,
    Calendar,
    Pencil,
    Trash2,
    Save,
    X,
    ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AllContactInfoPage() {
    const { id } = useParams();
    const router = useRouter();

    const [contact, setContact] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`/api/fetchContacts/${id}`);
                setContact(res.data.contact);
                setFormData(res.data.contact);
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.error || "Failed to fetch contact");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchContact();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            setSaving(true);
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                jobTitle: formData.jobTitle,
                address: formData.address,
                notes: formData.notes,
            };

            const res = await axios.put(`/api/fetchContacts/${id}`, updateData);
            if (res.status === 200) {
                setContact({ ...contact, ...updateData });
                setEditMode(false);
                toast.success("Contact updated successfully");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this contact?")) return;

        try {
            await axios.delete(`/api/fetchContacts/${id}`);
            toast.success("Contact deleted successfully");
            router.push("/contacts");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (!contact) return <p className="p-6">Contact not found</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 mb-6 cursor-pointer"
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* HEADER */}
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-6 text-white flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white">
                        {contact.firstName?.[0]}
                    </div>

                    <div className="flex-1">
                        {editMode ? (
                            <div className="space-y-2">
                                <input
                                    name="firstName"
                                    value={formData.firstName || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg px-3 py-1 text-black bg-white"
                                />
                                <input
                                    name="lastName"
                                    value={formData.lastName || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-lg px-3 py-1 text-black bg-white"
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold">
                                    {contact.firstName} {contact.lastName}
                                </h2>
                                <p className="opacity-90">{contact.email}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 p-4 border-b">
                    {!editMode ? (
                        <>
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 cursor-pointer"
                            >
                                <Pencil size={16} /> Update
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 cursor-pointer"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white cursor-pointer"
                            >
                                <Save size={16} />
                                {saving ? "Saving..." : "Save"}
                            </button>

                            <button
                                onClick={() => {
                                    setFormData(contact);
                                    setEditMode(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 cursor-pointer"
                            >
                                <X size={16} /> Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </>
                    )}
                </div>

                {/* DETAILS */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Editable label="Phone" name="phone" icon={<Phone />} />
                    <Editable label="Email" name="email" icon={<Mail />} />
                    <Editable label="Company" name="company" icon={<Building2 />} />
                    <Editable label="Job Title" name="jobTitle" icon={<Briefcase />} />
                    <Editable label="Address" name="address" icon={<MapPin />} />
                    <Editable
                        label="Created At"
                        value={new Date(contact.createdAt).toDateString()}
                        icon={<Calendar />}
                        readOnly
                    />
                </div>

                {/* NOTES */}
                <div className="p-6 pt-0">
                    <p className="font-medium mb-2 flex items-center gap-2">
                        <StickyNote size={16} /> Notes
                    </p>
                    {editMode ? (
                        <textarea
                            name="notes"
                            value={formData.notes || ""}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                            rows={4}
                        />
                    ) : (
                        <p className="bg-gray-50 rounded-xl p-4">
                            {contact.notes || "No notes added"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    function Editable({ label, name, icon, value, readOnly }) {
        return (
            <div className="bg-gray-50 rounded-xl p-4 flex gap-3">
                <div className="text-blue-600">{icon}</div>
                <div className="flex-1">
                    <p className="text-gray-500">{label}</p>
                    {editMode && !readOnly ? (
                        <input
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-1"
                        />
                    ) : (
                        <p className="font-medium break-all">{value || contact[name] || "—"}</p>
                    )}
                </div>
            </div>
        );
    }
}
