import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map, { MapDiv } from '../map';
import ListRow from '../common/listRow';

const Frame = styled.div`
  margin-top: 10px;
`;

const Txt = styled.div`
  font-size: 72px;
  font-weight: bold;
  stroke: blue;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 9;
`;

const Search = styled.div`
  border: solid thin silver;
  background-color: white;
  color: silver;
  width: 100%;
  padding-left: 10%;
  line-height: 2em;
  cursor: pointer;
`;

const ShowTour = styled.div`
  border: solid thin silver;
  background-color: white;
  color: blue;
  width: 100%;
  line-height: 2em;
  padding-left: 10%;
  cursor: pointer;
`;

const Home = props => {
  const { destinations, data, delDestination, setView } = props;

  const getHandler = dest => () => {
    delDestination(dest);
  };
  return (
    <Frame>
      <Search onClick={() => setView('search')}>
        <span role='img' aria-label='Search box'>
          &#128269;
        </span>{' '}
        Search
      </Search>
      <MapDiv height='50vh'>
        <Map data={data}>
          <Txt onClick={() => setView('pick')}>&#x2316;</Txt>
        </Map>
      </MapDiv>
      <ShowTour onClick={() => setView('directions')}>Directions</ShowTour>
      {Object.values(destinations).map(dest => {
        const doClick = getHandler(dest);
        const addr = dest.addr;
        return <ListRow key={addr} text={addr} doClick={doClick} type='del' />;
      })}
    </Frame>
  );
};
Home.propTypes = {
  destinations: PropTypes.object.isRequired
};

const delDestination = dest => ({
  type: 'DEST_REMOVE',
  payload: dest
});

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

export default connect(
  state => {
    const { destinations, map } = state;
    return { destinations, data: map.data };
  },
  { delDestination, setView }
)(Home);
