# RN-home-assignment

The goal of the developer exercise is to take a quick dive into a React Native to build a ios/android application which could show our weather.
---

## We need:
![Screenshot 2021-05-03 at 02 57 58](https://user-images.githubusercontent.com/10377338/116833779-5fd59900-abbb-11eb-8e7c-5bb9f21c41c4.png)

## React Native (No Expo)
1. Show current city's current weather and future weather based on GPS.
2. User could login and store their watch list.
3. User could share one city's weather to others by email.


## Backend (Choose your favorite language)
1. connect to DB (NoSQL, SQL, up to you)
2. deal with signin and signup.
3. deal with user's watch list
4. fetch weather from another source and store the weather data to redis. The data should be expired after 1 hour. If one city's weather is cached, no need to fetch weather from weather source again.

---
Bonus: GraphQL


# How start the project
1. in /back npm i && npm start
2. in /app yarn && yarn react-native run-android
3. Dependences: Redis in local (redis-server need to be launch)
4. In localhost with real device u need to change the API_URL in app/config.js with your own ip (ifconfig | grep inet) and update the file "android/app/src/main/res/xml/network_security_config.xml", -> add your own ip. This step is necessary for call the local API with your device
5. Project was developed with an android device
