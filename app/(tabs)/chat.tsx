import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";

type Topic = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  bg: string;
  border: string;
  initialMessage: string;
  initialMessageSw: string;
  aiRole: string;
};

const CHAT_TOPICS: Topic[] = [
  {
    id: "intro",
    title: "Introduce Yourself",
    subtitle: "Kujitambulisha",
    emoji: "📛",
    bg: "#EDE9FE",
    border: "#DDD6FE",
    initialMessage: "Hallo! Ich heiße Anna. Wie heißt du und woher kommst du?",
    initialMessageSw: "Habari! Naitwa Anna. Unaitwa nani na unatoka wapi?",
    aiRole: "AI Language Partner",
  },
  {
    id: "cafe",
    title: "At the Café",
    subtitle: "Mgahawani",
    emoji: "☕",
    bg: "#FEE2E2",
    border: "#FCA5A5",
    initialMessage: "Guten Tag! Willkommen im Café Lingua. Möchten Sie bestellen?",
    initialMessageSw: "Habari za mchana! Karibu kwenye Café Lingua. Ungependa kuagiza?",
    aiRole: "Café Waiter",
  },
  {
    id: "travel",
    title: "Travel Plans",
    subtitle: "Mipango ya Safari",
    emoji: "✈️",
    bg: "#E0F2FE",
    border: "#BAE6FD",
    initialMessage: "Hallo! Wohin möchtest du reisen? Ich möchte nach Berlin fliegen!",
    initialMessageSw: "Habari! Ungependa kusafiri kwenda wapi? Ningependa kusafiri kwenda Berlin!",
    aiRole: "Travel Agent",
  },
  {
    id: "shopping",
    title: "Shopping",
    subtitle: "Dukani / Ununuzi",
    emoji: "🛍️",
    bg: "#FEF3C7",
    border: "#FDE68A",
    initialMessage: "Hallo! Suchen Sie etwas Bestimmtes? Wie kann ich Ihnen helfen?",
    initialMessageSw: "Habari! Je, unatafuta kitu maalum? Nawezaje kukusaidia?",
    aiRole: "Store Clerk",
  },
];

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  translation?: string;
  timestamp: Date;
};

