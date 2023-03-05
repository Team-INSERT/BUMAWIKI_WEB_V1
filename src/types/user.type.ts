import ContibuteDocsType from './contributeDocs'

interface UserType {
	id: number
	nickName: string
	authority: string
	contributeDocs: ContibuteDocsType[]
}

export default UserType
