import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface LogoProps {
    isDarkMode: boolean | undefined;
}

const Logo = ({ isDarkMode }: LogoProps) => {
    return (
        <Link href="https://askaitools.ai" className="flex items-center justify-center md:justify-start">
                <Image
                    src={isDarkMode ? '/images/logo-wordmark--dark.svg' : '/images/logo-wordmark--light.svg'}
                    alt="Logo"
                    height={30}
                    width={30}
                />
                <span className={`ml-3 font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Your Product Name
                </span>
        </Link>
    );
};

const SocialMediaLinks = ({ isDarkMode }: LogoProps) => {
    return (
        <>
            {/* Replace with your actual social media links */}
            <a className="flex mr-3" href="https://askaitools.ai" target="_blank" rel="noopener">
                <Image src='/images/Gmail_logo.svg' alt="Email" height={24} width={30}/>
            </a>
            <a className="flex mr-3" href="https://askaitools.ai" target="_blank" rel="noopener">
                <Image
                    src={isDarkMode ? '/images/TwitterX_logo--dark.png' : '/images/TwitterX_logo--light.png'}
                    alt="Twitter (X)"
                    height={24}
                    width={24}
                />
            </a>
            <a className="flex" href="https://askaitools.ai" target="_blank" rel="noopener">
                <Image src='/images/Jike_logo.png' alt="Jike" height={24} width={24}/>
            </a>
        </>
    );
};

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="relative flex w-full items-center border-b bg-white px-6 lg:px-16 xl:px-20">
            <div className="flex-1 flex justify-center md:justify-start p-4 pr-10">
                <Logo isDarkMode={false} />
            </div>
            <div className="hidden md:flex flex-1 justify-end">
                <SocialMediaLinks isDarkMode={false} />
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>
            <div className={`${isMenuOpen ? 'fixed' : 'hidden'} overflow-hidden inset-0 w-screen h-screen bg-white shadow-md z-50`}>
                <div className="flex flex-col w-full h-full">
                    <div className="flex justify-between items-center border-b bbg-scale-300">
                        <div className="flex justify-center w-full p-4">
                            <Logo isDarkMode={false} />
                        </div>
                        <button onClick={() => setIsMenuOpen(false)} className="pr-10">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {/* Replace with your actual social media links */}
                    <div className="flex flex-col overflow-y-auto p-4">
                        <a href="https://askaitools.ai" target="_blank" rel="noopener" className="p-4 border-b border-gray-600 text-center">Email</a>
                        <a href="https://askaitools.ai" target="_blank" rel="noopener" className="p-4 border-b border-gray-600 text-center">Twitter</a>
                        <a href="https://askaitools.ai" target="_blank" rel="noopener" className="p-4 border-b border-gray-600 text-center">Jike</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
