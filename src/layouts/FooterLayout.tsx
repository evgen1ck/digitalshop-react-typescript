import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

export default function HeaderLayout() {
    return (
        <>
            <div className="text-center bg-light-main dark:bg-dark-main bottom-0 py-4">It is footer</div>
        </>
    );
}