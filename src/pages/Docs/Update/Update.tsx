import * as C from 'allFiles'
import { UserContext } from 'App'
import axios, { AxiosError } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { documentation } from 'util/documentation'
import { getCookie } from 'util/getCookie'
import '../Doc/Docs.scss'

const Docs = () => {
    const router = useParams()
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
    const [files, setFiles] = useState<any>([])
    const [fileInput, setFileInput] = useState([''])

    const onClickUpdateDocs = () => {
        if (!user.isLogin) {
            alert('로그인 후 이용 가능한 서비스입니다.')
            return
        }
        const FormData = require('form-data')
        const data = new FormData()
        data.append('request', new Blob([`{ "contents": "${contents.replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '/')}" }`], { type: 'application/json' }), { contentType: 'application/json', })
        for (let i = files.length - 1; i >= 0; i--) {
            data.append("files", files[i], files[i].name)
        }
        if (contents.length === 0) {
            alert('문서가 비어있습니다!')
            return
        }
        axios.put(`docs/update/${router.id}`, data, {
            headers: {
                'Content-Type': `multipart/form-data`,
                Authorization: getCookie('authorization'),
            },
        }).then(() => {
            alert('문서가 편집되었습니다!')
            navigate(`/docs/${router.id}`)
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 403 && err.response.data.message === 'Cannot Change Your Docs') {
                alert('자기자신의 문서는 변경할 수 없습니다.')
            } else if (err.response.status === 403) {
                alert('로그인 후 사용 가능한 서비스입니다.')
            } else {
                alert(`오류가 발생했습니다. 개별적으로 관리자에게 문의바랍니다. 오류코드 : ${err.response.status}`)
            }
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
                    console.log(err)
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.')
                }
            })
    }, [router.id])
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
                        {fileInput.map(() => (
                            <input type='file' className='file' onChange={(e) => { setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files]) }} />
                        ))}
                        <div className='file-add-wrap' onClick={() => { setFileInput([...fileInput, '']) }}>
                            <button className='file-add-button'>+</button><span>사진 더 선택하기</span>
                        </div>
                        <span className='docs-need-file'>문서에 필요한 사진태그 개수 : {files.length}개</span>
                        <br />
                        <textarea className='update-textarea' onChange={(e) => { setContents(e.target.value) }} value={contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"')} />
                        <span className='preview-span'>미리보기</span>
                        <div className='update-textarea resize' dangerouslySetInnerHTML={{ __html: documentation(contents.replace(/<br>/gi, '\n')) }} />
                        <button onClick={onClickUpdateDocs} className='update-button'>문서 업데이트</button>
                    </div>
                    <C.SubFooter />
                </C.Board>
                <C.ScrollBtn />
                <C.Aside />
            </div>
            <C.Footer />
        </div>
    )
}

export default Docs