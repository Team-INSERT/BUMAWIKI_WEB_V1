import React from 'react'
import * as R from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { dateParser } from 'util/dateParser'
import './DetailBtn.scss'
import { UserContext } from 'App'
import { getCookie } from 'util/getCookie'
import Docs from 'types/docs'

const DetailBtn = () => {
    const router = R.useParams()
    const user = React.useContext(UserContext)
    const navigate = R.useNavigate()

    const [docs, setDocs] = React.useState<Docs>()
    const [docsName, setDocsName] = React.useState('')

    const getDocsInfo = async () => {
        try {
            const res = await axios.get(`/docs/find/id/${router.title}`)
            setDocs({
                ...res.data,
                lastModifiedAt: dateParser(res.data.lastModifiedAt)
            })
        } catch (err) {
            if (err instanceof AxiosError) {
                alert('오류가 발생하여 문서를 불러올 수 없습니다.')
                console.log(err)
                return
            }
        }
    }

    const onClickChangeDocsName = async () => {
        if (docsName.length === 0) {
            alert('내용이 없습니다.')
            return
        }

        try {
            const res = await axios.put(`/docs/update/title/${router.title}`, { title: docsName }, {
                headers: {
                    Authorization: getCookie('authorization')
                }
            })
            alert('문서 수정 완료')
            navigate(`/docs/${res.data.title}`)
        } catch (err) {
            alert('문서 이름 변경 도중 오류가 발생했습니다.')
            console.log(err)
        }
    }

    const onClickDeleteDocs = async () => {
        try {
            axios.delete(`/docs/delete/${router.title}`, {
                headers: {
                    Authorization: getCookie('authorization')
                }
            })
            alert('문서가 삭제되었습니다!')
            navigate('/')
        } catch (err) {
            alert('문서 삭제 도중 오류가 발생했습니다.')
            console.log(err)
        }
    }

    React.useEffect(() => {
        getDocsInfo();
        // eslint-disable-next-line
    }, [router]);

    return (
        <div className="detail-button-wrap">
            {user.isLogin ? <>
                {user.authority === 'ADMIN' ? <>
                    <div className='link-wrap' onClick={onClickDeleteDocs}>
                        <div><h1 className='link'>삭제</h1></div>
                    </div>
                    <input className='link-wrap-input'
                        value={docsName}
                        onChange={(e) => { setDocsName(e.target.value) }}
                        required={true} />
                    <div className='link-wrap' onClick={onClickChangeDocsName}>
                        <div><h1 className='link'>변경</h1></div>
                    </div></>
                    : ''}
                <R.Link to={`/update/${docs?.title}`} className='link-wrap'>
                    <div><h1 className='link'>편집</h1></div>
                </R.Link>
                <R.Link to={`/version/${docs?.title}`} className='link-wrap'>
                    <div><h1 className='link'>기록</h1></div>
                </R.Link></> : ''}
        </div>
    )
}

export default DetailBtn