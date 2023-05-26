import { format } from "date-fns";
import React, {useEffect, useState} from "react";

export interface Order {
    order_id: string
    product_name: string
    variant_name: string
    service_name: string
    data_content: string
    price: number
    paid: boolean
    created_at: string
}

interface OrderCardProps {
    order: Order
}

export const OrderCard = ({order}: OrderCardProps) => {
    const orderDate = new Date(order.created_at)
    orderDate.setHours(orderDate.getHours() + 3)

    return (
        <div>
            <div className={`flex sm:w-auto w-full flex-col rounded-lg bg-white shadow-lg sm:flex-row h-max bg-light-additional dark:bg-dark-additional hover:-translate-y-1 system-animation btn-classic-frame`}>
                <div className={`flex flex-col justify-start p-4`}>
                    <div className="flex justify-start font-bold items-center">
                        <div className={order.paid ? "text-green" : "text-error"}>
                            Заказ #{order.order_id.toUpperCase()} {order.paid ? " оплачен" : " не оплачен"}
                        </div>
                    </div>
                    <div className="flex justify-start items-center py-1">
                        <span className="lg:space-x-2 sm:space-x-1 flex-grow inline-block">
                            <h3 className="sm:text-lg text-base font-bold uppercase inline-block">
                                {order.variant_name}
                            </h3>
                            <h3 className="sm:text-lg text-base font-bold uppercase inline-block text-light-second dark:text-dark-second">
                                {order.product_name} | {order.service_name}
                            </h3>
                        </span>
                    </div>
                    <div className="flex justify-start items-center py-1">
                        <span className="sm:space-x-1 flex-grow inline-block">
                            <h3 className="sm:text-lg text-base inline-block">
                                содержание:
                            </h3>
                            <h3 className="sm:text-lg font-bold text-base inline-block cursor-copy select-text">
                                {order.data_content}
                            </h3>
                        </span>
                    </div>
                    <div className="flex justify-start items-center py-1">
                        <span className="sm:space-x-1 flex-grow inline-block">
                            <h3 className="sm:text-lg text-base inline-block">
                                от{' '}
                                <h3 className="sm:text-lg font-bold text-base inline-block">
                                    {format(orderDate, 'dd.MM.yyyy')}
                                </h3>
                                {' '}в{' '}
                                <h3 className="sm:text-lg font-bold text-base inline-block">
                                    {format(orderDate, 'HH:mm')}
                                </h3>
                            </h3>
                            <h3 className="sm:text-lg text-base inline-block">
                                по цене в{' '}
                                <h3 className="sm:text-lg font-bold text-base inline-block">
                                    {Intl.NumberFormat("ru-RU").format(order.price)}₽
                                </h3>
                            </h3>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}