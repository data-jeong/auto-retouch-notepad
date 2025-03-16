import { useState } from 'react';
import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  HStack,
  useToast
} from '@chakra-ui/react';

export default function NoteEditor() {
  const [note, setNote] = useState('');
  const toast = useToast();

  const convertToObsidian = () => {
    // Convert plain text to Obsidian-friendly markdown
    let obsidianNote = note
      // Convert URLs to markdown links
      .replace(/(?:https?:\/\/)(\S+)/g, '[$1]($1)')
      // Convert lists
      .replace(/^-\s/gm, '- ')
      // Add timestamps for daily notes
      .replace(/^/gm, line => 
        line.trim().length > 0 ? line : '---\ndate: ' + new Date().toISOString() + '\n---\n'
      );

    // Save to localStorage for persistence
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push({
      content: obsidianNote,
      date: new Date().toISOString()
    });
    localStorage.setItem('notes', JSON.stringify(notes));

    // Show success message
    toast({
      title: 'Note converted',
      description: 'Your note has been converted to Obsidian format',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Clear the editor
    setNote('');
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Note Editor</Heading>
      <VStack spacing={4} align="stretch">
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your notes here..."
          minH="300px"
          resize="vertical"
        />
        <HStack justify="flex-end">
          <Button
            colorScheme="teal"
            onClick={convertToObsidian}
            isDisabled={!note.trim()}
          >
            Convert to Obsidian
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}