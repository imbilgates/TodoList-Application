import { TodoItem } from '@/types/todo'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface TodoListProps {
    todo: TodoItem,
    deleteTodo: (id: number) => void,
    toggleTodo: (id: number) => void,
}

const TodoList: React.FC<TodoListProps> = ({todo, deleteTodo, toggleTodo}) => {
  return (
    <View style={styles.container}>
        <View style={styles.todoItem}>
            <Text style={[styles.todoText, {
                textDecorationLine: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#aaa' : '#333'
            }]} 
            onPress={()=> toggleTodo(todo.id)}>{todo?.title}</Text>
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
            <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({  
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoText: {
        fontSize: 18,
        color: '#333',
    },
    deleteButton: {
        color: 'red',
    },
    });