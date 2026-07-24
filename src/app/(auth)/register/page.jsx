'use client'

import { authClient } from '@/lib/auth-client';
import { Button, Separator } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLoader, FiUserPlus } from 'react-icons/fi';
import { toast } from 'sonner';

const RegisterPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const validateConfirmPassword = watch('password')

    const handleLoginFunc = async (data) => {
        setIsSubmitting(true);
        // console.log(data)
        const { name, email, photo, password, confirmPassword } = data;

        const { data: res, error } = await authClient.signUp.email({
            name: name,
            email: email,
            image: photo,
            password: password,
            confirmPassword: confirmPassword,
        })
        // console.log('signup response', {res, error});

        if (error) {
            toast.error(error.message)
            setIsSubmitting(false);
            return
        }

        if (res) {
            toast.success("Sign Up Successful")
            redirect('/')
        }

    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className='min-h-screen bg-[#FBF6EC] flex justify-center items-center px-5 py-16'>
            <div className="card w-full max-w-sm shrink-0 bg-white shadow-xl rounded-[2rem] border border-[#26313B]/5">
                <div className="card-body p-8">
                    <div className='text-center mb-2'>
                        <span className='inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B] mb-2'>
                            Join LifeSizzle
                        </span>
                        <h2 className='text-3xl font-extrabold text-[#26313B]'>
                            Create Your <span className='text-[#E2636B]'>Account</span>
                        </h2>
                        <p className='text-sm text-[#8A93A0] mt-1'>Start writing the lessons only you can tell.</p>
                    </div>
                    <form onSubmit={handleSubmit(handleLoginFunc)}>
                        <fieldset className="fieldset">

                            {/* name */}
                            <label className="label text-sm font-semibold text-[#26313B]">Name</label>
                            <input
                                {...register("name", {
                                    required: "Enter your name"
                                })}
                                type="name"
                                className="input w-full rounded-xl border border-[#26313B]/15 bg-[#FBF6EC]/60 focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                placeholder="Name"
                            />
                            <p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>


                            {/* email */}
                            <label className="label text-sm font-semibold text-[#26313B] mt-2">Email</label>
                            <input
                                {...register("email", {
                                    required: "Enter your email"
                                })}
                                type="email"
                                className="input w-full rounded-xl border border-[#26313B]/15 bg-[#FBF6EC]/60 focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                placeholder="Email"
                            />
                            <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>

                            {/* photo url */}
                            <label className="label text-sm font-semibold text-[#26313B] mt-2">Photo Url</label>
                            <input
                                {...register("photo", {
                                    required: "Enter your photo url"
                                })}
                                type="text"
                                className="input w-full rounded-xl border border-[#26313B]/15 bg-[#FBF6EC]/60 focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                placeholder="Photo url"
                            />
                            <p className='text-red-500 text-xs mt-1'>{errors.photo?.message}</p>


                            {/* password */}
                            <label className="label text-sm font-semibold text-[#26313B] mt-2">Password</label>
                            <div className='relative'>
                                <input
                                    {...register("password", {
                                        required: "Set a password",
                                        minLength: {
                                            value: 8,
                                            message: "Minimum length 8"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                            message: "Password must contain uppercase, lowercase and a number"
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="input w-full rounded-xl border border-[#26313B]/15 bg-[#FBF6EC]/60 focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                    placeholder="Password"
                                />
                                <span
                                    className='absolute top-2.5 right-3 cursor-pointer text-[#8A93A0] hover:text-[#E2636B]'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword ?
                                            <span className='text-xl'><FaEye /></span> :
                                            <span className='text-xl'><FaEyeSlash /></span>
                                    }
                                </span>
                            </div>
                            <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>


                            {/* confirm password */}
                            <label className="label text-sm font-semibold text-[#26313B] mt-2">Confirm Password</label>
                            <div className='relative'>
                                <input
                                    {...register("confirmPassword", {
                                        required: "Conform password is required",
                                        validate: (value) => value === validateConfirmPassword || "Confirm password must be same",
                                    })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="input w-full rounded-xl border border-[#26313B]/15 bg-[#FBF6EC]/60 focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                    placeholder="Conform Password"
                                />
                                <span
                                    className='absolute top-2.5 right-3 cursor-pointer text-[#8A93A0] hover:text-[#E2636B]'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {
                                        showConfirmPassword ?
                                            <span className='text-xl'><FaEye /></span> :
                                            <span className='text-xl'><FaEyeSlash /></span>
                                    }
                                </span>
                            </div>
                            <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword?.message}</p>


                            <Button type="submit" isDisabled={isSubmitting} className='rounded-full bg-[#E2636B] text-white font-semibold w-full mt-5 py-2.5 shadow-lg shadow-[#E2636B]/30 hover:opacity-90 transition-opacity'>
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <FiUserPlus className="h-4 w-4" />
                                        Sign up
                                    </>
                                )}
                            </Button>
                        </fieldset>
                    </form>
                    <div className='flex justify-center items-center gap-3 overflow-hidden my-4'>
                        <Separator className="bg-[#26313B]/10"></Separator>
                        <div className="whitespace-nowrap text-sm text-[#8A93A0]">Or sign up with google</div>
                        <Separator className="bg-[#26313B]/10"></Separator>
                    </div>

                    {/* google sign up */}
                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full rounded-full border border-[#26313B]/15 bg-white text-[#26313B] font-semibold hover:bg-[#FBF6EC] transition-colors" variant="outline">
                        <Icon icon="devicon:google" />
                        Sign up with Google
                    </Button>
                    <p className='text-sm text-[#8A93A0] text-center mt-2'>Already have an account <span className='text-[#E2636B] font-semibold underline'><Link href={'/login'}>Login</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;