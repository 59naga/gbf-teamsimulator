import styled from 'styled-components';

export default null;
export const CheckboxContainer = styled.label`
  display: inline-block
  ${'' /* margin: 0 .25em */}
  padding: 0 .25em

  cursor: pointer
`;

export const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;
export const Thumbnail = styled.img`
  cursor: pointer
  width: 20vw
  opacity: ${props => (props.checked ? 0.5 : 1)}
`;

export const Result = styled.ul`
  list-style-type: none;
  padding: 0;
`;
export const ResultItem = styled.li`
  display: inline-block;
`;
