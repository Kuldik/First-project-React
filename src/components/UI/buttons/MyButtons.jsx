import React from "react";
import classes from "./MyButton.module.css";


// [({children, ...props})] использовалось для того чтобы получить доступ к дочерним элементам
const MyButton = ({children, ...props}) => {
    return (
        // {...prorps} необходим для того чтобы мы могли из App передавть в эту папку необходимые значения
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    )
}

export default MyButton