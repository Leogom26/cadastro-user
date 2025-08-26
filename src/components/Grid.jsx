import { Table, Thead, Tr, Th, Tbody, Td } from "../styles/style.js";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Grid = ({ users, setUser, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUser(newArray);
      toast.success(data);
    } catch (err) {
      toast.error("Erro ao deletar usuário");
      console.log(err);
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th $onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" $onlyWeb>
              {item.fone}
            </Td>
            <Td width="5%" $alignCenter>
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td width="5%" $alignCenter>
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
