import * as S from './style'

import React from 'react'
import AccodianType from 'types/accodian'
import ArrowRight from '../../assets/arrow_right.svg'
import ArrowDown from '../../assets/arrow_down.svg'

const AccodianMenu = ({ children, name, isOpen }: AccodianType) => {
	const [detail, setDetail] = React.useState<boolean>(true)
	const [opacity, setOpacity] = React.useState<number>(1)

	React.useEffect(() => {
		if (isOpen === false) setDetail(false)
		// eslint-disable-next-line
	}, [])

	const onClickDetail = () => {
		setDetail((detail) => !detail)
		if (opacity === 1) setOpacity(0.4)
		else setOpacity(1)
	}

	return (
		<S.AccodianWrap>
			<S.AccodianTitleWrap onClick={onClickDetail}>
				<S.AccodianArrow src={detail ? ArrowRight : ArrowDown} alt="" />
				<S.AccodianName opacity={opacity}>{name}</S.AccodianName>
			</S.AccodianTitleWrap>
			<S.AccodianLine />
			<S.AccodianDetail>{detail ? children : ''}</S.AccodianDetail>
		</S.AccodianWrap>
	)
}

export default AccodianMenu
