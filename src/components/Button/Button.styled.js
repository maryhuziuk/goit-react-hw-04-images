import styled from '@emotion/styled';

export const StyledButton = styled.button`
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 10px;
  background: linear-gradient(to bottom, #0099ff 0%, #ffff99 100%);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: black;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: Cursive;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow:  0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  &:hover,
  &:focus {
    background: linear-gradient(to bottom, #ffff99 0%, #66ccff 100%);
    color:black;
  }
`;