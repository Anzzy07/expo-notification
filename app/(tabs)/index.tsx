import * as Notifications from "expo-notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { NotificationCard } from "@/components/NotificationCard";
import { useChatStore } from "@/store/chatStore";

export default function Home() {
  const [incomingMessage, setIncomingMessage] = useState<string | null>(null);
  const [fromUser, setFromUser] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    if (params.message && params.fromUser) {
      setIncomingMessage(params.message as string);
      setFromUser(params.fromUser as string);

      addMessage({
        id: Date.now().toString(),
        text: String(params.message),
        sender: "them",
        fromUser: String(params.fromUser),
      });
    }

    const receiveSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        const body = notification.request.content.body ?? "";
        const fromUser =
          (notification.request.content.data?.fromUser as string) || "Unknown";

        setIncomingMessage(body);
        setFromUser(fromUser);
        addMessage({
          id: Date.now().toString(),
          text: body,
          sender: "them",
          fromUser,
        });
      }
    );

    const tapSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const body = response.notification.request.content.body ?? "";
        const fromUser =
          (response.notification.request.content.data?.fromUser as string) ||
          "Unknown";

        router.push({
          pathname: "/(tabs)/chats",
          params: { fromUser },
        });
      }
    );

    return () => {
      receiveSub.remove();
      tapSub.remove();
    };
  }, [params]);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Anzel",
        body: "Hey! How are you doing?",
        data: { fromUser: "Anzel", chatId: "456" },
        categoryIdentifier: "message",
      },
      trigger: { seconds: 1, type: "timeInterval" },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <Button title="Trigger Notification" onPress={sendNotification} />
      {incomingMessage && fromUser && (
        <NotificationCard message={incomingMessage} fromUser={fromUser} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
