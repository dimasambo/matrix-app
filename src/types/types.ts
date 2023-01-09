export type CellId = number;
export type CellValue = number;

export type Cell = {
    id: CellId,
    amount: CellValue,
    nearestValue?: boolean
}

export type InputValuesType = {
    m: number | null
    n: number | null
    x: number | null
}

export type HomepageContextType = {
    toggleInputValues: {
        inputValues: InputValuesType
        setInputValues: (inputValues: InputValuesType) => void
    }
    toggleTable: {
        isTableShown: boolean
        setIsTableShown: (isTableShown: boolean) => void
    }
}

export type MatrixContextType = {
    handleCellHover: (amount: number, id: number) => void
    handleCellClick: (amount: number, id: number) => void
    handleCellMouseLeave: () => void
    reCalcSumFlag: boolean
    onDeleteRowClick: (deletedArray: Array<Cell>) => void
}