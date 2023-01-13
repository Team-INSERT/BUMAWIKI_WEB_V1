import React from 'react'
import * as C from 'allFiles'
import './Accident.scss'
import { Link } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import Docs from 'types/docs'

const Accident = () => {
    const [accidents, setAccidents] = React.useState([])
    const [allDate] = React.useState([2023])
    const nowDate = new Date()

    const getAccidentDocs = async () => {
        try {
            const res = await axios.get(`/docs/accident`)
            const data = res.data.sort((a: Docs, b: Docs) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
            setAccidents(data)
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err)
                alert('오류가 발생하여 문서를 불러올 수 없습니다.')
            }
        }
    }

    React.useEffect(() => {
        for (let date = nowDate.getFullYear() - 1; date >= 2021; date--) {
            allDate.push(date)
        }
        getAccidentDocs()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <C.Header />
            <div className="accident-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:사건/사고</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>사건/사고</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        {allDate.map((date) => (
                            <C.AccodianMenu name={`${date}년 사건/사고`} key={date}>
                                <ul className="accident-list">
                                    {accidents.map((accident: Docs) => (<div key={accident.id}>
                                        {accident.enroll === date ?
                                            <li><Link to={`/docs/${accident.title}`} className='link'>{accident.title}</Link></li> : ''}
                                    </div>))}
                                </ul>
                            </C.AccodianMenu>
                        ))}
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

export default Accident