import { atom, selector } from 'recoil';
import SearchLol from '../hooks/SearchLol';
import { RecoilValueReadOnly } from "recoil";

export const loginState = atom({
    key: "loginState", 
    default: false, 
});

export const searchState = atom({
    key: "SearchState", 
     
    default: false, 
});



export const searchKeyState = atom<string>({
    key: "searchKeyState",
    default : ""
})




export interface IlolUser {
    id: string;
    userInfo : object;
    matchInfo: object;
    rankInfo: object;
  }

  export const userDataState:any = atom<IlolUser>({
    key: "userDataState",
    default: {
        
        id: "",
        userInfo : {},
        matchInfo : {},
        rankInfo : {}
    }
})

// 여기 수정
export const lolUserDataState = selector({
    key : "lolUserData" ,
    get:({get}) => {

        const userData = get(userDataState)
        return userData
    },

})