# Welcome to Jendela App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Demo

https://github.com/user-attachments/assets/6241563c-dd47-4bbd-b7d5-cb15483fbe76

## Performance Analysis : React-Native-Wagmi-Chart
issue : switching time when data already in cache become laggy

1. 1st form
   - using react-query, with normal code
   - the animation looks so nice from rn-wagmi-charts when we change the data 
   - but when switching larger data that already in cache, i got drop fps and frozen frame. :(
   
   https://github.com/user-attachments/assets/0f9a56bb-f2bc-4406-b474-a044a4799c59

3. 2nd form
   - i decide to remove react-query
   - install zustand
   - create two zustand store: 1 for handle data, 2 for handle loading and errors
   - define all charts of every time at once and using absolute position to manage hide and show
   
   https://github.com/user-attachments/assets/cecb2ff9-dc1f-4ba7-967e-aa4b61bbdbae

   changelog : https://github.com/aqigif/jendela-app/compare/v1...v2


3. 3rd form
  - more separate component by making CandlestickChartAtom and CandlestickChartSuperAtom
  - more separate zustand store into 3: 1 for handle data, 2 for handle loading and errors, 3 for handling time switching
  - goal : only once render .map and chart when time switching
  - now when switching larger data that already in cache, it perform better
   
  https://github.com/user-attachments/assets/0459228c-f551-4b49-a63a-3aed3ccdd862
  
  changelog : https://github.com/aqigif/jendela-app/compare/v2...v3

