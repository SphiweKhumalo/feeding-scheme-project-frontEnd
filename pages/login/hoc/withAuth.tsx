import React, { ComponentType,useEffect } from 'react';
import { ScriptProps} from 'next/script';
// import { useHistory } from 'react-router-dom';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent: React.FC<any> = (props) => {
    // const history = useHistory();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const isAuthenticated = Boolean(token);
        
      if (!isAuthenticated) {
        // history.push('/login');
        console.log('token not found');
        window.location.href = '/';
      }
      console.log('token  found');
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

