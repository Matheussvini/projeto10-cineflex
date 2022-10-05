import styled from "styled-components";
import logoGif from "../images/logo.gif";

export default function HomePage({setRemoveNavBar}) {
    setRemoveNavBar(true)
    return (
        <Container>
        <h1>Seja bem-vindo(a)!</h1>
        <img src={logoGif} alt="" />
        </Container>
    )
}

const Container = styled.div`
background-color: #C3CFD9;
width: 100%;
img{
    width: 100%;
}
h1 {
    position: fixed;
    top: 5%;

    margin: 30px 0;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`