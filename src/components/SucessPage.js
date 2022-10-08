import { useNavigate } from "react-router-dom/dist";
import styled from "styled-components";

export default function SucessPage({ section, reservation: { compradores}, seatsSelected }) {
  const navigate = useNavigate();

  console.log(compradores);
  console.log(section);
  const {
    movie: { title },
    day: { date },
    name: hour,
  } = section;

  return (
    <Container>
      <h4>Pedido feito com sucesso!</h4>
      <BoxInfo>
        <h3>Filme e sessão:</h3>
        <span>{title}</span>
        <span>
          {date} - {hour}
        </span>
      </BoxInfo>
      <BoxInfo>
        <h3>Ingressos:</h3>
        {seatsSelected.map((a) => <span>Assento - {a.name} </span> )}
      </BoxInfo>

      <BoxInfo>
        <h3>Compradores:</h3>

        {compradores.map((c, i) => (
            <Buyer>
                <span>Assento: {seatsSelected[i].name}</span>
                <span>Nome: {c.nome}</span>
                <span>CPF: {c.cpf}</span>
            </Buyer>
        ))}

      </BoxInfo>
      <HomeButton onClick={() => navigate("/") } >Voltar para Home</HomeButton>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  min-height: 100vh;
  margin: 0 15px;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 50px;
  h4,
  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #247a6b;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    height: auto;
    color: #293845;
    margin-bottom: 10px;
  }
  span {
    font-size: 18px;
    line-height: 21px;
    color: #293845;
  }
`;
const BoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-bottom: 30px;
`;
const Buyer = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    span {
    font-size: 18px;
    line-height: 21px;
    color: #293845;
  }
`;
const HomeButton = styled.button`
  width: 225px;
  height: 42px;
  margin: 0 auto;
  background: #e8833a;
  border-radius: 3px;
  border: 1px solid #e86c14;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 60%;
  }
`;
