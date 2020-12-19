import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Login from './containers/Login';
import Register from './containers/Register';
import { useSelector } from 'react-redux';
import Gallery from './containers/Gallery';
import UserGallery from './containers/UserGallery';
import AddPhoto from './containers/AddPhoto';

const ProtectedRout = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />
};

const App = () => {
  const user = useSelector(state => state.user.userInfo);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Gallery}/>
          <Route path={'/user-gallery/:id'} component={UserGallery}/>
          <ProtectedRout
            path={'/add-photo'}
            component={AddPhoto}
            isAllowed={user}
            redirectTo={'/login'}
          />
          <ProtectedRout
            path={'/login'}
            component={Login}
            isAllowed={!user}
            redirectTo={'/'}
          />
          <ProtectedRout
            path={'/register'}
            component={Register}
            isAllowed={!user}
            redirectTo={'/'}
          />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
