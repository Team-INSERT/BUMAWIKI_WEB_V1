import React from 'react';
import Frame from 'types/frame.type'

// const makeFrame = (props: any) => {
//     console.log("ing");
//     const { rows, cols } = props;
//     const table = [];
//     for (let i = 0; i < rows; i++) {
//         const row = [];
//         for (let j = 0; j < cols; j++) {
//             row.push(<td key={`${i}-${j}`}>{`${i}-${j}`}</td>);
//         }
//         table.push(<tr key={i}>{row}</tr>);
//     }

//     return (
//         <table>
//             <tbody>
//                 {table}
//             </tbody>
//         </table>
//     );

// }
const [frame, setFrame] = React.useState<Frame>({
    title: '틀',
    head: '',
    contents: '',
})

const data = [
    {
        head: { frame.head },
        contents: {

        }
    }
]

const addData = () => {
    const dataSet = {
        head: { frame.head }
    }
}

const makeFrame = (data: any) => {
    return (
        <table>
            <th>틀:{frame.title}</th>
            {data.map((item: string, index: number) => (
                <tr key={index}>
                    <th>{item.head}</th>
                    {data.contents.map((item: string) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
}

export default makeFrame