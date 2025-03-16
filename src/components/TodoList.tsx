import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';
import { format } from 'date-fns';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        date: format(new Date(), 'yyyy-MM-dd')
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Daily Todo List</Heading>
      <HStack mb={4}>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo} colorScheme="blue">
          Add
        </Button>
      </HStack>
      <VStack align="stretch" spacing={2}>
        {todos.map(todo => (
          <HStack key={todo.id} p={2} bg="gray.50" borderRadius="md">
            <Checkbox
              isChecked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <Text flex={1} textDecoration={todo.completed ? 'line-through' : 'none'}>
              {todo.text}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {todo.date}
            </Text>
            <IconButton
              aria-label="Delete todo"
              icon={<Text>×</Text>}
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}