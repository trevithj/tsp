import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Map, { MapDiv } from '../map';
import ListRow from '../common/listRow';
import getTour from './tsp';

const Frame = styled.div`
  margin-top: 10px;
`;

const Directions = props => {
  const { dests, data, setMessage, setTour, setView } = props;
  const theTour = data.tour || [];

  const loadTour = () => {
    // if (data.tour) return;
    setMessage('Calculating shortest tour...');
    console.log('dests', dests);
    getTour(dests || [])
      .then(tour => {
        console.log('tour', tour);
        setMessage('Done.');
        setTour(tour);
      })
      .catch(err => {
        setMessage(err);
      });
  };
  useEffect(loadTour, []);

  return (
    <Frame>
      <div>
        <button onClick={() => setView('home')}>Back</button>
      </div>
      <MapDiv height='60vh'>
        <Map data={data}></Map>
      </MapDiv>
      <h3>The Tour</h3>
      {theTour.map((dest, i) => {
        const addr = i === 0 ? `${dest.addr} (start)` : dest.addr;
        return <ListRow key={addr} text={addr} />;
      })}
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

const setTour = tour => ({
  type: 'MAP_SET_TOUR',
  payload: tour
});

export default connect(
  state => {
    const { destinations, map } = state;
    return { dests: Object.values(destinations), data: map.data };
  },
  { setView, setMessage, setTour }
)(Directions);
