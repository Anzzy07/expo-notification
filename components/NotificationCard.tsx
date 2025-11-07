import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type NotificationCard = {
  message: string;
  fromUser: string;
};

export const NotificationCard: React.FC<NotificationCard> = ({
  message,
  fromUser,
}) => {
  const router = useRouter();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const translateY = useSharedValue(-150);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSend = () => {
    if (!replyText.trim()) return;
    setSentMessage(replyText);
    setReplyText("");
    setShowReplyInput(false);
    alert(`Sent reply: "${replyText}" to ${fromUser}`);
  };

  const handleOpenChat = () => {
    router.push({
      pathname: "/(tabs)/chats",
      params: { message, fromUser },
    });
  };

  const handleClose = () => {
    translateY.value = withTiming(-200, { duration: 400 });
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleOpenChat}>
        <Text style={styles.title}>{fromUser}</Text>
        <Text style={styles.message}>{message}</Text>
      </TouchableOpacity>

      {sentMessage && (
        <Text style={styles.replyText}>You replied: {sentMessage}</Text>
      )}

      {showReplyInput ? (
        <View style={styles.replyContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your reply..."
            placeholderTextColor="#aaa"
            value={replyText}
            onChangeText={setReplyText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => alert("Liked 👍")}>
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowReplyInput(true)}>
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleClose}>
            <Text style={[styles.actionText, { color: "#d33" }]}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: "absolute",
    top: 40,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    color: "#00d46a",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 10,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: "#00d46a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  sendText: {
    color: "#000",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionText: {
    color: "#00d46a",
    fontWeight: "500",
  },
  replyText: {
    color: "#ccc",
    fontStyle: "italic",
    marginBottom: 8,
  },
});
