"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { Select, Label, ListBox } from "@heroui/react";
import { FiSearch, FiX } from "react-icons/fi";

// TODO: ideally fetch these distinct values from your DB (e.g. a /api/lessons/meta endpoint)
const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned", "Philosophy"];

const TONES = [
    "Motivational",
    "Sad",
    "Gratitude",
    "Realization",
];

const FilterLessons = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const debounceRef = useRef(null);
    const isFirstRender = useRef(true);

    const updateParam = useCallback(
        (key, value) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== "all") {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            // params.delete("page");
            router.push(`${pathname}?${params.toString()}`);
            console.log(key, value);
        },
        [router, pathname, searchParams]
    );

    // debounce the search input so we don't refetch on every keystroke
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            updateParam("search", search);
        }, 500);
        return () => clearTimeout(debounceRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const clearAll = () => {
        setSearch("");
        router.push(pathname);
    };

    const hasActiveFilters =
        searchParams.get("tone") || searchParams.get("category") || searchParams.get("search");

    return (
        <div className="container mx-auto rounded-2xl border border-[#26313B]/8 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
                {/* Search */}
                <div className="flex-1">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                        Search
                    </label>
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A93A0]" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search lessons by title..."
                            className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 py-2.5 pl-9 pr-3 text-sm text-[#26313B] placeholder:text-[#8A93A0] focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                        />
                    </div>
                </div>

                {/* tone */}
                <div className="w-full md:w-48">
                    <Select
                        className="w-full"
                        value={searchParams.get("tone") || "all"}
                        onChange={(key) => updateParam("tone", key)}
                    >
                        <Label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                            Emotional Tone
                        </Label>
                        <Select.Trigger className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 p-2.5 text-sm text-[#26313B]">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="rounded-xl border border-[#26313B]/10 bg-white shadow-xl">
                            <ListBox>
                                <ListBox.Item
                                    id="all"
                                    textValue="All Emotional Tone"
                                    className="rounded-lg px-3 py-2 text-sm text-[#26313B] hover:bg-[#FBF6EC]"
                                >
                                    All Emotional Tone
                                </ListBox.Item>
                                {TONES.map((tone) => (
                                    <ListBox.Item
                                        key={tone}
                                        id={tone}
                                        textValue={tone}
                                        className="rounded-lg px-3 py-2 text-sm text-[#26313B] hover:bg-[#FBF6EC]"
                                    >
                                        {tone}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Category */}
                <div className="w-full md:w-48">
                    <Select
                        className="w-full"
                        value={searchParams.get("category") || "all"}
                        onChange={(key) => updateParam("category", key)}
                    >
                        <Label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8A93A0]">
                            Category
                        </Label>
                        <Select.Trigger className="w-full rounded-xl border border-[#26313B]/10 bg-[#FBF6EC]/60 p-2.5 text-sm text-[#26313B]">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="rounded-xl border border-[#26313B]/10 bg-white shadow-xl">
                            <ListBox>
                                <ListBox.Item
                                    id="all"
                                    textValue="All Categories"
                                    className="rounded-lg px-3 py-2 text-sm text-[#26313B] hover:bg-[#FBF6EC]"
                                >
                                    All Categories
                                </ListBox.Item>
                                {CATEGORIES.map((cat) => (
                                    <ListBox.Item
                                        key={cat}
                                        id={cat}
                                        textValue={cat}
                                        className="rounded-lg px-3 py-2 text-sm text-[#26313B] hover:bg-[#FBF6EC]"
                                    >
                                        {cat}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={clearAll}
                        className="flex shrink-0 items-center gap-1 rounded-full px-3 py-2.5 text-sm font-medium text-[#8A93A0] hover:text-[#E2636B]"
                    >
                        <FiX /> Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterLessons;