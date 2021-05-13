import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import QUERY from "./query";
import Table, { TableAppointments } from "./Table";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";

const Header = styled.div`
    position: fixed;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    top: 0;
    right: 0;
    left: 200px;
    height: 49px;
    padding-right: 20px;
    color: #999;
    background-color: #fff;
    width: calc(100% - 200px);
    box-shadow: 0 0.125rem 0.625rem rgb(90 97 105 / 12%);
  `,
  LeftMenu = styled.div`
    background-color: #fff;
    position: fixed;
    width: 200px;
    height: 100vh;
    box-shadow: 0 0.125rem 9.375rem rgb(90 97 105 / 10%),
      0 0.25rem 0.5rem rgb(90 97 105 / 12%),
      0 0.9375rem 1.375rem rgb(90 97 105 / 10%),
      0 0.4375rem 2.1875rem rgb(165 182 201 / 10%);
  `,
  LeftMenuHeader = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5a6169;
    font-weight: 500;
    height: 50px;
    border-bottom: 1px solid #e1e5eb;
    font-size: 25px;
    &:hover {
      text-decoration: none;
      color: #5a6169;
    }
  `,
  TableWrap = styled.div`
    z-index: 0;
    display: flex;
    flex: 1;
    padding-top: 75px;
    margin-left: 200px;
  `,
  Button = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: #3d5170;
    font-weight: 400;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "#fbfbfb" : "#fff")};
    color: ${(props) => (props.active ? "#007bff" : "#3d5170")};
    box-shadow: ${(props) =>
      props.active ? "inset 0.1875rem 0 0 #007bff" : null};
    &:hover {
      text-decoration: none;
      transition: 0.2s ease all;
      box-shadow: inset 0.1875rem 0 0 #007bff;
      background-color: #fbfbfb;
      color: #007bff;
    }
  `;

const App = () => {
  const type = { Master: "Master", Client: "Client" };

  const [clickedBtn, setClickedBtn] = useState(""),
    [DATA, setDATA] = useState([]);

  const loadUsers = (usersType) => {
    QUERY({
      query: `query {users (type: ${usersType}, first:${100}) { 
        data { 
          id type email
          profile {id city {id name} name email about_me}
          master_appointments {
            id
          }
          client_appointments {
            id 
          }
        } 
      }}`,
    })
      .then((res) => res.json())
      .then((data) => {
        setDATA(data.data.users.data);
      })
      .catch((err) => {
        alert("error");
      });
  };

  useEffect(() => {
    setClickedBtn("clients");
    loadUsers(type.Client);
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <LeftMenu>
            <LeftMenuHeader to={"/"}>Profma</LeftMenuHeader>
            <Button
              to={"/"}
              active={clickedBtn === "clients"}
              onClick={() => {
                setClickedBtn("clients");
                loadUsers(type.Client);
              }}
            >
              Клиенты
            </Button>
            <Button
              to={"/"}
              active={clickedBtn === "masters"}
              onClick={() => {
                setClickedBtn("masters");
                loadUsers(type.Master);
              }}
            >
              Мастера
            </Button>
          </LeftMenu>

          <Switch>
            <Route exact path="/">
              <TableWrap>
                <Table length={DATA.length} DATA={DATA} />
              </TableWrap>
            </Route>
            <Route path="/appointments/:id">
              <TableWrap>
                <TableAppointments length={DATA.length} DATA={DATA} />
              </TableWrap>
            </Route>
          </Switch>
          <Header>Админка PROFMA</Header>
        </div>
      </Router>
    </div>
  );
};

export default App;
