import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
  state = {
    fetchedUser: null,
  };

  componentDidMount() {
    connect.subscribe(e => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          this.setState({ fetchedUser: e.detail.data });
          break;
        default:
          console.log(e.detail.type);
      }
    });
    connect.send('VKWebAppGetUserInfo', {});
  }

  render() {
    const Wrapper = (id, component) => (
      <View activePanel={id}>{component}</View>
    );

    const RoutePersik = () => Wrapper('persik', <Persik id="persik" />);

    const RouteHome = () => Wrapper('home', <Home id="home" />);

    return (
      <Router>
        <div>
          <Route path="/" exact component={RouteHome} />
          <Route path="/test/" component={RoutePersik} />
        </div>
      </Router>
    );
  }
}

export default App;
