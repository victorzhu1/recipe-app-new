export default function Navbar() {
  return (
    <nav className="absolute w-full flex items-center justify-center text-white font-oswald" style={{ 
        zIndex: 1,
      }}>
        <div className="navbar-menu-items w-full">
          <ul className="menu flex my-2 w-full menu-horizontal justify-evenly text-4xl">
            <li><a href='/' className='p-4 font-bold hover:bg-blue-100 hover:bg-opacity-25 duration-150'>HOME</a></li>

            <li><a href='/recipes' className='p-4 font-bold hover:bg-blue-100 hover:bg-opacity-25 duration-150'>RECIPES</a></li>

            <li><a href='/create' className='p-4 font-bold hover:bg-blue-100 hover:bg-opacity-25 duration-150'>CREATE</a></li>

            <li><a href='/register' className='p-4 font-bold hover:bg-blue-100 hover:bg-opacity-25 duration-150'>REGISTER</a></li>

          </ul>
        </div>
    </nav>
  );
}

