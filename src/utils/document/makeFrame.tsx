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




const MakeFrame = (data: any) => {
    const [title, setTitle] = React.useState<string>('틀');
    const [head, setHead] = React.useState<string>('');
    const [contents, setContents] = React.useState<string[]>([]);

    const dataSet = [
        {
            "head": { head },
            "contents": { contents },
        }
    ]

    const addData = () => {
        contents.push("ing");
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
    );
}

export default MakeFrame