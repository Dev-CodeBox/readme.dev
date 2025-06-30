import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import dark_ss from '../assets/dark-ss.png'
import light_ss from '../assets/light-ss.png'
import BuyMeACoffee from '../utils/BuyMeACoffee';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f5f6f8] dark:bg-[#1a1b1f] min-h-screen flex flex-col font-sans text-[#2E2C2F] dark:text-gray-100 transition-colors duration-300">
            <header className="bg-white dark:bg-[#22252a] shadow-md sticky top-0 z-50">
                <nav className="container mx-auto flex items-center justify-between px-6 py-4">
                    <div className="text-xl font-bold cursor-pointer">
                        <span className="text-[#FDBA11]">readme</span>
                        <span className="text-current">.dev</span>
                    </div>
                    <button
                        onClick={() => navigate('/editor')}
                        className="bg-[#FFB703] hover:bg-[#e6a700] text-black font-semibold py-2 px-5 rounded transition duration-200 cursor-pointer"
                    >
                        Start Writing
                    </button>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-20 flex flex-col-reverse desktop-flex-row items-center justify-between flex-1">
                <div className="w-full desktop-w-1-2 text-center desktop-text-left space-y-6 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Create your <span className="text-[#FFB703]">README</span> file
                        <br />in seconds, not hours
                    </h1>
                    <p className="text-[#4A4A4A] dark:text-gray-300 text-lg leading-relaxed max-w-md mx-auto desktop-mx-0 desktop-max-w-lg mb-6 desktop-mb-10">
                        Don’t hustle writing <code>README.md</code> manually — just type your content and download a well-structured README instantly.
                    </p>

                    <button
                        onClick={() => navigate('/editor')}
                        className="bg-[#FDBA11] hover:bg-[#e2a600] text-black font-medium py-3 px-6 rounded-md transition-all duration-300 cursor-pointer"
                    >
                        Try It Now
                    </button>
                </div>

                <div className="w-full desktop-w-1-2 mb-12 desktop-mb-0 animate-fade-in-right">
                    <img
                        src={dark_ss}
                        alt="Screenshot of README Editor"
                        className="rounded-xl border border-gray-300 dark:border-gray-600 hidden dark:block shadow-xl transition-transform duration-500 hover:scale-105"
                    />
                    <img
                        src={light_ss}
                        alt="Screenshot of README Editor"
                        className="rounded-xl border border-gray-300 dark:border-gray-600 block dark:hidden shadow-xl transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </main>

            <footer className="bg-white dark:bg-[#22252a] border-t border-gray-200 dark:border-gray-700 text-sm">
                <div className="flex flex-col md:flex-row justify-between items-center px-6 py-5">
                    <div className="flex items-center gap-4 text-xl">
                        <a
                            href="https://github.com/Dev-CodeBox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#FDBA11] transition"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://x.com/dev_tweetbot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1DA1F2] transition"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/dev-raj-singh04/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#0077B5] transition"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                    <h3 className="text-xl font-bold mb-2 md:mb-0">
                        <span className="text-[#FDBA11]">readme</span>
                        <span className="text-current">.dev</span>
                    </h3>
                </div>
            </footer>

            <BuyMeACoffee position="bottom-20" />
        </div>
    );
}

export default Home;
