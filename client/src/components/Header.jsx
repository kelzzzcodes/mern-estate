import logo from '../assets/img/logo.svg'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { navbarItems } from '../constants'
import { useSelector } from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2 sm:p-3">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-16 xsm:w-32 sm:w-52 h-auto flex"
          />
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex items-center gap-4">
          {navbarItems.map((navItem, i) => (
            <Link
              key={i}
              to={
                navItem.path.includes('/sign-in')
                  ? currentUser
                    ? '/profile'
                    : navItem.path
                  : navItem.path
              }
              className={`hover:underline text-slate-700 ${
                navItem.path.includes('/sign-in') ? 'flex' : 'hidden sm:flex '
              }`}
            >
              {navItem.path.includes('/sign-in') ? (
                currentUser ? (
                  <img
                    src={currentUser.avatar}
                    alt="profile"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <li>{navItem.label}</li>
                )
              ) : (
                <li>{navItem.label}</li>
              )}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  )
}
