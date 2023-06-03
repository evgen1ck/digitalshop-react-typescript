import React from "react" 
import { NavigateFunction } from "react-router-dom"

export const RedirectTo = (path: string, navigate: NavigateFunction, delay: number) => {
    setTimeout(() => {
        navigate(path) 
    }, delay) 
}

export const HistoryNavigation = (navigate: NavigateFunction, redirect: string, len: number) => {
    const hasHistory = len > 2;

    if (hasHistory) {
        navigate(-1);
    } else {
        navigate(redirect);
    }
}