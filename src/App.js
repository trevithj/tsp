import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMapData } from './api';
import Home from './home';
import Search from './search';
import Pick from './pick';
import './App.css';

//Temp - for dev
const View = ({ name }) => <div>TODO: {name}</div>;
// const makeDest = () => {
//   return { addr: `${Math.random()} Some destination` };
// };

const viewMap = {
  home: Home,
  search: Search,
  pick: Pick,
  directions: () => <View name='Directions' />,
  undefined: () => <View name='Oops!' />
};

const FIVE_MINS = 1000 * 60 * 1;

const App = props => {
  const { message, view, setView, ...rest } = props;
  const TheView = viewMap[view];
  useEffect(loadDataEffect(rest), []);
  const checkDestUpdate = () => {
    const { setMessage, timer } = props;
    if (timer.dest === false) return;

    if (timer.time + FIVE_MINS < new Date().getTime()) {
      setMessage(`The last destination set was ${timer.dest.addr}.`);
    } else {
      setMessage('');
    }
  };
  useEffect(() => {
    const interval = setInterval(checkDestUpdate, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='App-title'>The RUSH App</p>
      </header>
      {/* Temp: a menu bar */}
      <div>
        <button onClick={() => setView('search')}>Srch</button>
        <button onClick={() => setView('directions')}>Dirs</button>
        {/* <button onClick={() => rest.addTestDest(makeDest())}>Test</button> */}
      </div>
      <div>{message}</div>
      <TheView {...rest} />
    </div>
  );
};

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

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
    const { view, search, destinations, timer, message } = state;
    return { view, search, destinations, timer, message };
  },
  { setView, setMapData, setMessage }
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
