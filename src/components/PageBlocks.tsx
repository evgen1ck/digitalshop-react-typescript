import React from "react";

export function MainPageBlock(props: any) {

    return (
        <>
            <div className="w-full px-4 mx-auto max-w-6xl">
                <div className="lg:flex">
                    <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
                        <div className="flex w-full">
                            <div className="flex-auto max-w-4xl min-w-0 my-12 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 m-auto">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function RowBlock(props: any) {

    return (
        <>
            <RowBlockUpper>
                <RowBlockLower>
                    {props.children}
                </RowBlockLower>
            </RowBlockUpper>
        </>
    );
}

export function RowBlockUpper(props: any) {

    return (
        <>
            <div className="flex flex-wrap mb-4 m-auto">
                {props.children}
            </div>
        </>
    );
}

export function RowBlockLower(props: any) {

    return (
        <>
            <div className="flex-grow mb-2 lg:mb-0 px-4">
                {props.children}
            </div>
        </>
    );
}