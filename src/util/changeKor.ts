export const changeKor = (classify: string) => {
    if (classify === 'STUDENT') {
        return '학생';
    } else if (classify === 'ACCIDENT') {
        return '사건/사고';
    } else if (classify === 'CLUB') {
        return '동아리'
    } else if (classify === 'TEACHER') {
        return '일반교과 선생님'
    } else if (classify === 'MAJOR_TEACHER') {
        return '전공교과 선생님'
    }
    return classify
}