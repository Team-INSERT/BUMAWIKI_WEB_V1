import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Docs from 'types/docs';

const Search = () => {
    const router = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        axios.get(`/docs/find/title/${router.result}`)
            .then((res) => {
                console.log(res)
                setResult(res.data)
                if (res.data.length === 1) navigate(`/docs/${res.data[0].id}`)
                setIsLoad(true);
            })
            .catch((err) => {
                console.log(err)
            })
        // eslint-disable-next-line
    }, [router.result]);

    return (
        <div>
            {isLoad ? <>
                <h1>'{router.result}' 검색결과</h1><br />
                {result.map((result: Docs, index) => (
                    <Link key={index} to={`/docs/${result.id}`}>{result.title}</Link>
                ))}</> : ''}
        </div>
    );
};

export default Search;