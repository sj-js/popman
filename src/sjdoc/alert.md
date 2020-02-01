# Alert
사용자에게 정보를 알립니다.

*@* *+prefix* *x* *@*
```html 
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```



### alert(content, callback)
- 알림내용과 alert후에 발생할 callback을 넣습니다. 

    *@* *!* *@*
    ```html
    <body>
        Hello Popman<br/>
        <button onclick="alertSomething1();">ALERT callback return true</button><br/>
        <button onclick="alertSomething2();">ALERT callback return false</button><br/>        
        <button onclick="alertSomething3();">ALERT non callback</button><br/>
    </body>
    
    <script>
        popman.setup({modeTest:true, alertExpx:'300', alertExpy:'150'}); 
    
        function alertSomething1(){
            var promise = popman.alert('Hello. Have a nice time! <br/> callback return true', function(){ 
                console.log(' :) ');
                return true;
            });         
        }
      
        function alertSomething2(){
            var promise = popman.alert('Hello. Have a nice time! <br/> callback return false', function(){ 
                console.log(' :) ');
                return false;
            });         
        }
      
        function alertSomething3(){
            var promise = popman.alert('Hello. Have a nice time! <br/> non callback');         
        }
        
        alertSomething1();
    </script>
    ```



