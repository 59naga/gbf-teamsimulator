import styled from 'styled-components';

export default null;
export const CheckboxContainer = styled.label`
  display: inline-block
  margin: 0 .2em

  cursor: pointer

  font-weight: ${props => (props.primary ? 'bold' : 'normal')}
`;
export const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
  margin-right: .2em;
`;

export const CharacterCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;
export const Thumbnail = styled.img`
  cursor: pointer
  width: 20vw
  opacity: ${props => (props.checked ? 0.5 : 1)}
`;
export const Member = styled.img`
  width: 20vw
`;

export const Result = styled.ul`
  list-style-type: none;
  padding: 0;
`;
export const ResultItem = styled.li`
  display: inline-block;
`;

export const Form = styled.div`

`;
export const FormFooter = styled.footer`
  display: flexbox;
  justify-content: center;

  > * {
    display: block;
    flex: 1;
    min-width: 25%;
    margin: 0 .2em

    text-align: center;
  }
`;
export const Inputs = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  overflow: scroll;
  > li {
    white-space: nowrap;
  }
`;
