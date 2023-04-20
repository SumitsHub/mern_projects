import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'

const Conversations = () => {
  const {conversations, selectConversationIndex} = useConversations();

    return (
    <ListGroup>
        {conversations.map((conversation, index)=> (
            <ListGroup.Item key={index}
                action
                onClick={()=>selectConversationIndex(index)}
                active={conversation.selected}
            >
                {conversation.recipients.map(recipient => recipient.name).join(', ')}
            </ListGroup.Item>
        ))}
    </ListGroup>
  )
}

export default Conversations