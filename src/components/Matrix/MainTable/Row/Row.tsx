import React, {FC, useContext, useEffect, useState} from "react";
import s from "./Row.module.scss"
import {Cell} from "../../../../types/types";
import {CellItem} from "./Cell/Cell";
import {MatrixContext} from "../../../../context/context";
import {DeleteRowButton} from "./DeleteRowButton/DeleteRowButton";

type PropsType = {
    array: Array<Cell>
    index: number
}

export const Row: FC<PropsType> =
    ({array, index}) => {

        const {reCalcSumFlag} = useContext(MatrixContext)

        const [sum, setSum] = useState(0)
        const [isSumHovered, setIsSumHovered] = useState(false)
        const [percents, setPercents] = useState<Array<Cell>>([])
        const [isRowHovered, setIsRowHovered] = useState(false)

        useEffect(() => {
            let testSum = 0
            array.forEach(item => {
                testSum += item.amount
            })
            setSum(testSum)
        }, [array, reCalcSumFlag])

        const handleSumHover = () => {
            const testArray: Array<Cell> = []
            setIsSumHovered(true)

            array.forEach(item => {
                let copy = Object.assign({}, item);
                copy.amount = Math.round(item.amount / sum * 100)
                testArray.push(copy)
            })

            setPercents(testArray)
        }

        const handleSumMouseLeave = () => {
            setPercents([])
            setIsSumHovered(false)
        }

        return <div className={s.row}
                    onMouseOver={() => setIsRowHovered(true)}
                    onMouseLeave={() => setIsRowHovered(false)}>
            <div className={s.m}>
                M = {index + 1}
            </div>
            {isRowHovered && <DeleteRowButton array={array} type={"left"}/>}
            {!isSumHovered
                ? array.map(item => <CellItem key={item.id} item={item}/>)
                : percents.map(item =>
                    <div key={item.id} className={s.matrixCell + ' ' + s.gradient}>
                        {item.amount}%
                    </div>
                )}
            {isRowHovered && <DeleteRowButton array={array} type={"right"}/>}
            <div className={s.sum} onMouseOver={handleSumHover} onMouseLeave={handleSumMouseLeave}>
                {sum}
            </div>
        </div>
    }