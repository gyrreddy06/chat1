"use client"

interface EmojiReactionsProps {
  onEmojiSelect: (emoji: string) => void
}

export default function EmojiReactions({ onEmojiSelect }: EmojiReactionsProps) {
  const emojiCategories = {
    Faces: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
    ],
    Gestures: [
      "👍",
      "👎",
      "👌",
      "🤌",
      "🤏",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "☝️",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🤝",
      "🙏",
    ],
    Hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"],
    Objects: [
      "🔥",
      "⭐",
      "🌟",
      "✨",
      "⚡",
      "💫",
      "💥",
      "💢",
      "💨",
      "💦",
      "💤",
      "🎉",
      "🎊",
      "🎈",
      "🎁",
      "🏆",
      "🥇",
      "🥈",
      "🥉",
    ],
  }

  return (
    <div className="mt-3 p-4 bg-[#2A2A2A] rounded-xl max-h-48 overflow-y-auto fade-in">
      {Object.entries(emojiCategories).map(([category, emojis]) => (
        <div key={category} className="mb-3">
          <h4 className="text-xs font-semibold text-gray-400 mb-2 font-nunito">{category}</h4>
          <div className="grid grid-cols-8 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onEmojiSelect(emoji)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#3A3A3A] rounded-lg transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
