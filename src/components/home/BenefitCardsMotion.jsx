"use client";

import { motion } from "motion/react";
import { PiBookOpenTextBold, PiHeartBold, PiUsersThreeBold, PiSparkleBold } from "react-icons/pi";

const BENEFITS = [
    {
        icon: PiBookOpenTextBold,
        title: "Nothing Gets Forgotten",
        description: "Write it down once, and find the exact lesson years later — in your own words, as you understood it then.",
    },
    {
        icon: PiSparkleBold,
        title: "Reflection Becomes Routine",
        description: "A quiet place to process what just happened, instead of letting a hard-won insight slip past unnoticed.",
    },
    {
        icon: PiUsersThreeBold,
        title: "Borrowed Wisdom, Freely",
        description: "Read what strangers paid dearly to learn — without having to pay the same price yourself.",
    },
    {
        icon: PiHeartBold,
        title: "Growth You Can See",
        description: "Track how your own thinking has shifted over time, one honest lesson at a time.",
    },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BenefitCardsMotion = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
            {BENEFITS.map(({ icon: Icon, title, description }) => (
                <motion.div
                    key={title}
                    variants={itemVariants}
                    className="rounded-2xl border border-[#26313B]/8 bg-[#FBF6EC] p-6 transition-shadow hover:shadow-md"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E2636B]/10 text-[#E2636B]">
                        <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-[#26313B]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7684]">{description}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default BenefitCardsMotion;