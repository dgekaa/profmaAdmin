import "./App.css";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import QUERY from "./query";

const anim = keyframes`
   0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const Wrapper = styled.div`
    display: flex;
    margin: 0 auto;
    width: 1000px;
    font-family: sans-serif;
    border-radius: 5px;
  `,
  LeftMenu = styled.div`
    width: 150px;
    background-color: #eee;
    padding-right: 10px;
  `,
  Content = styled.div`
    display: flex;
    flex: 1;
    border-radius: 5px;
    background-color: #fff;
    flex-direction: column;
  `,
  Button = styled.div`
    display: flex;
    background-color: #fff;
    flex: 1;
    margin-bottom: 10px;
    padding: 10px 0;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    border-radius: 5px;
    background-color: ${(props) => (props.active ? "green" : "#fff")};
    color: ${(props) => (props.active ? "#fff" : "#000")};
    &:hover {
      background-color: green;
      color: #fff;
      transition: 0.2s ease all;
    }
  `,
  Loader = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    color: green;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  `,
  Load = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  `,
  LoadBlockFirst = styled.div`
    position: absolute;
    border: 4px solid green;
    opacity: 1;
    border-radius: 50%;
    animation: ${anim} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  `,
  LoadBlockSecond = styled.div`
    position: absolute;
    border: 4px solid green;
    opacity: 1;
    border-radius: 50%;
    animation: ${anim} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    animation-delay: -0.5s;
  `,
  Table = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.01);
    }
  `,
  TableHeader = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    border-bottom: 2px solid #000;
  `,
  Row = styled.div`
    flex: 1;
    padding: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  RowHeader = styled.div`
    flex: 1;
    font-weight: bold;
    padding: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  ShowAppointments = styled.div`
    position: relative;
    bottom: 3px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    padding: 3px;
    width: 50px;
    background-color: green;
    &:hover {
      background-color: #24b424;
      transition: 0.1s ease background-color;
    }
  `,
  Modal = styled.div`
    flex-direction: column;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    max-height: 100%;
    min-height: 100%;
    overflow-y: auto;
  `,
  AppointmentsWrapHeader = styled.div`
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    font-weight: bold;
    margin-top: 50px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.625);
    padding: 10px;
  `,
  AppointmentsWrap = styled.div`
    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.03);
    }
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    padding: 10px;
  `,
  AppointmentsRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `,
  AppointmentsRowServices = styled.div`
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  OfferFirst = styled.span`
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
    text-overflow: ellipsis;
    flex-direction: row;
  `,
  Offer = styled.span`
    width: 90px;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
    text-overflow: ellipsis;
    flex-direction: row;
  `,
  CloseBtn = styled.div`
    line-height: 26px;
    border-radius: 5px;
    padding: 5px 5px 7px 5px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.625);
    position: fixed;
    cursor: pointer;
    display: flex;
    color: #000;
    top: 20px;
    right: 20px;
    font-size: 26px;
    &:hover {
      border: 1px solid red;
      color: red;
      transition: 0.1s ease all;
    }
  `,
  UserData = styled.span`
    font-weight: bold;
    margin-right: 15px;
  `;

const App = () => {
  const type = { Master: "Master", Client: "Client" };
  const [clickedBtn, setClickedBtn] = useState(""),
    [DATA, setDATA] = useState(null),
    [isLoading, setIsLoading] = useState(false),
    [showAppointment, setShowAppointment] = useState(""),
    [selectedUser, setSelectedUser] = useState("");

  const loadUsers = (usersType) => {
    setIsLoading(true);
    QUERY({
      query: `query {users (type: ${usersType}, first:${100}) { 
        data { 
          id type
          profile {id city {id name} name email about_me}
          master_appointments {
            id date time status
            offers {
              description price_by_pack {duration price}
              service {id name specialization {id name} photos {src}}
            }
            client {
              profile {
                name email
              }
            }
          }
          client_appointments {
            id date time status
            offers {
              description price_by_pack {duration price}
              service {id name specialization {id name} photos {src}}
            }
            master {
              profile {
                name email
              }
            }
          }
        } 
      }}`,
    })
      .then((res) => res.json())
      .then((data) => {
        setDATA(data.data.users.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("error");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setClickedBtn("clients");
    loadUsers(type.Client);
  }, []);

  useEffect(() => {
    showAppointment
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showAppointment]);

  useEffect(() => {
    console.log(DATA, "-data");
  }, [DATA]);

  return (
    <div className="App">
      <Wrapper>
        <LeftMenu>
          <Button
            onClick={() => {
              setClickedBtn("clients");
              loadUsers(type.Client);
            }}
            active={clickedBtn === "clients"}
          >
            Клиенты {DATA[0].type === "Client" && `(${DATA.length})`}
          </Button>
          <Button
            onClick={() => {
              setClickedBtn("masters");
              loadUsers(type.Master);
            }}
            active={clickedBtn === "masters"}
          >
            Мастера {DATA[0].type === "Master" && `(${DATA.length})`}
          </Button>
        </LeftMenu>
        <Content>
          {DATA && DATA.length && (
            <TableHeader>
              <RowHeader>Id</RowHeader>
              <RowHeader>Имя</RowHeader>
              <RowHeader>Обо мне</RowHeader>
              <RowHeader>Email</RowHeader>
              <RowHeader>Город</RowHeader>
              <RowHeader>Записи</RowHeader>
            </TableHeader>
          )}
          {DATA &&
            DATA.length &&
            DATA.map((el, index) => (
              <Table>
                <Row>{el.id}</Row>
                <Row>
                  {el.profile ? (el.profile.name ? el.profile.name : "-") : "-"}
                </Row>
                <Row>
                  {el.profile
                    ? el.profile.about_me
                      ? el.profile.about_me
                      : "-"
                    : "-"}
                </Row>
                <Row>
                  {el.profile
                    ? el.profile.email
                      ? el.profile.email
                      : "-"
                    : "-"}
                </Row>
                <Row>
                  {el.profile
                    ? el.profile.city
                      ? el.profile.city.name
                      : "-"
                    : "-"}
                </Row>
                <Row>
                  {el.client_appointments.length !== 0 ||
                  el.master_appointments.length !== 0 ? (
                    <ShowAppointments
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setSelectedUser(el);
                        setShowAppointment(
                          el.client_appointments.length !== 0
                            ? el.client_appointments
                            : el.master_appointments
                        );
                      }}
                    >
                      {el.client_appointments.length ||
                        el.master_appointments.length}
                    </ShowAppointments>
                  ) : (
                    "-"
                  )}
                </Row>
              </Table>
            ))}
        </Content>

        {showAppointment && (
          <Modal>
            <CloseBtn onClick={() => setShowAppointment(null)}>
              закрыть
            </CloseBtn>
            <div>
              <UserData> UserId: {selectedUser.id}</UserData>
              <UserData>
                Name: {selectedUser.profile ? selectedUser.profile.name : "-"}
              </UserData>
              <UserData>
                Email: {selectedUser.profile ? selectedUser.profile.email : "-"}
              </UserData>
            </div>
            <AppointmentsWrapHeader>
              <AppointmentsRow>Id </AppointmentsRow>
              <AppointmentsRow> Дата </AppointmentsRow>
              <AppointmentsRow> Время </AppointmentsRow>
              <AppointmentsRow> Статус </AppointmentsRow>
              <AppointmentsRowServices> Услуги </AppointmentsRowServices>
            </AppointmentsWrapHeader>
            {showAppointment.map((el, index) => {
              console.log(el, "---el");
              return (
                <AppointmentsWrap>
                  <AppointmentsRow> {el.id} </AppointmentsRow>
                  <AppointmentsRow> {el.date} </AppointmentsRow>
                  <AppointmentsRow> {el.time} </AppointmentsRow>
                  <AppointmentsRow> {el.status} </AppointmentsRow>
                  <AppointmentsRowServices>
                    <div style={{ flexDirection: "row" }}>
                      {el.offers.length
                        ? el.offers.map((el, i) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "5px",
                              }}
                            >
                              <OfferFirst>{el.service.name}</OfferFirst>
                              <Offer>{el.price_by_pack.duration} мин.</Offer>
                              <Offer>{el.price_by_pack.price} руб.</Offer>
                            </div>
                          ))
                        : "-"}
                    </div>
                  </AppointmentsRowServices>
                </AppointmentsWrap>
              );
            })}
          </Modal>
        )}

        {isLoading && (
          <Loader>
            <Load>
              <LoadBlockFirst />
              <LoadBlockSecond />
            </Load>
          </Loader>
        )}
      </Wrapper>
    </div>
  );
};

export default App;
