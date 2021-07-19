import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameContainer from './components/GameContainer';
import ConfigProvider from './store/ConfigStore';
import './App.global.css';

export default function App() {
  return (
    <ConfigProvider>
      <Router>
        <Switch>
          <Route path="/" component={GameContainer} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}
