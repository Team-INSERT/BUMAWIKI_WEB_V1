import ContibuteDocsType from './contributeDocs.type'

interface UserType {
	id: number
	nickName: string
	authority: string
	contributeDocs: ContibuteDocsType[]
	email: string
}

export default UserType
