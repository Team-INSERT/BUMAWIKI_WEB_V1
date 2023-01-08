import * as C from 'allFiles';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeKor } from 'util/changeKor';
import { dateParser } from 'util/dateParser';
import { documentation } from 'util/documentation';
import '../style/pages-style/Docs.scss'

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
    const [versionDocs, setVersionDocs] = useState({
        contents: '',
        nickName: '',
        thisVersionCreatedAt: '',
        userId: ''
    })
    const [prevContents, setPrevContents] = useState('');
    const [nextContents, setNextContents] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                setDocs(res.data)
                axios.get(`/docs/find/${router.id}/version`)
                    .then((res) => {
                        const Array = res.data.versionDocsResponseDto.reverse()
                        setVersionDocs(Array[router.versionId || 0])
                        const a = Array[router.versionId || 0].contents, b = Array[parseInt(router.versionId as string) + 1 || 1].contents
                        setPrevContents(a.replace(b, ''))
                        setNextContents(b.replace(a.replace(a.replace(b, ''), ''), ''))
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
    }, [router.id, router.versionId]);
    return (
        <div>
            <C.Header />
            <div className="docs-board-wrap">
                <C.Board>
                    <div className="docs-title-box">
                        <span>{docs?.title}</span>
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
                                <span className='last-update-date'>마지막 수정 : {dateParser(versionDocs.thisVersionCreatedAt)} | 수정자 : {versionDocs.nickName}</span>
                                <C.AccodianMenu name="수정된 내용" isOpen={false}>
                                    <div className='docs-content' dangerouslySetInnerHTML={{
                                        __html: versionDocs?.contents
                                            .replace(prevContents, `<span style="background-color:#3FB950;">${prevContents}</span>`)
                                            .replace(/<</gi, `&lt;&lt;`)
                                            .replace(/>>/gi, `&gt;&gt;`)
                                    }}></div>
                                    <div className='docs-content' dangerouslySetInnerHTML={{
                                        __html: nextContents
                                            .replace(nextContents, `<span style="background-color:#fe5250;">${nextContents}</span>`)
                                            .replace(/<</gi, `&lt;&lt;`)
                                            .replace(/>>/gi, `&gt;&gt;`)
                                    }}></div>
                                </C.AccodianMenu>
                                <C.AccodianMenu name="개요">
                                    <div className='docs-content' dangerouslySetInnerHTML={{ __html: documentation(versionDocs?.contents.replace(/<br>/gi, '\n')) }}>
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