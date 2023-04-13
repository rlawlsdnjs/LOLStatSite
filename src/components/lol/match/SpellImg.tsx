import spellList from "../../../../public/assets/icons/spell.json";
import tw from "tailwind-styled-components";
import styled from "styled-components";
const SpellImg = (spell: any) => {
	const spell01 = spellList.filter((item) => item.key == spell.spell01);
	const spell02 = spellList.filter((item) => item.key == spell.spell02);

	return (
		<>
			<Spell>
				<div className="w-16 rounded">
					<img src={`${spell01[0].icon}`}></img>
				</div>
			</Spell>
			<Spell>
				<div className="w-16 rounded">
					<img src={`${spell02[0].icon}`}></img>
				</div>
			</Spell>
		</>
	);
};

const twSpell = styled.div<any>`
	max-width: 25px;
	max-height: 25px;
	min-width: 25px;
	min-height: 25px;
`;
const Spell = tw(twSpell)<any>`
  avatar
`;
export default SpellImg;
