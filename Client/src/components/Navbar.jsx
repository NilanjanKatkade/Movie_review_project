import { Link } from 'react-router';
import Logo from '../assets/poster-movie.avif';
import { Search } from 'lucide-react'
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import { HelpCircle, Settings, LogOut } from 'lucide-react';
const Navbar = () => {
    const { user ,logout} = useAuthStore();
    const [showMenu, setShowMenu] = useState(false);
    const handleLogout = async () => {
        const {message}= await logout();
        toast.success(message);
        useAuthStore.setState({ message: null }); // reset after showing
        setShowMenu(false);
    }
    const AvatarURL = user ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username)}&backgroundColor=e50914&backgroundType=solid` : "";
    return (
        <div>
            <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
                <Link to='/'>
                    <img src={Logo} alt='Logo' className="w-24 cursor-pointer brightness-125" />
                </Link>
                <ul className="hidden xl:flex space-x-6">
                    <li className='cursor-pointer hover:text-[#e50914]'>Home</li>

                    <li className='cursor-pointer hover:text-[#e50914]'>Tv Shows</li>
                    <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
                    <li className='cursor-pointer hover:text-[#e50914]'>Anime</li>
                    <li className='cursor-pointer hover:text-[#e50914]'>Games</li>
                    <li className='cursor-pointer hover:text-[#e50914]'>New & Popular</li>
                </ul>
                <div className="flex items-center space-x-4 relative">
                    <div className="relative hidden md:inline-flex">
                        <input type="text" className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none" placeholder="search..." />
                        <Search className='absolute top-2 right-4 w-5 h-5' />
                    </div>
                    
                    <Link to = {user ? "ai-recommendations": "signin"}><button className="bg-[#e50914] rounded-tr-xl  px-5 py-2 text-white cursor-pointer">Get Ai Movie</button></Link>
                        
                    {!user ? <Link to={"/SignIn"}>
                        <button className="border border-[#333333] py-2 px-4 cursor-pointer">Sign In</button>
                    </Link> :( <div onClick={() => setShowMenu(!showMenu)} className="w-10 h-10 rounded-full overflow-hidden border border-gray-600" >
                        <img src={AvatarURL} alt={user.username} className="w-full h-full object-cover b" />
                        
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                                <div className="flex flex-col items-center mb-2">
                                    <span className="text-white font-semibold text-base">
                                        {user.username}
                                    </span>
                                    <span className="text-xs text-gray-400">{user.email}</span>
                                </div>

                                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                                    <HelpCircle className="w-5 h-5" />
                                    Help Center
                                </button>

                                <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                                    <Settings className="w-5 h-5" />
                                    Settings
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>)
                    }
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar
