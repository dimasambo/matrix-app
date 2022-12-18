import React, {FC, useContext, useEffect, useState} from "react";
import s from "./Matrix.module.scss"
import cellStyle from "./MainTable/Row/Cell/Cell.module.scss"
import {HomepageContext, MatrixContext} from "../../context/context";
import {Row} from "./MainTable/Row/Row";
import {Cell} from "../../types/types";
import {MainTable} from "./MainTable/MainTable";
import {TableHeader} from "./Header/TableHeader";
import {TableFooter} from "./Footer/TableFooter";

export const Matrix: FC = ({}) => {

    const {toggleInputValues} = useContext(HomepageContext)
    const [array, setArray] = useState<Array<Array<Cell>>>([])
    const [closestValues, setClosestValues] = useState<Array<Cell>>([])
    const [isCleaning, setIsCleaning] = useState(false)
    const [average, setAverage] = useState<Array<number>>([])
    const [reCalcSumFlag, setReCalcSumFlag] = useState(false)
    const [nArr, setNArr] = useState<Array<number>>([])

    useEffect(() => {
        if (toggleInputValues.inputValues.n && toggleInputValues.inputValues.m) {
            const testArray: Array<Array<Cell>> = []
            let id: number = 0
            const testNArr: Array<number> = []

            for (let i = 0; i < toggleInputValues.inputValues.m; i++) {
                testArray[i] = []
                for (let j = 0; j < toggleInputValues.inputValues.n; j++) {
                    if (i === 0) {
                        testNArr.push(j)
                    }
                    testArray[i].push({
                        id: id,
                        amount: Math.floor(Math.random() * 900) + 100
                    })
                    id++
                }
            }
            setArray(testArray)
            setNArr(testNArr)
        }
    }, [toggleInputValues.inputValues])

    useEffect(() => {
        if (closestValues.length) {
            closestValues.forEach(item => {
                document.getElementById(String(item.id))?.classList.add(cellStyle.nearestValue)
            })
        }
    }, [closestValues])

    useEffect(() => {
        let testAverage: Array<number> = []
        array.forEach((item, index) => {
            item.forEach((secondItem, secondIndex) => {
                if (index === 0) {
                    testAverage.push(secondItem.amount / 2)
                } else {
                    testAverage[secondIndex] += secondItem.amount / 2
                }
            })
        })

        setAverage(testAverage)
        console.log(array)
    }, [array])

    const handleCellHover = (amount: number, id: number) => {
        const testArray: Array<Array<Cell>> = array.filter(() => true)

        setClosestValues(findEqualValue(testArray, amount, id))
    }

    const handleCellMouseLeave = () => {
        array.forEach(item => {
            item.forEach(secondItem => {
                const el = document.getElementById(String(secondItem.id))
                if (el && el.classList.contains(cellStyle.nearestValue)) {
                    el.classList.remove(cellStyle.nearestValue)
                }
            })
        })
        setClosestValues([])
        setIsCleaning(false)
    }

    const handleCellClick = (amount: number, id: number) => {
        let testArr: Array<Array<Cell>> = array.filter(item => true)

        testArr.forEach(item => {
            item.forEach(secondItem => {
                if (secondItem.amount === amount && secondItem.id === id) {
                    secondItem.amount += 1
                    setArray(testArr)
                    handleCellMouseLeave()
                    setIsCleaning(true)
                    setReCalcSumFlag(!reCalcSumFlag)
                    setClosestValues(findEqualValue(testArr, amount, id))
                    return true
                }
            })
        })

        setArray(testArr)
    }

    const findEqualValue = (arr: Array<Array<Cell>>, value: number, id: number): Array<Cell> => {
        const result: Array<Cell> = []

        if (toggleInputValues.inputValues.n && toggleInputValues.inputValues.m) {
            let testValue = value

            while (result.length !== toggleInputValues.inputValues.x) {
                for (let i = 0; i < (arr.length); i++) {
                    for (let j = 0; j < (toggleInputValues.inputValues.n); j++) {
                        if (arr[i][j].amount === testValue && arr[i][j].id !== id) {
                            result.push(arr[i][j])
                            if (result.length === toggleInputValues.inputValues.x) {
                                return result
                            }
                        }
                    }
                }

                if (testValue === value) {
                    testValue++
                } else if (testValue > value) {
                    testValue = value + (value - testValue)
                } else {
                    testValue = value + ((value - testValue) + 1)
                }
            }
        }
        return result
    }

    const onAddRowClick = () => {
        const testArray: Array<Array<Cell>> = [[]]
        let id = array[array.length - 1][array[array.length - 1].length - 1].id + 1

        for (let i = 0; i < array[array.length - 1].length; i++) {
            testArray[0].push({
                id: id,
                amount: Math.floor(Math.random() * 900) + 100
            })
            id++
        }

        setArray(array => [...array, ...testArray])
    }

    const onDeleteRowClick = (deletedArray: Array<Cell>) => {
        const testArray: Array<Array<Cell>> = [...array]
        testArray.forEach((item, index) => {
            if (item === deletedArray) {
                testArray.splice(index, 1)
            }
        })

        setArray(testArray)
    }

    return <MatrixContext.Provider value={{
        handleCellClick, handleCellHover, handleCellMouseLeave,
        isCleaning, setIsCleaning, onDeleteRowClick, reCalcSumFlag
    }}>
        <div className={s.wrapper}>
            <TableHeader nArr={nArr} />
            <MainTable array={array} />
            <TableFooter average={average} onAddRowClick={onAddRowClick} />
        </div>
    </MatrixContext.Provider>
}