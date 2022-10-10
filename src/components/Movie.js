import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Movie({ mov }) {
  return (
    <BoxMovie>
      <Link to={`/filme/${mov.id}`}>
        <img src={mov.posterURL} alt={`Capa do filme ${mov.title}`} />
      </Link>
    </BoxMovie>
  );
}

const BoxMovie = styled.div`
  height: 209px;
  width: 145px;
  border-radius: 3px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 15px 15px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 129px;
    height: 193px;
    &:hover{
      opacity: 60%;
    }
  }
`;