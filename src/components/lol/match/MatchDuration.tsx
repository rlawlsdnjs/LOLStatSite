import { useRecoilValue } from "recoil";
import { searchKeyState } from "../../../store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

const MatchDuration = (time: any) => {
  // 판 별 현재 기준 게임 일/시 표시 Dayjs활용
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  const timeParse = dayjs(time.endTime);
  const timeStamp = timeParse.format("YYYY-MM-DD HH:mm:ss");
  const agoTime = dayjs(timeStamp).fromNow(true);

  // 판 별 게임 시간 표시
  let sec = time.time;
  const H =
    Math.floor(sec / 3600) < 10
      ? "0" + Math.floor(sec / 3600)
      : Math.floor(sec / 3600);
  const M =
    Math.floor((sec % 3600) / 60) < 10
      ? "0" + Math.floor((sec % 3600) / 60)
      : Math.floor((sec % 3600) / 60);
  const S = sec % 60 < 10 ? "0" + (sec % 60) : sec % 60;
  return (
    <>
      <div>
        <p>{agoTime}전</p>
        {H === "00" ? null : H + `시`}
        {M}분{S}초
      </div>
    </>
  );
};

export default MatchDuration;
