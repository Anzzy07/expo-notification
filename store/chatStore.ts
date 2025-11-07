import { create } from "zustand";

type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  fromUser: string;
};

type ChatStore = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearChat: (fromUser: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
  clearChat: (fromUser) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.fromUser !== fromUser),
    })),
}));
