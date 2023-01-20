import React from 'react'
import { changeKor } from 'util/changeKor'
import * as S from './style'

const Classify = ({ children }: React.PropsWithChildren) => {
	return (
		<S.ClassifyWrap>
			<S.ClassifyText>분류 :</S.ClassifyText>
			<S.ClassifyText color={'#EC9F19'}>{changeKor(children as string)}</S.ClassifyText>
		</S.ClassifyWrap>
	)
}

export default Classify
