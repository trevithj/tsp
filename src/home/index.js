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
  left: 10px;
  bottom: 10px;
  z-index: 9;
`;

const Home = props => {
  const { destinations, data, delDestination, setView } = props;

  const getHandler = dest => () => {
    delDestination(dest);
  };
  return (
    <Frame>
      <div>
        <button onClick={() => setView('search')}>Srch</button>
        <button onClick={() => setView('directions')}>Dirs</button>
      </div>
      <MapDiv height='50vh'>
        <Map data={data}>
          <Txt x='10' y='300' onClick={() => setView('pick')}>
            &#x2316;
          </Txt>
        </Map>
      </MapDiv>
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
