"use client";

import { useState } from "react";
import Image from "next/image";
import { PiPencilSimpleBold, PiCheckBold, PiXBold, PiShieldCheckBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions/profile";

const AdminProfileCard = ({ user, lessonsModerated = 0, actionsTaken = 0 }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [photoUrl, setPhotoUrl] = useState(user?.image || "");
    const [saving, setSaving] = useState(false);

    const openModal = () => {
        setName(user?.name || "");
        setPhotoUrl(user?.image || "");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        if (saving) return;
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const result = await updateProfile({ name, image: photoUrl });

            if (result?.modifiedCount > 0) {
                toast.success("Profile updated successfully");
                setIsModalOpen(false);
                router.refresh();
            } else {
                toast.info("No changes detected.");
            }
        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className="relative rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    {/* Avatar */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#E2636B]/15">
                        {user?.image ? (
                            <Image src={user.image} alt={user?.name || "Profile photo"} fill className="object-cover" />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#E2636B]">
                                {user?.name?.[0]?.toUpperCase() || "A"}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            <h1 className="text-2xl font-extrabold text-[#26313B]">{user?.name}</h1>
                            <span className="flex items-center gap-1 rounded-full bg-[#E2636B]/10 px-2.5 py-1 text-xs font-bold text-[#E2636B]">
                                <PiShieldCheckBold className="h-3 w-3" /> Admin
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-[#8A93A0]">{user?.email}</p>

                        <div className="mt-5 flex justify-center gap-6 sm:justify-start">
                            <div>
                                <p className="text-xl font-extrabold text-[#26313B]">{lessonsModerated}</p>
                                <p className="text-xs text-[#8A93A0]">Lessons Moderated</p>
                            </div>
                            <div>
                                <p className="text-xl font-extrabold text-[#26313B]">{actionsTaken}</p>
                                <p className="text-xs text-[#8A93A0]">Actions Taken</p>
                            </div>
                        </div>

                        <button
                            onClick={openModal}
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#26313B]/15 px-5 py-2 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                        >
                            <PiPencilSimpleBold className="h-4 w-4" />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit profile modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26313B]/40 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <h3 className="text-lg font-bold text-[#26313B]">Edit Profile</h3>
                            <button
                                onClick={closeModal}
                                disabled={saving}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#26313B]/8 text-[#26313B] hover:bg-[#26313B]/15 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <PiXBold className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E2636B]/15">
                                    {photoUrl ? (
                                        <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center text-lg font-bold text-[#E2636B]">
                                            {name?.[0]?.toUpperCase() || "A"}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-[#8A93A0]">Paste an image URL below to update your photo.</p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 px-4 py-2.5 text-sm text-[#26313B] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                    Photo URL
                                </label>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 px-4 py-2.5 text-sm text-[#26313B] placeholder:text-[#8A93A0] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full rounded-xl border border-[#26313B]/10 bg-[#26313B]/5 px-4 py-2.5 text-sm text-[#8A93A0]"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={closeModal}
                                disabled={saving}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#26313B]/15 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <PiXBold className="h-4 w-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E2636B] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <PiCheckBold className="h-4 w-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminProfileCard;