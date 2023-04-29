import runesList from "../../../../public/assets/icons/runesReforged.json";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const RuneImg = (runes: any) => {
	const runesStyle01 = runesList.filter(
		(item) => item.id == runes.runes01style
	);
	const runesStyle02 = runesList.filter(
		(item) => item.id == runes.runes02style
	);

	const rune01 = runesStyle01[0].slots[0].runes.filter(
		(rune) => rune.id == runes.runes01
	);

	return (
		<>
			<Rune>
				<div className="w-16 rounded">
					<img className="icon" src={`/assets/images/${rune01[0].icon}`}></img>
				</div>
			</Rune>
			<Rune>
				<div className="w-16 rounded">
					<img src={`assets/images/${runesStyle02[0].icon}`}></img>
				</div>
			</Rune>
		</>
	);
};

const twRune = styled.div<any>`
	max-width: 25px;
	max-height: 25px;
	min-width: 25px;
	min-height: 25px;
`;
const Rune = tw(twRune)<any>`
  avatar
`;

export default RuneImg;
