import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "../images/logo.png";
import HomePage from "./HomePage";
import MoviesListPage from "./MoviesListPage";
import MoviePage from "./MoviePage";
import SectionPage from "./SectionPage";
import SucessPage from "./SucessPage";
import { useState } from "react";

export default function App() {
  const [removeNavBar, setRemoveNavBar] = useState(false);

  return (
    <BrowserRouter>
      <ScreenContainer show={removeNavBar}>
        {!removeNavBar &&
        <NavBar>
          <img src={logo} alt="Logo CineFlex" />
        </NavBar>
        }
        <Routes>
          <Route
            path="/"
            element={<HomePage setRemoveNavBar={setRemoveNavBar} />}
          />
          <Route path="/filmes-em-cartaz" element={<MoviesListPage />} />
          <Route path="/filme" element={<MoviePage setRemoveNavBar={setRemoveNavBar} />} />
          <Route path="/sessao" element={<SectionPage />} />
          <Route path="/sucesso" element={<SucessPage />} />
        </Routes>
        <GlobalStyle />
      </ScreenContainer>
    </BrowserRouter>
  );
}

const NavBar = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 80px;
  overflow: hidden;
  background-color: #c3cfd9;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: auto;
    width: 75%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;
const ScreenContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: ${(props) => (props.show ? "0" : "80px 0")};
`;
