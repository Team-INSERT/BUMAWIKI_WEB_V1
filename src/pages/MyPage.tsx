import * as C from 'allFiles';
import { UserContext } from 'App';
import React, { useContext } from 'react';
import useDidMountEffect from 'util/useDidMountEffect';
import '../style/pages-style/MyPage.scss';
import '../style/components-style/AccodianMenu.scss';
import { dateParser } from 'util/dateParser';
import { Link } from 'react-router-dom';

const MyPage = () => {
    const user = useContext(UserContext);
    useDidMountEffect(() => {
        console.log(user)
    }, [user]);
    return (
        <div>
            <C.Header />
            <div className='mypage-wrap'>
                <C.Board>
                    <div className="mypage-title-box">
                        <span>{`마이페이지 : ${user.nickName}`}</span>
                    </div>
                    <div className='margin' />
                    <C.Classify>{user.authority}</C.Classify>
                    <div className='mypage-line' />
                    <div className='mypage-info-box'>
                        <C.AccodianMenu name={'정보'}>
                            <div className='mypage-info'>
                                <span>이름은 {user.nickName}이며, 부마위키의 사용자 중 한 명이다.</span>
                                <span>이 유저의 아이디는 '{user.id}'이며, 이메일은 {user.email}이다.</span>
                            </div>
                        </C.AccodianMenu>
                        <C.AccodianMenu name={'기여한 문서'}>
                            <div className='contribute-info'>
                                <span className='contribute-text'>이 유저가 기여한 문서의 정보들이다.</span>
                                <div className='contribute-list'>
                                    {user.contributeDocs.map((docs: any) => (
                                        <span>문서명 : <Link className='contribute-link' to={`/docs/${docs.docsId}`}>{docs.title}[{docs.docsId}]</Link><br />
                                            수정 날짜 : {dateParser(docs.createTime)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </C.AccodianMenu>
                        <div className='line margin' />
                    </div>
                </C.Board>
                <C.Aside />
            </div>
            <C.ScrollBtn />
            <C.Footer />
        </div>
    );
};

export default MyPage;