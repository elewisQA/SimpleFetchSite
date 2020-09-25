function revealEditor() {
    let container = document.querySelector('#editor');
    if (container.style.display === "none") {
            container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

function fillEditor(title, body, id, uid) {
    let idSmall = document.querySelector("small#id");
    idSmall.innerHTML = id;
    let uidSmall = document.querySelector("small#userId");
    uidSmall.innerHTML = uid;
    let titleField = document.querySelector("input#title");
    titleField.setAttribute("value", title)
    let bodyField = document.querySelector("input#body");
    bodyField.setAttribute("value", body);
    revealEditor();
}

function sendEditor() {
    let titleField = document.querySelector("input#title");
    let bodyField = document.querySelector("input#body");
    let idSmall = document.querySelector("small#id");
    let uidSmall = document.querySelector("small#userId");
    console.log("POST {title: " + titleField.getAttribute("value") 
    + ", body: " + bodyField.getAttribute("value")
    + ", id: " + idSmall.innerHTML
    + ", userId: " + uidSmall.innerHTML
    + "}");
    revealEditor();
}

function createPost(postData) {
    console.log(`Rendering post ${postData.id} by ${postData.userId}`);
    // Get the div to put the posts in 
    let pageBody = document.querySelector('div#page-content');
    
    // Create the post object 
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
    article.setAttribute("class", "post");
    let edit = document.createElement("a");
    edit.innerHTML = "edit";
    edit.setAttribute("href", "#");
    edit.setAttribute("class", "btn btn-warning");
    let read = document.createElement("a");
    read.innerHTML = "read"; 
    read.setAttribute("href", `onePost.html?id=${postData.id}`);
    read.setAttribute("class", "btn btn-danger");
    article.appendChild(edit);
    article.appendChild(read);
    pageBody.appendChild(article);
    let pageBreak = document.createElement("h3");
    pageBreak.innerHTML = "____________________________"
    pageBody.appendChild(pageBreak);
    edit.addEventListener("click", function(){
        fillEditor(postData.title, 
            postData.body, 
            postData.id, 
            postData.userId);
    });

}

console.log("starting...");
revealEditor();
let editorSubmit = document.querySelector('input#send');
editorSubmit.addEventListener("click", sendEditor);

fetch("http://jsonplaceholder.typicode.com/posts") 
    .then(
        function(response) {
            if (response.status != 200) {
                console.log(`Error: Response code - ${response.status}`);
                return;
            }
            response.json().then(function(data) {
                console.log("Data Retrieved.");
                console.group("Post Creation");
                for (post of data) {
                    createPost(post);
                }
                console.groupEnd(); 
            });
        }
    )
    .catch(function(err) {
        console.log(`Error: function error - ${err}`);
        return null;
    });


    
    
