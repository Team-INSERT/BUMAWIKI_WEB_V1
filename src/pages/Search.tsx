import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Docs from 'types/docs';

const Search = () => {
    const router = useParams();
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get(`/docs/find/title/${router.result}`)
            .then((res) => {
                console.log(res)
                setResult(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [router.result]);

    return (
        <div>
            <h1>'{router.result}' 검색결과</h1><br />
            {result.map((result: Docs) => (
                <Link to={`/docs/${result.id}`}>{result.title}</Link>
            ))}
        </div>
    );
};

export default Search;