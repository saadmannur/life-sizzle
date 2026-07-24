import React from 'react';
import { PiBookOpenTextBold } from 'react-icons/pi';

const loading = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#FBF6EC]">
            <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E2636B]/20 border-t-[#E2636B]" />
                <PiBookOpenTextBold className="absolute text-2xl text-[#E2636B]" />
            </div>
            <p className="text-sm font-medium text-[#8A93A0]">Gathering your lessons...</p>
        </div>
    );
};

export default loading;