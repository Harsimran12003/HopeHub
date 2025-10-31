const Navbar = () =>  {
  return (
    <nav className="bg-[#00ACC1] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            
            <img src="./public/logo.png" alt="" className="h-[60px] w-[70px]"/>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-[#FF7043]">Home</a>
            <a href="/about" className="hover:text-[#FF7043]">About Us</a>
            <a href="/how-it-works" className="hover:text-[#FF7043]">How It Works</a>
            <a href="/ngos" className="hover:text-[#FF7043]">NGO Login</a>
            <a href="/donate" className="hover:text-[#FF7043]">Donate</a>
            <a href="/contact" className="hover:text-[#FF7043]">Contact</a>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <a
              href="/login"
              className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-[#00ACC1] transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-[#FF7043] rounded-lg hover:bg-white hover:text-[#FF7043] transition font-semibold"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
