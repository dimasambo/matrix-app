import React, {FC} from "react";
import s from "./TableHeader.module.scss";


type PropsType = {
    nArr: Array<number>
}

export const TableHeader: FC<PropsType> = ({nArr}) => {

    return <div className={s.header}>
        {nArr.map((item) => <div key={item} className={s.n}>N = {item + 1}</div>)}
        <div className={s.n + ' ' + s.sum}>Sum</div>
    </div>
}