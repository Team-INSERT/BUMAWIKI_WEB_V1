import * as C from 'allFiles';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from 'util/getCookie';
import '../style/pages-style/Docs.scss'

const Docs = () => {
    const router = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('');

    const onClickUpdateDocs = () => {
        var FormData = require('form-data');
        var data = new FormData();
        data.append('request', { contents: "글 내용을 이렇게 변경합니다 [[사진]]" });

        if (contents.length <= 2) {
            alert('문서가 비어있습니다!')
            return;
        }
        axios.put(`docs/update/${router.id}`, data, {
            headers: {
                'Content-Type': `multipart/form-data`,
                Authorization: getCookie('authorization'),
            },
        }).then(() => {
            alert('문서가 편집되었습니다!');
            navigate('/');
        }).catch((err) => {
            console.log(err)
            alert('오류가 발생했습니다!')
        })
    }

    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                setContents(res.data.contents)
                setTitle(res.data.title)
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
                        <span>문서 편집 : {title}</span>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <textarea className='update-textarea' onChange={(e) => { setContents(e.target.value) }} value={contents} />
                        <button onClick={onClickUpdateDocs} className='update-button'>문서 업데이트</button>
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