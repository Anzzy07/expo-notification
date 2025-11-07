# WhatsApp Notification App with Expo

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

3. Start the app

   Scan the following QR generated in terminal

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

Note on Notifications: The app works great in Expo Go for basic testing (triggering and viewing notifications). However, for a smoother, more advanced experience—like full custom actions and better handling of notification categories—a development build is necessary. If you're sticking with Expo Go, just enable notifications in your device settings, and it'll still feel good to use.

## Quick Demo

- Home Tab: Tap "Trigger Notification" to send a sample message. A sliding card appears with the message from "Anzel."

- Interactions: Like (👍 alert), Reply (type and send with input field), or Close the notification.

- Chats Tab: Tap the notification to jump into a bubble-style chat. Send your own messages—they're stored locally with zustand.

## Tech Stack

Framework: React Native + Expo

File Navigation: Expo Router.

Global State: Zustand

Notifications: Expo Notifications.

UI/Animations: React Native Reanimated, Material Icons.

Theme: React Navigation Dark/Default themes.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
