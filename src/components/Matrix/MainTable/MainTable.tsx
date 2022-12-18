import React, {FC} from "react";
import s from "./MainTable.module.scss";
import {Row} from "./Row/Row";
import {Cell} from "../../../types/types";

type PropsType = {
    array: Array<Array<Cell>>
}

export const MainTable: FC<PropsType> = ({array}) => {

    return <div className={s.table}>
        {array.length && array.map((item, index) =>
            <div className={s.rowWrapper}>
                <Row key={index} index={index} array={item}/>
            </div>
        )}
    </div>
}