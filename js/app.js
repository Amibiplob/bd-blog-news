let loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category));
}
let displayCategory = categories => {
    for (const category of categories) {
        //  console.log(category)
        let liCategory = document.getElementById('li-category');
        let li = document.createElement('li');
        li.innerHTML = `
        <li class="nav-item m-2">
        <a onclick="loadCard('${category.category_id}')" class="nav-link bg-secondary bg-opacity-25 rounded-3" href="#">${category.category_name}</a>
        </li>
            `
        liCategory.appendChild(li);
        document.getElementById('spiner').classList.add('d-none')
    }
}

let loadCard = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayCard(data.data));
}
let displayCard = newsCard => {
    // console.log(newsCard.length)
    document.getElementById("item").innerText = newsCard.length;

    let card = document.getElementById('card');
    card.textContent = '';

    document.getElementById('spiner').classList.remove('d-none')
    for (const news of newsCard) {
        //   console.log(news)
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="card border-0 mb-4 shadow bg-secondary bg-opacity-25 rounded-4">
        <div class="row g-0">
            <div class="col-md-3 col-12 text-center">
                <img src="${news.thumbnail_url}"
                    class="img-thumbnail w-auto rounded-4 " alt="...">
            </div>
            <div class="col-md-9 col-12">
            <div class="card-body h-100 d-flex flex-column justify-content-between">

            <div>
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.length > 700 ? news.details.slice(0,
            700) + '....' : news.details}</p>
            </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <img src="${news.author.img}"
                                alt="" style="height: 3rem;width: 3rem;" class="rounded-circle">
                                <h6 class="d-inline">${news.author.name ? news.author.name : 'No Data Found'}</h6>
                        </div>
                        <div>
                            <h5>
                              view : ${news.total_view ? news.total_view : 'No Data Found'}
                            </h5>
                        </div>
                        <div class="me-3">
                        <button onclick="loadModal('${news._id}')" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#newsModal">View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        card.appendChild(div)
        document.getElementById('spiner').classList.add('d-none')
    }

}

//                  modal

let loadModal = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]));
}
let displayModal = (data) => {
    let title = document.getElementById('newsModalLabel')
    title.innerText = `
   ${data.title}
   `
    let modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
   <p><span class="fw-bold">Author Name</span> : ${data.author.name ? data.author.name : 'No Data Found'}</p>
   <p><span class="fw-bold">Published Date</span> : ${data.author.published_date ? data.author.published_date : 'No Data Found'}</p>
   <p><span class="fw-bold">Details</span> : ${data.details}</p>
  
   `
}


loadCategory();