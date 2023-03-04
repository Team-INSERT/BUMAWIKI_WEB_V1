import * as C from 'allFiles'
import * as S from './style'

import React from 'react'

const NotFound = () => {
	return (
		<>
			<C.Header />
			<S.NotFoundWrap>
				<C.Board>
					<S.NotFound>404 Not Found</S.NotFound>
				</C.Board>
				<C.Aside />
			</S.NotFoundWrap>
			<C.Footer />
		</>
	)
}

export default NotFound
