import React from "react";
import Container from "../Layout/Container";
import Sidebar from "../common/Sidebar";
import ChatList from "../pageComponents/Message/ChatList";
import ChatBox from "../pageComponents/Message/ChatBox";

const Message = () => {
  return (
    <Container>
      <Sidebar activeItem="Messages" />
      <div className="flex flex-row flex-1 h-full overflow-hidden gap-4">
        <div className="flex flex-col flex-1 min-h-0 gap-4">
          <ChatList />
        </div>
        <ChatBox />
      </div>
    </Container>
  );
};

export default Message;
