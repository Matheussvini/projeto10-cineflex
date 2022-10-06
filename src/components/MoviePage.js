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

export default function MoviePage() {
  const [movie, setMovie] = useState({});
  const { filmeId } = useParams();
  const [error, setError] = useState(null);

  console.log("filme vazio?", isEmpty(movie));
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`
    );

    promise.then((res) => {
      console.log(res);
      setMovie(res.data);
      console.log("res está vazia?", isEmpty(res));
      setError(null);
    });

    promise.catch((err) => {
      console.log("Este é o erro", err);

      setError(err.message);
    });
  }, []);

  if (error !== null) {
    return <div>Erro {error}! Tente de novo</div>;
  }

  if (error === null && isEmpty(movie) === true) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      {console.log(movie)}
      {console.log(movie.days)}
      <h3>Selecione um horário</h3>
      {movie.days.map((d) => (
        <>
          {console.log(d)}
          <h4>
            {d.weekday} - {d.date}
          </h4>
          <Schedules>
            {d.showtimes.map((h) => (
              <Link to={`/sessao/${h.id}`}>
                <button>{h.name}</button>
              </Link>
            ))}
          </Schedules>
        </>
      ))}
      <Footer>
        <BoxMovie>
          <img src={movie.posterURL} alt={`Capa do filme ${movie.title}`} />
        </BoxMovie>
        <h1>{movie.title}</h1>
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
  margin: 0 15px;
  box-sizing: border-box;
  padding: 0 24px 50px 24px;
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
const Schedules = styled.div`
  display: flex;
  // justify-content: start;
  align-items: flex-end;
  button {
    margin: 22.5px 8px 22.5px 0;
    width: 83px;
    height: 43px;
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
