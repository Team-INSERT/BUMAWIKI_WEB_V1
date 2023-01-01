import { changeKor } from 'allFiles';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Docs = () => {
    const router = useParams();
    const [docs, setDocs]: any = useState();
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
                    // alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, [router.id]);
    return (
        <div>
            <h2>세원에몽 레이아웃해줘 !!!! 문서로 오는 값은 다음과 같단다!!!!</h2>
            {isLoad ?
                <p>
                    문서 아이디 : {docs.id}<br />
                    문서 제목 : {docs.title}<br />
                    내용 : {docs.contents}<br />
                    분류 : {changeKor(docs.docsType)}<br />
                    생성연도 : {docs.enroll}<br />
                    조회수 : {docs.view}<br />
                    마지막 수정 날짜 : {docs.lastModifiedAt.replace('T', ' ')}
                </p>
                : ''}
            <h2>그럼 건투를 빈다 !!!!!!!!!!!!!!</h2>
        </div>
    );
};

export default Docs;