import * as C from 'allFiles';
import React from 'react';

const NotFound = () => {
    return (
        <div>
            <C.Header />
            <C.Board>
                <span className='not-found'>404 Not Found</span>
            </C.Board>
            <C.Footer />
        </div>
    );
};

export default NotFound;