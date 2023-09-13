#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/project/did-medical-record-management
cd $REPOSITORY

APP_NAME=did-medical-records-project
CURRENT_PID=$(pgrep -f $APP_NAME)

# 기존에 실행 중인 프로세스 종료
if [ -z $CURRENT_PID ]
then
  echo "> 종료할것 없음."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

# 의존성 설치 및 애플리케이션 시작
echo "> 의존성 설치"
npm install

echo "> $APP_NAME 시작"
nohup npm start > /dev/null 2> /dev/null < /dev/null &
