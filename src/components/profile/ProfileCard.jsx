"use client";

import { useState } from "react";
import Image from "next/image";
import { PiPencilSimpleBold, PiCheckBold, PiXBold } from "react-icons/pi";
import { IoDiamond } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions/profile";

const ProfileCard = ({ user, totalCreated, totalSaved }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [photoUrl, setPhotoUrl] = useState(user?.image || "");
    const [saving, setSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState(null);

    const router = useRouter();

    const handleCancel = () => {
        setName(user?.name || "");
        setPhotoUrl(user?.image || "");
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const result = await updateProfile({
                name,
                image: photoUrl,
            });

            if (result.modifiedCount > 0) {
                toast.success("Profile updated successfully");

                setIsEditing(false);

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
        <div className="relative rounded-2xl border border-[#26313B]/8 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#E2636B]/15">
                    {(isEditing ? photoUrl : user?.image) ? (
                        <Image src={isEditing ? photoUrl : user.image} alt={name || "Profile photo"} fill className="object-cover" />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#E2636B]">
                            {name?.[0]?.toUpperCase() || "U"}
                        </span>
                    )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                    {!isEditing ? (
                        <>
                            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                <h1 className="text-2xl font-extrabold text-[#26313B]">{user?.name}</h1>
                                {user?.isPremium && (
                                    <span className="flex items-center gap-1 rounded-full bg-[#6366F1]/10 px-2.5 py-1 text-xs font-bold text-[#6366F1]">
                                        <IoDiamond className="h-3 w-3" /> Premium
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-sm text-[#8A93A0]">{user?.email}</p>

                            <div className="mt-5 flex justify-center gap-6 sm:justify-start">
                                <div>
                                    <p className="text-xl font-extrabold text-[#26313B]">{totalCreated}</p>
                                    <p className="text-xs text-[#8A93A0]">Lessons Created</p>
                                </div>
                                <div>
                                    <p className="text-xl font-extrabold text-[#26313B]">{totalSaved}</p>
                                    <p className="text-xs text-[#8A93A0]">Lessons Saved</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#26313B]/15 px-5 py-2 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                            >
                                <PiPencilSimpleBold className="h-4 w-4" />
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
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

                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 rounded-full bg-[#E2636B] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                                >
                                    <PiCheckBold className="h-4 w-4" />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 rounded-full border border-[#26313B]/15 px-5 py-2.5 text-sm font-semibold text-[#26313B] hover:bg-[#FBF6EC]"
                                >
                                    <PiXBold className="h-4 w-4" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {savedMessage && (
                <div className="absolute bottom-4 right-4 rounded-full bg-[#26313B] px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    {savedMessage}
                </div>
            )}
        </div>
    );
};

export default ProfileCard;