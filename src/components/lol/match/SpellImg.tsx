import spellList from "../../../../public/assets/icons/spell.json";
import { useMemo } from "react";

const SpellImg = (spell: any) => {
  const spell01 = spellList.filter((item) => item.key == spell.spell01);
  const spell02 = spellList.filter((item) => item.key == spell.spell02);

  return (
    <>
      <img src={`${spell01[0].icon}`}></img>
      <img src={`${spell02[0].icon}`}></img>
    </>
  );
};

export default SpellImg;
