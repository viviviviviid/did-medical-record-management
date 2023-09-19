#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/project/did-medical-record-management

declare -A APPS=( ["did"]="did-medical-records-did" ["server"]="did-medical-records-server" )
declare -A PORTS=( ["did"]=5002 ["server"]=5001 )

for dir in "${!APPS[@]}"; do
  APP_NAME=${APPS[$dir]}
  APP_PATH="$REPOSITORY/$dir/server.js"  # 서버 경로 추가

  CURRENT_PID=$(pgrep -f $APP_PATH)  # 애플리케이션 이름 대신 서버 경로로 찾기

  # 기존에 실행 중인 프로세스 종료
  if [ -z $CURRENT_PID ]
  then
    echo "> [$APP_NAME] 종료할 것 없음."
  else
    echo "> kill -9 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5

    # 확인 후 강제 종료
    NEW_PID=$(pgrep -f $APP_PATH)
    if [ ! -z $NEW_PID ]; then
      echo "> [$dir] 강제 종료 중 PID: $NEW_PID"
      kill -9 $NEW_PID
    fi
  fi

  # 포트 충돌 해결
  PORT=${PORTS[$dir]}
  PORT_IN_USE=$(lsof -ti :$PORT)
  if [ ! -z $PORT_IN_USE ]; then
    echo "> Port $PORT is in use. Killing the process..."
    kill -9 $PORT_IN_USE
    sleep 5
  fi

  # 각 디렉터리별로 의존성 설치
  echo "> [$APP_NAME] 의존성 설치"
  cd $REPOSITORY/$dir
  npm install

  # 애플리케이션 시작
  echo "> [$APP_NAME] 애플리케이션 시작"
  nohup npm start >> /home/ubuntu/project/${dir}_nohupLogs.out 2>&1 &  # 로그 파일 경로 수정
done
