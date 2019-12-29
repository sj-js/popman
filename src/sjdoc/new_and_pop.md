# new() and pop()
등록된 노드를 화면에 표시합니다.
   
*@* *+prefix* *x* *@* 
```html
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```   
  
  
- new(Options)
 
    미리 노드를 정의하여 등록합니다.


- pop(ID or Element)

    등록된 노드를 화면에 표시합니다.

- `new()`로 반환된 Element를 `pop()`에 인자로 넣으면, popup됩니다. 
    *@* *!* *@*
    ```html
    <body>POPMAN TEST</body>
    <script>
        popman.setup({modeTest:true});
        //New
        var newPopNode = popman.new({content: 'NOTICE<br/> Hello popman'});
        //Pop
        popman.pop(newPopNode);
    </script>
    ```


    
## id / name
- `id` 또는 `name`을 지정하면 new로부터 반환받지 않아도 언제든 popup할 수 있습니다.    
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest-id');">POP-by-id</button><br/>
        <button onclick="popman.pop({name:'poptest-name'});">POP-by-name</button>
    </body>
    <script>
        popman.setup({modeTest:true});
        var newPopNode = popman.new({
            id: 'poptest-id',
            name: 'poptest-name',
            content: 'NOTICE<br/> Hello popman'
        });
    </script>
    ```

## expx / expy
- `expx`/`expy`: 노드의 크기와 위치를 특정표현식으로 정의합니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest');">POP</button>
    </body>
    <script>
        popman.setup({modeTest:true});
        //Pop1
        var newPopNode = popman.new({
            id: 'poptest',
            expx: 200, //100px
            expy: 100, //100px
            content: 'NOTICE<br/> Hello popman'
        });
      
        //Pop2
        var newPopNode2 = popman.new({
            id: 'poptest2',
            expx: 100,
            expy: '40%',
            content: 'Hello again ~'
        });
        
        var buttonToPop2 = document.createElement('button');
        buttonToPop2.innerHTML = 'POP2';
        buttonToPop2.onclick = function(){ popman.pop('poptest2'); };
        newPopNode.appendChild(buttonToPop2);  
      
        popman.pop('poptest');
    </script>
    ```
    
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest');">POP</button>
    </body>
    <script>
        popman.setup({modeTest:true});
        var newPopNode = popman.new({
            id: 'poptest',
            expx: '10(200)', //왼쪽 10px 띄고, 200px의 크기로 설정
            expy: '*(50%)10', //오른쪽 10px 띄고, 50%의 크기로 설정
            content: 'NOTICE<br/> Hello popman'
        });
        popman.pop('poptest');
    </script>
    ```
    
## closeby...
- 쉽게 노드를 닫을 수 있도록 옵션을 설정할 수 있습니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest');">POP</button>
    </body>
    <script>
        popman.setup({modeTest:true});
        var newPopNode = popman.new({
            id: 'poptest',
            expx: '50%',
            expy: '50%',
            closebyclickin: false,
            closebyclickout: true,
            closebyesc: true,
            content: 'NOTICE<br/> Hello popman'
        });        
        popman.pop('poptest');
    </script>
    ```
    
    - `closebyclickin`: 노드 안을 클릭하면 종료. true or false
    - `closebyclickout`: 노드 밖을 클릭하면 종료. true or false
    - `closebyesc`: `[ESC]`키를 누르면 종료. true or false