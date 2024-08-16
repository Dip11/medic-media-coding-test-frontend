import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { BaseComponent } from "interfaces/component";
import { ITask } from "interfaces/task";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { useSubmitTask } from "hooks/task/useSubmitTask";
import { BaseModal } from "components/atoms/BaseModal";

/**
 * `IEditOrViewTask` インターフェースは、`EditOrViewTaskModal` コンポーネントのプロパティを定義します。
 * - `isOpen`: モーダルが開いているかどうかを示します。
 * - `task`: 表示または編集するタスク情報（オプション）。
 * - `mode`: モーダルのモード（"create" | "edit" | "view"）を指定します。
 * - `onClose`: モーダルを閉じるための関数。
 */
interface IEditOrViewTask {
  isOpen: boolean;
  task?: NullOrUndefined<ITask>;
  mode: "create" | "edit" | "view";
  onClose: () => void;
}

/**
 * `TaskFormInput` タイプは、フォームの入力フィールド（タイトル、詳細、期日）を定義します。
 */
type TaskFormInput = {
  title: string;
  detail: string;
  dueDate: string;
};

/**
 * `EditOrViewTaskModal` コンポーネントは、タスクの作成、編集、または表示を行うためのモーダルを提供します。
 * モードに応じて、フォームを入力または表示でき、タスクデータをサーバーに送信できます。
 *
 * @param props - `IEditOrViewTask` インターフェースに従ったプロパティ。
 * @returns `BaseComponent` - ベースモーダル内でタスクフォームをレンダリングするコンポーネント。
 */
export const EditOrViewTaskModal = (props: IEditOrViewTask): BaseComponent => {
  const { isOpen, onClose, mode, task } = props;
  const { register, setValue, reset, handleSubmit } = useForm<TaskFormInput>();
  const { updateOrSave } = useSubmitTask(task);
  const [title, setTitle] = useState<string>("");

  /**
   * モードが変更されたときに、モーダルのタイトルを設定します。
   * - `create` モード: "タスクを作成"
   * - `edit` モード: "タスクの更新"
   * - `view` モード: "タスクを表示"
   */
  useEffect(() => {
    if (mode == "create") {
      setTitle("タスクを作成");
      setValue("dueDate", moment().format("YYYY-MM-DD"));
    } else if (mode == "edit") {
      setTitle("タスクの更新");
    } else {
      setTitle("タスクを表示");
    }
  }, [mode]);

  /**
   * モーダルが閉じられたときに実行される関数。
   * - `onClose` を呼び出してモーダルを閉じます。
   */
  const onModalClose = () => {
    reset();
    onClose();
  };

  /**
   * フォームが送信されたときに実行される関数。
   * - フォームの入力値を取得し、新しいタスクデータを作成します。
   * - `updateOrSave.mutate` を呼び出してタスクデータをサーバーに送信します。
   * - 送信後、モーダルを閉じます。
   */
  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    try {
      const newTaskData: ITask = {
        id: task?.id,
        title: data.title,
        detail: data.detail,
        dueDate: data.dueDate,
      };
      updateOrSave.mutate(newTaskData);
    } catch (error: any) {
      console.log(error);
    } finally {
      onModalClose();
    }
  };

  /**
   * `task` が変更されたときに、フォームの初期値を設定します。
   * - タスクの `title`、`detail`、および `dueDate` をフォームフィールドに設定します。
   */
  useEffect(() => {
    setValue("title", task?.title ?? "");
    setValue("detail", task?.detail ?? "");
    if (task?.dueDate) {
      setValue("dueDate", moment(task.dueDate).format("YYYY-MM-DD"));
    }
  }, [task]);

  return (
    <BaseModal isOpen={isOpen} onClose={onModalClose} size="lg">
      <Flex justifyContent={"center"} direction={"column"}>
        <Heading>{title}</Heading>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl marginTop={3}>
              <FormLabel>タイトル</FormLabel>
              <Input
                isDisabled={mode === "view"}
                type="text"
                defaultValue={task?.title}
                {...register("title", { required: true })}
              />
              <FormErrorMessage>タイトルは必須です。</FormErrorMessage>
            </FormControl>
            <FormControl marginTop={3}>
              <FormLabel>タスクの詳細</FormLabel>
              <Textarea
                defaultValue={task?.detail}
                isDisabled={mode === "view"}
                placeholder="タスクの詳細を記入してください"
                {...register("detail")}
              />
            </FormControl>
            <FormControl marginTop={3} marginBottom={10}>
              期日 :{" "}
              <input
                type="date"
                disabled={mode === "view"}
                defaultValue={moment().format("YYYY-MM-DD")}
                placeholder="期日"
                {...register("dueDate")}
              />
            </FormControl>
            {mode !== "view" && (
              <Button width={'100%'} colorScheme={'blue'} type="submit" marginTop={5}>
                完了
              </Button>
            )}
          </form>
        </Stack>
      </Flex>
    </BaseModal>
  );
};
