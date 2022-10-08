import styled from "styled-components";

export default function SucessPage({ section, reservation: {compradores} }) {
    console.log(compradores)
    console.log(section)




  return (
  <Container>
    <h3>Pedido feito com sucesso!</h3>  
  </Container>);
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
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #247a6b;
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
