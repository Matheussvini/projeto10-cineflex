import styled from "styled-components";

export default function Seats({
  section,
  seatsSelected,
  setSeatsSelected,
  setEnableReservation,
  form,
  setForm,
}) {
  function avaliaOnclick(element) {
    if(!element.isAvailable){
      return alert("Esse assento não está disponível, por favor selecione outro.")
    }
    for (let i = 0; i < seatsSelected.length; i++) {
      if (seatsSelected[i].id === element.id) {
        if (seatsSelected.length === 1) {
          setEnableReservation(false);
        } else {
          setEnableReservation(true);
        }
        const obj = form.compradores.find(
          (item) => Number(item.idAssento) === element.id
        );
        if (obj !== undefined) {
          if (obj.nome === "" || obj.cpf === "") {
            return setSeatsSelected(
              seatsSelected.filter((item) => item.id !== element.id)
            );
          } else {
            const confirmation = window.confirm(
              `Deseja realmente remover o assento ${element.name} e perder os dados inseridos?`
            );
            confirmation &&
              setSeatsSelected(
                seatsSelected.filter((item) => item.id !== element.id)
              );
              const newCompradores = form.compradores.filter((item) => Number(item.idAssento) !== element.id )
              const newIds = form.ids.filter((item) => Number(item) !== element.id )
              setForm({ids: newIds, compradores: newCompradores});
            return;
          }
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


  console.log(seatsSelected)
  console.log(form)
  return (
    <>
      <SeatsBox>
        {section.seats.map((s) => (
          <Seat
            isAvailable={s.isAvailable}
            seatsSelected={seatsSelected}
            seatId={s.id}
            onClick={() => avaliaOnclick(s)}
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
    </>
  );
}

const SeatsBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 830px;
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
