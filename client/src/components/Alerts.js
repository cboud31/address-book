import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <NotificationImportantIcon /> {alert.msg}
      </div>
    ))
  );
};

export default Alert;
