import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

import InputText from '../../../components/InputText';
import Paginate from '../../../components/Paginate';

import api from '../../../services/api';

interface User {
  id: number;
  cpf: string;
  name: string;
  email: string;
  blocked: boolean;
  enabled: boolean;
  type: string;
}

const List: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const response = await api.get('/users', {
        params: {
          filter,
          page,
        },
      });

      const { data, pages, current } = response.data;

      setUsers(data);
      setPages(pages);
      setPage(current);
    };

    loadUsers();
  }, [filter, page]);

  return (
    <Box
      flex={1}
      marginLeft={8}
      padding={8}
      borderRadius={4}
      backgroundColor="white"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="lg" fontWeight="medium">
            Usuários
          </Heading>
          <Text marginTop={1} color="gray.400">
            Listagem completa de usuários
          </Text>
        </Box>

        <Button size="md" leftIcon={<FaPlus size={16} />}>
          Criar novo
        </Button>
      </Flex>

      <Flex marginTop={4}>
        <InputText
          name="nome"
          placeholder="Pesquise por nome ou cpf"
          onChange={(event) => setFilter(event.target.value)}
        />
      </Flex>

      <Table marginTop={4}>
        <Thead>
          <Th>NOME</Th>
          <Th>CPF</Th>
          <Th textAlign="center">STATUS</Th>
          <Th textAlign="center">HABILITADO</Th>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Box>
                  <Text fontWeight="medium" fontSize="sm">
                    {user.name}
                  </Text>
                  <Text color="gray.500" fontSize="small">
                    {user.email}
                  </Text>
                </Box>
              </Td>

              <Td fontSize="sm">019.395.532-61</Td>
              <Td textAlign="center">
                {user.blocked ? (
                  <Tag colorScheme="red">Bloqueado</Tag>
                ) : (
                  <Tag colorScheme="green">Ativo</Tag>
                )}
              </Td>

              <Td textAlign="center">
                {user.enabled ? (
                  <Tag colorScheme="green">Sim</Tag>
                ) : (
                  <Tag colorScheme="red">Não</Tag>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Paginate
        pageCount={pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        onPageChange={({ selected }) => setPage(selected + 1)}
      />
    </Box>
  );
};

export default List;
