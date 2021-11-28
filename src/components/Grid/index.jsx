import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0;

  & > div {
    background: black;
    padding: 1rem;
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
  
        // Alternate Version
        // top: 0;
        // bottom: 0;
        // right: 0;
        // left: 0;
        // margin: auto;
  
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }   
  }
`;

export default Grid;

