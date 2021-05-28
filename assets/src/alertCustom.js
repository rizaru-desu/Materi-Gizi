import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const AlertCustom = (props) => {
  return (
    <AwesomeAlert
      show={props.showAwesome}
      showProgress={false}
      title="Notification"
      message={props.messageAlert}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={true}
      confirmText="Closed"
      confirmButtonColor="#DD6B55"
      onConfirmPressed={props.onConPressed}
    />
  );
};

export default AlertCustom;
