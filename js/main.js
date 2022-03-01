// get input value when user clicked on search button
const onSearch = () => {
    // get input value
    const searchText = document.getElementById("search-input").value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => { console.log(data) })
        .catch(err => { console.log(err) })
}

