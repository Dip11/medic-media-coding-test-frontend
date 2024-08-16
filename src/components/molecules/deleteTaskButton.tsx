import { useSubmitTask } from "hooks/task/useSubmitTask";
import { ITask } from "interfaces/task";
import { ConfirmPopup } from "components/atoms/confirmPopup";

/**
 * `DeleteTaskButton` コンポーネントは、タスクを削除するためのボタンを提供します。
 * タスクを削除する前に、ユーザーに確認ポップアップを表示します。
 *
 * @param props - `ITask` オブジェクトを含むプロパティ。削除するタスクを指定します。
 * @returns 削除確認ポップアップを含む JSX 要素。
 */
export function DeleteTaskButton(props: { task: ITask }) {
  const { task } = props; // プロパティから削除対象のタスクを取得します。
  const { deleteTask } = useSubmitTask(task); // カスタムフックを使用して削除機能を取得します。

  const { mutate } = deleteTask; // 削除操作を実行するための `mutate` 関数を取得します。

  /**
   * `deleteWithConfirm` 関数は、ユーザーが削除を確認した後にタスクを削除します。
   * `mutate` 関数を呼び出してタスク削除を実行します。
   */
  const deleteWithConfrim = () => {
    mutate(task);
  };

  return (
    <>
      <ConfirmPopup
        title="タスクを削除"
        message="タスクを削除してもよろしいですか?"
        buttonTitle="タスクを削除"
        onConfirm={deleteWithConfrim}
      />
    </>
  );
}
