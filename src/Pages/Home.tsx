import React, { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: green;
  font-size: 3rem;
`;

export const Home = () => {
  const [name, setName] = useState("World");
  
  return (
    <>
      <Title>Home</Title>
      <h2>State Value: {name}</h2>
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
    </>
  );
}; 