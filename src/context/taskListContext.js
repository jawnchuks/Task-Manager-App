import React, { createContext, useState, useEffect} from 'react'


export const TaskListContext = createContext();

const TaskListContextProvider = props => {
    const initialState = JSON.parse(localStorage.getItem('tasks')) || []
    
    const [ tasks, setTasks ] = useState (initialState)

    const [ editItem, setEditItem ] = useState(null); 

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (title) => {
        setTasks([...tasks, {title, id: Math.random()}])
    };

    const removeTask = (id) => {
        setTasks (tasks.filter(task => task.id !== id))
    };

    const clearTask = () => {
        setTasks ([])
    };

    const findItem = id => {
        const item = tasks.find(task => task.id === id)

        setEditItem(item);
    }

    const editTask = (title, id) => {
        const newTasks = tasks.map(task => (task.id === id ? {title, id} : task));
        setTasks(newTasks);
        setEditItem(null);

    }

    return(
    <TaskListContext.Provider value={{tasks, addTask, removeTask, clearTask, findItem, editTask, editItem}}>
        {props.children}
    </TaskListContext.Provider>    
)        
} 
export default TaskListContextProvider
                