import { changeKor } from 'allFiles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/components-style/Aside.scss';

interface Docs {
    title: string,
    docsType: string,
    id: number,
}

const Aside = () => {
    const [lastModifiedDocs, setLastModifiedDocs] = useState([]);

    useEffect(() => {
        axios.get('/docs/find/modified')
            .then((res) => {
                setLastModifiedDocs(res.data)
            })
            .catch((err) => {
                console.log(err)
                // alert('오류가 발생하여 문서를 불러올 수 없습니다.');
            })
    }, []);

    return (
        <div className='aside-wrap'>
            {/* 글자가 넘어갈 경우 슬라이싱 필요, map 사용 필요 (요소개수 : 10개) */}
            <div className='aside-title-box'>
                <span>최근 수정된 문서</span>
            </div>
            {lastModifiedDocs.map((docs: Docs) => (
                <div className='aside-doc-box' key={docs.id}>
                    <Link to={`/docs/${docs.id}`} className='list'>{docs.title} ({changeKor(docs.docsType)})</Link>
                </div>
            ))}
        </div>
    );
};

export default Aside;