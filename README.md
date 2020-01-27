# PopMan
## 💬
[![Build Status](https://travis-ci.org/sj-js/popman.svg?branch=master)](https://travis-ci.org/sj-js/popman)
[![All Download](https://img.shields.io/github/downloads/sj-js/popman/total.svg)](https://github.com/sj-js/popman/releases)
[![Release](https://img.shields.io/github/release/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
[![License](https://img.shields.io/github/license/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
    
- 새 창(window)을 띄우지 않고 특정정보를 부각시킬 수 있습니다.
- ✨ Source: https://github.com/sj-js/popman
- ✨ Document: https://sj-js.github.io/sj-js/popman



## Getting Started

0. Load
    - Browser
        ```html    
        <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@sj-js/popman/dist/js/popman.min.js"></script>
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
      
1. `popman.new({OPTIONS})`로 POP Element를 등록합니다.
    ```html
    popman.new({
        id:'pop-test',
        exp:'50%/90%',
        content: 'This is contents.' 
    });
    ```
   
2. `popman.pop('Element ID')`로 POP Element를 호출합니다.
    ```js
    popman.pop('pop-test');
    ```
   
3. Simple Example
    ```html
    <!DOCTYPE html>
    <HTML>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@sj-js/popman/dist/js/popman.min.js"></script>
            <script>
                var popman = new PopMan();
            </script>            
        </head>
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
    </HTML>
    ```
