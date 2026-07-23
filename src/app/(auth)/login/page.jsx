'use client'
// import { authClient } from '@/lib/auth-client';
import { Button, Separator, toast } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { toast } from 'react-toastify';


const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleLoginFunc = async (data) => {
        console.log(data)
        const { email, password } = data;

        // const { data: res, error } = await authClient.signIn.email({
        //     email: email,
        //     password: password,
        //     rememberMe: true,
        //     callbackURL: "/",
        // })
        // console.log('login response', {res, error})

        // if (error) {
        //     toast.error(error.message, {
        //         position: 'top-center',
        //     })
        // }

        // if (res) {
        //     toast.success("Login Successful", {
        //         position: 'top-center',
        //     })
        //     redirect('/')
        // }
    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='min-h-screen bg-[#FBF6EC] flex justify-center items-center px-5 py-16'>
            <div className="card w-full max-w-sm shrink-0 bg-white shadow-xl rounded-[2rem] border border-[#26313B]/5">
                <div className="card-body p-8">
                    <div className='text-center mb-2'>
                        <span className='inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-[#E2636B] mb-2'>
                            Welcome Back
                        </span>
                        <h2 className='text-3xl font-extrabold text-[#26313B]'>
                            Login to Your <span className='text-[#E2636B]'>Account</span>
                        </h2>
                        <p className='text-sm text-[#8A93A0] mt-1'>Pick up right where your last lesson left off.</p>
                    </div>
                    <form onSubmit={handleSubmit(handleLoginFunc)}>
                        <fieldset className="fieldset relative">
                            {/* email */}
                            <label className="label text-sm font-semibold text-[#26313B]">Email</label>
                            <input
                                {...register("email", {
                                    required: "Enter your email"
                                })}
                                type="email"
                                className="input w-full rounded-xl border border-[#26313B]/15 bg-[#FBF6EC]/60 focus:border-[#E2636B] focus:outline-none focus:ring-2 focus:ring-[#E2636B]/20"
                                placeholder="Email"
                            />
                            <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>

                            {/* password */}
                            <label className="label text-sm font-semibold text-[#26313B] mt-2">Password</label>
                            <div className='relative'>
                                <input
                                    {...register("password", {
                                        required: "Put your password",
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

                            <Button type='submit' className='rounded-full bg-[#E2636B] text-white font-semibold w-full mt-5 py-2.5 shadow-lg shadow-[#E2636B]/30 hover:opacity-90 transition-opacity'>Login</Button>
                        </fieldset>
                    </form>
                    <div className='flex justify-center items-center gap-3 overflow-hidden my-4'>
                        <Separator className="bg-[#26313B]/10"></Separator>
                        <div className="whitespace-nowrap text-sm text-[#8A93A0]">Or signin with google</div>
                        <Separator className="bg-[#26313B]/10"></Separator>
                    </div>
                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full rounded-full border border-[#26313B]/15 bg-white text-[#26313B] font-semibold hover:bg-[#FBF6EC] transition-colors" variant="outline">
                        <Icon icon="devicon:google" />
                        Sign in with Google
                    </Button>
                    <p className='text-sm text-[#8A93A0] text-center mt-2'>Do not have an account <span className='text-[#E2636B] font-semibold underline'><Link href={'/register'}>Sign up</Link></span></p>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;