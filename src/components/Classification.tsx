import React, { PropsWithChildren } from 'react';
import '../style/components-style/Classification.scss';

const Classification = ({ children }: PropsWithChildren) => {
    return (
        <div className='classif-wrap'>
            <span className='classif'>분류 :&nbsp;</span>
            <span className='classif-case'>{children}</span>
        </div>
    );
};

export default Classification;