import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

// export default function Layout() {
//     return (
//         <div>
//             {/* A "layout route" is a good place to put markup you want to
//           share across all the pages on your site, like navigation. */}
//             <nav className="flex justify-between items-center h-[50px]">
//                 <ul>
//                     <li>
//                         <Link to="/" className="mr-2">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about" className="mr-2">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/dashboard" className="m">Dashboard</Link>
//                     </li>
//                     <li>
//                         <Link to="/nothing-here" className="mr">Nothing Here</Link>
//                     </li>
//                 </ul>
//             </nav>
//             <br />
//             <hr />
//             <br />
//             {/* An <Outlet> renders whatever child route is currently active,
//           so you can think about this <Outlet> as a placeholder for
//           the child routes we defined above. */}
//             <Outlet />
//         </div>
//     );
// } flex justify-between items-center h-[50px] px-5 text-white max-w-md m-auto

export default function HeaderLayout() {

    interface ILink {
        name: string
        link: string
    }
    const initialLinks: ILink[] = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Dashboard',
            link: 'dashboard'
        },
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Error',
            link: '/not-found'
        }
    ]
    const [links] = useState(initialLinks)

    return (
        <>
            <div className="bg-light-main dark:bg-dark-main">
                <nav className="flex items-center justify-between flex-wrap p-6 max-w-6xl m-auto">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <Link to="/" className="hover:text-light-focusing dark:hover:text-dark-focusing">
                            <span className="font-semibold text-2xl tracking-tight uppercase">Evgenick's digitals</span>
                        </Link>
                    </div>
                    <div className="block lg:hidden">
                        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            {links.map(link =>  {
                                return (
                                    <Link to={link.link} className="hover:text-light-focusing dark:hover:text-dark-focusing block mt-4 lg:inline-block lg:mt-0 ml-4 text-sm">
                                        {link.name}
                                    </Link>
                                )})
                            }
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <Link to="/registration" className="hover:text-light-focusing dark:hover:text-dark-focusing block lg:inline-block py-2 font-medium text-1xl uppercase max-w-md:hidden inline-block text-sm px-4 leading-none mt-4 lg:mt-0">
                                Зарегистрироваться
                            </Link>
                            <Link to="/authorization" className="hover:text-light-focusing dark:hover:text-dark-focusing block lg:inline-block py-2 font-medium text-1xl uppercase max-w-md:hidden inline-block text-sm px-4 leading-none border rounded mt-4 lg:mt-0">
                                Войти
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
        </>
    );
}