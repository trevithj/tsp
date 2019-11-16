import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map from '../map';
import ListRow from '../common/listRow';

const Frame = styled.div`
  margin-top: 10px;
`;

const Home = props => {
  const { destinations, delDestination } = props;

  const getHandler = dest => () => {
    delDestination(dest);
  };
  return (
    <Frame>
      <Map />
      {destinations.map(dest => {
        const doClick = getHandler(dest);
        const addr = dest.addr;
        return <ListRow key={addr} text={addr} doClick={doClick} type='del' />;
      })}
    </Frame>
  );
};
Home.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.any).isRequired
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
    const { destinations } = state;
    return { destinations };
  },
  { delDestination, setView }
)(Home);
