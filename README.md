
[![Build Status](https://travis-ci.org/sj-js/popman.svg?branch=master)](https://travis-ci.org/sj-js/popman)
[![All Download](https://img.shields.io/github/downloads/sj-js/popman/total.svg)](https://github.com/sj-js/popman/releases)
[![Release](https://img.shields.io/github/release/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)
[![License](https://img.shields.io/github/license/sj-js/popman.svg)](https://github.com/sj-js/popman/releases)



# PopMan

(Detail: https://sj-js.github.io/dist/popman/README.html)



## Getting Started

1. Script
    ```html    
    <script src="https://rawgit.com/sj-js/crossman/master/dist/js/crossman.js"></script>
    <script src="https://rawgit.com/sj-js/popman/master/dist/js/popman.js"></script>
    <script>
         var popman = new PopMan();
    </script>
    ```  

2. POP
    - Make POP 
        ```js
        popman.new({id:'poptest', width:'100px', minHeight:'35px'});
        ```
        
    - POP
        ```js
        boxman.pop('poptest');
        ```
    
    
3. ALERT
    ```js
    boxman.alert(' WARNING ! ');
    ```

4. CONFIRM
    ```js
    boxman.confirm(' OK? ');
    ```

5. LOADING
    ```js
    boxman.loading('LOADING..', function(resolve, reject){
       resolve();
    });
    ```
    
