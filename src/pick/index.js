import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Map, { MapDiv } from '../map';

const Frame = styled.div`
  margin-top: 10px;
`;

const Loc = styled.div`
  position: absolute;
  font-family: sans-serif;
  transform: scale(8);
  color: blue;
  top: 50%;
  left: 50%;
`;

const Pick = props => {
  const { setView, addDest, data } = props;
  const onCancel = () => {
    setView('home');
  };
  const onConfirm = () => {
    // const view = document.querySelector('g#view');
    // const txfm = view.getAttribute('transform') || '';
    // console.log(txfm.split(/[(),]/));
    const myLoc = document.querySelector('#myLoc');
    const box = myLoc.getBoundingClientRect();
    //TODO: convert to map coords
    const dest = {
      coords: [box.x, box.y],
      addr: 'Current location'
    };
    addDest(dest);
    setView('home');
  };

  return (
    <Frame>
      <MapDiv height='75vh'>
        <Map data={data}>
          <Loc id='myLoc'>&#x2316;</Loc>
        </Map>
      </MapDiv>
      <button onClick={onCancel}>CANCEL</button>
      <button onClick={onConfirm}>CONFIRM</button>
    </Frame>
  );
};

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

const addDest = dest => ({
  type: 'DEST_ADD',
  payload: dest
});

export default connect(
  state => {
    return { data: state.map.data };
  },
  { setView, addDest }
)(Pick);
