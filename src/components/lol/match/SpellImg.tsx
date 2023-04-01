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
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
`;
const Spell = tw(twSpell)<any>`
  avatar
`;
export default SpellImg;
