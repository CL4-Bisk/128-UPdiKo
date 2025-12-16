import "./AccountUpdateSection.css";
import mascot from './../../images/logo/barney.jpg'
import homeIcon from './../../images/icon/home-icon.png'
import mapIcon from './../../images/icon/map-pin-icon.png'
import accountIcon from './../../images/icon/user-icon.png'
import showPassIcon from './../../images/icon/view-pass-icon.png'
import hidePassIcon from './../../images/icon/hide-pass-icon.png'
import bookmarkIcon from './../../images/icon/saved-icon.png'
import logoutIcon from './../../images/icon/logout-icon.png'
import backIcon from './../../images/icon/back-icon-2.png'

import {
  getCurrentUser,
  updateUserProfile,
  updateUserPassword,
  saveUserDataToDB
} from "../../firebase/firebase.js";

import { useEffect, useState } from "react";

function AccountUpdateSection({ setAppSection }) {
  const user = getCurrentUser();

  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  if (!user) return null;

  const handleUpdate = async () => {
    try {
      // Update display name and email
      await updateUserProfile({
        displayName: displayName
      });

      // If password is being changed, ask for current password
      if (newPassword.trim()) {
        setShowPasswordConfirm(true);
        return;
      }

      await finalizeDBUpdate();
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const finalizeDBUpdate = async () => {
    await saveUserDataToDB(user.uid, {
      name: displayName || user.displayName
    });
  };

  const handlePasswordConfirm = async () => {
    try {
      await updateUserPassword(newPassword.trim(), currentPassword);

      await finalizeDBUpdate();

      setNewPassword("");
      setCurrentPassword("");
      setShowPasswordConfirm(false);

      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="AccountUpdateSection">
      {/* HEADER */}
      <main>
        <figure className="mascot" />
        <div className="mascot-dialogue">ACCOUNT SETTINGS</div>
      </main>

      {/* UPDATE FORM */}
      <div className="update-user-info-container">
        <h2 className="info-title">Update User Profile</h2>

        <div className="update-user-info">
          <label className="info-label">New Name:</label>
          <input
            className="info-input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="update-user-info">
          <label className="info-label">New Password:</label>
          <input
            className="info-input"
            type="password"
            placeholder="Leave blank to keep current"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button className="update-btn btn" onClick={handleUpdate}>
          Update
        </button>
      </div>

      {/* PASSWORD CONFIRM */}
      {showPasswordConfirm && (
        <div className="dialogue">
          <p>Enter current password to confirm</p>
          <input
            className="info-input"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button className="update-btn btn" onClick={handlePasswordConfirm}>
            Confirm
          </button>
        </div>
      )}

      {/* NAV BAR */}
      <footer>
        <nav className="nav-bar">
          <div className="navigations" onClick={() => setAppSection("HOME")}>
            <img src={homeIcon} />
            <p>Home</p>
          </div>
          <div className="navigations" onClick={() => setAppSection("MAP")}>
            <img src={mapIcon} />
            <p>Map</p>
          </div>
          <div
            className="navigations active-section"
            onClick={() => setAppSection("ACCOUNT")}
          >
            <img src={accountIcon} />
            <p>Account</p>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default AccountUpdateSection;