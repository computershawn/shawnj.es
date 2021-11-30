import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import NavIcon from '../NavIcon';
import DismissIcon from '../../assets/dismiss-icon.svg';
import ClearBtn from '../ClearBtn';

const StyledOverlay = styled.div`
  width: 100%;
  height: ${props => props.isOpen ? '100%' : '0%'};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.9);
  overflow-x: hidden;
  transition: height 0.36s cubic-bezier(0.25, 1, 0.5, 1);

  & > .overlay-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }

  & a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
    transition: 0.3s;

    &:hover, focus {
      color: #f1f1f1;
    }
  }

  & > .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
  }

  @media screen and (max-height: 450px) {
    & > a {
      font-size: 20px;
    }

    & > .closebtn {
      font-size: 40px;
      top: 15px;
      right: 35px;
    }
  }
`;

const IconContainer = styled.div`
  width: 32px;
  height: 32px;

  svg {
    fill: #ffffff;
  }
`;

const Overlay = ({ toggle, isOpen }) => {
  const handleToggle = () => {
    toggle(isOpen);
  }

  return (
    <StyledOverlay isOpen={isOpen}>
      <div style={{ margin: '1rem' }}>
        <ClearBtn onClick={handleToggle}>
          <IconContainer>
            <DismissIcon />
          </IconContainer>
        </ClearBtn>
      </div>

      <div className="overlay-content">
        <Link href="/projects">
          <a>WORK</a>
        </Link>

        <a href="http://cargocollective.com/designcpu" target="_blank">SJ×MDP</a>

        <NavIcon
          icon="linkedin"
          href="https://www.linkedin.com/in/shawnjdesign"
          newTab
        />

        <NavIcon
          icon="github"
          href="https://github.com/computershawn"
          newTab
        />

        <NavIcon
          icon="email"
          href="mailto:hello@shawnj.es?Subject=Hello"
        />
      </div>
    </StyledOverlay>
  );
};

export default Overlay;
