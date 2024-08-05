import styled from 'styled-components';

// Grid styling borrowed from https://css-tricks.com/a-grid-of-logos-in-squares/

const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0;
  margin: 7.5rem auto 0;
  padding-bottom: 3rem;

  & > div {
    // background: black;
    // padding: 1rem;
    position: relative;

    &::before {
      // for apsect ratio
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    img {
        position: absolute;
        max-width: 100%;
  
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }   
  }
`;

export default Grid;

