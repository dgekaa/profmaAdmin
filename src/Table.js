import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import QUERY from "./query";

const Button = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    color: #3d5170;
    font-weight: 400;
    cursor: pointer;
    color: #3d5170;
    &:hover {
      text-decoration: none;
      background-color: #fbfbfb;
      color: #007bff;
    }
  `,
  HeaderTable = styled.div`
    display: flex;
    font-size: 14px;
    flex-direction: row;
  `,
  TableTopText = styled.div`
    margin-right: 20px;
    color: #000;
    font-weight: 700;
  `,
  TrInner = styled.div`
    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.03);
    }
    display: flex;
    font-size: 14px;
    flex-direction: row;
  `;

const Tables = ({ length, DATA }) => {
  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col>
          <Card
            small
            className="mb-4"
            style={{ boxShadow: "0 0 10px 1px rgba(0,0,0,0.2)" }}
          >
            <CardHeader className="border-bottom">
              <h6 className="m-0" style={{ fontWeight: 700, fontSize: "25px" }}>
                {DATA && DATA.length
                  ? DATA[0].type === "Master"
                    ? "Таблица мастеров"
                    : "Таблица клиентов"
                  : "..."}{" "}
                {length ? "(" + length + ")" : null}
              </h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Id
                    </th>
                    <th scope="col" className="border-0">
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      About me
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      City
                    </th>
                    <th scope="col" className="border-0">
                      Appointments
                    </th>
                  </tr>
                </thead>
                {DATA && !!DATA.length && (
                  <tbody>
                    {DATA.map((el, index) => (
                      <tr key={index}>
                        <td>{el.id}</td>
                        <td>
                          {el.profile
                            ? el.profile.name
                              ? el.profile.name
                              : "-"
                            : "-"}
                        </td>
                        <td>
                          {el.profile
                            ? el.profile.about_me
                              ? el.profile.about_me
                              : "-"
                            : "-"}
                        </td>
                        <td>{el.email}</td>
                        <td>
                          {el.profile
                            ? el.profile.city
                              ? el.profile.city.name
                              : "-"
                            : "-"}
                        </td>
                        <td>
                          <Button
                            to={`/appointments/${el.id}`}
                            params={{ testvalue: "hello" }}
                          >
                            {el.client_appointments.length !== 0 ||
                            el.master_appointments.length !== 0
                              ? el.client_appointments.length ||
                                el.master_appointments.length
                              : "-"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const TableAppointments = (props) => {
  const { id } = useParams();

  const [USER, setUser] = useState([]),
    [email, setEmail] = useState("");

  const loadUser = () => {
    QUERY({
      query: `query {user (id: ${id}) { 
          id type email
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
       
      }}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.user.client_appointments.length) {
          setUser(data.data.user.client_appointments);
        }
        if (data.data.user.master_appointments.length) {
          setUser(data.data.user.master_appointments);
        }
        setEmail(data.data.user.email);
      })
      .catch((err) => {
        alert("error");
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col>
          <Card
            small
            className="mb-4"
            style={{ boxShadow: "0 0 10px 1px rgba(0,0,0,0.2)" }}
          >
            <CardHeader
              className="border-bottom"
              style={{ fontWeight: 700, fontSize: "25px" }}
            >
              Appointments {email}
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Id
                    </th>
                    <th scope="col" className="border-0">
                      Master/client
                    </th>
                    <th scope="col" className="border-0">
                      Date
                    </th>
                    <th scope="col" className="border-0">
                      Time
                    </th>
                    <th scope="col" className="border-0">
                      Status
                    </th>
                    <th scope="col" className="border-0">
                      Offers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!!USER.length &&
                    USER.map((el, index) => (
                      <tr key={index}>
                        <td>{el.id}</td>
                        <td>
                          {el.client
                            ? el.client.profile
                              ? el.client.profile.name
                              : "-"
                            : el.master.profile
                            ? el.master.profile.name
                            : "-"}
                        </td>
                        <td>{el.date}</td>
                        <td>{el.time.slice(0, 5)}</td>
                        <td>{el.status}</td>
                        <td>
                          {el.offers.length
                            ? el.offers.map((el, i) => (
                                <TrInner>
                                  <td scope="col" className="border-0">
                                    {el.service.name}
                                  </td>
                                  <td scope="col" className="border-0">
                                    {el.price_by_pack.duration} мин.
                                  </td>
                                  <td scope="col" className="border-0">
                                    {el.price_by_pack.price} руб.
                                  </td>
                                </TrInner>
                              ))
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Tables;
