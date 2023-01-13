import axios from 'axios'
import * as C from 'allFiles'
import React from 'react'
import * as R from 'react-router-dom'
import Docs from 'types/docs'
import './Search.scss'
import { changeKor } from 'util/changeKor'

const Search = () => {
    const router = R.useParams()
    const navigate = R.useNavigate()
    const [result, setResult] = React.useState([])
    const [isLoad, setIsLoad] = React.useState(false)

    const getFindAllDocsInfo = async () => {
        try {
            const res = await axios.get(`/docs/find/all/title/${router.result}`)
            if (res.data.length === 1) navigate(`/docs/${res.data[0].title}`)
            setResult(res.data)
            setIsLoad(true)
        } catch (err) {
            alert('검색 도중 오류가 발생했습니다.')
            console.log(err)
        }
    }

    React.useEffect(() => {
        getFindAllDocsInfo();
        // eslint-disable-next-line
    }, [router.result])

    return (
        <div>
            <C.Header />
            <div className="search-board-wrap">
                <C.Board>
                    <div className="search-title-box">
                        <span>'{router.result}' 검색결과</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>검색</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <ul className="search-list">
                            {isLoad ? <>
                                {result.map((result: Docs, index) => (
                                    <li><R.Link key={index} className="link" to={`/docs/${result.title}`}>{result.title} — ( {changeKor(result.docsType)},{result.enroll} )</R.Link></li>
                                ))}</> : <div>
                                <span>아직 '{router.result}'라는 문서는 없습니다.</span><br /><br />
                                <R.Link to={`/create?name=${router.result}`} style={{ textDecoration: 'none', color: 'blue' }}>지금 문서를 생성해보세요</R.Link>
                            </div>}
                        </ul>
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

export default Search