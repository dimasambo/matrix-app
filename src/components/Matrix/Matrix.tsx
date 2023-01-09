import React, {FC, useContext, useEffect, useState} from "react";
import s from "./Matrix.module.scss"
import {HomepageContext, MatrixContext} from "../../context/context";
import {Cell} from "../../types/types";
import {MainTable} from "./MainTable/MainTable";
import {TableHeader} from "./Header/TableHeader";
import {TableFooter} from "./Footer/TableFooter";

export const Matrix: FC = ({}) => {

    const {toggleInputValues} = useContext(HomepageContext)
    const [array, setArray] = useState<Array<Array<Cell>>>([])
    const [sortedArray, setSortedArray] = useState<Array<Cell>>([])
    const [closestValues, setClosestValues] = useState<Array<Cell>>([])
    const [average, setAverage] = useState<Array<number>>([])
    const [reCalcSumFlag, setReCalcSumFlag] = useState(false)
    const [nArr, setNArr] = useState<Array<number>>([])

    useEffect(() => {
        if (toggleInputValues.inputValues.n && toggleInputValues.inputValues.m) {
            const tempArray: Array<Array<Cell>> = []
            let id: number = 0
            const tempNArr: Array<number> = []

            for (let i = 0; i < toggleInputValues.inputValues.m; i++) {
                tempArray[i] = []
                for (let j = 0; j < toggleInputValues.inputValues.n; j++) {
                    if (i === 0) {
                        tempNArr.push(j)
                    }
                    tempArray[i].push({
                        id: id,
                        amount: Math.floor(Math.random() * 900) + 100
                    })
                    id++
                }
            }
            setArray(tempArray)
            setNArr(tempNArr)
        }
    }, [toggleInputValues.inputValues])

    useEffect(() => {
        if (closestValues.length) {
            const tempArray = createTempArray(array)
            tempArray.forEach(tempArrItem => {
                tempArrItem.forEach(tempArrSecondItem => {
                    closestValues.forEach(item => {
                        if(tempArrSecondItem.id === item.id) {
                            tempArrSecondItem.nearestValue = true
                        }
                    })
                })
            })
            setArray(tempArray)
        }
    }, [closestValues])

    useEffect(() => {
        setSortedArray(transformDoubleArrayInLine(array).sort((a: Cell, b: Cell) => a.amount - b.amount))

        let tempAverage: Array<number> = []
        array.forEach((item, index) => {
            item.forEach((secondItem, secondIndex) => {
                if (index === 0) {
                    tempAverage.push(secondItem.amount / 2)
                } else {
                    tempAverage[secondIndex] += secondItem.amount / 2
                }
            })
        })

        setAverage(tempAverage)
    }, [array])

    const createTempArray = (array: Array<Array<Cell>>): Array<Array<Cell>> => {
        return array.filter(item => true)
    }

    const transformDoubleArrayInLine = (arr: Array<Array<Cell>>): Array<Cell> => {
        let tempArr: Array<Cell> = [];

        arr.forEach(item => {
            item.forEach(secondItem => {
                tempArr.push(secondItem)
            })
        })

        return tempArr;
    }

    const handleCellHover = (amount: number, id: number) => {
        const tempArray = createTempArray(array)

        setClosestValues(findNearestValue(tempArray, amount, id))
    }

    const handleCellMouseLeave = () => {
        const tempArray: Array<Array<Cell>> = array.filter(item => true)
        tempArray.forEach(tempArrItem => {
            tempArrItem.forEach(tempArrSecondItem => {
                if(tempArrSecondItem.nearestValue === true) {
                    tempArrSecondItem.nearestValue = false
                }
            })
        })
        setArray(tempArray)
        setClosestValues([])
    }

    const handleCellClick = (amount: number, id: number) => {
        const tempArray = createTempArray(array)

        tempArray.forEach(item => {
            item.forEach(secondItem => {
                if (secondItem.amount === amount && secondItem.id === id) {
                    secondItem.amount += 1
                    setArray(tempArray)
                    handleCellMouseLeave()
                    setReCalcSumFlag(!reCalcSumFlag)
                    setClosestValues(findNearestValue(tempArray, amount, id))
                    return true
                }
            })
        })

        setArray(tempArray)
    }

    const findNearestValue = (arr: Array<Array<Cell>>, value: number, id: number): Array<Cell> => {
        const result: Array<Cell> = []

        if (toggleInputValues.inputValues.n && toggleInputValues.inputValues.m) {

            const xValue = toggleInputValues.inputValues.x

            sortedArray.forEach((item, index) => {
                if (item.id === id && xValue) { // find the desired object in sorted array by id

                    let counter = 1 // to count position to which to add the nearest value
                    let outOfBorderNumbers = 0

                    // if number of nearest values from the LEFT side of hovered object more than number of values...
                    // ...BEHIND in the sorted array, then initialBorder <= 0
                    const initialBorder = (index + 1) - Math.ceil(xValue / 2)

                    // if number of nearest values from the RIGHT side of hovered object more than number of values...
                    // ...AHEAD in the sorted array, then finalBorder > sortedArray.length
                    const finalBorder = (index + 1) + Math.ceil(xValue / 2) //

                    for (let i = 1; i <= xValue; i++) { // fill the result array with x nearest values

                        if(finalBorder > sortedArray.length) {

                            // count number of values that go beyond the LEFT limit
                            outOfBorderNumbers = ((index + 1) + xValue) - sortedArray.length

                        } else if(initialBorder <= 0) {

                            // count number of values that go beyond the RIGHT limit
                            outOfBorderNumbers = xValue - (index + 1)
                        }

                        if(i <= xValue - outOfBorderNumbers) { // if there are NO values beyond the any limit
                            if (i % 2 !== 0) { // add right nearest value
                                result.push(sortedArray[index + counter])
                            } else { // add left nearest value
                                result.push(sortedArray[index - counter])
                                counter++
                            }
                        } else { // if there are values beyond the any limit
                            if(finalBorder > sortedArray.length) { // check FINAL(right) limit
                                result.push(sortedArray[index - counter])
                            } else { // check INITIAL(left) limit
                                result.push(sortedArray[index + counter])
                            }
                            counter++
                        }
                    }
                }
            })
        }
        return result
    }

    const onAddRowClick = () => {
        const tempArray: Array<Array<Cell>> = [[]]
        let id = array[array.length - 1][array[array.length - 1].length - 1].id + 1

        for (let i = 0; i < array[array.length - 1].length; i++) {
            tempArray[0].push({
                id: id,
                amount: Math.floor(Math.random() * 900) + 100
            })
            id++
        }

        setArray(array => [...array, ...tempArray])
    }

    const onDeleteRowClick = (deletedArray: Array<Cell>) => {
        if(toggleInputValues.inputValues.x && (array.length-1)*array[0].length > toggleInputValues.inputValues.x) {
            const tempArray = createTempArray(array)
            tempArray.forEach((item, index) => {
                if (item === deletedArray) {
                    tempArray.splice(index, 1)
                }
            })

            setArray(tempArray)
        } else {
            alert(`Can't delete row. X will be more than M*N`)
        }
    }

    return <MatrixContext.Provider value={{
        handleCellClick, handleCellHover, handleCellMouseLeave,
        onDeleteRowClick, reCalcSumFlag
    }}>
        <div className={s.wrapper}>
            <TableHeader nArr={nArr}/>
            <MainTable array={array}/>
            <TableFooter average={average} onAddRowClick={onAddRowClick}/>
        </div>
    </MatrixContext.Provider>
}