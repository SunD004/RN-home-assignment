RN-home-assignment
The goal of the developer exercise is to take a quick dive into a React Native to build a ios/android application which could show our weather.
We need:
Screenshot 2021-05-03 at 02 57 58

React Native (No Expo)
Show current city's current weather and future weather based on GPS.
User could login and store their watch list.
User could share one city's weather to others by email.
Backend (Choose your favorite language)
connect to DB (NoSQL, SQL, up to you)
deal with signin and signup.
deal with user's watch list
fetch weather from another source and store the weather data to redis. The data should be expired after 1 hour. If one city's weather is cached, no need to fetch weather from weather source again.
Bonus: GraphQL
