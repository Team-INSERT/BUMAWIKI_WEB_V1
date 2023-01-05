import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Version = () => {
    const router = useParams();
    const [version, setVersion] = useState();
    useEffect(() => {
        axios.get(`docs/find/${router.id}/version`)
            .then((res) => {
                setVersion(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
                alert('오류가 발생하여 문서를 불러올 수 없습니다.');
            })
    }, [router.id]);
    return (
        <div>

        </div>
    );
};

export default Version;