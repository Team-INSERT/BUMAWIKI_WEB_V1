import * as C from 'allFiles';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeKor } from 'util/changeKor';
import { documentation } from 'util/documentation';
import '../style/pages-style/Docs.scss'

const Docs = () => {
    const router = useParams();
    const [docs, setDocs] = useState({
        title: '',
        docsType: '',
        enroll: 0,
        contents: '',
        lastModifiedAt: ''
    });
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                console.log(res)
                setDocs(res.data)
                setIsLoad(true);
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, [router.id]);
    return (
        <div>
            <C.Header />
            <div className="docs-board-wrap">
                <C.Board>
                    <div className="docs-title-box">
                        <span>{docs?.title}</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>{changeKor(docs?.docsType)}</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        {isLoad ?
                            (
                                <div>
                                    <C.AccodianMenu name="개요">
                                        이름 : {docs.title}<br />
                                        입학년도 : {docs.enroll}년<br />
                                        분류 : {changeKor(docs.docsType)}<br />
                                        {documentation(docs.contents)}<br />
                                    </C.AccodianMenu>
                                    <C.AccodianMenu name="어록">
                                        마지막 수정 날짜 : {docs.lastModifiedAt.replace('T', ' ')}
                                    </C.AccodianMenu>
                                    <C.AccodianMenu name="마지막 수정일">
                                        마지막 수정 날짜 : {docs.lastModifiedAt.replace('T', ' ')}
                                    </C.AccodianMenu>
                                </div>
                            )
                            : ''
                        }
                    </div>
                    <C.SubFooter />
                </C.Board>
                <C.ScrollBtn />
                <C.Aside />
            </div>
            <C.Footer />
        </div>
    );
};

export default Docs;