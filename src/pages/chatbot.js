import {useState, useRef} from "react";
import {model2} from "@/utils/chatbotAi";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {role: "ai", content: "Hi! How can I help you today?"}, // Första meddelandet från AIn
  ]);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef(null); // För att kunna rulla ner chatten
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!userInput.trim()) return; // Om inget är skrivet, gör inget

    // Lägg till användarens meddelande till chattens meddelandelista
    setMessages((prev) => [...prev, {role: "user", content: userInput}]);
    setUserInput("");
    setLoading(true);

    try {
      const shortAnswerPrompt = `${userInput} Do not give long answers and be kind. Feel free to put in emojis`;

      const result = await model2.generateContent(shortAnswerPrompt);
      const responseText = result.response.text(); // Hämtar svaret från API

      // Lägger till AI:s svar i chatten
      setMessages((prev) => [...prev, {role: "ai", content: responseText}]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {role: "ai", content: "Error fetching response."},
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Enter funktion
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="mt-10">
      <div className="w-full p-4 bg-gray-300 shadow-lg rounded-lg">
        <div
          className="h-60 overflow-y-auto border p-2 mb-4 bg-amber-50 rounded-lg"
          ref={chatContainerRef}
        >
          {/* visar chattmeddelanden */}
          {messages.map(function (msg, index) {
            return (
              <div
                key={index}
                className={`mb-2`}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <p
                  className={`inline-block p-1 text-sm rounded-lg ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {msg.content}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow border p-2 rounded-l-md bg-amber-50"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-cyan-500 text-white px-4 py-2 rounded-r-md"
          >
            Send
          </button>
        </div>
        {loading && <div className="mt-2 text-gray-500">Loading...</div>}
      </div>
    </div>
  );
}
