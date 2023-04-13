import styled from "styled-components";
const GameMode = (mode: object | any) => {
	switch (mode.mode) {
		case 420:
			return <Mode>솔로 랭크</Mode>;
		case 440:
			return <Mode>자유 랭크</Mode>;
		case 450:
			return <Mode>무작위 총력전</Mode>;
		case 430:
			return <Mode>일반</Mode>;
		default:
			return null;
	}
};

const Mode = styled.p`
	-webkit-text-stroke: 1px #000;
	color: transparent;
	font-size: 20px;
`;

export default GameMode;
