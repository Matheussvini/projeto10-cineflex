import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import alfabeto from "./alfabeto";
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
  const [form, setForm] = useState({
    ids: [],
    compradores: [],
  });
  const navigate = useNavigate();
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

  function avaliaOnclick(element) {
    for (let i = 0; i < seatsSelected.length; i++) {
      if (seatsSelected[i].id === element.id) {
        if (seatsSelected.length === 1) {
          setEnableReservation(false);
        } else {
          setEnableReservation(true);
        }
        return setSeatsSelected(
          seatsSelected.filter((item) => item.id !== element.id)
        );
      }
    }
    setSeatsSelected([
      ...seatsSelected,
      { id: element.id, name: element.name },
    ]);
    setEnableReservation(true);
  }

  function handleForm(e) {
    const { name, value, id } = e.target; //name = campo do input (nome ou cpf), value = valor correspondente ao input

    if (name === "nome") {
      if (value !== "") {
        for (let i = 0; i < value.length; i++) {
          if (!alfabeto.includes(value[i])) {
            alert("Nome inválido, digite somente letras");
          }
        }
      }
    }
    if (name === "cpf") {
      if (value !== "") {
        for (let i = 0; i < value.length; i++) {
          if (alfabeto.includes(value[i])) {
            alert("CPF inválido, digite somente números");
          }
        }
      }
    }
    // lista de ids
    const aa = form.ids.find((item) => item === id); // retorna o numero do id
    if (aa === undefined) {
      setForm({
        ids: [...form.ids, id],
        compradores: [...form.compradores, { idAssento: id, [name]: value }],
      });
    } else {
      // compradores
      const bb = form.compradores.find((item) => item.idAssento === id); // retorna {id: XX, name: YY, cpf: ZZ}

      if (name === "nome") {
        const i = form.compradores.indexOf(bb);
        let newArray = form.compradores;
        newArray[i].nome = value;
        setForm({
          ...form,
          compradores: newArray,
        });
      } else {
        const i = form.compradores.indexOf(bb);
        let newArray = form.compradores;
        newArray[i].cpf = value;
        setForm({
          ...form,
          compradores: newArray,
        });
      }
    }
  }

  function bookSeats(e) {
    e.preventDefault();
    const URL =
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

    const promise = axios.post(URL, form);

    promise.then((res) => {
      setReservation(form);
      navigate("/sucesso");
    });

    promise.catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
    <Container>
      <BackArrow way={`/filme/${section.movie.id}`} />
      <h3>Selecione o(s) assento(s)</h3>
      <SeatsBox>
        {section.seats.map((s) => (
          <Seat
            isAvailable={s.isAvailable}
            seatsSelected={seatsSelected}
            seatId={s.id}
            onClick={() => avaliaOnclick(s)}
            disabled={!s.isAvailable}
            key={s.id}
          >
            {s.name}
          </Seat>
        ))}
      </SeatsBox>
      <Subtitle>
        <div>
          <SubSeat color={"green"} />
          <span>Selecionado</span>
        </div>
        <div>
          <SubSeat color={"gray"} />
          <span>Disponível</span>
        </div>
        <div>
          <SubSeat color={"yellow"} />
          <span>Indisponível</span>
        </div>
      </Subtitle>
      <form onSubmit={bookSeats}>
        {seatsSelected.map((a) => (
          <Formulario key={a.id} id={a.id}>
            <label htmlFor="nome">
              Nome do comprador <span>- poltrona {a.name}:</span>
            </label>
            <input
              name="nome"
              id={a.id}
              type="text"
              placeholder="Digite seu nome..."
              onChange={handleForm}
              required
              minLength="3"
            />
            <label htmlFor="cpf">
              CPF do comprador <span>- poltrona {a.name}:</span>
            </label>
            <input
              name="cpf"
              id={a.id}
              type="text"
              placeholder="Digite seu CPF..."
              onChange={handleForm}
              required
              maxLength="11"
              minLength="11"
            />
          </Formulario>
        ))}
        <ReservButton enable={enableReservation} type="submit">
          Reservar assento(s)
        </ReservButton>
      </form>
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
      : props?.seatsSelected.find((item) => item?.id === props.seatId)
      ? "#8DD7CF"
      : "#C3CFD9"};
  border: 1px solid
    ${(props) =>
      !props.isAvailable
        ? "#F7C52B"
        : props?.seatsSelected.find((item) => item?.id === props.seatId)
        ? "#45BDB0"
        : "#808F9D"};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isAvailable ? "pointer" : "defalut")};
  margin: 9px 3.5px;
  font-size: 11px;
  line-height: 13px;
  color: #000;
  &:hover {
    opacity: ${(props) => props.isAvailable && "60%"};
    transform: ${(props) => props.isAvailable && "translateY(-5px)"};
    box-shadow: ${(props) =>
      props.isAvailable && "-4px 4px 4px rgba(0, 0, 0, 0.25)"};
  }
`;
const Subtitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 42px;
  width: 100%;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    line-height: 15px;
    color: #4e5a65;
  }
`;
const SubSeat = styled(Seat)`
  background-color: ${(props) =>
    props.color === "yellow"
      ? "#FBE192"
      : props?.color === "green"
      ? "#8DD7CF"
      : "#C3CFD9"};
  border: 1px solid
    ${(props) =>
      props.color === "yellow"
        ? "#F7C52B"
        : props?.color === "green"
        ? "#45BDB0"
        : "#808F9D"};
`;
const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 21px;
  color: #293845;
  margin-bottom: 20px;
  span {
    font-size: 14px;
    line-height: 16px;
    color: #afafaf;
  }
  input {
    width: 327px;
    height: 51px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    margin-bottom: 7px;
    font-size: 18px;
    line-height: 21px;
    color: #000;
    &::placeholder {
      font-style: italic;
      font-size: 18px;
      line-height: 21px;
      color: #afafaf;
    }
  }
`;
const ReservButton = styled.button`
  width: 225px;
  height: 42px;
  margin: 0 auto;
  background: #e8833a;
  border-radius: 3px;
  border: 1px solid #e86c14;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
  display: ${(props) => (props.enable ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 60%;
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
