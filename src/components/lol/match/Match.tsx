import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
	searchKeyState,
	userDataState,
	userMatchState,
} from "../../../store/lol";
import MatchDuration from "./MatchDuration";
import GameMode from "./GameMode";
import SpellImg from "./SpellImg";
import ItemList from "./ItemList";
import { useRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import RuneImg from "./RuneImg";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import Loading from "../../Loading";
import { Suspense } from "react";
const UserMatch = () => {
	const currentMatch = useRecoilValueLoadable<any>(userMatchState);
	console.log("유저정보", currentMatch);
	// const matchInfo = useRecoilValue<any>(userMatchState);
	const currentSearchKey = useRecoilValue(searchKeyState);
	const [lolSearch, setLolSearch] = useRecoilState(searchKeyState);
	// const [userMatch, setUserMatch] = useState<any>([]);

	const keywordChange = (e: any) => {
		e.preventDefault();
		setLolSearch(e.target.textContent);
	};

	return (
		<Suspense fallback={<Loading />}>
			<>
				{currentMatch && (
					<MatchList>
						{currentMatch.contents.matchData.map(
							(match: any | object, idx: number) => {
								// 검색 유저 정보
								let searchUser = match?.info?.participants?.filter(
									(user: any) => user.summonerName == currentSearchKey
								);

								console.log("검색유저", searchUser);
								let blueTeam = match?.info?.participants?.filter(
									(user: any) => user.teamId == 100
								);

								console.log("blueTeam", blueTeam);
								let purpleTeam = match?.info?.participants?.filter(
									(user: any) => user.teamId == 200
								);
								console.log("purpleTeam", purpleTeam);

								return (
									<>
										<OneMatch
											className="w-full"
											key={match.info.gameId}
											winlose={searchUser[0]?.win}
										>
											<MatchLeft className="lg:basis-6/12">
												<div className="flex justify-center items-center text-center flex-col">
													<GameMode mode={match?.info?.queueId} />
													<MatchDuration
														time={match?.info?.gameDuration}
														endTime={match?.info?.gameEndTimestamp}
													></MatchDuration>
													<div
														style={{
															WebkitTextStroke: "1px rgb(0, 0, 0)",
															color: "transparent",
															fontSize: "20px",
														}}
													>
														{searchUser[0]?.win ? <p>Win</p> : <p>Lose</p>}
													</div>
												</div>

												{/* 검색 유저 데이터 */}
												{searchUser?.length !== 0 && (
													<div>
														<div className="flex items-center justify-between">
															{/* 검색 유저 챔프 정보 */}
															<div className="avatar">
																<div className="w-16 mask mask-squircle">
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
																		runes01style={
																			searchUser[0].perks.styles[0].style
																		}
																		runes02style={
																			searchUser[0].perks.styles[1].style
																		}
																		runes01={
																			searchUser[0].perks.styles[0]
																				.selections[0].perk
																		}
																		runes02={
																			searchUser[0].perks.styles[1]
																				.selections[0].perk
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
											<MatchRight className="lg:basis-5/12">
												{/* participants */}
												<ParticipantsList>
													{match.info.participants.map((user: any) => {
														return (
															<div
																className="flex py-1 items-center w-1/2"
																key={user?.summonerName}
															>
																<Participants>
																	<div className="w-16 rounded">
																		<img
																			src={`http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${user?.championName}.png`}
																			alt="챔피언 아이콘"
																		/>
																	</div>
																</Participants>
																<p
																	className="truncate w-full"
																	style={{
																		overflow: "hidden",
																		textOverflow: "ellipsis",
																		whiteSpace: "nowrap",
																		cursor: "pointer",
																	}}
																	onClick={keywordChange}
																>
																	{user?.summonerName}
																</p>
															</div>
														);
													})}
												</ParticipantsList>
											</MatchRight>

											{/* 더보기 버튼 */}
											<MoreBtn className="peer" type="checkbox" />

											{/* 더보기 버튼 클릭 시 게임 정보 */}
											<MatchInfo>
												<h3
													className="text-center"
													style={{
														margin: "20px 0",
														WebkitTextStroke: "1px rgb(0, 0, 0)",
														color: "#000",
														fontSize: "20px",
													}}
												>
													Game Info
												</h3>

												{/* 블루팀 */}
												<Team
													winlose={match?.info?.teams[0]?.win}
													className="px-5"
												>
													<div
														style={{ fontSize: "15px", marginBottom: "10px" }}
													>
														<h3 style={{ marginBottom: "5px" }}>Blue Team</h3>
														{match.info.teams[0].win ? <p>Win</p> : <p>Lose</p>}
													</div>

													{blueTeam.length != 0 &&
														blueTeam.map((blueUser: any) => {
															return (
																<div
																	className="flex items-center"
																	key={blueUser.summonerName}
																>
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
																						<div className="w- mask mask-squircle">
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
															);
														})}
												</Team>

												{/* 퍼플팀 */}
												<Team
													winlose={match.info.teams[1].win}
													className="px-5"
												>
													<div
														style={{ fontSize: "15px", marginBottom: "10px" }}
													>
														<h3 style={{ marginBottom: "5px" }}>Purple Team</h3>
														{match.info.teams[1].win ? <p>Win</p> : <p>Lose</p>}
													</div>

													{purpleTeam.length != 0 &&
														purpleTeam.map((purpleUser: any) => {
															return (
																<div
																	className="flex items-center"
																	key={purpleUser.summonerName}
																>
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
																						<div className="w- mask mask-squircle">
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
																									purpleUser.perks.styles[0]
																										.style
																								}
																								runes02style={
																									purpleUser.perks.styles[1]
																										.style
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
																						{purpleUser.challenges.kda.toFixed(
																							1
																						)}
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
															);
														})}
												</Team>
											</MatchInfo>
										</OneMatch>
									</>
								);
							}
						)}
					</MatchList>
				)}
			</>
		</Suspense>
	);
};
const twMachList = styled.div`
	padding: 20px;
	border: 2px solid #000;
	font-size: 12px;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	flex-direction: colum;
	max-height: 100%;

	&::-webkit-scrollbar {
		width: 5px;
		border-radius: 6px;
	}
	&::-webkit-scrollbar-thumb {
		height: 30%;
		background: #000;

		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}
`;

const MatchList = tw(twMachList)<any>`
  flex-wrap
  basis-full
  md:basis-7/12
  lg:basis-2/3
  `;
const twONeMatch = styled.div<any>`
	border: 1px solid;
	border-left: 15px solid;
	background-color: rgba(0, 0, 0, 0.1);
	padding: 20px 0;
	${(div) =>
		div.winlose ? "border-color: #2F436E;" : "border-color: #FF6C81;"};
`;
const OneMatch = tw(twONeMatch)<any>`
  flex
  flex-wrap
  items-center
  justify-center
  rounded-2xl
  w-full
  overflow-hidden
  mb-3
  collapse
`;

const twMatchLeft = styled.div``;
const MatchLeft = tw(twMatchLeft)<any>`
  flex
  justify-evenly
  basis-full
  lg:basis-6/12

`;
const twMatchRight = styled.div`
	padding: 0 20px;
`;
const MatchRight = tw(twMatchRight)<any>`
  basis-full
  lg:basis-5/12
`;

const MatchInfo = tw.div<any>`
  pl-5 
  collapse-content
`;

const twTeam = styled.div<any>`
	border: 1px solid;
	border-right: 10px solid;
	padding: 10px 15px;
	margin: 5px 0;
	background: rgba(255, 255, 255, 0.4);
	${(div) =>
		div.winlose ? "border-color: #2F436E;" : "border-color: #FF6C81;"};
`;

const Team = tw(twTeam)<any>`
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
	position: relative;
	-webkit-appearance: inherit;
    -moz-appearance: inherit;
	appearance: inherit; 
    opacity: 1;

	&::after {
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 15px;
		left:50%;
		top:50%;
		transform:translate(-50%, -50%);
		color:#000;
	}
	&::after{content: '▽'; }
	&:checked  {
		&::after{content: '△';}"
	  }

`;

const MoreBtn = tw(twMoreBtn)<any>`
   w-1/12
   h-30
`;
export default UserMatch;
