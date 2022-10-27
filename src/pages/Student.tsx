import React from 'react'
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    Classify
} from 'src/allFiles';
import '../style/pages-style/Student.scss'

const Student = () => {
    return (
        <div>
            <Header />
            <div className="student-board-wrap">
                <Board>
                    <div className="doc-title-box">
                        <span>부마위키:학생</span>
                    </div>
                    <div className="classif-box">
                        <Classify>학생</Classify>
                    </div>
                    <div className="line" />
                    <SubFooter />
                </Board>
                <Aside />
            </div>
            <Footer />
        </div>
    );
};

export default Student;