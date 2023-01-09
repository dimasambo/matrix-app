import React, {FC, useContext} from "react";
import s from "./Cell.module.scss"
import {Cell} from "../../../../../types/types";
import {MatrixContext} from "../../../../../context/context";

type PropsType = {
    item: Cell
}

export const CellItem: FC<PropsType> = ({item}) => {

    const {handleCellMouseLeave, handleCellHover, handleCellClick} = useContext(MatrixContext)

    return <div id={String(item.id)}
                className={item.nearestValue === true ? s.matrixCell + ' ' + s.nearestValue : s.matrixCell}
                onMouseOver={() => {
                    handleCellHover(item.amount, item.id)
                }}
                onMouseLeave={handleCellMouseLeave}
                onClick={() => handleCellClick(item.amount, item.id)}>
        {item.amount}
    </div>
}