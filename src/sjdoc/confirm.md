# confirm()
`Yes` or `No` 의 선택이 필요할때 사용합니다.

*@* *+prefix* *x* *@*
```html 
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```



### confirm(content, callbackForSuccess, callbackForFailed)
- 성공callback과 실패callback을 넣을 수 있습니다. (true를 반환해야 닫힙니다.) 
    *@* *!* *@*
    ```html
    <body>
        Hello Popman<br/>
        <button onclick="tryConfirm();">CONFIRM</button>
        <div id="tester">Yes? No?</div>
    </body>
  
    <script>
        popman.setup({modeTest:true, confirmExpx:'300', confirmExpy:'150'});
      
        function tryConfirm(){
            popman.confirm('Do you like kimchi?', 
                function(popObject){
                    document.getElementById('tester').innerHTML = 'Yes!';
                    return true;
                },
                function(popObject){
                    document.getElementById('tester').innerHTML = 'No!';
                    return true;
                },
            );          
        }
        tryConfirm();
    </script>
    ```