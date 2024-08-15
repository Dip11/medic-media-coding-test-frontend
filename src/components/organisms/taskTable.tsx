import {
  Stack,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Center,
  Heading,
} from "@chakra-ui/react";
import { API_URL } from "constants/apiUrls";
import { QUERY_KEY } from "constants/queryKeys";
import { useFetchData } from "hooks/auth/useFetchData";
import { BaseComponent } from "interfaces/component";
import { ITask } from "interfaces/task";
import { apiGetMethod } from "utils/axios/api-methods";

export const TaskTable = (): BaseComponent => {
  const { apiData }   = useFetchData<ITask>(
    QUERY_KEY.TASKS,
    async () => await apiGetMethod<any>(API_URL.GET_TASKS)
  );


  return (
    <Stack marginTop={10}>
      <Center>
        <Heading>タスクデータ</Heading>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>タイトル</Th>
              <Th>詳細</Th>
              <Th>期限</Th>
              <Th>作成日時</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apiData?.data?.map((task, i) => (
              <Tr key={i}>
                <Td>{task?.title}</Td>
                <Td>{task?.detail}</Td>
                <Td>{task?.dueDate}</Td>
                <Td>{task?.createdAt}</Td>
              </Tr>
            ))}
         </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
