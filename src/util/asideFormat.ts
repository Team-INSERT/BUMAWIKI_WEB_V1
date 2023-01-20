import { changeKor } from "./changeKor";

export const asideFormat = (docsTitle: string, docsType: string) => {
    let title = docsTitle;
    const type = changeKor(docsType)
    if(title.length > 12){
        title = `${title.slice(0, 12)}...`
    }
    if(type.includes('선생님')){
        return `${title} (선생님)`
    }
    if(type.includes('동아리')){
        return `${title} (동아리)`
    }
    return `${title} ${type}`
}

