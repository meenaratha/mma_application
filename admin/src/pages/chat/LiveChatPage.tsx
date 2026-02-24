import { useMemo, useReducer, useState, useCallback, useRef, useEffect, memo } from "react";

type MessageStatus = "sending" | "sent" | "delivered" | "read";
type UserStatus = "online" | "offline" | "away";

interface User {
  id: string;
  name: string;
  initials: string;
  status: UserStatus;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: MessageStatus;
}

interface Conversation {
  id: string;
  name: string;
  members: string[];
  messages: Message[];
  unread: number;
}

interface ChatState {
  activeId: string;
  users: Record<string, User>;
  conversations: Record<string, Conversation>;
}

type Action =
  | { type: "SET_ACTIVE"; id: string }
  | { type: "ADD_MESSAGE"; convId: string; message: Message }
  | { type: "MARK_READ"; convId: string }
  | { type: "UPDATE_MSG_STATUS"; convId: string; msgId: string; status: MessageStatus };

const USERS: Record<string, User> = {
  me: { id: "me", name: "You", initials: "YO", status: "online" },
  u1: { id: "u1", name: "Fatima Al Jaber", initials: "FJ", status: "online" },
  u2: { id: "u2", name: "Wafa Sayah", initials: "WS", status: "away" },
  u3: { id: "u3", name: "Afra Al-Saeedi", initials: "AA", status: "offline" },
};

const makeMsg = (id: string, senderId: string, text: string, minutesAgo: number): Message => ({
  id,
  senderId,
  text,
  timestamp: new Date(Date.now() - minutesAgo * 60000),
  status: "read",
});

const INITIAL: ChatState = {
  activeId: "conv-1",
  users: USERS,
  conversations: {
    "conv-1": {
      id: "conv-1",
      name: "Fatima Al Jaber",
      members: ["me", "u1"],
      unread: 0,
      messages: [
        makeMsg("m1", "me", "Hi team", 50),
        makeMsg("m2", "u1", "Hey, are you free?", 45),
        makeMsg("m3", "me", "Yes, what is up?", 40),
      ],
    },
    "conv-2": {
      id: "conv-2",
      name: "Wafa Sayah",
      members: ["me", "u2"],
      unread: 2,
      messages: [makeMsg("w1", "u2", "Can you review my PR?", 20)],
    },
    "conv-3": {
      id: "conv-3",
      name: "Afra Al-Saeedi",
      members: ["me", "u3"],
      unread: 1,
      messages: [makeMsg("a1", "u3", "Let us sync tomorrow", 120)],
    },
  },
};

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "SET_ACTIVE":
      return { ...state, activeId: action.id };
    case "ADD_MESSAGE": {
      const conv = state.conversations[action.convId];
      if (!conv) return state;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.convId]: {
            ...conv,
            messages: [...conv.messages, action.message],
          },
        },
      };
    }
    case "MARK_READ": {
      const conv = state.conversations[action.convId];
      if (!conv) return state;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.convId]: { ...conv, unread: 0 },
        },
      };
    }
    case "UPDATE_MSG_STATUS": {
      const conv = state.conversations[action.convId];
      if (!conv) return state;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.convId]: {
            ...conv,
            messages: conv.messages.map((m) => (m.id === action.msgId ? { ...m, status: action.status } : m)),
          },
        },
      };
    }
    default:
      return state;
  }
}

const Avatar = memo(({ initials, status }: { initials: string; status: UserStatus }) => (
  <div style={{ position: "relative", width: 36, height: 36 }}>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#7C3AED",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {initials}
    </div>
    <span
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: status === "online" ? "#22C55E" : status === "away" ? "#F59E0B" : "#9CA3AF",
        border: "2px solid #fff",
      }}
    />
  </div>
));
Avatar.displayName = "Avatar";

