import React, { useMemo, useRef, useState } from 'react';
import Counter from "./components/Counter";
import ClassCounter from './components/ClassCounter';
import './styles/app.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/buttons/MyButtons';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';

//rafc


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''});


  const sortedPosts = useMemo(() => {
    console.log("123123");
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  // Метод localeCompare возвращает чилсо, указывающее, должна ли данная строка находиться до,
  // после или в том же самом месте, что и строка, переданная через параметр, при сортировке этих строк

  return (
    <div className="App">

      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}} />

      {/* Сортирвка постов */}
      
      <PostFilter 
      filter={filter} 
      setFilter={setFilter}/>
      
      {/* Условная отрисовка */}
      {/* Использовать тернарный оператор*/}
      {sortedAndSearchedPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JavaScript" />
        : <h1 style={{textAlign: 'center'}}>
            Посты не найдены!
          </h1>
      }
    </div>
  );
};

// {/* <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}/>   */}
// {/* При помощи props теперь можно сделать универсальными назавние, номер, и описани поста */}
// {/* При написании стилей inline необходимо писать элемент стилей, который состоит из двух и более слов не через дефиз
// А через принцип JS, то есть следующие слова с заглавной буквы */}

// Пропсы - это некоторые аргументы или параметры, которые передаются в компонент. Обмен пропсами всегда идет сверху вниз
// 

export default App;
