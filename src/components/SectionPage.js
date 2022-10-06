import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

export default function SectionPage() {
  const [section, setSection] = useState({});
  const { sessaoID } = useParams();
  const [error, setError] = useState(null);
  const [seatsSelected, setSeatsSelected] = useState([]);

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
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <h3>Selecione o(s) assento(s)</h3>
      <SeatsBox>
        {section.seats.map((s) => (
          <Seat
            isAvailable={s.isAvailable}
            selected={seatsSelected.includes(s.id) ? true : false}
            onClick={() =>
              seatsSelected.includes(s.id)
                ? setSeatsSelected(
                    seatsSelected.filter((item) => item !== s.id)
                  )
                : setSeatsSelected([...seatsSelected, s.id])
            }
            disabled={!s.isAvailable}
            key={s.id}
          >
            {s.name}
          </Seat>
        ))}
      </SeatsBox>
      <Subtitle>
        <div>
          <Seat isAvailable={true} selected={true} />
          <span>Selecionado</span>
        </div>
        <div>
          <Seat isAvailable={true} />
          <span>Disponível</span>
        </div>
        <div>
          <Seat isAvailable={false} />
          <span>Indisponível</span>
        </div>
      </Subtitle>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  margin: 0 15px;
  box-sizing: border-box;
  padding: 0 20px;
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
    font-size: 20px;
    line-height: 23px;
    color: #293845;
  }
`;
const SeatsBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
const Seat = styled.button`
  width: 26px;
  height: 26px;
  background-color: ${(props) =>
    !props.isAvailable
      ? "#FBE192"
      : (props2) => (props2.selected ? "#8DD7CF" : "#C3CFD9")};
  border: 1px solid
    ${(props) =>
      !props.isAvailable
        ? "#F7C52B"
        : (props2) => (props2.selected ? "#1AAE9E" : "#7B8B99")};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isAvailable ? "pointer" : "defalut")};
  margin: 9px 3.5px;
  font-size: 11px;
  line-height: 13px;
  color: #000;
`;
const Subtitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    line-height: 15px;
    color: #4e5a65;
  }
`;
