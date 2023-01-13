import React from 'react'
import { changeKor } from 'util/changeKor'
import './Classify.scss'

const Classification = ({ children }: React.PropsWithChildren) => {
    return (
        <div className='classif-wrap'>
            <span className='classif'>분류 :&nbsp;</span>
            <span className='classif-case'>{changeKor(children as string)}</span>
        </div>
    )
}

export default Classification