import React from 'react';
import { connect } from 'react-redux';
import Home from './home';
import Search from './search';
import './App.css';

//Temp - for dev
const View = ({ name }) => <div>TODO: {name}</div>;
const makeDest = () => {
  return { addr: `${Math.random()} Some destination` };
};

const viewMap = {
  home: Home,
  search: Search,
  pick: () => <View name='Pick' />,
  directions: () => <View name='Directions' />,
  undefined: () => <View name='Oops!' />
};

const App = props => {
  const { view, setView, ...rest } = props;
  const TheView = viewMap[view];
  return (
    <div className='App'>
      <header className='App-header'>
        <p className='App-title'>The RUSH App</p>
      </header>
      {/* Temp: a menu bar */}
      <div>
        <button onClick={() => setView('home')}>Home</button>
        <button onClick={() => setView('pick')}>Pick</button>
        <button onClick={() => setView('search')}>Srch</button>
        <button onClick={() => setView('directions')}>Dirs</button>
        <button onClick={() => rest.addTestDest(makeDest())}>Test</button>
      </div>
      <TheView {...rest} />
    </div>
  );
};

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

const addTestDest = dest => ({
  type: 'DEST_ADD',
  payload: dest
});

export default connect(
  state => {
    const { view, search, destinations } = state;
    return { view, search, destinations };
  },
  { setView, addTestDest }
)(App);
