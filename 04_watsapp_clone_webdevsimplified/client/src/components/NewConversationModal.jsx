import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";
const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts();
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { createConversation } = useConversations();

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevState) => {
      if (prevState.includes(contactId)) {
        return prevState.filter((id) => id !== contactId);
      } else {
        return [...prevState, contactId];
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Converstation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="mt-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
