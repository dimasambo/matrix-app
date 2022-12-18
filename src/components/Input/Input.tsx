import {FC, useContext, useState} from "react";
import {Field, Form, Formik} from "formik";
import s from "./Input.module.scss"
import {HomepageContext} from "../../context/context";

export const Input: FC = () => {

    const {toggleTable, toggleInputValues} = useContext(HomepageContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState<string>('')

    const handleSubmit = (values: { value: string }) => {
        if (!toggleInputValues.inputValues.m) {
            toggleInputValues.setInputValues({...toggleInputValues.inputValues, m: +values.value})
        } else if (!toggleInputValues.inputValues.n) {
            toggleInputValues.setInputValues({...toggleInputValues.inputValues, n: +values.value})
        } else if (!toggleInputValues.inputValues.x) {
            toggleInputValues.setInputValues({...toggleInputValues.inputValues, x: +values.value})
            toggleTable.setIsTableShown(true)
        }
        setIsButtonDisabled(true)
        setInputValue('')
    }

    const validate = (value: string) => {
        setInputValue(value)
        if (!toggleInputValues.inputValues.n) {
            if (+value > 100) {
                setIsButtonDisabled(true)
                setError('value should be less than 100')
            } else if (value !== '' && +value <= 100) {
                setIsButtonDisabled(false)
                setError(null)
            } else if (value === '') {
                setError('field cant be empty')
                setIsButtonDisabled(true)
            }
        } else if (toggleInputValues.inputValues.n && toggleInputValues.inputValues.m) {
            if (+value > ((toggleInputValues.inputValues.n * toggleInputValues.inputValues.m) - 1)) {
                setIsButtonDisabled(true)
                setError('value should be less than m*n-1')
            } else if (value !== ''
                && +value <= ((toggleInputValues.inputValues.n * toggleInputValues.inputValues.m) - 1)) {
                setIsButtonDisabled(false)
                setError(null)
            } else if (value === '') {
                setError('field cant be empty')
                setIsButtonDisabled(true)
            }
        }
    }

    return <div className={s.formWrapper}>
        <Formik
            enableReinitialize
            initialValues={{value: inputValue}}
            onSubmit={handleSubmit}
        >
            <Form className={''}>
                <div className={s.field}>
                    <label htmlFor={'value'}>Enter number of {!toggleInputValues.inputValues.m
                        ? 'rows'
                        : (!toggleInputValues.inputValues.n
                            ? 'columns'
                            : 'nearest numbers')}</label>
                    <Field type={"text"}
                           placeholder={"Enter " + (!toggleInputValues.inputValues.m
                               ? 'm'
                               : (!toggleInputValues.inputValues.n
                                   ? 'n'
                                   : 'x'))
                           }
                           className={s.input}
                           name={"value"}
                           onChange={(e: any) => validate(e.target.value)}
                           onBlur={(e: any) => validate(e.target.value)}
                    />
                    {error && <span className={s.span}>{error}</span>}
                </div>
                <button disabled={isButtonDisabled} className={isButtonDisabled ? s.disabled : ''} type={'submit'}>
                    {toggleInputValues.inputValues.n ? 'Submit' : 'Next'}
                </button>
            </Form>
        </Formik>
    </div>
}