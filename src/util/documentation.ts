export const documentation = (content: string) => {
    const ORIGINAL_CONTENT = content
        .replace(/<항목>/gi, `?^li style="list-style: disc;"^?`)
        .replace(/<강조>/gi, `?^strong^?`)
        .replace(/<\/강조>/gi, `?^#strong^?`)
        .replace(/<취소선>/gi, `?^del style="color:#9D9D9D;"^?`)
        .replace(/<\/취소선>/gi, `?^#del^?`)
        .replace(/<링크 문서={/gi, `?^a href='/search/`)
        .replace(/}>/gi, `'^?`)
        .replace(/<\/링크>/gi, `?^#a^?`)
        .replace(/<br\/>/gi, `?^br#^?`)
        .replace(/<</gi, `?^img src='`)
        .replace(/>>/gi, `' alt='' #^?`)
        .replace(/<.*>/gi, ``)
        .replace(/"/gi, '\"')
    const HTML_CONTENT = ORIGINAL_CONTENT
        .replace(/\?\^/gi, `<`)
        .replace(/\^\?/gi, `>`)
        .replace(/#/gi, `/`)
    return HTML_CONTENT;
}