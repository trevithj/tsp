import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map from '../map';
import ListRow from '../common/listRow';

const Frame = styled.div`
  margin-top: 10px;
`;

const Home = props => {
  const { destinations } = props;
  return (
    <Frame>
      <Map />
      {destinations.map(({ addr }) => (
        <ListRow key={addr} text={addr} />
      ))}
    </Frame>
  );
};
Home.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Home;
