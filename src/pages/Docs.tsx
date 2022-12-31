import React from 'react';
import { useParams } from 'react-router-dom';

const Docs = () => {
    const router = useParams();
    return (
        <div>
            Docs id : {router.id}
        </div>
    );
};

export default Docs;