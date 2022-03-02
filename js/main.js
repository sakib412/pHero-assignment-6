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


    } else {
        const h2 = document.createElement("h2");
        h2.classList.add("text-center");
        h2.innerText = "No phone found!!!";
        resultsContainer.appendChild(h2)
    }

}


const showDetails = slug => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(res => res.json())
        .then(data => { openModal(data) })
        .catch(err => { console.log(err) })
}

// Open Modal
const openModal = (response) => {
    const { data } = response;
    const modalElement = document.getElementById("phone-details");
    const modalBody = document.getElementById("modal-body");
    const modalContent = `
        <div>
            <div class="d-flex justify-content-center">
                <img src="${data.image}" class="img-fluid">
            </div>
            <h2 class="mt-3">${data.name}</h2>
            <div class="mb-5 pb-5">
                <h4>Brand: ${data?.brand}</h4>
                <p><span class="fst-italic">Release Date</span>: ${data?.releaseDate ? data?.releaseDate : "No release date found!"} </p>
                <p><span class="fst-italic">Main features</span>: <ul>${Object.entries(data?.mainFeatures).map(([key, value]) => (`
                    <li>
                        <strong>${key.toUpperCase()}</strong>: ${Array.isArray(value) ? value.map(sensor => sensor) : value}
                    </li>`)
    )}
                </ul>
                </p>
                <p><span class="fst-italic">Other Features</span>:
                    <ul>
                    ${Object.entries(data?.others).map(([key, value]) => (`
                    <li>
                        <strong>${key.toUpperCase()}</strong>: ${value}
                    </li>`)
    )}
                    </ul>
                    
                </p>
            </div>
        </div>
    `
    modalBody.innerHTML = modalContent;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

}