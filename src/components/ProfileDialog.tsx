import React from "react";
import Dialog from "./Dialog";
import Button from "./Button";

interface Profile {
  name: string;
  gender: string;
  address: string;
  position: string;
}

const ProfileDialog = (props: any) => {
  const profile: Profile = props.profile;
  const { opened = false, handleClickCancel } = props;

  if (!opened) {
    return null;
  }

  return (
    <Dialog
      header="Submitted Form"
      opened={opened}
      onCancel={handleClickCancel}
    >
      <div className="form-input">
        <label>Name: {profile.name || "-"}</label>
      </div>
      <div className="form-input">
        <label>Gender: {profile.gender || "-"}</label>
      </div>
      <div className="form-input">
        <label>Address: {profile.address || "-"}</label>
      </div>
      <div className="form-input">
        <label>Position applied for: {profile.position || "-"}</label>
      </div>
      <div slot="footer" style={{ padding: "5px 10px" }}>
        <Button style={{ width: "100%" }} cta onClick={handleClickCancel}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;
