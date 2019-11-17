import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Map from '../map';
import getTour from './tsp';

const Frame = styled.div`
  margin-top: 10px;
`;

const Directions = props => {
  const { dests, setMessage, setView } = props;

  setMessage('Calculating shortest tour...');
  console.log(dests);
  console.log(getTour(dests || []));
  return (
    <Frame>
      <div>
        <button onClick={() => setView('home')}>Back</button>
      </div>
      <Map height='80vh'></Map>
    </Frame>
  );
};

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

const setMessage = msg => ({
  type: 'SET_MSG',
  payload: msg
});

export default connect(
  state => {
    const { destinations } = state;
    return { dests: Object.values(destinations) };
  },
  { setView, setMessage }
)(Directions);
