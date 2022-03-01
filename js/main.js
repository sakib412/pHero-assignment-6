// get input value when user clicked on search button
const onSearch = () => {
    // get input value
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    // call api
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => {
            displayResult(data);
            // after display clear input value
            searchInput.value = "";

        })
        .catch(err => { console.log(err) })
}


const displayResult = (result) => {
    const resultsContainer = document.getElementById("results");
    // first clear inner HTML
    resultsContainer.innerHTML = "";

    const { status, data } = result;
    if (status && data.length != 0) {
        const firstTwenty = data.slice(0, 20);
        firstTwenty.forEach((phone) => {
            const card = `
            <div class="col-12 col-md-4 mb-3 p-3">
                <div class="card shadow">
                    <img src="${phone.image}" class="card-img-top p-3" alt="phone">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>`;
            resultsContainer.innerHTML += card;
        })

        console.log("all", data)
        console.log("Only First Twenty", firstTwenty)

    }

}


const showDetails = slug => {
    console.log(slug);


}