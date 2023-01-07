import * as C from 'allFiles';
import { UserContext } from 'App';
import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentation } from 'util/documentation';
import { getCookie } from 'util/getCookie';
import '../style/pages-style/Docs.scss'

const Docs = () => {
    const router = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('');

    const onClickUpdateDocs = () => {
        const FormData = require('form-data');
        const data = new FormData();
        data.append('request', new Blob([`{ "contents": "${contents.replace(/\n/gi, '<br>').replace(/"/gi, '\\"')}" }`], { type: 'application/json' }), { contentType: 'application/json', });
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
            navigate(`/docs/${router.id}`);
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 403) {
                alert('로그인 후 이용 가능한 서비스입니다.');
            } else {
                alert(`오류가 발생했습니다. 개별적으로 관리자에게 문의바랍니다. 오류코드 : ${err.response.status}`)
            }
        })
    }

    useEffect(() => {
        if (!user.id) {
            alert('로그인 후 이용 가능한 서비스입니다.');
            navigate(`/docs/${router.id}`)
        }
        // eslint-disable-next-line
    }, []);

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
                    <img src='/images/docs-example.png' alt='문서작성법' className='docs-example' />
                    <div className="line" />
                    <div className='summary-wrap'>
                        <textarea className='update-textarea' onChange={(e) => { setContents(e.target.value) }} value={contents.replace(/<br>/gi, '\n')} />
                        <span className='preview-span'>미리보기</span>
                        <div className='update-textarea' dangerouslySetInnerHTML={{ __html: documentation(contents.replace(/<br>/gi, '\n')) }} />
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