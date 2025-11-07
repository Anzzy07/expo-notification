import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  message: string;
};

export const NotificationCard: React.FC<Props> = ({ message }) => {
  const [reply, setReply] = useState("");

  const handleSend = () => {
    if (!reply.trim()) return;
    console.log("User replied:", reply);
    setReply("");
    alert(`Reply sent: ${reply}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>New Message 💬</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.replyContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your reply..."
          placeholderTextColor="#aaa"
          value={reply}
          onChangeText={setReply}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 16,
    margin: 20,
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
});
