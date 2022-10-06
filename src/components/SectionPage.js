import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import alfabeto from "./alfabeto";

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
  const [nameUser, setNameUser] = useState(undefined);
  const [cpfUser, setCpfUser] = useState("");

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

  function name(e) {
    const value = e.target.value;
  }

  function cpf(e) {
    const value = e.target.value;

    let cpfUpdated;
    if (value !== "") {
      for (let i = 0; i < value.length; i++) {
        if (alfabeto.includes(value[i])) {
          return setCpfUser(""), alert("CPF inválido");
        }
      }
      cpfUpdated = value.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        function (regex, argumento1, argumento2, argumento3, argumento4) {
          return (
            argumento1 + "." + argumento2 + "." + argumento3 + "-" + argumento4
          );
        }
      );
      setCpfUser(cpfUpdated);
      let regex = /\d/g;
      let cpfOnlyNumber = cpfUpdated.match(regex).join("");
      console.log("filtro", cpfOnlyNumber);

      let cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
      if (
        cpfValido.test(cpfUpdated) == false &&
        (cpfUpdated.length === 14 ||
          cpfOnlyNumber.length === 11 ||
          cpfOnlyNumber.length === 0)
      ) {
        alert("CPF invalido");
        setCpfUser("");
      }
    }
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
      <Formulario>
        <h4>Nome do comprador:</h4>
        <input
          type="text"
          placeholder="Digite seu nome..."
          onChange={(e) => name(e)}
          value={nameUser}
        />
        <h4>CPF do comprador:</h4>
        <input
          type="text"
          placeholder="Digite seu CPF..."
          onChange={(e) => cpf(e)}
          value={cpfUser}
          maxLength="14"
          pattern="[0-9]"
        />
      </Formulario>

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
  width: 100%;
  max-width: 390px;
  height: 100vh;
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
    font-size: 18px;
    line-height: 21px;
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
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  //width: 100%;
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
  //margin: 0 15px 15px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 14px;

  img {
    width: 48px;
    height: 72px;
  }
`;
const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aquamarine;
`;
