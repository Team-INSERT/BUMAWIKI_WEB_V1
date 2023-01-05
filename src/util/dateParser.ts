export const dateParser = (date: string) => {
    const PARSING_DATE = `
    ${date.substring(0, 4)}년 
    ${parseInt(date.substring(5, 7)) - 10 >= 0 ? date.substring(5, 7) : date.substring(6, 7)}월 
    ${parseInt(date.substring(8, 10)) - 10 >= 0 ? date.substring(8, 10) : date.substring(9, 10)}일
    ${parseInt(date.substring(11, 13)) >= 13 ? `오후 ${parseInt(date.substring(11, 13)) - 12}` : `오전 ${parseInt(date.substring(11, 13))}`}시 
    ${date.substring(14, 16)}분`

    return PARSING_DATE;
}