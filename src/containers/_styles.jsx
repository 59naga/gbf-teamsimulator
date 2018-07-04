import styled from 'styled-components';

export default null;

export const Result = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
export const ResultItem = styled.li`
  display: inline-block;
`;

export const App = styled.div`
  margin-bottom: 7em;

  /*  深い闇  */
  position: relative;
  ::after{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: "";
    background: url("http://jsrun.it/assets/Q/y/i/3/Qyi3U.png") no-repeat center center;
    opacity: 0.1;
    z-index: -1;
  }
`;

export const Middle = styled.div`
  z-index: 100

`;
export const Head = styled.div`
  z-index: 500

  position: sticky;
  position: -webkit-sticky;
  top: 0;
  background: white
`;
export const Foot = styled.div`
  z-index: 500

  position: fixed
  left: 0
  bottom: 0
  right: 0

  background: white
`;
