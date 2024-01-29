import React, { useRef, useState } from "react";
import App from "../App";
import MyButton from './UI/buttons/MyButtons';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
    const [post, setPost] = useState({title:'', body:''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title:'', body:''}); // Необходимо для того чтобы очистить инпуты
    };
    return (
        <div className="form">
      {/* Управляемый компонент*/}
        <MyInput 
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})} //Необходимо для двустороннего связывания с компонентом
          type="text" 
          placeholder='Название поста' 
        />
        <MyInput 
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})} //Необходимо для двустороннего связывания с компонентом
          type="text" 
          placeholder='Описание поста' 
        />
      {/* Неуправляемый компонент */}
        {/* <MyInput 
          ref={bodyInputRef}
          type="text" 
          placeholder='Описание поста' 
        /> */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </div>
    )
}

export default PostForm