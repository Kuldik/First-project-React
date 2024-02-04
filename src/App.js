import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { MyModal } from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages';
import { getPagesArray } from './utils/pages';

//rafc


function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  let pagesArray = getPagesArray(totalPages)
  

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false) // Необходимо для того чтобы модальное окно закрыввалось после создания поста
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
}

  // Метод localeCompare возвращает чилсо, указывающее, должна ли данная строка находиться до,
  // после или в том же самом месте, что и строка, переданная через параметр, при сортировке этих строк

  return ( 
    <div className="App">
      <MyButton style={{marginRight: 30}} onClick={fetchPosts}>
        Получить посты
      </MyButton>
     
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}> {/* нажатие на кнопку вызовет модальное окно */}
        Создать пользователя
      </MyButton>
      {/* Создаем модальное окно, которое при нажатии на пустое простарнство будет иметь свойсво видимости false */}
      <MyModal visible={modal} setVisible={setModal}>  
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}} />

      {/* Сортирвка постов */}
      
      <PostFilter 
      filter={filter} 
      setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1> // обрабатываем ошибку
      }
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JavaScript" />

      }
      <div className='page__wrapper'>
        {pagesArray.map(p => 
          <span className={page === p ? 'page page__current' : 'page'} onClick={() => setPage(p)}>{p}</span> // условие: если элемент итерации функции map = номеру текущей страницы, то добавляем к нему класс page__current если не равны, то page
        )}
        </div>
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
