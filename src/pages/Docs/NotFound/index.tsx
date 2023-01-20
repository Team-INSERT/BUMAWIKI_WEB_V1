import * as C from 'allFiles'
import React from 'react'
import * as S from './style'

const NotFound = () => {
	return (
		<div>
			<C.Header />
			<C.Board>
				<S.NotFound>404 Not Found</S.NotFound>
			</C.Board>
			<C.Footer />
		</div>
	)
}

export default NotFound
