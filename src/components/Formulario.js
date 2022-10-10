import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import alfabeto from "./alfabeto";
import algarismos from "./algarismos";

export default function Formulario({
  seatsSelected,
  enableReservation,
  setReservation,
  form,
  setForm,
}) {
  const navigate = useNavigate();

  function bookSeats(e) {
    e.preventDefault();

    for (let i = 0; i < form.compradores.length; i++) {
      const comprador = form.compradores[i];

      //validação nome:
      for (let x = 0; x < comprador.nome.length; x++) {
        if (!alfabeto.includes(comprador.nome[x].toLowerCase())) {
          return alert("Nome inválido, digite somente letras");
        }
      }

      //validação cpf:
      for (let y = 0; y < comprador.cpf.length; y++) {
        if (!algarismos.includes(Number(comprador.cpf[y]))) {
          console.log(comprador.cpf[y]);
          return alert("CPF inválido, digite somente números");
        }
      }
    }

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

  function handleForm(e) {
    const { name, value, id } = e.target; //name = campo do input (nome ou cpf), value = valor correspondente ao input

    if (name === "nome") {
      if (value !== "") {
        const newValue = value.toLowerCase();
        for (let i = 0; i < newValue.length; i++) {
          if (!alfabeto.includes(newValue[i])) {
            alert("Nome inválido, digite somente letras");
          }
        }
      }
    }
    if (name === "cpf") {
      if (value !== "") {
        for (let i = 0; i < value.length; i++) {
          if (!algarismos.includes(Number(value[i]))) {
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

  return (
    <form onSubmit={bookSeats}>
      {seatsSelected.map((a, i) => (
        <FormBox key={i} id={a.id}>
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
            placeholder="Digite seu CPF... (somente números)"
            onChange={handleForm}
            required
            maxLength="11"
            minLength="11"
          />
        </FormBox>
      ))}
      <ReservButton enable={enableReservation} type="submit">
        Reservar assento(s)
      </ReservButton>
    </form>
  );
}

const FormBox = styled.div`
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
