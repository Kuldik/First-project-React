import React from 'react';
import PostItem from './PostItem';
import setPosts from '../App';
// import remove from '../App';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) => 
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem 
                            number={index + 1} 
                            post={post}
                            remove={remove}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
            
        </div>
        //{/* Так же, необходимо создать уникальный ключ, по ошибке, некоторые пишут индекс, но по правилу нужно использовать key, индексы меняются, а ключ всегда
        // должен быть уникальным. Ключи позволяют алгоритмам реакта делать рендеринг наиболее эффективно и перертсовывать не весь список, а только те, в которых произошли изменения*/},
        // В компоненте может быть только один корневой элемент, при создании еще одного div будет ошибка
    )
}

export default PostList;