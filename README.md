# SMILE

Smart Monitoring solution for Infectious disease management through Lifestyle Evaluation

## Version

   <img src=https://img.shields.io/badge/Node-16.13.0-green />
   <img src=https://img.shields.io/badge/YARN-1.22.17-red />
   <img src=https://img.shields.io/badge/React-17-skyblue />

## Setting

1.  터미널에 **node -v** 명령어로 node 가 설치되어있는지 확인

        설치되어 있지 않으면

    https://nodejs.org/download/release/v16.13.0/  
    해당 페이지에서 node-v16.13.0-x64.msi 중 node-v16.13.0-x86.msi 환경에 맞게 설치

2.  터미널에 **yarn -v** 명령어로 yarn 이 설치되어있는지 확인

    설치되어 있지 않으면 터미널에 **npm install -g yarn** 실행

3.  프로젝트 Clone 후 터미널에 **yarn install** 실행

4.  AddConfiguration에서 npm 선택 후 다음과 같이 설정
    - Command : run
    - Script : start

[0914 추가 ++]

### dev 환경 설정

1. packge.json에 local 환경 구축
   "dev" 명령어가 없으면 다음과 같이 설정

   "scripts": {
   "dev": "set NODE_ENV=development && react-scripts start",
   "start": "react-scripts start",
   "build": "react-scripts build",
   "test": "react-scripts test",
   "eject": "react-scripts eject"
   },

2. env.development 있는지 확인하고 없으면 다음 내용을 포함하도록 생성
   REACT_APP_BASE_URL=https://smile.hconnect.co.kr
   REACT_APP_AUTHORIZATION_REISSUE_TIME=82800000

3. 터미널에 **yarn install**, **yarn dev**로 실행

## Jira Cloud

https://healthconnect.atlassian.net/
