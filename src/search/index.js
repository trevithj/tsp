import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAddresses } from '../api';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListRow from '../common/listRow';

const Frame = styled.div`
  margin-top: 10px;
`;

const Input = styled.input``;

const Search = props => {
  const { text, results } = props.search;
  const { addDest, setView, setResults } = props;
  const doChange = e => {
    props.setText(e.target.value);
  };

  useEffect(() => {
    if (text.length > 1) {
      getAddresses(text).then(data => {
        setResults(data);
      });
    }
  }, [text, setResults]);

  const getHandler = dest => () => {
    addDest(dest);
    setView('home');
  };
  return (
    <Frame>
      <Input onChange={doChange} value={text} type='text' />
      {results.map(loc => {
        const doClick = getHandler(loc);
        const addr = loc.addr;
        return <ListRow key={addr} text={addr} type='add' doClick={doClick} />;
      })}
    </Frame>
  );
};
Search.propTypes = {
  search: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any).isRequired
  }).isRequired,
  addDest: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired
};

const setResults = results => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results
});

const setText = txt => ({
  type: 'SET_SEARCH_TEXT',
  payload: txt
});

const addDest = dest => ({
  type: 'DEST_ADD',
  payload: dest
});

const setView = view => ({
  type: 'SET_VIEW',
  payload: view
});

export default connect(
  state => {
    const { search } = state;
    return { search };
  },
  { addDest, setView, setResults, setText }
)(Search);
