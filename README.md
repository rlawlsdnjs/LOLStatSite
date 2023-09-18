
# LolStatSite   <img src="https://user-images.githubusercontent.com/83272059/235741125-c3a651a4-4b67-4dfc-a59d-80cae5a0a35f.png" alt="logo" width=20px/>

<br />


## 📬 배포 주소

[https://lolstatsitejw.vercel.app/]



---
<br />

### 🔨 기술스택
React, TS, Recoil, TailwindCss, Style-compoenent, Firebase, Context-provider




<br />


## 🚀 Demo



|                      메인화면                      |     즐겨찾기화면    |                
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img width="500" alt="스크린샷 2023-05-02 오후 9 28 40" src="https://user-images.githubusercontent.com/83272059/235736799-b229fb97-4526-4831-9b49-99bcc665d3f5.png">|  <img width="500" alt="스크린샷 2023-05-03 오전 2 04 18" src="https://user-images.githubusercontent.com/83272059/235737410-d72514e8-3e47-4984-bade-ec0cfd0498ff.png">|  

|                      게임전적 검색 화면                      |     유튜브 검색 화면    |                
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img width="500" alt="스크린샷 2023-05-03 오전 2 06 00" src="https://user-images.githubusercontent.com/83272059/235742434-ed547153-833c-49c0-a984-43b02b23840a.png">| <img width="500" alt="스크린샷 2023-05-03 오전 2 06 36" src="https://user-images.githubusercontent.com/83272059/235738674-b89dd314-afc6-468d-9ddc-5f42f0833a98.png">|  

|                      회원가입 화면                      |     로그인 화면    |     로딩 화면             |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img width="333" alt="스크린샷 2023-05-03 오전 2 10 21" src="https://user-images.githubusercontent.com/83272059/235743007-05220cfa-43ae-4721-8fab-db7c1667dd53.png">|<img width="333" alt="스크린샷 2023-05-03 오전 2 10 10" src="https://user-images.githubusercontent.com/83272059/235743048-6426e5ec-f71f-4b1b-9e4f-c34e57992a21.png"> | <img width="333" alt="스크린샷 2023-05-03 오전 2 25 27" src="https://user-images.githubusercontent.com/83272059/235743239-18612081-45b2-420e-b5ba-c39466f6e831.png"> |

</br>
</br>


## 📜 개요

### 🌱 프로젝트 소개

League of Legend라는 게임의 전적 검색 기능과 동시에 게임 대기시간 동안 Youtube영상을 검색하고 볼 수 있는 서비스 제공

<br />

### 🎞 기획 배경

- Lol 게임을 즐겨하는 이용자들 중 게임 대기시간 동안 sns나 youtube 영상을 많이 접하는 것에 착안하여, 
  실제 사용자의 니즈(본인)을 기반으로 게임 대기 시간동안 영상을 볼 수 있었으면 좋겠다는 생각으로 제작하게 되었습니다.


<br />


### 🎯 프로젝트 목표

- React와 Recoil 등 기술 능력 향상
- API 연동과 비동기 통신에 대한 이해 
- vercel serverless functions을 통한 정적 웹페이지 배포 


<br />

## 📌 주요 기능


### ✨ 기능 소개

| 기능명        | 내용                                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 게임전적 검색       | Riot API를 활용한 게임전적 검색 기능                                                                                 |
| 유튜브영상 검색     | Youtube API를 활용한 영상 검색 기능                    |                                                                                           |
| 회원가입      | Firebase Authentication을 활용하여 회원가입, 로그인 기능                    |
| 즐겨찾기 기능   | 회원유무에 따른 즐겨찾는 검색 유저를 등록 할 수 있는 기능   

---


<br />


### 📂 디렉토리구조

```
📦 puplic
├── 📂 assets
│   ├── 📂 icons
│   └── 📂 images
📦 api
📦 src
├── 📂 api
├── 📂 components
│   └── 📂 lol
│   │   ├── 📂 favorite
│   │   ├── 📂 match
│   │   ├── 📂 sign
│   │   └── 📂 search
│   ├── 📂 sign
│   │   ├── 📂 context
│   │   └── 📂 provider
│   └── 📂 youtube
├── 📂 constants
├── 📂 layouts
├── 📂 service
└──📂 store

```

<br />




