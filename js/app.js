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
        <li class="nav-item">
        <a onclick="loadCard(${category.category_id})" class="nav-link bg-secondary bg-opacity-25 rounded-3" href="#">${category.category_name}</a>
        </li>

            `
            liCategory.appendChild(li);
    }
}

let loadCard = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => console.log(data));
}
// let displayCard = newsCard => {
//     for (const news of newsCard){
//         console.log(news)
//     }
  
// }


loadCategory();