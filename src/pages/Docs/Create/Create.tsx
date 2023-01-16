import * as C from 'allFiles'
import { UserContext } from 'App'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import autoComplete from 'util/autoComplete'
import { documentation } from 'util/documentation'
import { getCookie } from 'util/getCookie'
import './Create.scss'

const Docs = () => {
    const navigate = useNavigate()
    const user = React.useContext(UserContext)
    const [docsType, setDocsType] = React.useState('')
    const [enroll, setEnroll] = React.useState<number>()
    const [title, setTitle] = React.useState(decodeURI(window.location.search.replace('?name=', '')) || '')
    const [contents, setContents] = React.useState('')
    const [files1, setFiles1] = React.useState<"" | File>()
    const [files2, setFiles2] = React.useState<"" | File>()
    const [files3, setFiles3] = React.useState<"" | File>()

    console.log(window.location.search)

    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDocsType(e.target.id)
    }

    const onChangeEnrollRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnroll(parseInt(e.target.id))
    }

    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value)
        autoComplete(contents, e)
    }

    const onClickCreateDocs = async () => {
        if (!user.isLogin) {
            alert('로그인 후 이용 가능한 서비스입니다.')
            return
        }

        if (!enroll) {
            alert('연도를 선택해주세요!')
            return
        }

        if (title.length === 0) {
            alert('문서의 이름을 정해주세요!')
            return
        }

        if (!docsType) {
            alert('문서의 분류를 선택해주세요!')
            return
        }

        const FormData = require('form-data')
        const data = new FormData()
        data.append('request', new Blob([`{ "title": "${title.replace(/"/gi, '&$^%')}", "enroll":"${enroll}", "contents":"${contents.replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '\\\\')}", "docsType":"${docsType}"}`], { type: 'application/json' }))

        if (files1) data.append("files", files1, files1.name)
        if (files2) data.append("files", files2, files2.name)
        if (files3) data.append("files", files3, files3.name)

        try {
            const res = await axios.post('/docs/create', data, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: getCookie('authorization'),
                    refresh_token: getCookie('refresh_token')
                },
            })
            alert('문서가 생성되었습니다!')
            navigate(`/docs/${res.data.id}`)
        } catch (err) {
            console.log(err)
            alert('오류가 발생했습니다.')
            return
        }
    }

    return (
        <div>
            <C.Header />
            <div className="docs-board-wrap">
                <C.Board>
                    <div className="docs-title-box">
                        <span>문서 생성</span>
                    </div>
                    <div className='create-table'>
                        <div className='tr-wrap'>
                            <div className='tr-title'>분류</div>
                            <div className='tr-content'>
                                <label htmlFor='TEACHER'>인문 선생님</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='TEACHER' name='radio' />
                                <label htmlFor='MAJOR_TEACHER'>전공 선생님</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='MAJOR_TEACHER' name='radio' />
                                <label htmlFor='MENTOR_TEACHER'>멘토 선생님</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='MENTOR_TEACHER' name='radio' />
                                <label htmlFor='ACCIDENT'>사건/사고</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='ACCIDENT' name='radio' />
                                <label htmlFor='CLUB'>전공동아리</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='CLUB' name='radio' />
                                <label htmlFor='FREE_CLUB'>사설동아리</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='FREE_CLUB' name='radio' />
                            </div>
                        </div>
                        <div className='tr-wrap'>
                            <div className='tr-title'>문서 이름</div>
                            <input className='tr-content' onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        </div>
                        <div className='tr-wrap'>
                            <div className='tr-title'>연도</div>
                            <div className='tr-content'>
                                <label htmlFor='2023' className='enroll'>2023년</label>
                                <input type='radio' onChange={(e) => { onChangeEnrollRadio(e) }} className='classify radio' id='2023' name='radios' />
                                <label htmlFor='2022' className='enroll'>2022년</label>
                                <input type='radio' onChange={(e) => { onChangeEnrollRadio(e) }} className='classify radio' id='2022' name='radios' />
                                <label htmlFor='2021' className='enroll'>2021년</label>
                                <input type='radio' onChange={(e) => { onChangeEnrollRadio(e) }} className='classify radio' id='2021' name='radios' />
                            </div>
                        </div>
                        <div className='tr-wrap tr-example'>
                            <div className='tr-title'>예시</div>
                            <div className='tr-content'>
                                <img src='/images/docs-example.png' className='docs-example' alt='문서 양식' />
                            </div>
                        </div>
                        <div className='tr-wrap tr-file'>
                            <div className='tr-title'>이미지</div>
                            <div className="inputs">
                                <input type="file" className='tr-input' onChange={(e) => { setFiles1(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                                <input type="file" className='tr-input' onChange={(e) => { setFiles2(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                                <input type="file" className='tr-input' onChange={(e) => { setFiles3(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                            </div>
                        </div>
                        <div className='tr-wrap constents-wrap tr-text'>
                            <div className='tr-title'>문서 내용</div>
                            <textarea className='tr-textarea' onChange={(e) => { onChangeTextArea(e) }} value={contents} />
                        </div>
                        <div className='tr-wrap constents-wrap tr-text'>
                            <div className='tr-title'>미리보기</div>
                            <div className='tr-textarea resize' dangerouslySetInnerHTML={{ __html: documentation(contents.replace(/<br>/gi, '\n')) }}></div>
                        </div>
                    </div>
                    <div className='create-submit'>
                        <span className='create-warn'>※ 필독! 문서 내 부적절한 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※</span>
                        <button onClick={onClickCreateDocs}>문서 생성</button>
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