import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();
    useEffect(() => { // позволяет подключить IntersectionObserver, с помощью которого можно создать безконечную прокрутку постов
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        var cb = function (entries, observer) {
          if (entries[0].isIntersecting && canLoad) { // Условие, при котором, элемент отслеживается только при поялвении в зоне видимости, и не отслеживается когда он оттуда выходит
            callback()
          }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}