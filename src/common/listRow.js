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

const Span = styled.span`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: ${props => (props.type === 'add' ? 'green' : 'red')};
  margin-right: 1em;
`;

// &#x2718;
// &#x2295;
// &#x2297;
// &#x229D;
// &#x2A01;
// &#x2A02;
// &#x2a2f;

const ListRow = props => {
  const { text = '?', doClick, type } = props;
  return (
    <Div onClick={doClick}>
      <div style={{ lineHeight: '1em' }}>
        {type === 'add' && <Span type={type}> &#x2A01; </Span>}
        {type === 'del' && <Span type={type}> &#x2A02; </Span>}
        <span>{text}</span>
      </div>
    </Div>
  );
};

export default ListRow;
