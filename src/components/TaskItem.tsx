import React, {useState, useRef, useEffect} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import pen from "../assets/icons/pen/pen.png";
import retangle from "../assets/icons/retangle.png";
import {Task} from "./TasksList";
import {EditTaskArgs} from "../pages/Home";


interface TaskItemProps{
    task: Task,
    removeTask: (id: number)=> void;
    toggleTaskDone: (id: number) => void;
    editTask: ({taskId, taskNewTitle}: EditTaskArgs) => void;
}


export function TaskItem(
    {task, removeTask, toggleTaskDone, editTask}: TaskItemProps){

    const [isEditing, setEditing] = useState(false);

    const [editTitle, setEditTitle] = useState(task.title);

    const textInputRef = useRef<TextInput>(null)



    function handleStartEditing(){

      setEditing(true);

    }

    function handleCancelEditing(){

        setEditTitle(task.title);
        setEditing(false);
    }

    function handleSubmitEditing(){

        editTask({taskId: task.id, taskNewTitle: editTitle})
        setEditing(false);

    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])
   return(
       <View style={styles.container}>
           <View>
               <TouchableOpacity
                   activeOpacity={0.7}
                   style={styles.taskButton}
                   onPress={() => toggleTaskDone(task.id)}
                   //TODO - use onPress (toggle task) prop
               >
                   <View
                       style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                       //TODO - use style prop
                   >
                       { task.done && (
                           <Icon
                               name="check"
                               size={12}
                               color="#FFF"
                               style={styles.taskMarkerDone}
                           />
                       )}
                   </View>
                   <TextInput
                       value={editTitle}
                       onChangeText={setEditTitle}
                       editable={isEditing}
                       onSubmitEditing={handleSubmitEditing}
                       ref={textInputRef}
                       style={task.done ? styles.taskTextDone : styles.taskText}
                       //TODO - use style prop
                   >
                   </TextInput>
           </TouchableOpacity>
           </View>
           <View style={ styles.iconsContainer } >
               { isEditing ? (
                   <TouchableOpacity
                       onPress={handleCancelEditing}
                   >
                       <Icon name="x" size={24} color="#b2b2b2" />
                   </TouchableOpacity>
               ) : (
                   <TouchableOpacity
                       onPress={handleStartEditing}
                   >
                       <Image source={pen} />
                   </TouchableOpacity>
               ) }
               <View
                   style={ styles.iconsDivider }
               />

               <TouchableOpacity
                   onPress={() => removeTask(task.id)}
                   disabled={isEditing}
                   >

                   <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
               </TouchableOpacity>
           </View>
       </View>
   )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196,196,196,0.8)',
        marginHorizontal: 12
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,

    }
})

