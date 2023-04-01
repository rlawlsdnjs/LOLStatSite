import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  searchState,
  userDataState,
  lolUserDataState,
  userMatchState,
} from "../../../store";
import tw from "tailwind-styled-components";

const Profile = () => {
  const user = useRecoilValue<any>(lolUserDataState);
  return (
    <ProfileCard>
      {user.id && (
        // 유저 프로필 카드
        <div>
          {/* 유저 아이콘 */}
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.5.1/img/profileicon/${user.userInfo.profileIconId}.png`}
          ></img>
          {/* 유저 아이디 */}
          <p>{user.userInfo.name}</p>

          {user.rankInfo ? (
            <>
              {/* 티어 아이콘 */}
              <img
                src={
                  user.rankInfo == undefined
                    ? `../../assets/icons/tier-base-icons/provisional.png`
                    : `/public/assets/icons/tier-base-icons/${user.rankInfo.tier}.png`
                }
              ></img>
              {/* 전적, 승률 영역*/}
              <div>
                <div>
                  <span>{user.rankInfo.tier}</span>
                  <span>{user.rankInfo.rank}</span>
                </div>
                <span>{user.rankInfo.wins}승</span>
                <span>{user.rankInfo.losses}패</span>
                {/* 승률 */}
                <p>
                  {Math.floor(
                    (user.rankInfo.wins /
                      (user.rankInfo.wins + user.rankInfo.losses)) *
                      100
                  )}
                  %
                </p>
              </div>
            </>
          ) : (
            <p>Unranked</p>
          )}
        </div>
      )}
    </ProfileCard>
  );
};

const ProfileCard = tw.div<any>`
 w-1/3
 sticky 
 top-0
`;

export default Profile;
