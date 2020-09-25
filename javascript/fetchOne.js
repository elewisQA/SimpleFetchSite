function createPost(postData) {
    console.log(`Rendering post ${postData.id} by ${postData.userId}`);
    // Get the div to put the posts in 
    let postContainer = document.querySelector('#page-content');
    let article = document.createElement('article');
    article.setAttribute("class", "post");
    let title = document.createElement('h2');
    title.innerHTML = postData.title;
    article.appendChild(title);
    let content = document.createElement('p'); 
    content.innerHTML = postData.body;
    article.appendChild(content);
    let author = document.createElement("small");
    author.innerHTML = `Author ID: ${postData.userId} Post ID: ${postData.id}`;
    article.appendChild(author);
    postContainer.appendChild(article);
}

console.log("starting...");
const params = new URLSearchParams(window.location.search);
postId = params.getAll('id');
fetch("http://jsonplaceholder.typicode.com/posts/" + postId) 
    .then(
        function(response) {
            if (response.status != 200) {
                console.log(`Error: Response code - ${response.status}`);
                return;
            }
            response.json().then(function(data) {
                console.log("Data Retrieved.");
                console.log(data);
                createPost(data);
            });
        }
    )
    .catch(function(err) {
        console.log(`Error: function error - ${err}`);
        return null;
    });