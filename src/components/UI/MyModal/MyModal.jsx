import React from 'react'
import cl from './MyModal.module.css'

export const MyModal = ({children, visible, setVisible}) => {

  const rootClasses = [cl.myModal]
  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    // Подключение стилей для div
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}> {/* нажатие на пустое пространство будет иметь свойсво видимости false */}
        <div className={cl.myModalContent} onClick={e => e.stopPropagation()}> {/* предовращение всплытия, при нажатии на пустое пространство будет иметь свойсво видимости false */}
          {children}
        </div>
    </div>
  )
}

