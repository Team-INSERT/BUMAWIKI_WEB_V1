export const changeKor = (classify: string) => {
    if (classify === 'STUDENT') {
        return '학생';
    } else if (classify === 'ACCIDENT') {
        return '사건/사고';
    } else if (classify === 'CLUB') {
        return '동아리'
    } else if (classify === 'HUMANITIES_TEACHER') {
        return '인문 선생님'
    } else if (classify === 'MAJOR_TEACHER') {
        return '전공 선생님'
    }
    return classify;
}