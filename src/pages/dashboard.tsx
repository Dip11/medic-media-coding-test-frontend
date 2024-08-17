import { Title } from "components/atoms/title";
import { TaskTable } from "components/organisms/taskTable";
import { PageTemplate } from "components/templates/page";
import { BaseComponent } from "interfaces/component";

export const Dashboard = (): BaseComponent => {
  return (
    <>
      <PageTemplate
        titleComponent={
          <Title text="タスクデータ"/>
        }
        mainComponent={<TaskTable />}
      />
    </>
  );
};
