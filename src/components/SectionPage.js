import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Formulario from "./Formulario";
import Seats from "./Seats";
import BackArrow, { Spinner } from "./modelComponents";

function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

export default function SectionPage({
  section,
  setSection,
  setReservation,
  seatsSelected,
  setSeatsSelected,
}) {
  const { sessaoID } = useParams();
  const [error, setError] = useState(null);
  const [enableReservation, setEnableReservation] = useState(false);

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoID}/seats`
    );

    promise.then((res) => {
      setSection(res.data);
      setError(null);
    });

    promise.catch((err) => {
      setError(err.message);
    });
  }, []);

  if (error !== null) {
    return <div>Erro {error}! Tente de novo</div>;
  }

  if (error === null && isEmpty(section) === true) {
    return <Spinner />;
  }

  return (
    <Container>
      <BackArrow way={`/filme/${section.movie.id}`} />
      <h3>Selecione o(s) assento(s)</h3>
      <Seats
        section={section}
        seatsSelected={seatsSelected}
        setSeatsSelected={setSeatsSelected}
        setEnableReservation={setEnableReservation}
      />
      <Formulario
        seatsSelected={seatsSelected}
        enableReservation={enableReservation}
        setReservation={setReservation}
      />
      <Footer>
        <BoxMovie>
          <img
            src={section.movie.posterURL}
            alt={`Capa do filme ${section.movie.title}`}
          />
        </BoxMovie>
        <h1>
          {section.movie.title}
          <br />
          {section.day.weekday} - {section.day.date}
        </h1>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 390px;
  height: 100%;
  min-height: 100vh;
  margin: 0 15px;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 50px;
  h3 {
    font-size: 24px;
    line-height: 28px;
    color: #293845;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h4 {
    font-size: 18px;
    line-height: 21px;
    color: #293845;
  }
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  height: 117px;
  width: 390px;
  display: flex;
  justify-content: start;
  align-items: center;
  transform: translate(-48%, 0);
  background-color: #dfe6ed;
  box-sizing: border-box;
  border: 1px solid #9eadba;
  overflow: hidden;
  h1 {
    font-size: 26px;
    line-height: 30px;
    color: #293845;
  }
`;
const BoxMovie = styled.div`
  height: 89px;
  width: 64px;
  border-radius: 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 14px;
  img {
    width: 48px;
    height: 72px;
  }
`;