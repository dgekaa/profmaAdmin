import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import QUERY from "./query";

const Line = styled.div`
    cursor: pointer;
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 10px;
    &:hover {
      background: rgba(111, 111, 111, 0.05);
      transition: 0.3s ease background;
    }
    @media (max-width: 760px) {
    }
  `,
  Area = styled.span`
    display: flex;
    padding: 0 10px;
    width: 100px;
    justify-content: center;
    @media (max-width: 760px) {
    }
  `,
  AppointmentsWrap = styled.div`
    padding: 5px;
    display: flex;
    width: 100%;
    flex-direction: column;
    background: rgba(32, 234, 77, 0.4);
    @media (max-width: 760px) {
    }
  `,
  Appointments = styled.div`
    background: #fff;
    padding: 5px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    padding: 0;
    @media (max-width: 760px) {
    }
  `,
  Appointment = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${({ width }) => (width ? width + "px" : "100px")};
    color: ${({ color }) => (color ? color : "")};
    @media (max-width: 760px) {
    }
  `,
  Offers = styled.div`
    width: 100px;
    @media (max-width: 760px) {
    }
  `,
  OfferWrap = styled.div`
    margin: 5px 0;
    @media (max-width: 760px) {
    }
  `,
  Offer = styled.p`
    width: 120px;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 760px) {
    }
  `;

const App = () => {
  const type = { Master: "Master", Client: "Client" };

  const [masters, setMasters] = useState(""),
    [clients, setClients] = useState(""),
    [clientsLoading, setClientsLoading] = useState(true),
    [mastersLoading, setMastersLoading] = useState(true);

  const loadUsers = (usersType) => {
    usersType === "Master" ? setMastersLoading(true) : setClientsLoading(true);
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
        usersType === "Master"
          ? setMastersLoading(false)
          : setClientsLoading(false);

        usersType === "Master"
          ? setMasters(data.data.users.data)
          : setClients(data.data.users.data);
      })
      .catch((err) => {
        usersType === "Master"
          ? setMastersLoading(false)
          : setClientsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    loadUsers(type.Client);
    loadUsers(type.Master);
  }, []);

  useEffect(() => {
    console.log(masters, "-----masters");
    console.log(clients, "-----clients");
  }, [masters, clients]);

  return (
    <div className="App">
      <h1>PROFMA</h1>
      <h2>Мастера</h2>
      {mastersLoading && <div>Идет загрузка данных...</div>}
      {masters &&
        masters.length &&
        masters.map((el, i) => (
          <div>
            <Line
              onClick={(e) => {
                if (el.master_appointments.length) {
                  e.currentTarget.nextElementSibling.style.display === "flex"
                    ? (e.currentTarget.nextElementSibling.style.display =
                        "none")
                    : (e.currentTarget.nextElementSibling.style.display =
                        "flex");
                }
              }}
            >
              {el.master_appointments.length ? "!" : ""}
              <Area>{el.id || "-"}</Area>
              <Area>{el.profile.name || "-"}</Area>
              <Area>{el.profile.about_me || "-"}</Area>
              <Area>{el.profile.email || "-"}</Area>
              <Area>{el.profile.city ? el.profile.city.name : "-"}</Area>
            </Line>
            <div style={{ display: "none" }}>
              {el.master_appointments.length && (
                <AppointmentsWrap>
                  {el.master_appointments.map((appointment, i) => (
                    <Appointments>
                      <Appointment width={30} color={"red"}>
                        {appointment.id}
                      </Appointment>
                      <Appointment>
                        {appointment.client.profile.name}
                      </Appointment>
                      <Appointment>
                        {appointment.client.profile.email || "-"}
                      </Appointment>
                      <Appointment>{appointment.status}</Appointment>
                      <Appointment>{appointment.date}</Appointment>
                      <Appointment>{appointment.time}</Appointment>
                      <Offers>
                        {appointment.offers.length &&
                          appointment.offers.map((offer, i) => (
                            <OfferWrap>
                              <Offer>{offer.service.name}</Offer>
                              <Offer>
                                {offer.price_by_pack.price} руб.
                                {offer.price_by_pack.duration} мин.
                              </Offer>
                            </OfferWrap>
                          ))}
                      </Offers>
                    </Appointments>
                  ))}
                </AppointmentsWrap>
              )}
            </div>
          </div>
        ))}

      <h2>Клиенты</h2>
      {clientsLoading && <div>Идет загрузка данных...</div>}
      {clients &&
        clients.length &&
        clients.map((el, i) => (
          <div>
            <Line
              onClick={(e) => {
                if (el.client_appointments.length) {
                  e.currentTarget.nextElementSibling.style.display === "flex"
                    ? (e.currentTarget.nextElementSibling.style.display =
                        "none")
                    : (e.currentTarget.nextElementSibling.style.display =
                        "flex");
                }
              }}
            >
              {el.client_appointments.length ? "!" : ""}
              <Area>{el.id || "-"}</Area>
              <Area>{el.profile ? el.profile.name : "-"}</Area>
              <Area>{el.profile ? el.profile.about_me : "-"}</Area>
              <Area>{el.profile ? el.profile.email : "-"}</Area>
              <Area>
                {el.profile
                  ? el.profile.city
                    ? el.profile.city.name
                    : "-"
                  : "-"}
              </Area>
            </Line>
            <div style={{ display: "none" }}>
              {el.client_appointments.length && (
                <AppointmentsWrap>
                  {el.client_appointments.map((appointment, i) => (
                    <Appointments>
                      <Appointment width={30} color={"red"}>
                        {appointment.id}
                      </Appointment>
                      <Appointment>
                        {appointment.master.profile
                          ? appointment.master.profile.name
                          : "-"}
                      </Appointment>
                      <Appointment>
                        {appointment.master.profile
                          ? appointment.master.profile.email
                          : "-"}
                      </Appointment>
                      <Appointment>{appointment.status}</Appointment>
                      <Appointment>{appointment.date}</Appointment>
                      <Appointment>{appointment.time}</Appointment>
                      <Offers>
                        {appointment.offers.length &&
                          appointment.offers.map((offer, i) => (
                            <OfferWrap>
                              <Offer>{offer.service.name}</Offer>
                              <Offer>
                                {offer.price_by_pack.price} руб.
                                {offer.price_by_pack.duration} мин.
                              </Offer>
                            </OfferWrap>
                          ))}
                      </Offers>
                    </Appointments>
                  ))}
                </AppointmentsWrap>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
