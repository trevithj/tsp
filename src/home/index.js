import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map from '../map';

const Frame = styled.div`
  margin-top: 10px;
`;

const Div = styled.div`
  margin: 10px auto 0;
  border: solid thin silver;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  height: calc(1em + 20px);
  box-shadow: 10px 10px 5px silver;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 255, 0.01),
    rgba(0, 0, 255, 0.2)
  );
`;

const Home = props => {
  const { destinations } = props;
  return (
    <Frame>
      <Map />
      {destinations.map(dest => (
        <Div key={dest.id}>{dest.name}</Div>
      ))}
    </Frame>
  );
};
Home.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Home;
