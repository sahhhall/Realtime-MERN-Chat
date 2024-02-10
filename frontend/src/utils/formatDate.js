const formatedDate = (date) => {
    return date.toLocaleDateString('en-us', {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}


export default formatedDate;
