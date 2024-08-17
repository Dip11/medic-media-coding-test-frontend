import { Flex, Stack } from "@chakra-ui/react";
import { BaseComponent } from "interfaces/component";

interface IPageTemplate {
  titleComponent: BaseComponent;
  mainComponent: BaseComponent;
}

export const PageTemplate = (props: IPageTemplate): BaseComponent => {
  const { titleComponent, mainComponent } = props;

  return (
    <>
      <Flex direction={"row"}>
        <Stack  width={'100%'}>
          {titleComponent}
          {mainComponent}
        </Stack>
      </Flex>
    </>
  );
};
