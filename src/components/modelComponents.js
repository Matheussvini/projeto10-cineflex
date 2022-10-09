import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import spin from '../images/spinner.gif'

export default function BackArrow({ way }) {
  const navigate = useNavigate();
  console.log(way)
  return (
    <Arrow onClick={() => navigate(way)}>
      <ion-icon name="arrow-back-circle-sharp"></ion-icon>
      <Abc />
      <span>voltar</span>
    </Arrow>
  );
}

export function Spinner(){
  return <SpinnerImg src={spin} alt="Gif carregando página" />
}


const SpinnerImg = styled.img`
  width: 390px;
`
const Arrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4e5b60;
  font-size: 40px;
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translate(-180px, 0);
  cursor: pointer;
  span {
    font-size: 12px;
    font-weight: 700;
    color: #e8833a;
  }
`;
const Abc = styled.div`
  position: absolute;
  background-color: #e8833a;
  border-radius: 100px;
  height: 30px;
  width: 30px;
  top: 5px;
  z-index: -1;
`;

