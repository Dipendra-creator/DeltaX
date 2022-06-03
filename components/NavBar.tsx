import Link from "next/link";

function NavBar() {
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/">
                <span className="px-4 py-2 bg-gray-200 self-center text-gray-700 text-xl font-semibold whitespace-nowrap rounded">HOME</span>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <div className="flex items-center">
                        <input type="text" className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none" placeholder="Search" />
                        <div className="px-4 py-2 text-gray-700 bg-gray-200 rounded-r-lg">
                        <svg className="w-6 h-6 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default NavBar;