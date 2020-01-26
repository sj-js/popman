# PopMan
[![Build Status](https://travis-ci.org/sj-js/popman.svg?branch=master)](https://travis-ci.org/sj-js/popman)
[![All Download](https://img.shields.io/github/downloads/sj-js/popman/total.svg)](https://github.com/sj-js/popman/releases)
[![Release](https://img.shields.io/github/release/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
[![License](https://img.shields.io/github/license/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)

✨ Detail: https://sj-js.github.io/sj-js/popman



## Getting Started

1. Load
    ```html    
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/popman/dist/js/popman.js"></script>
    <script>
         var popman = new PopMan();
    </script>
    ```  
2. `popman.new({OPTIONS})`로 POP Element를 등록합니다.
    ```html
    popman.new({
        id:'pop-test',
        exp:'50%/90%',
        content: 'This is contents.' 
    });
    ```
3. `popman.pop('Element ID')`로 POP Element를 호출합니다.
    ```js
    popman.pop('pop-test');
    ```
4. Simple Example
    ```html
    <!DOCTYPE html>
    <HTML>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@sj-js/popman/dist/js/popman.js"></script>
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
