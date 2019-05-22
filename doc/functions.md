# Functions
`여러 기능`들을 소개해드립니다.


*@* *+prefix* *x* *@* 
```html
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
     var popman = new PopMan();
</script> 
```



## isOn(ID or Name)
- POP노드가 열려있는지 확인합니다.
    *@* *!* *@*
    ```html
    <script>
        popman.setup({modeTest:true}).detect();
      
        function checkOnOff(){
            document.getElementById('tester').innerHTML = popman.isOn('poptest');          
        }
    </script>
  
    <body>
        <div id="tester">TEST</div>
      
        <button onclick="popman.pop('poptest')">POP</button>
      
        <div id="poptest" data-pop data-afterpop="checkOnOff()" data-afterclose="checkOnOff()">Popman Test</div>        
    </body>
    ```
  
## focusOn()
