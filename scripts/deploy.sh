#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/project/did-medical-record-management

APP_NAME=did-medical-records-project
CURRENT_PID=$(pgrep -f $APP_NAME)

# 기존에 실행 중인 프로세스 종료
if [ -z $CURRENT_PID ]
then
  echo "> 종료할 것 없음."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

# 각 디렉터리별로 의존성 설치
for dir in client client-web client_app did server; do
  echo "> $dir 의존성 설치"
  cd $REPOSITORY/$dir
  npm install
done

# 애플리케이션 시작 (여기서는 server 디렉터리로 가정)
cd $REPOSITORY/server
echo "> $APP_NAME 시작"
nohup npm start > /dev/null 2
