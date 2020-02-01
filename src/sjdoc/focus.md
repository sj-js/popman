# Focus

## Not yet implemented and documented.
   
   
*@* *+prefix* *x* *@* 
```html
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```   


## focusOn(..)
- 특정 Element를 제외하고 암흑이 됩니다.
    *@* *!* *@*
    ```html
    <body>
        <div id="tester">TEST</div>
        <button id="button-test" onclick="popman.pop('poptest')">POP</button>                
    </body>
    <script>
        popman.focusOn('button-test');
    </script>
    ```
  
  
  
## focusOff()
- Focus를 제거합니다.
    *@* *!* *@*
    ```html  
    <body>
        <div id="tester">TEST</div>
        <button id="button-test" onclick="popman.pop('poptest')">POP</button>                
    </body>
    <script>
        popman.focusOn('button-test');
    </script>
    ```    