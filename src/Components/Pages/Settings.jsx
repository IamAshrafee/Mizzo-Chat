import React from "react";
import Container from "../Layout/Container";
import Sidebar from "../common/Sidebar";
import ProfileSettings from "../pageComponents/Settings/ProfileSettings";
import AccountSettings from "../pageComponents/Settings/AccountSettings";
import Search from "../pageComponents/Settings/Search";

const Settings = () => {
  return (
    <Container>
      <Sidebar activeItem="Settings" />
      <div className="flex-1 flex flex-col gap-4 h-full min-h-0">
        <Search />
        <div className="flex-1 flex flex-row gap-6 overflow-hidden min-h-0 h-full">
          <ProfileSettings />
          <AccountSettings />
        </div>
      </div>
    </Container>
  );
};

export default Settings;