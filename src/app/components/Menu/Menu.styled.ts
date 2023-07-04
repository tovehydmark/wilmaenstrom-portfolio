import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: lightsteelblue;
  /* transition: transform 0.3s ease-in-out; */
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 1061px) {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 2rem;
    }
    a {
      font-size: 2rem;
      text-transform: uppercase;
      font-weight: bold;
      text-decoration: none;
      transition: color 0.3s linear;
      font-size: 1.5rem;
      text-align: center;

      &:hover {
        color: #ffd301;
      }

      :visited {
        color: white;
      }
    }
  }
`;
