import React, { useEffect, useMemo, useRef, useState } from 'react';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import PostService from '../API/PostService';
import MyButton from '../components/UI/buttons/MyButtons';
import { MyModal } from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import Loader from '../components/UI/Loader/Loader';
import { useObserver } from '../hooks/useObserver';
import { MySelect } from '../components/UI/select/MySelect';


//rafc


function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  
  

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit]) //Добавление [page] позволяет изменять страницы с помощью функции changePage()

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false) // Необходимо для того чтобы модальное окно закрыввалось после создания поста
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
}

  const changePage = (page) => {
    setPage(page)
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
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue={'Количество элементов на странице'}
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'},
        ]}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1> // обрабатываем ошибку
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JavaScript" />
      <div ref={lastElement}/>
      {isPostLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
      }
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
      />
    </div>
  );
};

// {/* <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}/>   */}
// {/* При помощи props теперь можно сделать универсальными назавние, номер, и описани поста */}
// {/* При написании стилей inline необходимо писать элемент стилей, который состоит из двух и более слов не через дефиз
// А через принцип JS, то есть следующие слова с заглавной буквы */}

// Пропсы - это некоторые аргументы или параметры, которые передаются в компонент. Обмен пропсами всегда идет сверху вниз
// 

export default Posts;
