import React from "react";
import Container from "../Layout/Container";
import Sidebar from "../common/Sidebar";
import FriendList from "../pageComponents/Message/FriendList";
import Chat from "../pageComponents/Message/Chat";
import Search from "../pageComponents/Message/Search";

const Message = () => {
  return (
    <Container>
      <Sidebar activeItem="Messages" />
      <div className="flex flex-row flex-1 h-full overflow-hidden gap-4">
        <div className="flex flex-col flex-1 min-h-0 gap-4">
          <Search />
          <FriendList />
        </div>
        <Chat />
      </div>
    </Container>
  );
};

export default Message;