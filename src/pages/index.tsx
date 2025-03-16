import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import TodoList from '@/components/TodoList';
import NoteEditor from '@/components/NoteEditor';

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Auto Retouch Notepad
        </Heading>
        <Box>
          <TodoList />
        </Box>
        <Box>
          <NoteEditor />
        </Box>
      </VStack>
    </Container>
  );
}