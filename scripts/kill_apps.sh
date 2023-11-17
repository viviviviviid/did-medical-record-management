#!/bin/bash

REPOSITORY=/home/ubuntu/project/did-medical-record-management
declare -A APPS=( ["did"]="did-medical-records-did" ["server"]="did-medical-records-server" ["link"]="did-medical-records-link")

for dir in "${!APPS[@]}"; do
  APP_PATH="$REPOSITORY/$dir/server.js"
  CURRENT_PID=$(pgrep -f "node server.js")

  # 기존에 실행 중인 프로세스 종료
  if [ -z $CURRENT_PID ]
  then
    echo "> [$dir] 종료할 것 없음."
  else
    echo "> [$dir] 종료 중 PID: $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5

    # 확인 후 강제 종료
    NEW_PID=$(pgrep -f $APP_PATH)
    if [ ! -z $NEW_PID ]; then
      echo "> [$dir] 강제 종료 중 PID: $NEW_PID"
      kill -9 $NEW_PID
    fi
  fi
done
