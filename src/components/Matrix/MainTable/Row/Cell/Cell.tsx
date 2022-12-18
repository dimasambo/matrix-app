import React, {FC, useContext} from "react";
import s from "./Cell.module.scss"
import {Cell} from "../../../../../types/types";
import {MatrixContext} from "../../../../../context/context";

type PropsType = {
    item: Cell
}

export const CellItem: FC<PropsType> = ({item}) => {

    const {setIsCleaning, isCleaning, handleCellMouseLeave, handleCellHover, handleCellClick} = useContext(MatrixContext)

    return <div id={String(item.id)} className={s.matrixCell}
                onMouseOver={() => {
                    !isCleaning && handleCellHover(item.amount, item.id)
                    setIsCleaning(true)
                }}
                onMouseLeave={handleCellMouseLeave}
                onClick={() => handleCellClick(item.amount, item.id)}>
        {item.amount}
    </div>
}