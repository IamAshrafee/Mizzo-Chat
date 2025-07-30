import React, { useState } from "react";
import Container from "../Layout/Container";
import Sidebar from "../common/Sidebar";
import ChatList from "../pageComponents/Message/ChatList";
import ChatBox from "../pageComponents/Message/ChatBox";
import Search from "../pageComponents/Message/Search";

const Message = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <Sidebar activeItem="Messages" />
      <div className="flex flex-row flex-1 h-full overflow-hidden gap-4">
        <div className="flex flex-col flex-1 min-h-0 gap-4">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ChatList searchTerm={searchTerm} />
        </div>
        <ChatBox />
      </div>
    </Container>
  );
};

export default Message;
