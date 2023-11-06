import React, { useState } from 'react';
import Counter from "./components/Counter";
import ClassCounter from './components/ClassCounter';
import './styles/app.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ])
  // Тепеь нужно создать массив, который бдует менять значения постов в замисимости от их

  return (
    <div className="App">
      <PostList posts={posts} title="Список постов 1" />
    </div>
  );
}

// {/* <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}/>   */}
// {/* При помощи props теперь можно сделать универсальными назавние, номер, и описани поста */}
// {/* При написании стилей inline необходимо писать элемент стилей, который состоит из двух и более слов не через дефиз
// А через принцип JS, то есть следующие слова с заглавной буквы */}



export default App;
