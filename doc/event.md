# Event

*@* *+prefix* *x* *@*
```html 
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```

#### ※ 표
 종류 | 특징
------|-----
add | POP노드가 등록될 때 
pop | POP노드를 열 때
close | POP노드를 닫을 때
afterPop | POP노드를 연 후에
afterCLose | POP노드를 닫은 후에
beforefirstpop | 처음 POP노드가 열릴 때
afterlastpop | 처음 열었던 POP노드가 닫힐 때
afterdetect | 탐지(detect) 후에
    
    

## add
- 노드가 등록될 때, Event가 발생합니다.
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
            add: function(data){
                data.element.innerHTML = 'add';
            }
        });        
        popman.pop('poptest');
    </script>
    ```
  
  
  
## pop
- pop() 메서드에 의해 호출될 때, Event가 발생합니다.
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
            add: function(data){
                data.element.innerHTML = 'add';
            },
            pop: function(data){
                data.element.innerHTML = 'pop';
            }
        });        
        popman.pop('poptest');
    </script>
    ```
    
  
## close
- 화면에 표시된 POP노드가 닫힐 때 Event가 발생합니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest');">POP</button><br/>
        <div id="tester"></div>
    </body>
    <script>
        popman.setup({modeTest:true});
        var newPopNode = popman.new({
            id: 'poptest',
            expx: '50%',
            expy: '50%',
            content: 'You deserve to be happy.',
            add: function(data){
                document.getElementById('tester').innerHTML = 'add';
            },
            pop: function(data){
                document.getElementById('tester').innerHTML = 'pop';
            },
            close: function(data){
                document.getElementById('tester').innerHTML = 'close';
            }
        });        
    </script>
    ```
  
  
    
## afterPop
- 화면에 표시된 POP노드가 닫힐 때 Event가 발생합니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest');">POP</button><br/>
        <div id="tester"></div>
    </body>
    <script>
        popman.setup({modeTest:true});
        var newPopNode = popman.new({
            id: 'poptest',
            expx: '50%',
            expy: '50%',
            content: 'You deserve to be happy.',
            add: function(data){
                document.getElementById('tester').innerHTML = 'add ';
            },
            pop: function(data){
                document.getElementById('tester').innerHTML = 'pop ';
            },
            afterpop: function(data){
                document.getElementById('tester').innerHTML = 'afterpop ';
            },
            close: function(data){
                document.getElementById('tester').innerHTML = 'close ';
            }
        });        
    </script>
    ```
  
    
    
    
## afterClose
- 화면에 표시된 POP노드가 닫힐 때 Event가 발생합니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST<br/>
        <button onclick="popman.pop('poptest');">POP</button><br/>
        <div id="tester"></div>
    </body>
    <script>
        popman.setup({modeTest:true});
        var newPopNode = popman.new({
            id: 'poptest',
            expx: '50%',
            expy: '50%',
            content: 'You deserve to be happy.',
            add: function(data){
                document.getElementById('tester').innerHTML = 'add ';
            },
            pop: function(data){
                document.getElementById('tester').innerHTML = 'pop ';
            },
            close: function(data){
                document.getElementById('tester').innerHTML = 'close ';
            },
            afterclose: function(data){
                document.getElementById('tester').innerHTML = 'afterclose ';
            }          
        });        
    </script>
    ```
  
    

## beforefirstpop / afterlastpop
- 처음 POP노드가 열릴 때 / 처음 열었던 POP노드가 닫힐 때
    *@* *!* *@*
    ```html
    <body>
        <div id="tester">TEST</div>
        <button onclick="popman.pop('poptest1');">POP</button>
    </body>
    <script>
        popman.setup({modeTest:true});
        popman.beforeFirstPop(function(){
            alert('First Pop');
        });
        popman.afterLastPop(function(){
            alert('Last Pop');
        });     
      
        popman.new({
            id: 'poptest1', 
            expx: 200, 
            expy: 100, 
            content: 'Hello popman',
            add: function(data){
                var button = document.createElement('button');
                button.innerHTML = 'POP2';
                button.onclick = function(){ popman.pop('poptest2'); };
                data.element.appendChild(button);  
            },
        });
        popman.new({
            id: 'poptest2',
            expx: 100,
            expy: '40%',
            content: 'Hello again ~',
            add: function(data){
                var button = document.createElement('button');
                button.innerHTML = 'POP3';
                button.onclick = function(){ popman.pop('poptest3'); };
                data.element.appendChild(button);
            },
        });
        popman.new({
            id: 'poptest3',
            expx: 80,
            expy: 80,
            content: ':D',
            add: function(data){
                var button = document.createElement('button');
                button.innerHTML = 'POP4';
                button.onclick = function(){ popman.pop('poptest4'); };
                data.element.appendChild(button);    
            },
        });
        popman.new({
            id: 'poptest4',
            expx: 150,
            expy: 100,
            content: 'HaHaHaHaHa !',
        });
    </script>
    ```


    
## afterdetect
- 탐지(detect)를 마친 후
    *@* *!* *@*
    ```html
    <script>
        popman.setup({modeTest:true});
        popman.detect();      
        popman.afterDetect(function(){
            document.getElementById('tester').innerHTML = 'Complete Detect';          
        });        
    </script>
    <body>
        <button onclick="popman.pop('poptest1');">POP1</button>
        <button onclick="popman.pop('poptest2');">POP2</button>
        <button onclick="popman.pop('poptest3');">POP3</button>
        <div id="tester">TEST</div>
        <div id="poptest1" data-pop data-expx="70%" data-expy="40%">Detected Pop1 :)</div>      
        <div id="poptest2" data-pop data-expx="50%" data-expy="30%">Detected Pop2 :)</div>
        <div id="poptest3" data-pop data-expx="40%" data-expy="20%">Detected Pop3 :)</div>
    </body>
    ```
