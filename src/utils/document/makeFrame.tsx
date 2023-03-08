import React from 'react'
import Frame from 'types/frame.type'

const MakeFrame = (data: any) => {
	const [title, setTitle] = React.useState<string>('틀')
	const [head, setHead] = React.useState<string>('')
	const [contents, setContents] = React.useState<string[]>([])

	const dataSet = [
		{
			head: { head },
			contents: { contents },
		},
	]

	const addData = () => {
		contents.push('ing')
	}

	return (
		<div>
			<button onClick={addData}>ing</button>
			<table>
				<tr>
					<th>{title}</th>
				</tr>
				{dataSet.map((item: any) => (
					<tr key={item.index}>
						{contents.map((item: string) => (
							<td>{item}</td>
						))}
					</tr>
				))}
			</table>
		</div>
	)
}

export default MakeFrame
