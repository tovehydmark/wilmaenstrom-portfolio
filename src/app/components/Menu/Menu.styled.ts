import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: left;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #151515; //Todo: variables for color

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  //TODO: fixa variabler för bredd
  @media (min-width: 1061px) {
    display: none;
  }

  a {
    padding-left: 2rem;
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s linear;
    font-size: 1.5rem;
    text-align: center;

    &:hover {
      //Todo: variabler
      color: #ffd301;
    }
  }
`;
