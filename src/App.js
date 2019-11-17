import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMapData } from './api';
import Home from './home';
import Search from './search';
import Pick from './pick';
import Directions from './directions';
import './App.css';

const viewMap = {
  home: Home,
  search: Search,
  pick: Pick,
  directions: Directions,
  undefined: () => <div>Oops!</div>
};

const FIVE_MINS = 1000 * 60 * 5;

const App = props => {
  const { message, view, ...rest } = props;
  const TheView = viewMap[view];
  useEffect(loadDataEffect(rest), []);
  const checkDestUpdate = () => {
    const { setMessage, timer } = props;
    if (view !== 'home') return;
    if (timer.dest === false) return;

    if (timer.time + FIVE_MINS < new Date().getTime()) {
      setMessage(`The last destination set was ${timer.dest.addr}.`);
    } else {
      setMessage('');
    }
  };
  useEffect(() => {
    const interval = setInterval(checkDestUpdate, 10000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='App-title'>The RUSH App</p>
      </header>
      <div>{message}</div>
      <TheView {...rest} />
    </div>
  );
};

const setMapData = data => ({
  type: 'MAP_SET_DATA',
  payload: data
});

const setMessage = msg => ({
  type: 'SET_MSG',
  payload: msg
});

export default connect(
  state => {
    const { view, destinations, timer, message } = state;
    return { view, destinations, timer, message };
  },
  { setMapData, setMessage }
)(App);

//
const loadDataEffect = props => () => {
  getMapData()
    .then(data => {
      props.setMapData(data);
    })
    .catch(err => {
      console.log(err);
      //todo: message user
    });
};
