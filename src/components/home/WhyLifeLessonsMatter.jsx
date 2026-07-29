import BenefitCardsMotion from "./BenefitCardsMotion";


const WhyLifeLessonsMatter = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mx-auto mb-10 max-w-xl text-center">
                    <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B]">
                        Why This Matters
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#26313B] sm:text-3xl">
                        Why Learning From Life Matters
                    </h2>
                </div>

                <BenefitCardsMotion />
            </div>
        </section>
    );
};

export default WhyLifeLessonsMatter;