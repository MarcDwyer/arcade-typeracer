import { getTime } from "../util";
import { Dispatch } from "redux";
import { COMPLETE } from "../reducers/typing_reducer";

// export const setTimer = (time: number) => (dispatch: Dispatch) => {
//   time = time * 1000;
//   const futureTime = Date.now() + time;
//   let timer: undefined | number;
//   const initTimer = () => {
//     const timeRes = getTime(futureTime);
//     if (timeRes.join("") === "000") {
//       dispatch({
//         type: COMPLETE,
//       });
//       clearInterval(timer);
//       return;
//     }
//     dispatch({
//       type: SET_TIMER,
//       payload: timeRes,
//     });
//   };
//   initTimer();
//   timer = setInterval(initTimer, 1000);
// };
