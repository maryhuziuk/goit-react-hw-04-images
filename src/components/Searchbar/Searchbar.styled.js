import styled from '@emotion/styled';


export const SearchbarStyle = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 74px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: linear-gradient(to bottom, #0099ff 0%, #ffff99 100%);
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  border-radius: 0 0 25px 25px;
  margin-bottom: 40px;
 
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;
  
  export const SearchButton = styled.button`
 display: inline-block;
  width: 52px;
  height: 48px;
  border: 0;
  border-radius: 14px;
  background-color: white;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;
 
  
  export const SearchFormButtonLabel = styled.svg`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
    border: 0;
    fill: black;
  `;
  

export const Input = styled.input`
display: inline-block;
width: 100%;
font: inherit;
font-size: 20px;
border: none;
outline: none;
padding-left: 14px;
padding-right: 4px;
`; 


//  TODO
// &::placeholder {
  // font: inherit;
  // font-size: 18px;
// }
// `;
