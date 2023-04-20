import React from 'react';
import { NavigateFunction } from 'react-router-dom';

export const RedirectTo = (path: string, navigate: NavigateFunction, delay: number) => {
    setTimeout(() => {
        navigate(path);
    }, delay);
};

