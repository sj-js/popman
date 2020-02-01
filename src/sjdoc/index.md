# PopMan
## 💬
[![Build Status](https://travis-ci.org/sj-js/popman.svg?branch=master)](https://travis-ci.org/sj-js/popman)
[![All Download](https://img.shields.io/github/downloads/sj-js/popman/total.svg)](https://github.com/sj-js/popman/releases)
[![Release](https://img.shields.io/github/release/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
[![License](https://img.shields.io/github/license/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
    
- 새 창(window)을 띄우지 않고 특정정보를 부각시킬 수 있습니다.
- ✨ Source: https://github.com/sj-js/popman
- ✨ Document: https://sj-js.github.io/sj-js/popman

    


        
## Index
*@* **order** *@*
```
- PopMan
- New/Pop/Close
- Expression
- Alert
- Confirm
- Loading
- Preview
- Event
- Functions
- Theme
- Example
```



## 1. Getting Started

### 1-1. How to load?
- Browser
    ```html    
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/popman/dist/js/popman.min.js"></script>
    <script>
         var popman = new PopMan();
    </script>
    ```
    *@* *+prefix* *x* *@* 
    ```html
    <script src="../crossman/crossman.js"></script>
    <script src="../popman/popman.js"></script>
    <script>
        var popman = new PopMan();
    </script>
    ```  
- ES6+
    ```bash
    npm i @sj-js/popman
    ```
    ```js
    const PopMan = require('@sj-js/popman');
    const popman = new PopMan();
    ```



### 1-2. Simple Example
For convenience, 1-1 code, which loads and creates a Library in the example, is omitted.

##### Exapmle - popman.pop() with script
1. `popman.new({OPTIONS})`로 POP Element를 등록합니다.
    ```js
    popman.new({
        id:'pop-test', //Pop Element ID
        exp:'50%/90%', //Width and Height
        content: 'This is contents.' 
    });
    ```
   
2. `popman.pop('Element ID')`로 POP Element를 호출합니다.
    ```js
    popman.pop('pop-test');
    ```
   
3. 👨‍💻
    *@* *!* *@*
    ```html
    <body>        
        Hello Popman
        <button onclick="popman.pop('pop-test');">POP</button>
        <div id="tester">TEST</div>
    </body> 
    <script>
        popman.setup({modeTest:true});
        popman.new({
            id:'pop-test',
            exp:'50%/90%',
            closebyesc:true,
            content:'This is contents. <br/><br/>',
            modeAuto:true,     //Open automatically 
            add:function(data){               
                document.getElementById('tester').innerHTML = 'When add';
            },
            pop:function(data){
                document.getElementById('tester').innerHTML = 'When pop';
            },
            close:function(data){
                document.getElementById('tester').innerHTML = 'When close';
            }
        });
    </script>
    ```



##### Exapmle - popman.pop() with template    
1. Pop Element에 `data-pop`속성을 설정합니다.
    ```html
    <div id="pop-test" data-pop data-exp="300/200" >
        Pop contents with template
    </div>
    ```
2. `popman.detect()`를 사용하면 **data-pop** 속성을 가진 element가 등록됩니다.
    ```js
    popman.detect();
    ```
3. `popman.pop('ID')`를 호출하면 화면에 표시됩니다.
    ```js
    popman.pop('pop-test');
    ```
4. 👨‍💻
    *@* *!* *@*
    ```html
    <script>
        popman.setup({modeTest:true}).detect();
    </script>
    
    <body>
        <button onclick="popman.pop('pop-test');">POP</button>
        <div id="pop-test" data-pop data-exp="300/200" data-closebyclickin data-mode-auto>
            <br/>
            <div id="divAlertMsg" style="font-size:35px; color:white; border:2px solid; background:#F08047;">
                TEST
            </div>
            <div id="divAlert1stMsg">
                TEST
            </div>
        </div>       
    </body>
    ```
  


##### Exapmle - popman.alert()
- 👨‍💻    
    *@* *!* *@*
    ```html
    <body>
        Hello Popman
        <button onclick="popman.alert('Alert!');">ALERT</button>
    </body>
    <script>
        popman.setup({modeTest:true, alertExp:'200/100'});   
        popman.alert('Alert Something', function(){
            alert('Alert! Ok!');
            return true;
        });        
    </script>
    ```
  
  
    
##### Exapmle - popman.confirm()
- 👨‍💻
    *@* *!* *@*
    ```html
    <body>
        Hello Popman
        <button onclick="popman.confirm('Confirm!');">CONFIRM</button>
    </body>
    <script>
        popman.setup({modeTest:true, confirmExp:'300/150'});
        popman.confirm('Confirm Something',
            function(){
                alert('OK!');
                return true;
            },
            function(){
                alert('Cancel!');
                return true;
            },
        );        
    </script>
    ```
    
    
    
##### Exapmle - popman.loading()
- 👨‍💻
    *@* *!* *@*
    ```html
    <body>
        Hello Popman
        <button onclick="loadSomething();">LOAD</button>
    </body>
    <script>
        popman.setup({modeTest:true, loadingExp:'80%/100'}); 
        
        function loadSomething(){
            popman.loading('LOADING..  Something..', function(resolve, reject){ 
                setTimeout(function(){ 
                     resolve();
                }, 2000);             
            });         
        }
        loadSomething();
    </script>
    ```


  