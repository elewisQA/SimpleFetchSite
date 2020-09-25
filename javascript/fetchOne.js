function createPost(postData) {
    console.log(`Rendering post ${postData.id} by ${postData.userId}`);
    // Get the div to put the posts in 
    let title = document.querySelector('h1');
    title.innerHTML = postData.title;

    let postContainer = document.querySelector('#post-content');
    let content = document.createElement('p');
    content.innerHTML = postData.body;
    let author = document.createElement("small");
    author.innerHTML = `Author ID: ${postData.userId} Post ID: ${postData.id}`;
    postContainer.appendChild(content);
    postContainer.appendChild(author);
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