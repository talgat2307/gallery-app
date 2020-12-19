import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import { fbAppId } from '../../constants';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { facebookLogin } from '../../store/actions/userActions';

const FacebookLogin = () => {

  const dispatch = useDispatch();
  const facebookResponses = response => {
    if (response.id) {
      dispatch(facebookLogin(response));
    }
  }

  return <FacebookLoginButton
    appId={fbAppId}
    fields='name, email, picture'
    render={renderProps => {
      return <Button
      onClick={renderProps.onClick}
      variant={'outline-primary'}
      className='ml-5'
      >
        Continue with Facebook</Button>}}
    callback={facebookResponses}
  />;
};

export default FacebookLogin;