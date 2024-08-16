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
  Box,
  Button,
  useDisclosure,
  Progress,
} from "@chakra-ui/react";
import { EditOrViewTaskModal } from "components/molecules/editOrViewTaskModal";
import { API_URL } from "constants/apiUrls";
import { useFetchData } from "hooks/common/useFetchData";
import { BaseComponent } from "interfaces/component";
import { ITask } from "interfaces/task";
import { useState } from "react";
import { apiGetMethod } from "utils/axios/api-methods";
import moment from "moment";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { DeleteTaskButton } from "components/molecules/deleteTaskButton";
import { useQueryKey } from "hooks/useQueryKey";

export const TaskTable = (): BaseComponent => {
  /**
   * タスクを取得するためのクエリキーを取得します。
   * `useQueryKey` は、タスクをクエリするためのキーを含むオブジェクトを返すと仮定しています。
   */
  const { tasks } = useQueryKey();

  /**
   * タスクを取得するためのAPI URLを格納する状態を管理します。
   * 初期値としてデフォルトのタスクAPI URLが設定されています。
   */
  const [getTaskApiUrl, setGetTaskApiUrl] = useState<string>(API_URL.TASKS);

  /**
   * カスタムフックを使用してAPIからタスクデータを取得します。
   * - `tasks` は、キャッシュまたはクエリを識別するためのクエリキーとして使用されます。
   * - `getTaskApiUrl` は、タスクデータを取得するためのURLエンドポイントです。
   * - `useFetchData` に渡される非同期関数は、APIコールを処理します。
   * これにより、タスクデータを含む `apiData` と、ロード状態を示す `isLoading` が返されます。
   */
  const { apiData, isLoading } = useFetchData<ITask>(
    tasks,
    getTaskApiUrl,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async () => await apiGetMethod<any>(getTaskApiUrl)
  );

  /**
   * Chakra UIの `useDisclosure` フックを使用して、タスクモーダルの状態を管理します。
   * - `isOpen` はモーダルが現在開いているかどうかを示します。
   * - `onOpen` はモーダルを開く関数です。
   * - `onClose` はモーダルを閉じる関数です。
   */
  const {
    isOpen,
    onOpen: onEditOrViewTaskModalOpen,
    onClose: onEditOrViewTaskModalClose,
  } = useDisclosure();

  /**
   * 閲覧または編集のために現在選択されているタスクを格納する状態を管理します。
   * `selectedTask` は選択されたタスクを保持し、タスクが選択されていない場合は `null` になります。
   */

  const [selectedTask, setSelectedTask] = useState<NullOrUndefined<ITask>>();

  /**
   * 現在のモード（表示、編集、作成）を格納する状態を管理します。
   * 初期値は「作成」モードに設定されています。
   */
  const [selectedMode, setSelectedMode] = useState<"view" | "edit" | "create">(
    "create"
  );

  /**
   * 新しいタスクを追加するためのハンドラー関数です。
   * - モードを「作成」に設定します。
   * - `selectedTask` を `null` に設定して、何も選択されていない状態にします。
   * - モーダルを開きます。
   */
  const handleAddTask = () => {
    setSelectedMode("create");
    setSelectedTask(null);
    onEditOrViewTaskModalOpen();
  };

  /**
   * 既存のタスクを表示または編集するためのハンドラー関数です。
   * - モードを「表示」または「編集」に設定します。
   * - 選択されたタスクを `selectedTask` に設定します。
   * - モーダルを開きます。
   */
  const handleTask = (mode: "view" | "edit", task: NullOrUndefined<ITask>) => {
    setSelectedMode(mode);
    setSelectedTask(task);
    onEditOrViewTaskModalOpen();
  };

  /**
   * タスクの並び替えを行うためのハンドラー関数です。
   * 並び替えの条件（`sortBy` と `sortDir`）に基づいて、API URL を更新します。
   */
  const handleSort = (sortBy: string, sortDir: "ASC" | "DESC") => {
    setGetTaskApiUrl(`${API_URL.TASKS}?sortBy=${sortBy}&sortDir=${sortDir}`);
  };

  return (
    <Stack marginTop={10}>
      <Center>
        <Heading>タスクデータ</Heading>
      </Center>
      <Stack marginBottom={10} marginTop={5}>
        <Box>
          <Button colorScheme="blue" onClick={handleAddTask}>
            タスクを追加
          </Button>
        </Box>
      </Stack>
      {isLoading && <Progress size="xs" isIndeterminate />}
      {apiData?.data && apiData?.data?.length>0 && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>タイトル</Th>
                <Th>詳細</Th>
                <Th>
                  <ArrowDownIcon
                    onClick={() => handleSort("dueDate", "ASC")}
                    cursor={"pointer"}
                  />
                  期日
                  <ArrowUpIcon
                    onClick={() => handleSort("dueDate", "DESC")}
                    cursor={"pointer"}
                  />
                </Th>
                <Th>
                  <ArrowDownIcon
                    onClick={() => handleSort("createdAt", "ASC")}
                    cursor={"pointer"}
                  />
                  作成日時
                  <ArrowUpIcon
                    onClick={() => handleSort("createdAt", "DESC")}
                    cursor={"pointer"}
                  />
                </Th>
                <Th> 表示</Th>
                <Th>更新</Th>
                <Th>削除</Th>
              </Tr>
            </Thead>
            <Tbody>
              {apiData?.data?.map((task, i) => (
                <Tr key={i}>
                  <Td>{task?.title}</Td>
                  <Td>{task?.detail}</Td>
                  <Td>{moment(task?.dueDate).format("YYYY-MM-DD")}</Td>
                  <Td>{moment(task?.createdAt).format("YYYY-MM-DD")}</Td>
                  <Td>
                    <Button onClick={() => handleTask("view", task)}>
                      表示
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={() => handleTask("edit", task)}>
                      更新
                    </Button>
                  </Td>
                  <Td>{task && <DeleteTaskButton task={task} />}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <EditOrViewTaskModal
        isOpen={isOpen}
        mode={selectedMode}
        task={selectedTask}
        onClose={onEditOrViewTaskModalClose}
      />
    </Stack>
  );
};
