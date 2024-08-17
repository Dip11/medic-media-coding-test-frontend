import { Center, Heading } from "@chakra-ui/react";
import { BaseComponent } from "interfaces/component";

interface ITitle {
  text: string;
}

export const Title = (props: ITitle): BaseComponent => {
  const { text } = props;
  return (
    <>
      <Center margin={5}>
        <Heading>{text}</Heading>
      </Center>
    </>
  );
};
