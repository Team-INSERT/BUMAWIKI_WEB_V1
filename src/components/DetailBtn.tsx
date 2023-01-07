import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { dateParser } from 'util/dateParser';
import '../style/components-style/DetailBtn.scss';

const DetailBtn = () => {
    const router = useParams();
    const [docs, setDocs] = useState({
        id: '',
        title: '',
        docsType: '',
        enroll: 0,
        contents: '',
        lastModifiedAt: '',
        view: ''
    });
    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                setDocs({
                    ...res.data,
                    lastModifiedAt: dateParser(res.data.lastModifiedAt)
                })
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, [router.id]);
    return (
        <div className="detail-button-wrap">
            <Link to={`/update/${docs?.id}`} className='link-wrap'>
                <div>
                    <h1 className='link'>편집</h1>
                </div>
            </Link>
            <Link to={`/version/${docs?.id}`} className='link-wrap'>
                <div>
                    <h1 className='link'>기록</h1>
                </div>
            </Link>
        </div>
    );
}

export default DetailBtn;