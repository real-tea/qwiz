import {
  AspectRatio,
  Box,
  createStyles,
  Group,
  Image,
  Overlay,
  Stack,
  Title,
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { useBackgroundColor } from 'hooks/use-background-color';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';
import { useCurrentSlide } from './use-current-slide';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
}

export const MainSlideNew = ({ question }: Props) => {
  const { slide, isLoading } = useCurrentSlide();

  const contents = slide?.quizQuestion?.question?.contents;

  const textElements = contents?.filter(
    ({ type }) => type === QuestionElementType.TEXT
  );
  const imageElements = contents?.filter(
    ({ type }) => type === QuestionElementType.IMAGE
  );

  const hasTextElements = textElements?.length > 0;
  const hasImageElements = imageElements?.length > 0;

  const { classes } = useStyles();
  const { backgroundColor } = useBackgroundColor();

  return (
    <AspectRatio ratio={16 / 9}>
      <Box className={classes.box} style={{ backgroundColor }}>
        {/* TODO */}
        {isLoading && <Overlay />}
        <Stack align="center" spacing={50}>
          {hasTextElements && (
            <Stack>
              {textElements?.map((elem) => (
                <Title key={elem.id} order={2} align="center">
                  {elem.content}
                </Title>
              ))}
            </Stack>
          )}
          {hasImageElements && (
            <Group>
              {imageElements.map((elem) => (
                <Image
                  key={elem.id}
                  height={300}
                  src={elem.content}
                  radius="md"
                  alt="question image"
                />
              ))}
            </Group>
          )}
        </Stack>
      </Box>
    </AspectRatio>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    borderRadius: theme.radius.md,
    position: 'relative',
  },
}));
