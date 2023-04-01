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
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import RuneImg from "./RuneImg";
import styled from "styled-components";
import img from "../../../../public/test.png";

const UserMatch = () => {
  const matchInfo = useRecoilValue<any>(userMatchState);
  const currentSearchKey = useRecoilValue(searchKeyState);
  const [lolSearch, setLolSearch] = useRecoilState(searchKeyState);
  console.log(matchInfo);
  const keywordChange = (e: any) => {
    e.preventDefault();
    setLolSearch(e.target.textContent);
    console.log(currentSearchKey);
  };
  return (
    <>
      <MatchList>
        {matchInfo[0].map((match: any | object) => {
          // 검색 유저 정보

          const searchUser = match.data.info.participants.filter(
            (user: any) => user.summonerName == currentSearchKey
          );

          const blueTeam = match.data.info.participants.filter(
            (user: any) => user.teamId == 100
          );
          console.log(blueTeam);
          const purpleTeam = match.data.info.participants.filter(
            (user: any) => user.teamId == 200
          );

          if (searchUser.length != 0) {
            return (
              <OneMatch
                className=""
                key={match.data.info.gameId}
                winlose={searchUser[0].win}
              >
                <MatchLeft>
                  <div className="flex justify-center items-center text-center flex-col">
                    <GameMode mode={match.data.info.queueId} />

                    <MatchDuration
                      time={match.data.info.gameDuration}
                      endTime={match.data.info.gameEndTimestamp}
                    ></MatchDuration>
                    <div>{searchUser[0].win ? <p>승</p> : <p>패</p>}</div>
                  </div>

                  {/* 검색 유저 데이터 */}
                  {searchUser.length !== 0 && (
                    <div>
                      <div className="flex items-center justify-between">
                        {/* 검색 유저 챔프 정보 */}
                        <div className="avatar">
                          <div className="w-24 mask mask-squircle">
                            <img
                              src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${searchUser[0].championName}.png`}
                              alt="챔프 이미지"
                            />
                          </div>
                        </div>
                        {/* 스펠/룬 정보 */}
                        <div>
                          <div>
                            <SpellImg
                              spell01={searchUser[0].summoner1Id}
                              spell02={searchUser[0].summoner2Id}
                            ></SpellImg>
                          </div>
                          <div className="flex items-center">
                            <RuneImg
                              runes01style={searchUser[0].perks.styles[0].style}
                              runes02style={searchUser[0].perks.styles[1].style}
                              runes01={
                                searchUser[0].perks.styles[0].selections[0].perk
                              }
                              runes02={
                                searchUser[0].perks.styles[1].selections[0].perk
                              }
                            ></RuneImg>
                          </div>
                        </div>
                        {/* KDA */}
                        <div className="text-center">
                          <span>{searchUser[0].kills}</span>/
                          <span>{searchUser[0].deaths}</span>/
                          <span>{searchUser[0].assists}</span>
                          <p>K D A</p>
                          <p>{searchUser[0].challenges.kda.toFixed(1)}</p>
                        </div>
                      </div>
                      {/* 아이템 정보 */}
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
                  )}
                </MatchLeft>
                <MatchRight>
                  {/* participants */}
                  <ParticipantsList>
                    {match.data.info.participants.map((user: any) => {
                      return (
                        <div
                          className="flex py-1 items-center"
                          key={user.summonerName}
                        >
                          <Participants>
                            <div className="w-16 rounded">
                              <img
                                src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${user.championName}.png`}
                                alt="챔피언 아이콘"
                              />
                            </div>
                          </Participants>
                          <span onClick={keywordChange}>
                            {user.summonerName}
                          </span>
                        </div>
                      );
                    })}
                  </ParticipantsList>
                </MatchRight>

                {/* 더보기 버튼 */}
                <MoreBtn className="peer" type="checkbox" />

                {/* 더보기 버튼 클릭 시 게임 정보 */}
                <MatchInfo>
                  <h3 className="text-center">게임 정보</h3>

                  {/* 블루팀 */}
                  <Team winlose={match.data.info.teams[0].win} className="px-5">
                    <h3>블루팀</h3>
                    {match.data.info.teams[0].win ? <p>승리</p> : <p>패배</p>}
                    {blueTeam.length != 0 &&
                      blueTeam.map((blueUser: any) => {
                        return (
                          <>
                            <div className="flex items-center ">
                              <MatchInfoLeft>
                                {/* 유저 데이터 */}
                                <div className="w-full">
                                  <div className="flex items-center ">
                                    <div
                                      className="flex justify-start"
                                      style={{
                                        flexBasis: "30%",
                                      }}
                                    >
                                      {/* 검색 유저 챔프 정보 */}
                                      <div className="avatar">
                                        <div className="w-16 mask mask-squircle">
                                          <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${blueUser.championName}.png`}
                                            alt="챔프 이미지"
                                          />
                                        </div>
                                      </div>
                                      {/* 스펠/룬 정보 */}
                                      <div>
                                        <div>
                                          <SpellImg
                                            spell01={blueUser.summoner1Id}
                                            spell02={blueUser.summoner2Id}
                                          ></SpellImg>
                                        </div>
                                        <div className="flex items-center">
                                          <RuneImg
                                            runes01style={
                                              blueUser.perks.styles[0].style
                                            }
                                            runes02style={
                                              blueUser.perks.styles[1].style
                                            }
                                            runes01={
                                              blueUser.perks.styles[0]
                                                .selections[0].perk
                                            }
                                            runes02={
                                              blueUser.perks.styles[1]
                                                .selections[0].perk
                                            }
                                          ></RuneImg>
                                        </div>
                                      </div>
                                    </div>
                                    {/* 유저 정보 */}
                                    <div
                                      className="text-center"
                                      style={{
                                        flexBasis: "50%",
                                      }}
                                    >
                                      <p>{blueUser.summonerName}</p>
                                      <p>{blueUser.teamPosition}</p>
                                    </div>
                                    {/* KDA */}
                                    <div
                                      className="text-center"
                                      style={{
                                        flexBasis: "20%",
                                      }}
                                    >
                                      <span>{blueUser.kills}</span>/
                                      <span>{blueUser.deaths}</span>/
                                      <span>{blueUser.assists}</span>
                                      <p>K D A</p>
                                      <p>
                                        {blueUser.challenges.kda.toFixed(1)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </MatchInfoLeft>
                              <MatchInfoRight>
                                {/* 아이템 정보 */}
                                <ItemList
                                  item01={blueUser.item0}
                                  item02={blueUser.item1}
                                  item03={blueUser.item2}
                                  item04={blueUser.item3}
                                  item05={blueUser.item4}
                                  item06={blueUser.item5}
                                  item07={blueUser.item6}
                                ></ItemList>
                              </MatchInfoRight>
                            </div>
                          </>
                        );
                      })}
                  </Team>

                  {/* 퍼플팀 */}
                  <Team winlose={match.data.info.teams[1].win} className="px-5">
                    <h3>퍼플팀</h3>
                    {match.data.info.teams[1].win ? <p>승리</p> : <p>패배</p>}
                    {purpleTeam.length != 0 &&
                      purpleTeam.map((purpleUser: any) => {
                        return (
                          <>
                            <div className="flex items-center ">
                              <MatchInfoLeft>
                                {/* 유저 데이터 */}
                                <div className="w-full">
                                  <div className="flex items-center ">
                                    <div
                                      className="flex justify-start"
                                      style={{
                                        flexBasis: "30%",
                                      }}
                                    >
                                      {/* 검색 유저 챔프 정보 */}
                                      <div className="avatar">
                                        <div className="w-16 mask mask-squircle">
                                          <img
                                            src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${purpleUser.championName}.png`}
                                            alt="챔프 이미지"
                                          />
                                        </div>
                                      </div>
                                      {/* 스펠/룬 정보 */}
                                      <div>
                                        <div>
                                          <SpellImg
                                            spell01={purpleUser.summoner1Id}
                                            spell02={purpleUser.summoner2Id}
                                          ></SpellImg>
                                        </div>
                                        <div className="flex items-center">
                                          <RuneImg
                                            runes01style={
                                              purpleUser.perks.styles[0].style
                                            }
                                            runes02style={
                                              purpleUser.perks.styles[1].style
                                            }
                                            runes01={
                                              purpleUser.perks.styles[0]
                                                .selections[0].perk
                                            }
                                            runes02={
                                              purpleUser.perks.styles[1]
                                                .selections[0].perk
                                            }
                                          ></RuneImg>
                                        </div>
                                      </div>
                                    </div>
                                    {/* 유저 정보 */}
                                    <div
                                      className="text-center"
                                      style={{
                                        flexBasis: "50%",
                                      }}
                                    >
                                      <p>{purpleUser.summonerName}</p>
                                      <p>{purpleUser.teamPosition}</p>
                                    </div>
                                    {/* KDA */}
                                    <div
                                      className="text-center"
                                      style={{
                                        flexBasis: "20%",
                                      }}
                                    >
                                      <span>{purpleUser.kills}</span>/
                                      <span>{purpleUser.deaths}</span>/
                                      <span>{purpleUser.assists}</span>
                                      <p>K D A</p>
                                      <p>
                                        {purpleUser.challenges.kda.toFixed(1)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </MatchInfoLeft>
                              <MatchInfoRight>
                                {/* 아이템 정보 */}
                                <ItemList
                                  item01={purpleUser.item0}
                                  item02={purpleUser.item1}
                                  item03={purpleUser.item2}
                                  item04={purpleUser.item3}
                                  item05={purpleUser.item4}
                                  item06={purpleUser.item5}
                                  item07={purpleUser.item6}
                                ></ItemList>
                              </MatchInfoRight>
                            </div>
                          </>
                        );
                      })}
                  </Team>
                </MatchInfo>
              </OneMatch>
            );
          }
        })}
      </MatchList>
    </>
  );
};
const twONeMatch = styled.div<any>`
  border-left: 20px solid;

  ${(div) =>
    div.winlose ? "border-color: #2F436E;" : "border-color: #FF6C81;"}
`;
const OneMatch = tw(twONeMatch)<any>`
  flex
  flex-wrap
  items-center
  justify-center
  rounded-2xl
  
  overflow-hidden
  bg-slate-100
  mb-3
  collapse
`;
const MatchList = tw.div<any>`
  w-2/3`;

