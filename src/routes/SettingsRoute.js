import AppDeleteAccount from 'components/AppDeleteAccount';
import AppEditPassword from 'components/AppEditPassword';
import AppEditProfile from 'components/AppEditProfile';
import ErrorAlert from 'components/ErrorAlert';
import SuccessAlert from 'components/SuccessAlert';
import React, { useContext, useEffect, useRef } from 'react';
import UserContext from 'store/UserContext';

function SettingsRoute() {
  const successAlertRef = useRef(null);
  const errorAlertRef = useRef(null);
  const userCtx = useContext(UserContext);

  return (
    <div className="page">
      <SuccessAlert ref={successAlertRef} />
      <ErrorAlert ref={errorAlertRef} />
      <h1>Settings</h1>
      <h2>Profile settings</h2>
      <AppEditProfile
        userId={userCtx.ReadJWT().userID}
        displaySuccess={successAlertRef}
        displayError={errorAlertRef}
      ></AppEditProfile>

      <h2>Change password</h2>
      <AppEditPassword
        userId={userCtx.ReadJWT().userID}
        displaySuccess={successAlertRef}
        displayError={errorAlertRef}
      ></AppEditPassword>
      <h2>Account</h2>
      <AppDeleteAccount
        userId={userCtx.ReadJWT().userID}
        displaySuccess={successAlertRef}
        displayError={errorAlertRef}
      ></AppDeleteAccount>
    </div>
  );
}

export default SettingsRoute;
