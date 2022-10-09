import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BackArrow, { Spinner } from "./modelComponents";
import Movie from "./Movie";

export default function MoviesListPage({ setRemoveNavBar }) {
  setRemoveNavBar(false);
  const [movies, setMovies] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";
    const promise = axios.get(URL);

    promise.then((res) => {
      setMovies(res.data);
      setError(null);
    });

    promise.catch((err) => {
      setError(err.message);
    });
  }, []);

  if (error !== null) {
    return <div>Erro {error}! Tente de novo</div>;
  }

  if (error === null && movies === undefined) {
    return <Spinner />;
  }

  return (
    <Container>
      <BackArrow way="/" />
      <h3>Selecione o filme</h3>
      <MoviesContainer>
        {movies.map((mov) => (
          <Movie key={mov.id} mov={mov} />
        ))}
      </MoviesContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  h3 {
    font-size: 24px;
    line-height: 28px;
    color: #293845;
    height: 110px;
    display: flex;
    align-items: center;
  }
`;
const MoviesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 15px;
`;