const MatchLeft = tw.div<any>`
  w-6/12
  flex
  justify-evenly
`;

const MatchRight = tw.div<any>`
w-5/12
`;

const MatchInfo = tw.div<any>`
w-full
pl-5 collapse-content
`;

const twTeam = styled.div<any>`
  border-right: 15px solid;
  ${(div) =>
    div.winlose ? "border-color: #2F436E;" : "border-color: #FF6C81;"};
`;

const Team = tw(twTeam)<any>`
bg-slate-50
rounded-2xl
`;
const MatchInfoLeft = tw.div<any>`
  w-7/12
  flex
  justify-evenly
`;

const MatchInfoRight = tw.div<any>`
  flex
  justify-end
  w-5/12

`;

const ParticipantsList = tw.div<any>`
  flex
  flex-wrap
  h-48
  flex-col
`;

const twParticipants = styled.div<any>`
  max-width: 30px;
  max-height: 30px;
  min-width: 30px;
  min-height: 30px;
`;
const Participants = tw(twParticipants)<any>`
  avatar
  mr-3
`;

const twMoreBtn = styled.input<any>`
  min-width: 50px;
  min-height: 40px;
  place-self: normal;
  background: center / contain no-repeat url("../../../../public/test.png"),
    #eee;
`;

const MoreBtn = tw(twMoreBtn)<any>`
   w-1/12
   h-30
`;
export default UserMatch;
