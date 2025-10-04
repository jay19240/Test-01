"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";

export default function Chat() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [dialogs, setDialogs] = useState<string[]>([]);

  const myChat = useRef<HTMLDivElement>(null);

  function onChatBtnClick() {
    if (myChat.current) {
      myChat.current.classList.toggle('chatbot--open');
    }
  }

  function onMessageChange(e: any) {
    setMessage(e.target.value);
    console.log(message);
  }

  async function onChatMessageSend(e: any) {
    if (sending) {
      return;
    }

    setSending(true);

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
      }),
    });

    if (res.ok) {
      setDialogs(prev => [...prev, message]);
      setMessage('');
    }

    const data = await res.json();
    await delay(1000);

    setDialogs(prev => [...prev, data.answer]);
    setSending(false);
  }

  function delay(ms: number): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, ms);
    });
  }

  return (
    <div>
      <div className="chatBtn" onClick={onChatBtnClick}>
        <Image
          src="/logo-chatbot.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
      <div className="chatbot" ref={myChat}>
        <div className="chatbot-dialog">
          {dialogs.map((dialog: any) => (
            <div className="chatbot-dialog-item" key={dialog}>
              {dialog}
            </div>
          ))}
        </div>
        <div className="chatbot-message">
          <textarea className="chatbot-message-input" name="message" onChange={onMessageChange} value={message}></textarea>
          <button className="chatbot-message-send" onClick={onChatMessageSend}>
            <Image
              src="/logo-send.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </button>
        </div>
      </div>
    </div>
  );
}