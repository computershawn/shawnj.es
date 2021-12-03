import styled from 'styled-components';

const ComingSoonContainer = styled.div`
  & > div {
    margin: 3rem 1rem;

    h3 {
      font-weight: 400;
      line-height: 1.6rem;
    }
  }

  @media screen and (min-width: 480px) {
    max-width: 960px;
    margin: 0 auto;

    & > div {
      margin: 0;
    }
  }
`;

const ComingSoon = () => {
  return (
    <ComingSoonContainer>
      <div>
        <h3>
          Please bear with me while I migrate projects from my original Squarespace site. Those projects are still viewable at <a href="https://designcpu.squarespace.com/" target="_blank">designcpu.squarespace.com</a>.
        </h3>
      </div>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
