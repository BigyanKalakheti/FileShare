import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";
import CryptoJS from "crypto-js";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const inputRef = useRef<any>();
  const btnRef = useRef<any>();
  const Socket = useSocket();
  const { der_Key } = useSocket();


  
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      if (der_Key === null) {
        throw new Error("der_key key should not be null");
      }
      var encrypted_messages = CryptoJS.RC4.encrypt(newMessage, der_Key).toString();
      const newMessages = [...messages, { text: newMessage, sender: "me" }];
      setMessages(newMessages);
      setNewMessage("");
      

      // Send the message to the partner using the peer connection
      const peer = Socket.peerState;
      if (peer) {
        const messageData = {
          type: "messages",
          text: encrypted_messages,
          sender: "other",
        };
        console.log("send data: ",JSON.stringify(messageData))
        peer.send(JSON.stringify(messageData));
      }
    }
    // console.log(Socket.peerState);
  };

  useEffect(() => {
    console.log("rc4 Key Updated:", der_Key);
  }, [der_Key]);
  
  useEffect(() => {
    const peer = Socket.peerState;

    if (peer) {
      peer.on("data", (data: any) => {
        // Parse and display the incoming message
        const receivedMessage = JSON.parse(data);
        if (receivedMessage.type == "messages"){
          console.log("der key : ", der_Key)
          const storedKey = localStorage.getItem("derivedKey")
          if (storedKey == null) {
            throw new Error("der_key key should not be null");
          }
          var decryptedMessage = CryptoJS.RC4.decrypt(receivedMessage.text, storedKey).toString(CryptoJS.enc.Utf8);
          console.log("decrypted message: ",decryptedMessage)
          receivedMessage.text= decryptedMessage
          console.log("rec message: ",receivedMessage)
          if (receivedMessage.text) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          }
        }
      });
    }
  }, [Socket.peerState]);


  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current.focus();
        // console.log("Done");
      } else if (e.key === "Enter") {
        btnRef.current.click();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {Socket.peerState ? (
        <div className="flex justify-center sm:w-fit w-full">
          <div className="flex flex-col flex-wrap border rounded-md sm:min-w-[400px] min-w-[95%] min-h-[400px] p-2">
            {/* chats */}
            <div className="flex-1 overflow-y-auto w-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "me" ? "justify-end" : "justify-start"
                  } mb-[2px]`}
                >
                  <div
                    className={`flex flex-wrap sm:max-w-[200px] max-w-[150px] text-sm rounded-3xl px-3 py-1 ${
                      message.sender === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-700  text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* chat box */}
            <div className="flex justify-between bottom-1 w-full space-x-1">
              <div className="flex w-full">
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  ref={inputRef}
                  placeholder={`Send Message to ${Socket.userId}`}
                />
              </div>
              <div className="">
                <Button
                  variant={"outline"}
                  className="p-3"
                  onClick={handleSendMessage}
                  ref={btnRef}
                >
                  <SendHorizonal size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Chat;
