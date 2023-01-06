import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dateParser } from '../util/dateParser';

const Version = () => {
    const router = useParams();
    const [version, setVersion] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        axios.get(`docs/find/${router.id}/version`)
            .then((res) => {
                setVersion(res.data.versionDocsResponseDto)
                console.log(res.data.versionDocsResponseDto)
                setIsLoad(true)
            })
            .catch((err) => {
                console.log(err)
                alert('오류가 발생하여 문서를 불러올 수 없습니다.');
            })
    }, [router.id]);
    return (
        <div>
            {isLoad ? <>{version.reverse().map((ver: any) => (
                <div>
                    <span style={{}}>{dateParser(ver.thisVersionCreatedAt)} (작성자 : {ver.nickName}) : {ver.contents}</span>
                    <br /><br />
                </div>
            ))}</> : ''}
        </div>
    );
};

export default Version;