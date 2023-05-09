import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {ServicesDataOption, ServicesDropDown} from "../components/DropDowns"
import {RowBlockUpper} from "../components/PageBlocks"
import {GoPlus} from 'react-icons/go'
import {AdminProductsServicesGetQuery} from "../queries/admin"


const AdminProducts = () => {
    const navigate = useNavigate()
    const [serviceValue, setServiceValue] = useState('')
    const [serviceError, setServiceError] = useState('')
    const [servicesData, setServicesData] = useState([])
    const [servicesLoading, setServicesLoading] = useState(true)

    const [isServiceDisabled, setIsServiceDisabled] = useState(false)
    const [isServiceLoading, setIsServiceLoading] = useState(false)

    const handleServiceChange = (selectedOption: ServicesDataOption | null) => {
        setServiceValue(selectedOption ? selectedOption.service_name : '')
        if (selectedOption == null) setServiceError("Поле не может быть пустым")
        else setServiceError('')
    }

    useEffect(() => {
        const abortController = new AbortController

        AdminProductsServicesGetQuery({
            signal: abortController.signal,
            navigate: navigate
        }).then(data => {
            setServicesData(data)
            setServicesLoading(false)
        }).catch(() => {
            setServicesLoading(false)
        })

        return () => {
            abortController.abort()
        }
    }, [])

    if (servicesLoading) {
        return (
            <div className="justify-between select-none">
                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-12">
                        Ожидаем ответ от сервера...
                    </h3>
                </div>
            </div>
        )
    }

    return (
        <>
            <RowBlockUpper addToClassName="">
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <ServicesDropDown addToClassName=""
                                      header="Сервисы"
                                      nameField="Сервис"
                                      placeholder="Поле сервиса"
                                      id="field-service"
                                      dataOption={servicesData}
                                      onChange={handleServiceChange}
                                      isLoading={isServiceLoading}
                                      isDisabled={isServiceDisabled}
                                      isClearable={true}
                                      isSearchable={true}
                                      error={serviceError}
                                      hasWarnLabel={true}
                    />
                    <button className="btn-classic-frame select-none flex text-center p-2 pt-3 sm:mt-8 mt-7 h-11 "
                            type="submit" >
                        <GoPlus />
                    </button>
                </div>
                <div className="flex inline-flex lg:w-1/2 w-full">
                    <ServicesDropDown addToClassName=""
                                      header="Сервисы"
                                      nameField="Сервис"
                                      placeholder="Поле сервиса"
                                      id="field-service"
                                      dataOption={servicesData}
                                      onChange={handleServiceChange}
                                      isLoading={isServiceLoading}
                                      isDisabled={isServiceDisabled}
                                      isClearable={true}
                                      isSearchable={true}
                                      error={serviceError}
                                      hasWarnLabel={true}
                    />
                    <button className="btn-classic-frame select-none flex text-center p-2 pt-3 sm:mt-8 mt-7 h-11 "
                            type="submit" >
                        <GoPlus />
                    </button>
                </div>
            </RowBlockUpper>
        </>
    )
}

export default AdminProducts