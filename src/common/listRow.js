import React from 'react';
import styled from 'styled-components';

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

const ListRow = props => {
  const { text = '?', doClick } = props;
  return <Div onClick={doClick}>{text}</Div>;
};

export default ListRow;
