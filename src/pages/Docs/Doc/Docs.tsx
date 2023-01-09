import * as C from 'allFiles';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeKor } from 'util/changeKor';
import { dateParser } from 'util/dateParser';
import { documentation } from 'util/documentation';
import './Docs.scss'

const Docs = () => {
    const router = useParams();
    const [docs, setDocs] = useState({
        title: '',
        docsType: '',
        enroll: 0,
        contents: '',
        lastModifiedAt: '',
        view: '',
    });
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                setDocs({
                    ...res.data,
                    lastModifiedAt: dateParser(res.data.lastModifiedAt)
                })
                setIsLoad(true);
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
        // eslint-disable-next-line
    }, [router.id]);
    return (
        <div>
            <C.Header />
            <div className="docs-board-wrap">
                <C.Board>
                    <div className="docs-title-box">
                        <span>{docs?.title.replace(/&\$\^%/gi, '"')}</span>
                        <div className="docs-menu">
                            <C.DetailBtn />
                        </div>
                    </div>
                    <div className="classif-box">
                        <C.Classify>{changeKor(docs?.docsType)}</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        {isLoad ? (
                            <div className='content-wrap'>
                                <span className='last-update-date'>마지막 수정 : {docs.lastModifiedAt}</span>
                                <C.AccodianMenu name="개요">
                                    <div className='docs-content' dangerouslySetInnerHTML={{ __html: documentation(docs?.contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"')) }}>
                                    </div>
                                    <br />
                                </C.AccodianMenu>
                            </div>
                        ) : ''}
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