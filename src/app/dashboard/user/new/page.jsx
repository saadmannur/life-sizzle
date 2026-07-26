"use client";

// import { postLessonData } from "@/api/postData";
import { createLesson } from "@/lib/actions/lessons";
import { updateLesson } from "@/lib/api/updateLesson";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";
import {
    Button,
    TextField,
    Input,
    Label,
    TextArea,
    FieldError,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FiLoader, FiLogIn } from "react-icons/fi";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { PiFireBold, PiCloudRainBold, PiHandsPrayingBold, PiSparkleBold } from "react-icons/pi";
import { toast } from "sonner";

const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned", "Philosophy"];

const TONES = [
    { label: "Motivational", Icon: PiFireBold },
    { label: "Sad", Icon: PiCloudRainBold },
    { label: "Gratitude", Icon: PiHandsPrayingBold },
    { label: "Realization", Icon: PiSparkleBold },
];



const LessonForm = ({ initialData = null, isEdit = false }) => {
    const [category, setCategory] = useState(initialData?.category || "Personal Growth");
    const [tone, setTone] = useState(initialData?.tone || "Motivational");
    const [visibility, setVisibility] = useState(initialData?.visibility || "public");
    const [accessLevel, setAccessLevel] = useState(initialData?.accessLevel || "free");
    const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || null);
    const [headline, setHeadline] = useState(initialData?.headline || "");
    const [lesson, setLesson] = useState(initialData?.lesson || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, isPending } = authClient.useSession();
    const user = data?.user;
    // console.log(user);

    const isPremium = Boolean(user?.isPremium);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);

            const imageFile = formData.get("image");
            // console.log(imageFile);

            let imageUrl = initialData?.imageUrl || "";

            if (imageFile && imageFile.size > 0) {
                imageUrl = await uploadImage(imageFile);
            }

            const newLessonData = {
                ...Object.fromEntries(formData.entries()),
                category,
                tone,
                visibility,
                accessLevel,
                imageUrl,
                userId: user?.id,
                userEmail: user?.email,
                userName: user?.name,
                userImage: user?.image,

            };

            console.log(newLessonData);

            // const data = await postLessonData(newLessonData) // inside mongodb check
            // console.log(data);

            let data;

            if (isEdit) {
                data = await updateLesson(initialData._id, newLessonData);
            } else {
                data = await createLesson(newLessonData);
            }

            // const data = await createLesson(newLessonData)
            // console.log(data);

            if (isEdit) {
                toast.success("Lesson updated successfully");
            } else {
                toast.success("Lesson added successfully");
            }


            // TODO: redirect to /dashboard/recruiter/jobs or show a success toast
            e.target.reset();



        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
        finally {
            setIsSubmitting(false);
            redirect('/dashboard/user/my-lessons')
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <form
                onSubmit={handleSubmit}
                className="overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid lg:grid-cols-[360px_1fr]"
            >
                {/* Decorative left panel */}
                <div className="relative flex flex-col justify-center gap-6 bg-gradient-to-br from-[#26313B] to-[#1a2229] p-10 text-white">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80">
                        Knowledge Vault
                    </span>
                    <h1 className="text-4xl font-extrabold leading-tight">
                        Share Your <span className="italic text-[#E2636B]">Wisdom</span>
                    </h1>
                    <p className="text-sm italic leading-relaxed text-white/60">
                        &quot;Knowledge increases by sharing, but not by saving.&quot;
                    </p>
                </div>

                {/* Form fields */}
                <div className="space-y-8 p-6 sm:p-10">
                    <TextField name="headline" isRequired>
                        <Label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                            The Headline
                        </Label>

                        <Input
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            placeholder="What did life teach you?"
                            className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60"
                        />

                        <FieldError />
                    </TextField>

                    <TextField name="lesson" isRequired>
                        <Label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                            The Lesson
                        </Label>

                        <TextArea
                            value={lesson}
                            onChange={(e) => setLesson(e.target.value)}
                            rows={5}
                            placeholder="Tell the full story..."
                            className="w-full resize-none rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60"
                        />

                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {/* Category */}
                        <div>
                            <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                Category
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORIES.map((c) => (
                                    <button
                                        type="button"
                                        key={c}
                                        onClick={() => setCategory(c)}
                                        className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${category === c
                                            ? "bg-[#26313B] text-white"
                                            : "bg-[#FBF6EC] text-[#26313B] hover:bg-[#26313B]/10"
                                            }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Emotional tone */}
                        <div>
                            <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                Emotional Tone
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {TONES.map(({ label, Icon }) => (
                                    <button
                                        type="button"
                                        key={label}
                                        onClick={() => setTone(label)}
                                        className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${tone === label
                                            ? "bg-[#E2636B] text-white"
                                            : "bg-[#FBF6EC] text-[#26313B] hover:bg-[#E2636B]/10"
                                            }`}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visual context */}
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                            Visual Context (optional)
                        </label>
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#26313B]/15 bg-[#FBF6EC]/40 py-10 text-center transition-colors hover:border-[#E2636B]/40">
                            <input type="file" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                            {imagePreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={imagePreview} alt="Preview" className="h-24 rounded-lg object-cover" />
                            ) : (
                                <>
                                    <HiOutlineCloudArrowUp className="h-6 w-6 text-[#8A93A0]" />
                                    <span className="text-sm text-[#8A93A0]">Drop image or click</span>
                                </>
                            )}
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Visibility */}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                Visibility
                            </label>
                            <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                                className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 px-4 py-3 text-[#26313B] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                            >
                                <option value="public">Public — Visible to everyone</option>
                                <option value="private">Private — Only visible to you</option>
                            </select>
                        </div>

                        {/* Access level */}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                                Access Level
                            </label>
                            <select
                                value={accessLevel}
                                onChange={(e) => setAccessLevel(e.target.value)}
                                disabled={!isPremium}
                                title={!isPremium ? "Upgrade to Premium to create paid lessons" : undefined}
                                className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 px-4 py-3 text-[#26313B] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                            {!isPremium && (
                                <p className="mt-1.5 text-xs text-[#8A93A0]">Upgrade to Premium to create paid lessons.</p>
                            )}
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="category"
                        value={category}
                    />

                    <input
                        type="hidden"
                        name="tone"
                        value={tone}
                    />

                    <input
                        type="hidden"
                        name="visibility"
                        value={visibility}
                    />

                    <input
                        type="hidden"
                        name="accessLevel"
                        value={accessLevel}
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <Button type="submit" isDisabled={isSubmitting} className="w-full rounded-full bg-[#E2636B] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E2636B]/30 transition-opacity hover:opacity-90 sm:w-auto sm:px-10">
                        {isSubmitting ? (
                            <>
                                <FiLoader className="h-4 w-4 animate-spin" />
                                {isEdit ? "Updating..." : "Publish..."}
                            </>
                        ) : (
                            <>
                                <FiLogIn className="h-4 w-4" />
                                {isEdit ? "Update Lesson" : "Publish Lesson"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LessonForm;