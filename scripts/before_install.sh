#!/usr/bin/env bash

# 기존 Node.js 애플리케이션 프로세스 중지
APP_NAME=did-medical-records-project
CURRENT_PID=$(pgrep -f $APP_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할 것 없음."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

# 필요한 패키지 설치 (예: 아래의 경우에는 curl을 설치)
sudo apt-get update
sudo apt-get install -y curl

# 여기에 추가적인 작업을 추가할 수 있습니다.

