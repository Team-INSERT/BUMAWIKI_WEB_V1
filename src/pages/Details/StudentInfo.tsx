import React from 'react';
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer
} from 'allFiles';
import '../../style/pages-style/details-style/StudentInfo.scss';

const StudentInfo = () => {
    return (
        <div>
            <Header />
            <Board>
                <SubFooter />
            </Board>
            <Aside />
            <Footer />
        </div>
    );
};

export default StudentInfo;