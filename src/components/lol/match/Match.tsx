import { GenericFormData } from "axios";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  searchState,
  userDataState,
  lolUserDataState,
  userMatchState,
  searchKeyState,
} from "../../../store";
import MatchDuration from "./MatchDuration";
import GameMode from "./GameMode";
import SpellImg from "./SpellImg";
import ItemList from "./ItemList";

const UserMatch = () => {
  const matchInfo = useRecoilValue<any>(userMatchState);
  const currentSearchKey = useRecoilValue(searchKeyState);
  console.log(matchInfo);
  return (
    <>
      <div>
        <h3>매치정보</h3>

        {matchInfo[0].map((match: any, idx: number) => {
          // 검색 유저 정보
          const searchUser = match.data.info.participants.filter(
            (user: any) => user.summonerName == currentSearchKey
          );
          console.log(searchUser);
          return (
            <div
              key={match.data.info.gameId}
              style={{ border: "1px solid #000", margin: "20px auto" }}
            >
              <GameMode mode={match.data.info.queueId} />

              <MatchDuration
                time={match.data.info.gameDuration}
                endTime={match.data.info.gameEndTimestamp}
              ></MatchDuration>

              {/* 검색 유저 데이터 */}
              {searchUser && (
                <div>
                  <div>
                    <div>
                      <p>{searchUser[0].summonerName}</p>
                      {searchUser[0].win ? <p>승</p> : <p>패</p>}
                    </div>
                    <div>
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${searchUser[0].championName}.png`}
                        alt="챔피언 아이콘"
                      />
                      <div>
                        <SpellImg
                          spell01={searchUser[0].summoner1Id}
                          spell02={searchUser[0].summoner2Id}
                        ></SpellImg>
                        <ItemList
                          item01={searchUser[0].item0}
                          item02={searchUser[0].item1}
                          item03={searchUser[0].item2}
                          item04={searchUser[0].item3}
                          item05={searchUser[0].item4}
                          item06={searchUser[0].item5}
                          item07={searchUser[0].item6}
                        ></ItemList>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserMatch;
