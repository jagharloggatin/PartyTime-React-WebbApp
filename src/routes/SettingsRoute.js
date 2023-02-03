import AppEditPassword from 'components/AppEditPassword';
import AppEditProfile from 'components/AppEditProfile';
import React from 'react';

function SettingsRoute() {
  return (
    <div className="page">
      <h1>Settings</h1>
      <h2>Profile settings</h2>
      <AppEditProfile></AppEditProfile>

      <h2>Change password</h2>
      <AppEditPassword></AppEditPassword>
    </div>
  );
}

export default SettingsRoute;
