import styled from "styled-components";
import logoGif from "../images/logo.gif";
import { Link } from "react-router-dom";

export default function HomePage({ setRemoveNavBar }) {
  setRemoveNavBar(true);
  return (
    <Container>
      <h1>Bem-vindo(a)!</h1>
      <img src={logoGif} alt="" />
      <Link to="/filmes-em-cartaz">
        <button>Filmes em cartaz</button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  background-color: #c3cfd9;
  width: 100%;
  height: 100vh;
  img {
    position: fixed;
    max-width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h1 {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    width: 90%;
    font-size: 36px;
    line-height: 45px;
    text-align: center;
    color: #e8833a;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  button {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 200px;
    height: 40px;
    background: #e8833a;
    border: 1px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 50px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    transition: color, background-color 300ms;
    &:hover,
    &:focus {
      background-color: #4e5b60;
      color: #e8833a;
      border: 1px solid #ffffff;
    }
  }
`;
