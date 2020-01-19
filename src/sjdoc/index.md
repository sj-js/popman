# PopMan
## 💬
[![Build Status](https://travis-ci.org/sj-js/popman.svg?branch=master)](https://travis-ci.org/sj-js/popman)
[![All Download](https://img.shields.io/github/downloads/sj-js/popman/total.svg)](https://github.com/sj-js/popman/releases)
[![Release](https://img.shields.io/github/release/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
[![License](https://img.shields.io/github/license/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
    
- 새 창(window)을 띄우지 않고 특정정보를 부각시킬 수 있습니다.
- Source: https://github.com/sj-js/popman
- Document: https://sj-js.github.io/sj-js/popman

    


        
## Index
*@* **order** *@*
```
- PopMan
- new() and pop()
- Event
- alert()
- confirm()
- loading()
- Functions
- Theme
- Example
```



## 1. Getting Started

### 1-1. How to use?

1. 스크립트 불러오기
    - Browser
        ```html    
        <script src="https://cdn.jsdelivr.net/gh/sj-js/crossman/dist/js/crossman.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/sj-js/popman/dist/js/popman.js"></script>
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
- For convenience, the following code, which loads and creates a Library in the example, is omitted.
    ```html
    <script src="https://cdn.jsdelivr.net/gh/sj-js/crossman/dist/js/crossman.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/sj-js/popman/dist/js/popman.js"></script>
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




##### Example with script
1. Test - pop()    
    *@* *!* *@*
    ```html
    <body>        
        Hello Popman
        <button onclick="popman.pop({name:'dev1'});">POP</button>
        <div id="tester">TEST</div>
    </body> 
    <script>
        popman.setup({modeTest:true});
        popman.new({
            name:'dev1',
            expx:'50%',
            expy:'90%', 
            closebyesc:true,
            content: 'This is contents. <br/><br/>', 
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
    
2. Test - alert()
    *@* *!* *@*
    ```html
    <body>
        Hello Popman
        <button onclick="popman.alert('Alert!');">ALERT</button>
    </body>
    <script>
        popman.setup({modeTest:true, alertExpx:'200', alertExpy:'100'});   
        popman.alert('Alert');        
    </script>
    ```
    
3. Test - confirm()
    *@* *!* *@*
    ```html
    <body>
        Hello Popman
        <button onclick="popman.confirm('Confirm!');">CONFIRM</button>
    </body>
    <script>
        popman.setup({modeTest:true, confirmExpx:'300', confirmExpy:'150'});
        popman.confirm('Confirm');        
    </script>
    ```
    
4. Test - loading()    
    *@* *!* *@*
    ```html
    <body>
        Hello Popman
        <button onclick="loadSomething();">LOAD</button>
    </body>
    <script>
        popman.setup({modeTest:true, loadingExpx:'150', loadingExpy:'150'}); 
        
        function loadSomething(){
            popman.loading('LOADING', function(resolve, reject){ 
                setTimeout(function(){ 
                     resolve();
                }, 2000);             
            });         
        }
        loadSomething();
    </script>
    ```



##### Example with template          
  
detect 기능을 이용하여 미리 작성한 HTML에 적용할 수 있습니다.

1. Element에 다음 속성을 명시합니다.
    - `data-pop`

2. `detect()`를 사용합니다.
    ```js
    popman.detect();
    ```

3. Test
    *@* *!* *@*
    ```html
    <script>
        popman.setup({modeTest:true});
        popman.detect();      
    </script>
    
    <body>
        <button onclick="popman.pop('popup-alert');">POP</button>
        <div id="popup-alert" data-pop data-expx="*(300)*" data-expy="*(200)*" data-closebyclickin >
            <br/>
            <div id="divAlertMsg" style="font-size:35px; font-weight:bold; color:white; border:2px solid; background:#F08047;">TEST</div>
            <br/>
            <div id="divAlert1stMsg" style="font-size:15px; font-weight:bold; ">TEST</div>
        </div>       
     </body>
    ```
  
  