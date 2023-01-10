import * as C from 'allFiles'
import { UserContext } from 'App'
import axios, { AxiosError } from 'axios'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
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
    const [files, setFiles] = useState<any>([]);
    const [fileInput, setFileInput] = useState([''])

    const [table, setTable] = useState('');
    const [tableColor, setTableColor] = useState('');
    const [tableTextColor, setTableTextColor] = useState('');
    const [tableLine, setTableLine] = useState('');
    const [tableName, setTableName] = useState('');
    const [tableHeight, setTableHeight] = useState('');
    const [tableBirth, setTableBirth] = useState('');
    const [tableCountry, setTableCountry] = useState('');
    const [tableMBTI, setTableMBTI] = useState('');
    const [tableClub, setTableClub] = useState('');
    const [tableField, setTableField] = useState('');

    useEffect(() => {
        setTable(`?^table style="border-collapse: collapse; border:2px solid ${tableLine}; width:360px;"^?
?^tr style="border:2px solid ${tableLine}"^?
?^td colSpan="2" style="text-align: center; height: 38px; font-weight: 800; color: ${tableTextColor}; background-color: ${tableColor};"^?${tableName}?^@#@#@td^?
?^@#@#@tr^?
?^tr style="border:2px solid ${tableLine}"^?
?^td colSpan="2" style="width: 360px; height: 200px; overflow: hidden; background-image:url('<<사진>>'); background-size: cover;"^??^@#@#@td^?
?^@#@#@tr^?
?^tr style="height: 38px; border: 2px solid black"^?
?^td style="border:2px solid ${tableLine}; color: ${tableTextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${tableColor};"^?키?^@#@#@td^?
?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${tableLine}; font-size: 13px; font-weight: 600;"^?${tableHeight}?^@#@#@td^?
?^@#@#@tr^?
?^tr style="height: 38px; border: 2px solid black;"^?
?^td style="border:2px solid ${tableLine}; color: ${tableTextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${tableColor};"^?생일?^@#@#@td^?
?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${tableLine}; font-size: 13px; font-weight: 600;"^?${tableBirth}?^@#@#@td^?
?^@#@#@tr^?
?^tr style="height: 38px; border: 2px solid black;"^?
?^td style="border:2px solid ${tableLine}; color: ${tableTextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${tableColor};"^?국적?^@#@#@td^?
?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${tableLine}; font-size: 13px; font-weight: 600;"^?${tableCountry}?^@#@#@td^?
?^@#@#@tr^?
?^tr style="height: 38px; border: 2px solid black;"^?
?^td style="border:2px solid ${tableLine}; color: ${tableTextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${tableColor};"^?MBTI?^@#@#@td^?
?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${tableLine}; font-size: 13px; font-weight: 600;"^?${tableMBTI}?^@#@#@td^?
?^@#@#@tr^?
?^tr style="height: 38px; border: 2px solid black;"^?
?^td style="border:2px solid ${tableLine}; color: ${tableTextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${tableColor};"^?소속?^@#@#@td^?
?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${tableLine}; font-size: 13px; font-weight: 600;"^?${tableClub}?^@#@#@td^?
?^@#@#@tr^?
?^tr style="height: 38px;"^?
?^td style="border:2px solid ${tableLine}; color: ${tableTextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${tableColor};"^?분야?^@#@#@td^?
?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${tableLine}; font-size: 13px; font-weight: 600;"^?${tableField}?^@#@#@td^?
?^@#@#@tr^??^@#@#@table^?`)
    }, [table, tableTextColor, tableColor, tableName, tableHeight, tableBirth, tableCountry, tableMBTI, tableClub, tableField, tableLine])

    const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value)
        if (contents.substring(contents.length - 3, contents.length) === '<강조' ||
            contents.substring(contents.length - 3, contents.length) === '<어록' ||
            contents.substring(contents.length - 3, contents.length) === '<빨강' ||
            contents.substring(contents.length - 3, contents.length) === '<하양' ||
            contents.substring(contents.length - 3, contents.length) === '<노랑') {
            setContents(`${contents}></${contents.substring(contents.length - 2, contents.length)}>`)
            setTimeout(() => {
                e.target.selectionStart = contents.length + 1;
                e.target.selectionEnd = contents.length + 1;
            }, 10)
        } else if (
            contents.substring(contents.length - 4, contents.length) === '<취소선' ||
            contents.substring(contents.length - 4, contents.length) === '<소제목') {
            setContents(`${contents}></${contents.substring(contents.length - 3, contents.length)}>`)
            setTimeout(() => {
                e.target.selectionStart = contents.length + 1;
                e.target.selectionEnd = contents.length + 1;
            }, 10)
        } else if (contents.substring(contents.length - 3, contents.length) === '<링크') {
            setContents(`${contents} 문서={}></링크>`)
            setTimeout(() => {
                e.target.selectionStart = contents.length + 5;
                e.target.selectionEnd = contents.length + 5;
            }, 10)
        } else if (contents.substring(contents.length - 5, contents.length) === '<외부링크') {
            setContents(`${contents} 문서={}></외부링크>`)
            setTimeout(() => {
                e.target.selectionStart = contents.length + 5;
                e.target.selectionEnd = contents.length + 5;
            }, 10)
        }
    }

    const onClickUpdateDocs = () => {
        if (!user.isLogin) {
            alert('로그인 후 이용 가능한 서비스입니다.')
            return
        }
        const FormData = require('form-data')
        const data = new FormData()
        data.append('request', new Blob([`{ "contents": "${contents.replace('[[프로필]]', table).replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '/')}" }`], { type: 'application/json' }), { contentType: 'application/json', })
        console.log(contents.replace('[[프로필]]', table).replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '/'))
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
        }).then((res) => {
            alert('문서가 편집되었습니다!')
            navigate(`/docs/${router.id}`)
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 403) {
                if (err.response.data.message === 'Cannot Change Your Docs') {
                    alert('자기자신의 문서는 변경할 수 없습니다.')
                } else if (err.response.data.error === 'Forbidden') {
                    alert('읽기전용 유저입니다.')
                } else {
                    alert('로그인 후 사용 가능한 서비스입니다.')
                }
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
                        <span className='create-profile'>프로필 생성기</span>
                        <div className='create-profile-wrap'>
                            <div className='create-table'>
                                <div className='create-title'>표 색상</div>
                                <input placeholder='ex) #251678, orange'
                                    onChange={(e) => { setTableColor(e.target.value) }}
                                    value={tableColor} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>글자 색상</div>
                                <input placeholder='ex) black, white'
                                    onChange={(e) => { setTableTextColor(e.target.value) }}
                                    value={tableTextColor} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>선 색상</div>
                                <input placeholder='ex) black, white'
                                    onChange={(e) => { setTableLine(e.target.value) }}
                                    value={tableLine} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>사진</div>
                                <div className='create-file'>
                                    <input type='file' className='file' onChange={(e) => { setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files]) }} />
                                </div>
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>이름</div>
                                <input
                                    onChange={(e) => { setTableName(e.target.value) }}
                                    value={tableName} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>키</div>
                                <input
                                    onChange={(e) => { setTableHeight(e.target.value) }}
                                    value={tableHeight} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>생일</div>
                                <input
                                    onChange={(e) => { setTableBirth(e.target.value) }}
                                    value={tableBirth} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>국적</div>
                                <input
                                    onChange={(e) => { setTableCountry(e.target.value) }}
                                    value={tableCountry} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>MBTI</div>
                                <input
                                    onChange={(e) => { setTableMBTI(e.target.value) }}
                                    value={tableMBTI} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>소속</div>
                                <input
                                    onChange={(e) => { setTableClub(e.target.value) }}
                                    value={tableClub} />
                            </div>
                            <div className='create-table last-table'>
                                <div className='create-title'>분야</div>
                                <input
                                    onChange={(e) => { setTableField(e.target.value) }}
                                    value={tableField} />
                            </div>
                            <span className='input-profile'>{'※ 내용 안에 [[프로필]] 태그를 삽입해주세요! ※'}</span>
                        </div>
                        <textarea
                            className='update-textarea'
                            onChange={(e) => { onChangeTextArea(e) }}
                            value={contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"')} />
                        <span className='preview-span'>미리보기</span>
                        <div className='update-textarea resize' dangerouslySetInnerHTML={{ __html: documentation(contents.replace(/<br>/gi, '\n').replace('[[프로필]]', table)) }} />
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