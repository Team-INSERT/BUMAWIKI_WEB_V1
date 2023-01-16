import * as C from 'allFiles'
import { UserContext } from 'App'
import axios, { AxiosError } from 'axios'
import React from 'react'
import * as R from 'react-router-dom'
import autoComplete from 'util/autoComplete'
import { documentation } from 'util/documentation'
import { getCookie } from 'util/getCookie'
import makeTable from 'util/makeTable'
import '../Doc/Docs.scss'

interface reducerAction {
    name: string,
    value: string,
}

function reducer(state:any, action: reducerAction){
    return {
        ...state,
        [action.name]: action.value,
    }
}

const Docs = () => {
    const router = R.useParams()
    const user = React.useContext(UserContext)
    const navigate = R.useNavigate()

    const [title, setTitle] = React.useState('')
    const [contents, setContents] = React.useState('')
    const [files, setFiles] = React.useState<any>([])
    const [fileInput, setFileInput] = React.useState([''])
    const [table, setTable] = React.useState('')

    const [state, dispatch] = React.useReducer(reducer, {
        Color: '',
        TextColor: '',
        Line: '',
        Name: '',
        Height: '',
        Birth: '',
        Country: '',
        MBTI: '',
        Club: '',
        Field: '',
    })

    const { Color, Country, TextColor, Line, Name, Height, Birth, MBTI, Club, Field } = state;

    const onChangeTable = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(e.target);
    }


    React.useEffect(() => {
        setTable(makeTable(Line, TextColor, Color, Name, Height, Birth, Country, MBTI, Club, Field))
    }, [table, TextColor, Color, Name, Height, Birth, Country, MBTI, Club, Field, Line])

    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value)
        autoComplete(contents, e)
    }

    const onClickUpdateDocs = async () => {
        if (!user.isLogin) {
            alert('로그인 후 이용 가능한 서비스입니다.')
            return
        }
        const FormData = require('form-data')
        const data = new FormData()
        data.append('request', new Blob([`{ "contents": "${contents.replace('[[프로필]]', table).replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '/')}" }`], { type: 'application/json' }), { contentType: 'application/json', })
        for (let i = files.length - 1; i >= 0; i--) {
            data.append("files", files[i], files[i].name)
        }
        if (contents.length === 0) {
            alert('문서가 비어있습니다!')
            return
        }
        try {
            await axios.put(`docs/update/${router.title}`, data, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: getCookie('authorization'),
                },
            })
            alert('문서가 편집되었습니다!')
            navigate(`/docs/${router.title}`)
        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError && err.response !== undefined) {
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
            }
        }
    }

    const getDocsInfo = async () => {
        try {
            const res = await axios.get(`/docs/find/title/${router.title}`)
            setContents(res.data.contents)
            setTitle(res.data.title)
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err)
                alert('오류가 발생하여 문서를 불러올 수 없습니다.')
            }
        }
    }

    React.useEffect(() => {
        getDocsInfo()
        // eslint-disable-next-line
    }, [router.title])
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
                                <input placeholder='ex) #251678, orange' onChange={onChangeTable} name="Color" value={Color} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>글자 색상</div>
                                <input placeholder='ex) black, white' onChange={onChangeTable} name="TextColor" value={TextColor} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>선 색상</div>
                                <input placeholder='ex) black, white' onChange={onChangeTable} name="Line" value={Line} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>사진</div>
                                <div className='create-file'> 
                                <input type='file' className='file' onChange={(e) => { setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files]) }} />
                                </div>
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>이름</div>
                                <input onChange={onChangeTable} name="Name" value={Name} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>키</div>
                                <input onChange={onChangeTable} name="Height" value={Height} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>생일</div>
                                <input onChange={onChangeTable} name="Birth" value={Birth} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>국적</div>
                                <input onChange={onChangeTable} name="Country" value={Country} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>MBTI</div>
                                <input onChange={onChangeTable} name="MBTI" value={MBTI} />
                            </div>
                            <div className='create-table'>
                                <div className='create-title'>소속</div>
                                <input onChange={onChangeTable} name="Club" value={Club} />
                            </div>
                            <div className='create-table last-table'>
                                <div className='create-title'>분야</div>
                                <input onChange={onChangeTable} name="Field" value={Field} />
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