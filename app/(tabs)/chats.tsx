import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useChatStore } from "@/store/chatStore";

export default function Chats() {
  const { fromUser } = useLocalSearchParams();
  const { messages, addMessage } = useChatStore();
  const userMessages = messages.filter((m) => m.fromUser === fromUser);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    addMessage({
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "me",
      fromUser: String(fromUser),
    });
    setInputText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with {fromUser ?? "Unknown"}</Text>
      </View>

      <FlatList
        data={userMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "me" ? styles.myBubble : styles.theirBubble,
            ]}
          >
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  header: {
    padding: 16,
    backgroundColor: "#1c1c1c",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  headerText: { color: "#00d46a", fontSize: 18, fontWeight: "600" },
  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  theirBubble: {
    backgroundColor: "#222",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  myBubble: {
    backgroundColor: "#00d46a",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#222",
    backgroundColor: "#1a1a1a",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#00d46a",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendText: {
    color: "#000",
    fontWeight: "600",
  },
});
