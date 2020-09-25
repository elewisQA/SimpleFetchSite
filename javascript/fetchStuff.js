function createPost(postData) {
    console.log(`Rendering post ${postData.id} by ${postData.userId}`);
    // Get the div to put the posts in 
    let pageBody = document.querySelector('div#page-content');
    
    // Create the post object 
    let link = document.createElement("a");
    link.setAttribute("href", `onePost.html?id=${postData.id}`)
    link.setAttribute("class", "post");
    let article = document.createElement("article");
    let title = document.createElement("h2");
    title.innerHTML = postData.title;
    article.appendChild(title);
    let content = document.createElement("p");
    content.innerHTML = postData.body;
    article.appendChild(content);
    let author = document.createElement("small");
    author.innerHTML = `Author ID: ${postData.userId} Post ID: ${postData.id}`;
    article.appendChild(author);
    link.appendChild(article);
    pageBody.appendChild(link);
    let pageBreak = document.createElement("br");
    pageBody.appendChild(pageBreak);
}

console.log("starting...");
fetch("http://jsonplaceholder.typicode.com/posts") 
    .then(
        function(response) {
            if (response.status != 200) {
                console.log(`Error: Response code - ${response.status}`);
                return;
            }
            response.json().then(function(data) {
                console.log("Data Retrieved.");
                for (post of data) {
                    createPost(post);
                }
            });
        }
    )
    .catch(function(err) {
        console.log(`Error: function error - ${err}`);
        return null;
    });
