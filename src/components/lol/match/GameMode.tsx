const GameMode = (mode: object | any) => {
  switch (mode.mode) {
    case 420:
      return <p>솔로 랭크</p>;
    case 440:
      return <p>자유 랭크</p>;
    case 450:
      return <p>무작위 총력전</p>;
    case 430:
      return <p>일반</p>;
    default:
      return null;
  }
};

export default GameMode;
