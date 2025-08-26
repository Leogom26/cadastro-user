// import GlobalStyle from "./styles/global.js";
import GlobalStyle from "./GlobalStyles";
import { Container, Title } from "./styles/style.js";
import Form from "./components/Form.jsx";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "./components/Grid.jsx";

function App() {
  const [users, setUser] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUser(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUser]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Usuarios</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUser={setUser} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer
        autoClose={3000}
        position="bottom-left"
        transition={Slide}
      />
    </>
  );
}

export default App;