const ChatRow = memo(
  ({ conv, active, onClick }: { conv: Conversation; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        border: "none",
        background: active ? "#F3F0FF" : "transparent",
        padding: "10px 12px",
        borderLeft: active ? "3px solid #7C3AED" : "3px solid transparent",
        borderBottom: "1px solid #F3F4F6",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{conv.name}</span>
        {conv.unread > 0 && (
          <span
            style={{
              background: "#7C3AED",
              color: "#fff",
              borderRadius: 12,
              padding: "0 6px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {conv.unread}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>
        {conv.messages[conv.messages.length - 1]?.text || "No messages yet"}
      </div>
    </button>
  )
);
ChatRow.displayName = "ChatRow";

const MessageBubble = memo(({ msg, isMine }: { msg: Message; isMine: boolean }) => (
  <div
    style={{
      alignSelf: isMine ? "flex-end" : "flex-start",
      background: isMine ? "#7C3AED" : "#F3F4F6",
      color: isMine ? "#fff" : "#111827",
      padding: "8px 12px",
      borderRadius: isMine ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
      maxWidth: "70%",
      fontSize: 14,
      marginBottom: 6,
      lineHeight: 1.4,
      display: "flex",
      flexDirection: "column",
      alignItems: isMine ? "flex-end" : "flex-start",
    }}
  >
    <span>{msg.text}</span>
    {isMine && (
      <span style={{ fontSize: 10, marginTop: 2, display: "flex", gap: 2, color: msg.status === "read" ? "#86EFAC" : "rgba(255,255,255,0.7)" }}>
        {msg.status === "sending" && "🕒"}
        {msg.status === "sent" && "✓"}
        {(msg.status === "delivered" || msg.status === "read") && "✓✓"}
      </span>
    )}
  </div>
));
MessageBubble.displayName = "MessageBubble";

const TypingBubble = memo(() => (
  <div style={{ alignSelf: "flex-start", background: "#F3F4F6", padding: "8px 12px", borderRadius: "14px 14px 14px 4px", marginBottom: 6, width: "fit-content" }}>
    <span style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic" }}>Typing...</span>
  </div>
));
TypingBubble.displayName = "TypingBubble";

export default function LiveChatPage() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const activeConv = state.conversations[state.activeId];
  const currentUser = state.users.me;
  const activeUser = useMemo(() => {
    const otherId = activeConv.members.find((id) => id !== "me") || "me";
    return state.users[otherId];
  }, [activeConv, state.users]);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;
    const msg: Message = {
      id: `m-${Date.now()}`,
      senderId: "me",
      text: text.trim(),
      timestamp: new Date(),
      status: "sent",
    };
    dispatch({ type: "ADD_MESSAGE", convId: activeConv.id, message: msg });
    setText("");
  }, [text, activeConv.id]);

  // Reset typing state when switching conversations
  useEffect(() => {
    setIsTyping(false);
  }, [state.activeId]);

  // Auto-reply & Read Receipt simulation
  const lastMsg = activeConv.messages[activeConv.messages.length - 1];
  useEffect(() => {
    if (!lastMsg || lastMsg.senderId !== "me") return;

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    if (lastMsg.status === "sent") {
      t1 = setTimeout(() => {
        dispatch({ type: "UPDATE_MSG_STATUS", convId: activeConv.id, msgId: lastMsg.id, status: "read" });
        setIsTyping(true);
      }, 1000);
    } else if (lastMsg.status === "read" && isTyping) {
      t2 = setTimeout(() => {
        const reply: Message = {
          id: `r-${Date.now()}`,
          senderId: activeUser.id,
          text: "Thanks for your message! This is an automated reply.",
          timestamp: new Date(),
          status: "read",
        };
        dispatch({ type: "ADD_MESSAGE", convId: activeConv.id, message: reply });
        setIsTyping(false);
      }, 2000);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [lastMsg, activeConv.id, activeUser.id, isTyping]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv.messages.length, isTyping]);

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 16,
          height: "calc(100vh - 64px)",
        }}
      >
        <aside
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: 12, borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>Messages</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {Object.values(state.conversations).map((conv) => (
              <ChatRow
                key={conv.id}
                conv={conv}
                active={conv.id === state.activeId}
                onClick={() => {
                  dispatch({ type: "SET_ACTIVE", id: conv.id });
                  dispatch({ type: "MARK_READ", convId: conv.id });
                }}
              />
            ))}
          </div>
        </aside>

        <section
          style={{
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #F3F4F6",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Avatar initials={activeUser.initials} status={activeUser.status} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{activeUser.name}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{activeUser.status}</div>
            </div>
          </div>

          <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {activeConv.messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} isMine={msg.senderId === currentUser.id} />
            ))}
            {isTyping && <TypingBubble />}
            <div ref={bottomRef} />
          </div>

          <div style={{ borderTop: "1px solid #F3F4F6", padding: 12 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                background: "#F9FAFB",
                borderRadius: 999,
                border: "1px solid #E5E7EB",
                padding: "6px 10px",
              }}
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a message..."
                style={{ flex: 1, border: "none", outline: "none", background: "transparent" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                style={{
                  border: "none",
                  background: text.trim() ? "#7C3AED" : "#E5E7EB",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 999,
                  cursor: text.trim() ? "pointer" : "default",
                  fontWeight: 600,
                }}
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
