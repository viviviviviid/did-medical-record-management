#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/project/did-medical-record-management

declare -A APPS=( ["did"]="did-medical-records-did" ["server"]="did-medical-records-server" )
declare -A PORTS=( ["did"]=5002 ["server"]=5001 )

for dir in "${!APPS[@]}"; do
  APP_NAME=${APPS[$dir]}
  CURRENT_PID=$(pgrep -f $APP_NAME)

  # 기존에 실행 중인 프로세스 종료
  if [ -z $CURRENT_PID ]
  then
    echo "> [$APP_NAME] 종료할 것 없음."
  else
    echo "> kill -9 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
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
  nohup npm start > /dev/null 2>&1 &
done
