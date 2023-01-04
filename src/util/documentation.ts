export const documentation = (content: string) => {
    const ORIGINAL_CONTENT = content
        .replace(/<목차>/, `?^h1^?`)
        .replace(/<\/목차>/, `?^#h1^?`)
        .replace(/<내용>/, `?^div className='accodian-children'^?`)
        .replace(/<\/내용>/, `?^#div^?`)
        .replace(/<항목>/gi, `?^li style="list-style: disc;"^?`)
        .replace(/<강조>/, `?^strong^?`)
        .replace(/<\/강조>/, `?^#strong^?`)
        .replace(/<취소선>/, `?^del style="color:#9D9D9D;"^?`)
        .replace(/<\/취소선>/, `?^#del^?`)
        .replace(/<링크 문서={/, `?^a href='/search/`)
        .replace(/}>/, `'^?`)
        .replace(/<\/링크>/, `?^#a^?`)
        .replace(/<br\/>/, `?^br#^?`)
        .replace(/<.*>/gi, ``)
    const HTML_CONTENT = ORIGINAL_CONTENT
        .replace(/\?\^/gi, `<`)
        .replace(/\^\?/gi, `>`)
        .replace(/#/gi, `/`)
    return HTML_CONTENT;
}