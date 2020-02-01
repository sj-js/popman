# Loading
로딩이 필요할때 사용합니다. 

*@* *+prefix* *x* *@*
```html 
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```



### loading(content, callbackForPromise)
- `Promise`를 반환하며 resolve()가 되면 자동으로 닫힙니다. 

    *@* *!* *@*
    ```html
    <body>
        Hello Popman<br/>
        <button onclick="loadSomething();">LOAD</button>
    </body>
  
    <script>
        popman.setup({modeTest:true, loadingExpx:'150', loadingExpy:'150'}); 
        
        function loadSomething(){
            var promise = popman.loading('LOADING', function(resolve, reject){ 
                setTimeout(function(){ 
                     resolve();
                }, 2000);             
            });         
        }
        loadSomething();
    </script>
    ```