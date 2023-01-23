import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const VersionList = styled.li`
	display: flex;
	margin-bottom: 30px;

	span {
		display: block;
		width: 250px;
		font-weight: 600;
	}
`

export const VersionLink = styled(Link)`
	font-weight: 600;
	text-decoration: none;
	color: blue;
`
