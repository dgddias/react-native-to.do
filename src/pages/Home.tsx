import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

      const newTask = {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
      }

      setTasks([...tasks, newTask]);

    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

          const tasksUpdated = tasks.map(task => (task.id === id) ?
              ({...task, done: !task.done }) : ({...task}))

          setTasks(tasksUpdated);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

      setTasks([...tasks.filter(filter => filter.id !== id)])

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
