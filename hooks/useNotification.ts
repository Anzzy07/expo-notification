import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";

export function useNotifications() {
  useEffect(() => {
    const REPLY_ACTION_ID = "reply";
    const LIKE_ACTION_ID = "like";
    const CLOSE_ACTION_ID = "close";

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    async function setup() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Notifications Needed",
          "Enable in Settings > Expo Go > Notifications."
        );
        return;
      }

      if (Platform.OS === "ios") {
        await Notifications.setNotificationCategoryAsync("message", [
          {
            identifier: REPLY_ACTION_ID,
            buttonTitle: "Reply",
            textInput: {
              submitButtonTitle: "Send",
              placeholder: "Quick reply...",
            },
          },
          { identifier: LIKE_ACTION_ID, buttonTitle: "Like" },
          {
            identifier: CLOSE_ACTION_ID,
            buttonTitle: "Close",
            options: { isDestructive: true },
          },
        ]);
      }
    }

    setup();

    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Action:", response.actionIdentifier);
        console.log("User text:", response.userText);
      }
    );

    return () => sub.remove();
  }, []);
}
