import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import Send from "../icons/Send";

function OpenConversation() {
  const [text, setText] = useState("");
  const lastMessageRef = useRef();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  },[]);
  const { sendMessage, selectedConversation } = useConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  }, []);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                key={index}
                ref={lastMessage ? setRef : null}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-items-end" : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "50px", resize: "none" }}
            />
            <Button type="submit" className="ms-2">
              <Send />
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

export default OpenConversation;
