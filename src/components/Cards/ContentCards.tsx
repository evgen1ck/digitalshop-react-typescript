import { format } from "date-fns";
import React, {useEffect, useState} from "react";
import {translateProductSubtype, translateProductType} from "../../lib/translate";
import {Link} from "react-router-dom";

export interface Content {
    content_id: string
    data: string
    created_at: string
    modified_at: string
    commentary: string
}

interface ContentCardProps {
    content: Content
    handleDelete: (id: string) => void
    deleteLoading: boolean
}

export const ContentCard = ({ content, handleDelete, deleteLoading }: ContentCardProps) => {
    const [hoveredCard, setHoveredCard] = useState("");
    const orderDate = new Date(content.created_at)
    orderDate.setHours(orderDate.getHours() + 3)

    return (
        <>
            <div className={`flex sm:w-auto flex-col bg-white shadow-lg h-max bg-light-additional dark:bg-dark-additional hover:-translate-y-1.5 system-animation btn-classic-frame`}>
                <div className={`flex flex-col justify-start px-6 py-3`}
                     onMouseEnter={() => setHoveredCard(content.content_id)}
                     onMouseLeave={() => setHoveredCard("")}>
                    <div className="flex justify-between items-center">
                        <span className=" lg:space-x-5 sm:space-x-1 flex-grow inline-block">
                            <h3 className="sm:text-lg text-base inline-block">
                                содержимое {' '}
                                <h3 className="sm:text-lg font-bold text-base inline-block cursor-copy select-text pr-20">
                                   {content.data}
                                </h3>
                            </h3>
                        </span>
                        <span>
                            {hoveredCard == content.content_id && (
                                <button className="btn-classic block lg:inline-block text-error lg:mt-0 ml-4"
                                        onDoubleClick={() => {handleDelete(content.content_id)}}
                                        disabled={deleteLoading}
                                    >
                                    Удалить
                                </button>
                            )}
                        </span>
                    </div>
                    <div className="flex justify-start items-center py-1">
                        <span className="sm:space-x-1 flex-grow inline-block">
                            <h3 className="sm:text-lg text-base inline-block">
                                добавлено{' '}
                                <h3 className="sm:text-lg font-bold text-base inline-block">
                                    {format(orderDate, 'dd.MM.yyyy')}
                                </h3>
                                {' '}в{' '}
                                <h3 className="sm:text-lg font-bold text-base inline-block">
                                    {format(orderDate, 'HH:mm')}
                                </h3>
                            </h3>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}