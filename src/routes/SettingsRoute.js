import AppEditPassword from 'components/AppEditPassword';
import AppEditProfile from 'components/AppEditProfile';
import ErrorAlert from 'components/ErrorAlert';
import SuccessAlert from 'components/SuccessAlert';
import React, { useContext, useRef } from 'react';
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
        displaySuccess={successAlertRef.current}
        displayError={errorAlertRef.current}
      ></AppEditProfile>

      <h2>Change password</h2>
      <AppEditPassword
        userId={userCtx.ReadJWT().userID}
        displaySuccess={successAlertRef.current}
        displayError={errorAlertRef.current}
      ></AppEditPassword>
    </div>
  );
}

export default SettingsRoute;
