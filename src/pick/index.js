import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map from '../map';

const Frame = styled.div`
  margin-top: 10px;
`;

const Pick = props => {
  const { setView } = props;
  const onCancel = () => {
    setView('home');
  };
  const onConfirm = () => {
    console.log('todo - note location');
    setView('home');
  };

  return (
    <Frame>
      <Map height='75vh' />
      <button onClick={onCancel}>CANCEL</button>
      <button onClick={onConfirm}>CONFIRM</button>
    </Frame>
  );
};

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

export default connect(
  state => {
    return {};
  },
  { setView }
)(Pick);