export default function ChatScreen() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    posthog.capture("chat_tab_viewed");
  }, []);

  const startChat = (topic: Topic) => {
    posthog.capture("chat_session_started", { topic_id: topic.id });
    setActiveTopic(topic);
    setMessages([
      {
        id: "1",
        sender: "ai",
        text: topic.initialMessage,
        translation: topic.initialMessageSw,
        timestamp: new Date(),
      },
    ]);
  };

  const exitChat = () => {
    setActiveTopic(null);
    setMessages([]);
    setInputValue("");
  };

  const getAIResponse = (userText: string, topicId: string, history: Message[]): { text: string; translation: string } => {
    const textLower = userText.toLowerCase();
    const userMessageCount = history.filter((m) => m.sender === "user").length;

    if (topicId === "intro") {
      if (userMessageCount === 0) {
        return {
          text: "Sehr schön! Ich komme aus Deutschland. Wie alt bist du?",
          translation: "Nzuri sana! Mimi ninatoka Ujerumani. Una umri gani?",
        };
      }
      if (textLower.includes("alt") || /\d+/.test(textLower)) {
        return {
          text: "Wunderbar! Ich bin 24 Jahre alt. Lass uns zusammen Deutsch üben!",
          translation: "Kuvutia sana! Mimi nina miaka 24. Ngoja tujifunze Kijerumani pamoja!",
        };
      }
      return {
        text: "Freut mich sehr! Deutsch lernen macht Spaß. Was sind deine Hobbys?",
        translation: "Nafurahi sana kukutana nawe! Kujifunza Kijerumani kunafurahisha. Hobby zako ni gani?",
      };
    }

    if (topicId === "cafe") {
      if (textLower.includes("kaffee") || textLower.includes("kahawa")) {
        return {
          text: "Gerne! Möchten Sie auch ein Stück Kuchen dazu? (Brot oder Torte?)",
          translation: "Karibu! Je, ungependa pia kipande cha keki? (Mkate au Keki?)",
        };
      }
      if (textLower.includes("rechnung") || textLower.includes("bili") || textLower.includes("zahlen")) {
        return {
          text: "Natürlich! Das macht zusammen 4,50 Euro. Bar oder mit Karte?",
          translation: "Bila shaka! Hiyo inakuja Euro 4.50. Taslimu au kwa kadi?",
        };
      }
      return {
        text: "Kommt sofort! Haben Sie sonst noch einen Wunsch?",
        translation: "Inakuja sasa hivi! Je, una hitaji lingine lolote?",
      };
    }

    if (topicId === "travel") {
      if (textLower.includes("berlin") || textLower.includes("munich") || textLower.includes("germany")) {
        return {
          text: "Klasse! Deutschland hat viele schöne Städte. Reist du alleine?",
          translation: "Safi sana! Ujerumani ina miji mingi mizuri. Unasafiri peke yako?",
        };
      }
      return {
        text: "Interessant! Gute Reise! Wann möchtest du fliegen?",
        translation: "Inavutia! Safari njema! Unataka kusafiri lini?",
      };
    }

    // Default shopping response
    if (textLower.includes("kostet") || textLower.includes("bei") || textLower.includes("presi")) {
      return {
        text: "Das Buch kostet 12 Euro. Das ist ein sehr gutes Angebot!",
        translation: "Kitabu kinagharimu Euro 12. Hii ni ofa nzuri sana!",
      };
    }
    return {
      text: "Ja, wir haben das hier im Regal. Möchten Sie es anprobieren oder kaufen?",
      translation: "Ndio, tunacho hapa kwenye rafu. Ungependa kukijaribu au kukinunua?",
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeTopic) return;

    const userMessageText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userMessageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMessageText, activeTopic.id, [...messages, userMessage]);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response.text,
        translation: response.translation,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  if (activeTopic) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={exitChat} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#001328" />
            </TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatTitle}>{activeTopic.title}</Text>
              <Text style={styles.chatSubtitle}>{activeTopic.aiRole}</Text>
            </View>
            <View style={styles.chatEmojiContainer}>
              <Text style={styles.chatHeaderEmoji}>{activeTopic.emoji}</Text>
            </View>
          </View>

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => {
              const isUser = item.sender === "user";
              return (
                <View
                  style={[
                    styles.messageRow,
                    isUser ? styles.messageRowUser : styles.messageRowAI,
                  ]}
                >
                  {!isUser && (
                    <View style={styles.chatAvatar}>
                      <Image source={images.mascotWelcome || images.mascotLogo} style={styles.chatAvatarImg} />
                    </View>
                  )}
                  <View
                    style={[
                      styles.bubble,
                      isUser ? styles.bubbleUser : styles.bubbleAI,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isUser ? styles.messageTextUser : styles.messageTextAI,
                      ]}
                    >
                      {item.text}
                    </Text>
                    {item.translation && (
                      <Text style={styles.translationText}>
                        💡 {item.translation}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }}
          />

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingIndicatorContainer}>
              <Text style={styles.typingText}>AI Tutor is typing...</Text>
            </View>
          )}

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.textInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Andika kwa Kijerumani au Kiswahili..."
              placeholderTextColor="#9ca3af"
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={[
                styles.sendButton,
                !inputValue.trim() && styles.sendButtonDisabled,
              ]}
              disabled={!inputValue.trim()}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      {/* Topics Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Chat Tutor</Text>
        <Text style={styles.headerSubtitle}>
          Practice writing and reading in German
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Banner */}
        <View style={styles.heroCard}>
          <Image
            source={images.mascotLogo}
            contentFit="contain"
            style={styles.heroImage}
          />
          <View style={styles.heroRight}>
            <Text style={styles.heroTitle}>Improve your writing</Text>
            <Text style={styles.heroDescription}>
              Chat with our AI tutor on common real-life topics. Type in German or Kiswahili, and get translations and replies!
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose a Topic</Text>

        <View style={styles.topicsGrid}>
          {CHAT_TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                {
                  backgroundColor: topic.bg,
                  borderColor: topic.border,
                },
              ]}
              onPress={() => startChat(topic)}
              activeOpacity={0.8}
            >
              <View style={styles.topicHeader}>
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                <Ionicons name="chevron-forward" size={18} color="#001328" />
              </View>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#001328",
  },
  headerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroCard: {
    flexDirection: "row",
    backgroundColor: "#DCFCE7",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  heroRight: {
    flex: 1,
    paddingLeft: 12,
  },
  heroTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#166534",
    marginBottom: 4,
  },
  heroDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#14532d",
    lineHeight: 18,
  },
  heroImage: {
    width: 64,
    height: 64,
  },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#001328",
    marginBottom: 14,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  topicCard: {
    width: "47%",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    justifyContent: "space-between",
    height: 140,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topicEmoji: {
    fontSize: 28,
  },
  topicTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: "#001328",
    marginTop: 16,
  },
  topicSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  // Chat styling
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 4,
  },
  chatHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#001328",
  },
  chatSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#6b7280",
  },
  chatEmojiContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeaderEmoji: {
    fontSize: 18,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowAI: {
    justifyContent: "flex-start",
  },
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    overflow: "hidden",
  },
  chatAvatarImg: {
    width: 32,
    height: 32,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  bubbleUser: {
    backgroundColor: "#6c4ef5",
    borderBottomRightRadius: 4,
  },
  bubbleAI: {
    backgroundColor: "#f3f4f6",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextUser: {
    color: "#fff",
  },
  messageTextAI: {
    color: "#001328",
  },
  translationText: {
    fontFamily: "Poppins-Italic",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#d1d5db",
    paddingTop: 4,
  },
  typingIndicatorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typingText: {
    fontFamily: "Poppins-Italic",
    fontSize: 12,
    color: "#6b7280",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#f3f4f6",
    borderRadius: 22,
    paddingHorizontal: 16,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001328",
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6c4ef5",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
});
