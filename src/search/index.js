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
  const { setResults } = props;
  const doChange = e => {
    props.setText(e.target.value);
  };

  useEffect(() => {
    console.log(text);
    if (text.length > 1) {
      getAddresses(text).then(data => {
        console.log(data);
        setResults(data);
      });
    }
  }, [text, setResults]);
  return (
    <Frame>
      <Input onChange={doChange} value={text} type='text' />
      {results.map(({ addr }) => (
        <ListRow key={addr} text={addr} />
      ))}
    </Frame>
  );
};
Search.propTypes = {
  search: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any).isRequired
  }).isRequired,
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

export default connect(
  state => {
    const { search } = state;
    return { search };
  },
  { setResults, setText }
)(Search);
