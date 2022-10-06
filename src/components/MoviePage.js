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

export default function MoviePage({ props }) {
  const [movie, setMovie] = useState({});
  const { filmeId } = useParams();
  const [error, setError] = useState(null);

  console.log("mov", movie.length);
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`
    );

    promise.then((res) => {
      console.log(res);
      setMovie(res.data);
      console.log("movie", isEmpty(res));
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
  padding: 0 24px;
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
    &:hover, &:focus{
        opacity: 60%;
    }
  }
`;
