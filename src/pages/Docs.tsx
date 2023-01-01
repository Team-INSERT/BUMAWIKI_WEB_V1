import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Docs = () => {
    const router = useParams();
    const [docs, setDocs] = useState();

    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                console.log(res)
                setDocs(res.data)
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    // alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, []);
    return (
        <div>
            Docs id : {router.id}
        </div>
    );
};

export default Docs;