const ItemList = (itemList: any) => {
  return (
    <>
      {Object.entries(itemList).map((item: any) => {
        const itemUrl = `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${item[1]}.png`;
        return (
          <span
            key={item}
            style={{
              display: "inline-block",
              minWidth: "40px",
              minHeight: "40px",
              border: "1px solid #000",
            }}
          >
            {item[1] != 0 ? <img src={itemUrl}></img> : null}
          </span>
        );
      })}
    </>
  );
};

export default ItemList;
