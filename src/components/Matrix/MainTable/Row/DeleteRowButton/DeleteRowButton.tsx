import React, {FC, useContext} from "react";
import s from "./DeleteRowButton.module.scss";
import {MatrixContext} from "../../../../../context/context";
import {Cell} from "../../../../../types/types";

type PropsType = {
    array: Array<Cell>
    type: 'right' | 'left'
}

export const DeleteRowButton: FC<PropsType> = ({array, type}) => {
    const {onDeleteRowClick} = useContext(MatrixContext)

    return <div className={(type === 'right' ? s.rightDelete : s.leftDelete) + ' ' + s.delete}
                onClick={() => onDeleteRowClick(array)}>
        <img src={'https://findicons.com/files/icons/1262/amora/256/delete.png'}/>
    </div>
}