// promise --> pending ,resolve(success), reject(error)
const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("news-container");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories") // promise
    .then((res) => res.json()) // res --- promise
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:border-b-4 border-[#b80000] cursor-pointer pb-3">${cat.title}</li>
        `;
  });
  
 
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });


    if (e.target.localName === "li") {
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (articles) => {
    console.log(articles);
    newsContainer.innerHTML=""
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class ="border border-gray-300 rounded-lg shadow-sm">
            <div>
            <img class="rounded-t-lg" src="${article.image.srcset[5].url}">
            </div>
            <div class="p-2">
            <h1 class="font-bold">${article.title}</h1>
            <P class="text-sm">${article.time}</P>
            </div>
        </div>
        `
  })
};

loadCategory();
loadNewsByCategory("main")
// const loadCategoryAsync = async () =>{

//     try{

//         const res = await fetch("https://news-api-fs.vercel.app/api/categorie")
//         const data = await res.json()
//         console.log(data);
//     } catch (error){
//         console.log(error);
//     }
// }
// loadCategoryAsync()
