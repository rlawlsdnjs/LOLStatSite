import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
	searchState,
	userDataState,
	lolUserDataState,
	userMatchState,
} from "../../../store/lol";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import FavoriteBtn from "../favorite/FavoriteBtn";
import { ChampionName } from "../../../constants/champion";
const Profile = () => {
	const user = useRecoilValue<any>(lolUserDataState);

	const mostChamp = Object.entries(ChampionName).filter(
		(name) => name[0] == user.mostChampInfo
	);
	const mostChampName = Object.values(mostChamp);

	return (
		<ProfileCard>
			{user.id && (
				<>
					{/*  유저 프로필 카드 */}
					<ProfileInfo className="relative z-20">
						{/* 유저 아이콘 */}
						<img
							style={{
								maxWidth: "40px",
								margin: "0 auto 10px",
								borderRadius: "50%",
								border: "1px solid #000",
							}}
							src={`http://ddragon.leagueoflegends.com/cdn/13.5.1/img/profileicon/${user.userInfo.profileIconId}.png`}
						></img>
						{/* 유저 아이디 */}
						<h3>{user.userInfo.name}</h3>

						{user.rankInfo ? (
							<>
								<ProfileBot>
									{/* 티어 아이콘 */}
									<img
										style={{ maxWidth: "60px" }}
										src={
											user.rankInfo == undefined
												? `../../assets/icons/tier-base-icons/provisional.png`
												: `/public/assets/icons/tier-base-icons/${user.rankInfo.tier}.png`
										}
									></img>
									{/* 전적, 승률 영역*/}
									<div>
										<span>{user.rankInfo.tier}</span>
										<span> {user.rankInfo.rank}</span>
									</div>
								</ProfileBot>
								<ul className="flex justify-evenly items-center  ">
									<li>
										<p>승리</p>
										<span>{user.rankInfo.wins}W</span>
									</li>
									<li>
										<p>패배</p>
										<span>{user.rankInfo.losses}L</span>
									</li>
									<li>
										<p>승률</p>
										{/* 승률 */}
										<span>
											{Math.floor(
												(user.rankInfo.wins /
													(user.rankInfo.wins + user.rankInfo.losses)) *
													100
											)}
											%
										</span>
									</li>
								</ul>
							</>
						) : (
							<p>Unranked</p>
						)}

						<FavoriteBtn nick={user.userInfo.name}></FavoriteBtn>
					</ProfileInfo>
					<BackgroundProfile>
						<img
							src={`../../../../public/assets/images/champion/${mostChampName[0][1]}_0.jpg`}
						></img>
					</BackgroundProfile>
				</>
			)}
		</ProfileCard>
	);
};

const twProfileCard = styled.div`
	position: relative;
	border: 2px solid #000;
	display: flex;
	color: #fff;
	font-weight: bold;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	padding: 20px 10px;
	max-height: 100%;
	& h3 {
		-webkit-text-stroke: 2px #fff;
		font-size: 35px;
		color: transparent;
	}
	& p {
		font-weight: normal;
		font-size: 15px;
		margin-bottom: 3px;
	}

	& button {
		background: #000;
		border: 1px solid #fff;
		padding: 5px;
		-webkit-text-stroke: 1px rgb(255, 255, 255);
		color: transparent;
		font-size: 20px;
	}
`;
const ProfileCard = tw(twProfileCard)<any>`
	mb-3
	basis-9/12
	md:basis-5/12 
	md:mb-0
	lg:basis-3/12
`;

const ProfileInfo = styled.div`
	position: relative;
	z-index: 20;
	text-align: center;
`;
const BackgroundProfile = styled.div`
	& img {
		width: 100%;
		height: 100%;
		filter: grayscale(100%);
		opacity: 0.4;
	}
	background: linear-gradient(to bottom, transparent 0%, #000 75%);
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

const ProfileBot = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin: 10px auto;
	position: relative;
	& ::after {
		content: "";
		width: 30%;
		height: 1px;
		background: #fff;
		position: absolute;
		top: 50%;
		right: 100%;
		transform: translateY(-50%);
		opacity: 0.2;
	}

	& ::before {
		content: "";
		width: 30%;
		height: 1px;
		background: #fff;
		position: absolute;
		top: 50%;
		left: 100%;
		transform: translateY(-50%);
		opacity: 0.2;
	}
`;

export default Profile;
