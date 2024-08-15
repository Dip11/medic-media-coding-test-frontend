import { TaskTable } from "components/organisms/taskTable";
import { BaseComponent } from "interfaces/component";

export const Dashboard = (): BaseComponent => {
  return (
    <>
      <TaskTable />
    </>
  );
};
