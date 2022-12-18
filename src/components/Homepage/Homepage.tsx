import React, {FC, useState, useEffect} from "react";
import s from "./Homepage.module.scss"
import {Input} from "../Input/Input";
import {InputValuesType} from "../../types/types";
import {HomepageContext} from "../../context/context";
import {Matrix} from "../Matrix/Matrix";

export const Homepage: FC = ({}) => {
    const [isTableShown, setIsTableShown] = useState(false)
    const [inputValues, setInputValues] = useState({} as InputValuesType)

    useEffect(() => {
        console.log(inputValues)
    }, [inputValues])

    return <div className={s.homepageWrapper}>
        <HomepageContext.Provider value={{
            toggleInputValues: {
                inputValues,
                setInputValues
            },
            toggleTable: {
                isTableShown,
                setIsTableShown
            }
        }}>
            {!isTableShown
                ? <Input/>
                : <Matrix />}
        </HomepageContext.Provider>
    </div>
}