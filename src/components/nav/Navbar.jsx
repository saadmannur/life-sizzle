import Link from "next/link";
import NavLinks from "./NavLinks";
import NavSession from "./NavSession";
import NavColor from "./NavColor";

const Navbar = () => {
    return (
        <NavColor>
            <nav className="container mx-auto px-5 py-5">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2636B]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span className="text-2xl font-extrabold text-[#26313B]">
                            Life<span className="text-[#E2636B]">Sizzle</span>
                        </span>
                    </Link>

                    {/* Mobile menu — pure CSS (daisyUI tabIndex trick), keeps Navbar a server component */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#26313B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul tabIndex={-1} className="menu dropdown-content menu-sm z-1 mt-3 w-64 rounded-box bg-white p-4 shadow-lg">
                            <li><NavLinks href="/">Home</NavLinks></li>
                            <li><NavLinks href="/public-lessons">Public Lessons</NavLinks></li>
                            <li className="mt-2 border-t border-black/10 pt-2">
                                {/* Protected links + auth actions, client-rendered based on session */}
                                <NavSession variant="mobile" />
                            </li>
                        </ul>
                    </div>

                    {/* Center nav links — desktop only */}
                    <ul className="hidden items-center gap-8 lg:flex">
                        <li><NavLinks href="/">Home</NavLinks></li>
                        <li><NavLinks href="/public-lessons">Public Lessons</NavLinks></li>
                    </ul>

                    {/* Right side: protected links + auth actions */}
                    <div className="hidden lg:block">
                        <NavSession />
                    </div>
                </div>
            </nav>
        </NavColor>
    );
};

export default Navbar;