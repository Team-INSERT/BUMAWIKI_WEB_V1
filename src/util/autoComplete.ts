const autoComplete = (contents: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (contents.substring(contents.length - 3, contents.length) === '<강조' ||
    contents.substring(contents.length - 3, contents.length) === '<어록' ||
    contents.substring(contents.length - 3, contents.length) === '<빨강' ||
    contents.substring(contents.length - 3, contents.length) === '<하양' ||
    contents.substring(contents.length - 3, contents.length) === '<노랑') {
    setTimeout(() => {
        e.target.selectionStart = contents.length + 1;
        e.target.selectionEnd = contents.length + 1;
    }, 10)
    return `${contents}></${contents.substring(contents.length - 2, contents.length)}>`
} else if (
    contents.substring(contents.length - 4, contents.length) === '<취소선' ||
    contents.substring(contents.length - 4, contents.length) === '<소제목') {
    setTimeout(() => {
        e.target.selectionStart = contents.length + 1;
        e.target.selectionEnd = contents.length + 1;
    }, 10)
    return `${contents}></${contents.substring(contents.length - 3, contents.length)}>`
} else if (contents.substring(contents.length - 3, contents.length) === '<링크') {
    setTimeout(() => {
        e.target.selectionStart = contents.length + 5;
        e.target.selectionEnd = contents.length + 5;
    }, 10)
    return `${contents} 문서={}></링크>`
} else if (contents.substring(contents.length - 5, contents.length) === '<외부링크') {
    setTimeout(() => {
        e.target.selectionStart = contents.length + 5;
        e.target.selectionEnd = contents.length + 5;
    }, 10)
    return `${contents} 문서={}></외부링크>`
} else {
    return ``;
}
}

export default autoComplete;