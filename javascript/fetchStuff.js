function fetchData(url) {
    fetch(url) 
    .then(
        function(response) {
            if (response.status != 200) {
                console.log(`Error: Response code - ${response.status}`);
                return;
            }
            response.json().then(function(posts) {
                console.log(posts);
            });
        }
    )
    .catch(function(err) {
        console.log("some error");
    });
}

fetchData('http://jsonplaceholder.typicode.com/posts');