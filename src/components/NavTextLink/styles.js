import styled from 'styled-components';

const NavTextLinkContainer = styled.div`
  display: inline-block;
  margin-right: 2rem;

  & > a {
    text-decoration: none;
    transition: color 200ms ease-in-out;

    &:visited, active {
      color: #8a8a8a;
    }

    &:hover, active {
      color: #222;
    }

    &.current {
      color: #222;
    }
  }
`;

export { NavTextLinkContainer };
