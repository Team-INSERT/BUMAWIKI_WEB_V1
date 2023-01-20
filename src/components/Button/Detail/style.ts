import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const DetailButtonWrap = styled.div`
	display: flex;
`

export const DetailWrap = styled.div`
	text-decoration: none;
	cursor: pointer;
`

export const DetailLinkWrap = styled(Link)`
	text-decoration: none;
	cursor: pointer;
`

export const DetailButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 52px;
	height: 26px;
	border-left: 2px solid #ccc;
	border-top: 2px solid #ccc;
	border-bottom: 2px solid #ccc;

	&:last-child {
		div {
			border-right: 2px solid #ccc;
		}
	}
`

export const DetailText = styled.span`
	color: rgb(146, 146, 146);
	font-size: 14px;
	font-weight: 600;
`

export const DetailInput = styled.input`
	border: 2px solid #ccc;
	border-right: none;
	outline: none;
	padding-left: 10px;
	font-weight: 700;
	font-size: 12px;
`
