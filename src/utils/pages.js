export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit) // функия принимает общее количество элементов и возвращает необходимое количество страниц
    // Math.ceil округляет в большую сторону
    // Это нужно для того чтобы, если, имеется 105 элентов и limit = 10, то получится 11 страниц
}

// функция которая принимает общее количество старниц и на основании этого количества запоняет массив
export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 1; i <= totalPages; i++) {
        result.push(i + 1)
    }
    return result
}