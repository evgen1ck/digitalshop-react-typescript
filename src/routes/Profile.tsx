import React from "react"
import {Link} from "react-router-dom";

const Profile = () => {
    return (
        <div className="justify-between my-16 select-none">
            <div className="text-center">
                <h1 className="text-8xl font-bold mb-8">aboba</h1>
                <h3 className="text-3xl font-bold mb-12">aboba.</h3>
                <Link to="/" className="transition ease-in-out delay-50 hover:-translate-y-1 duration-300 inline-block outline hover:text-light-focusing dark:hover:text-dark-focusing px-6 py-2.5 text-xl font-medium uppercase rounded shadow-md">
                    гг
                </Link>
            </div>
        </div>
    )
}

export default Profile