const setMetaTags = ({ title = '기본 타이틀', description = '기본 설명', imageUrl = '기본 사이트 이미지 경로' }) => {
	//set title
	document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${title}`)

	//set description
	document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)

	//set images
	document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl)

	//set url
	document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href)
}

export default setMetaTags
