import React, {FC} from "react";
import s from "./TableFooter.module.scss";


type PropsType = {
    average: Array<number>
    onAddRowClick: () => void
}

export const TableFooter: FC<PropsType> = ({average, onAddRowClick}) => {

    return <div className={s.footer}>
        <div className={s.add} onClick={onAddRowClick}>
            <img src={'https://cdn-icons-png.flaticon.com/512/189/189689.png'}/>
        </div>
        <div className={s.average + ' ' + s.m}>Average</div>
        {average.map((item, index) => <div key={index} className={s.average}>{item}</div>)}
    </div>
}