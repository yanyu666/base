const url = 'https://www.example.com/?name=John&age=30&city=New+York';
let hash = 'http://localhost/index.html#abc';
function getQueryParams(url){
    let param = new URL(url);
    console.log(param);
}
getQueryParams(url)
getQueryParams(hash)