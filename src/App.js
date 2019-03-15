import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanel: window.location.pathname,
      fetchedUser: null,
    };
  }

  componentDidMount() {
    window.onpopstate = e => {
      if (window.location.pathname === '/') {
        const confirm = window.confirm('Are you sure?');
        if (confirm) {
          this.setState({ activePanel: window.location.pathname });
        } else {
          const { activePanel } = this.state;
          window.history.pushState({ activePanel }, activePanel, activePanel);
        }
      } else {
        this.setState({ activePanel: window.location.pathname });
      }
    };
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

  go = e => {
    const { to } = e.currentTarget.dataset;
    this.setState({ activePanel: to }, () => {
      window.history.pushState({ activePanel: to }, to, to);
    });
  };

  render() {
    return (
      <View activePanel={this.state.activePanel}>
        <Home id="/" fetchedUser={this.state.fetchedUser} go={this.go} />
        <Persik id="/persik" go={this.go} />
      </View>
    );
  }
}

export default App;
