const makeTable = (
	Line: string,
	TextColor: string,
	Color: string,
	Name: string,
	Height: string,
	Birth: string,
	Country: string,
	MBTI: string,
	Club: string,
	Field: string
) => {
	return `?^table style="border-collapse: collapse; border:2px solid ${Line}; width:360px;"^?
    ?^tr style="border:2px solid ${Line}"^?
    ?^td colSpan="2" style="text-align: center; height: 38px; font-weight: 800; color: ${TextColor}; background-color: ${Color};"^?${Name}?^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="border:2px solid ${Line}"^?
    ?^td colSpan="2" style="width: 360px; height: 200px; overflow: hidden; background-image:url('<<<사진>>>'); background-size: cover;"^??^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="height: 38px; border: 2px solid black"^?
    ?^td style="border:2px solid ${Line}; color: ${TextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${Color};"^?키?^@#@#@td^?
    ?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${Line}; font-size: 13px; font-weight: 600;"^?${Height}?^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="height: 38px; border: 2px solid black;"^?
    ?^td style="border:2px solid ${Line}; color: ${TextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${Color};"^?생일?^@#@#@td^?
    ?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${Line}; font-size: 13px; font-weight: 600;"^?${Birth}?^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="height: 38px; border: 2px solid black;"^?
    ?^td style="border:2px solid ${Line}; color: ${TextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${Color};"^?국적?^@#@#@td^?
    ?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${Line}; font-size: 13px; font-weight: 600;"^?${Country}?^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="height: 38px; border: 2px solid black;"^?
    ?^td style="border:2px solid ${Line}; color: ${TextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${Color};"^?MBTI?^@#@#@td^?
    ?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${Line}; font-size: 13px; font-weight: 600;"^?${MBTI}?^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="height: 38px; border: 2px solid black;"^?
    ?^td style="border:2px solid ${Line}; color: ${TextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${Color};"^?소속?^@#@#@td^?
    ?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${Line}; font-size: 13px; font-weight: 600;"^?${Club}?^@#@#@td^?
    ?^@#@#@tr^?
    ?^tr style="height: 38px;"^?
    ?^td style="border:2px solid ${Line}; color: ${TextColor}; font-weight: 700; font-size: 14px; width: 70px; text-align: center; background-color: ${Color};"^?분야?^@#@#@td^?
    ?^td style="backgroundColor: white; padding-left: 10px; border: 2px solid ${Line}; font-size: 13px; font-weight: 600;"^?${Field}?^@#@#@td^?
    ?^@#@#@tr^??^@#@#@table^?`
}

export default makeTable
