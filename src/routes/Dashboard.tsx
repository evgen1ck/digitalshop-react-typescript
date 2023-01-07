import {Outlet, useParams} from "react-router-dom";
import React from "react";

export default function Dashboard() {

    return (
        <div className="max-w-5xl m-auto justify-center">
            <h2>Dashboard</h2>

            <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
                <h1 className="text-5xl font-bold mt-0 mb-6">Heading</h1>
                <h3 className="text-3xl font-bold mb-8">Subeading</h3>
                <a className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                   data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</a>
            </div>

            <Outlet />
        </div>
    );
}



// export const loaderDashboard = async ( ) => {
//
//     return json({
//         posts: [
//             {
//                 slug: "my-first-post",
//                 title: "My First Post",
//             },
//             {
//                 slug: "90s-mixtape",
//                 title: "A Mixtape I Made Just For You",
//             },
//         ],
//     });
// };