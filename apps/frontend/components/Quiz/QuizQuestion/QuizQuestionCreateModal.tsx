import {
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { FileUpload } from 'components/UI/FileUpload';
import { useModalProps } from 'context/mantine';
import { useQuestionCreate } from 'hooks/api/question';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useEffect, useState } from 'react';

export const QuestionCreateModal = ({ opened, setOpened }) => {
  const { mutate: createQuestion, isSuccess, isLoading } = useQuestionCreate();
  const modalProps = useModalProps();
  const { isDark } = useAppColorscheme();

  const [textual, setTextual] = useState({
    0: {
      content: null,
      type: QuestionElementType.TEXT,
    },
  });
  const [images, setImages] = useState({
    0: {
      content: null,
      type: QuestionElementType.IMAGE,
    },
  });

  const handleSubmit = () => {
    const textualArr = Object.values(textual);
    const imagesArr = Object.values(images);
    const contents = [...textualArr, ...imagesArr];

    // TODO: allow deleting inputs and images when creating question
    createQuestion({ contents });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpened(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new question"
      {...modalProps}
      // TODO: remove duplicte props when we find out why modal props arent applying
      overlayBlur={0.5}
      shadow="sm"
      radius="sm"
      overlayOpacity={0.9}
      overlayColor={isDark ? '#101113' : '#E9ECEF'}
      centered
    >
      <LoadingOverlay visible={isLoading} />
      <Stack>
        <Stack>
          {Object.keys(textual).map((key, index) => (
            <TextInput
              key={index}
              value={textual[key].content}
              onChange={(e) =>
                setTextual({
                  ...textual,
                  [key]: {
                    content: e.target.value,
                    type: QuestionElementType.TEXT,
                  },
                })
              }
              size="md"
              placeholder="Enter question content"
            />
          ))}
          <Box>
            <Button
              onClick={() =>
                setTextual({
                  ...textual,
                  [Object.keys(textual).length]: {
                    content: null,
                    type: QuestionElementType.TEXT,
                  },
                })
              }
              variant="light"
            >
              Add more textual content
            </Button>
          </Box>
        </Stack>
        <Divider variant="dashed" />
        <Stack>
          {Object.keys(images).map((key, index) => (
            <QuizQuestionImages
              key={index}
              images={images}
              setImages={setImages}
              index={key}
            />
          ))}
          <Box>
            <Button
              onClick={() =>
                setImages({
                  ...images,
                  [Object.keys(images).length]: {
                    content: null,
                    type: QuestionElementType.IMAGE,
                  },
                })
              }
              variant="light"
            >
              Add another image
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Group position="right">
        <Button
          onClick={handleSubmit}
          mt="sm"
          size="md"
          disabled={!textual[0]?.content}
        >
          Create
        </Button>
      </Group>
    </Modal>
  );
};

const QuizQuestionImages = ({ images, setImages, index }) => {
  const { uploadFile, url } = useFileUpload();

  useEffect(() => {
    if (url) {
      setImages({
        ...images,
        [index]: {
          content: url,
          type: QuestionElementType.IMAGE,
        },
      });
    }
  }, [url]);

  return <FileUpload uploadFile={uploadFile} url={url} />;
};
