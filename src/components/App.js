import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.png";
import HomePage from "./HomePage";
import MoviesListPage from "./MoviesListPage";
import MoviePage from "./MoviePage";
import SectionPage from "./SectionPage";
import SucessPage from "./SucessPage";
import { useState } from "react";


export default function App() {
  const [removeNavBar, setRemoveNavBar] = useState(false);
  const [reservation, setReservation] = useState({});
  const [section, setSection] = useState({});


  return (
    <BrowserRouter>
      <ScreenContainer show={removeNavBar}>
        {!removeNavBar && (
          <NavBar>
            <Link to="/" >
            <img src={logo} alt="Logo CineFlex" />
            </Link>            
          </NavBar>
        )}
        <Routes>
          <Route
            path="/"
            element={<HomePage setRemoveNavBar={setRemoveNavBar} />}
          />
          <Route
            path="/filmes-em-cartaz"
            element={<MoviesListPage setRemoveNavBar={setRemoveNavBar} />}
          />
          <Route path="/filme/:filmeId" element={<MoviePage />} />
          <Route path="/sessao/:sessaoID" element={<SectionPage section={section} setSection={setSection} setReservation={setReservation} />} />
          <Route path="/sucesso" element={<SucessPage section={section} reservation={reservation} />} />
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