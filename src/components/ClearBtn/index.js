import React from 'react';
import styled from 'styled-components';

const ClearBtn = styled.button`
  background-color: transparent;  
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
  }
`;

export default ClearBtn;
