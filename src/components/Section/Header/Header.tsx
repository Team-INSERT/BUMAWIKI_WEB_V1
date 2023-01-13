import { UserContext } from 'App'
import React from 'react'
import * as R from 'react-router-dom'
import './Header.scss'
import Student from '../../../svg/student.svg'
import Teacher from '../../../svg/teacher.svg'
import Accident from '../../../svg/accident.svg'
import Club from '../../../svg/club.svg'
import Create from '../../../svg/create.svg'
import Search from '../../../svg/search.svg'

const Header = () => {
    const [search, setSearch] = React.useState('')
    const [isLoad, setIsLoad] = React.useState(false)
    const user = React.useContext(UserContext)
    const navigate = R.useNavigate()
    const navigateSearchResult = () => {
        if (search.length === 0) {
            alert('검색할 문서명을 입력해주세요!')
        } else {
            navigate(`/search/${search}`)
            window.location.reload()
        }
    }
    React.useEffect(() => {
        if (user.id) setIsLoad(true)
    }, [user])

    return (
        <div className='header-wrap'>
            <R.Link to={'/'} className='logo-wrap'>
                <img src='/images/logo.png' alt='logo' className='logo' />
            </R.Link>
            <div className='section-bar'>
                <R.Link to={'/student'} className='section-wrap'>
                    <div className='section-logo'>
                        <img src={Student} alt='' />
                    </div>
                    <div className='section-text'>학생</div>
                </R.Link>
                <R.Link to={'/teacher'} className='section-wrap'>
                    <div className='section-logo'>
                        <img src={Teacher} alt='' />
                    </div>
                    <div className='section-text'>선생님</div>
                </R.Link>
                <R.Link to={'/accident'} className='section-wrap'>
                    <div className='section-logo'>
                        <img src={Accident} alt='' />
                    </div>
                    <div className='section-text'>사건/사고</div>
                </R.Link>
                <R.Link to={'/club'} className='section-wrap'>
                    <div className='section-logo'>
                        <img src={Club} alt='' />
                    </div>
                    <div className='section-text'>동아리</div>
                </R.Link>
                {user.isLogin ?
                    <R.Link to={`/create`} className='section-wrap'>
                        <div className='section-logo'>
                            <img src={Create} alt='' />
                        </div>
                        <div className='section-text'>문서 생성</div>
                    </R.Link> : ''}
            </div>
            <div className='search-bar'>
                <form className='search-wrap' onSubmit={(e) => { e.preventDefault() }}>
                    <input type='text'
                        className='search-input'
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='search-button' onClick={navigateSearchResult}>
                        <img src={Search} alt='' />
                    </button>
                </form>
                <div className='login-wrap'>
                    {isLoad ?
                        <R.Link to='/mypage' className='login-text'>마이페이지</R.Link>
                        :
                        <a href='https://auth.bssm.kro.kr/oauth?clientId=a1a16261&redirectURI=http://bumawiki.kro.kr/oauth' className='login-text'>로그인</a>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header