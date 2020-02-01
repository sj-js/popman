# Expression
**Pop Element**를 표시할 `위치`와 `사이즈`를 특정 표현식으로 설정할 수 있습니다.


*@* *+prefix* *x* *@* 
```html
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
     var popman = new PopMan();
</script> 
```




## Syntax
- Only size - `SIZE`
    ```
    150
    ```
- With before position - `BEFORE_POSITION ( SIZE )`
    ```
    50(150)
    ```
- With after position - `( SIZE ) AFTER_POSITION`
    ```
    (150)50
    ```
- Full size - `*`, `100%`   
    ```
    *
    ```
- Fill rest to size - `BEFORE_POSITION ( * ) AFTER_POSITION`   
    ```
    50(*)50
    ```
- Fill rest to position - `BEFORE_POSITION ( SIZE ) *`, `* ( SIZE ) AFTER_POSITION`    
    ```
    20(30%)*
    ```
- With minimum and maximum options - `MINIMUM < BEFORE_POSITION < MAXIMUM ( MINIMUM < SIZE < MAXIMUM ) MINIMUM < AFTER_POSITION < MAXIMUM`
    ```
    50<=10%<100(100<=50%<150)
    ```
- Horizontal and vertical expression - `HORIZONTAL_EXPRESSION / VERTICAL_EXPRESSION`
    ```
    50(*)50/10(50%) 
    ```


## Attribute
 속성 | 설명 | Template속성 
------|------|--------------
expx | data-expx | 가로 위치와 사이즈 설정  
expy | data-expy | 세로 위치와 사이즈 설정 
exp | data-exp | 가로세로 같은 설정을 하거나 Slash(/)를 구분자로 동시 설정이 가능 - `expx/expy` 

- Ex - exp) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ exp:'100', content:'TEST 1', modeTest:true });
        popman.popTemp({ exp:'0(100)/0(100)', content:'TEST 2', modeTest:true });
        popman.popTemp({ expx:'(100)0', expy:'(100)0', content:'TEST 3', modeTest:true });  
    </script>
    ```
- Ex - Template) 
    *@* *!* *@*
    ```html
    <script> 
        popman.detect(); 
    </script>
    <body>
        <div data-pop data-exp="100" data-mode-test data-mode-auto>TEST 1</div>
        <div data-pop data-exp="0(100)/0(100)" data-mode-test data-mode-auto>TEST 2</div>
        <div data-pop data-expx="(100)0" data-expy="(100)0" data-mode-test data-mode-auto>TEST 3</div>
    </body>
    ```

    
## Size
기능 | 설명 | 예제
------|------|------
Pixel | 절대값으로 크기 설정 | `150`  
Percentage | 상대값으로 크기 설정 | `75%`
Full | 위치값을 제외하고 나머지는 꽉 채울 수 있도록 설정합니다 | `*`

- Ex - Pixel) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'150', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false 
        }); 
    </script>
    ``` 

- Ex - Percentage) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'75%', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false
        }); 
    </script>
    ``` 

- Ex - Full) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'*', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false 
        }); 
    </script>
    ``` 
  
  

## Position
기능 | 설명 | 예제
------|------|------
Center | Size만 설정시 가운데로 설정 | `150`  
From | 앞 또는 뒤의 특정 위치에 고정 | `100(150)`, `(20%)100`, `10%(200)`, `(200)10%`
Full | 위치값을 제외하고 나머지는 꽉 채울 수 있도록 설정합니다 | `*`, `70(*)`, `(*)25`, `70(*)25`

- Ex - Center) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'150', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false
        }); 
    </script>
    ``` 

- Ex - From) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'(20%)100', 
            content:'TEST^^', 
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false
        }); 
    </script>
    ``` 

- Ex - Full) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'70(*)25',
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false 
        }); 
    </script>
    ``` 




## Minimum and Maximum
기능 | 설명 | 예제
------|------|------
Minimum | Size나 Position이 상대값일 경우 최소값을 지정 | `200<50%`, `200<50%/100<90%`  
Maximum | Size나 Position이 상대값일 경우 최대값을 지정 | `50%<300`, `50%<=300/90%`
Min&Max | Size나 Position이 상대값일 경우 최소값 최대값을 동시에 지정 | `100<50%<200`, `10(100<=30&<200)`, `(100<20%<=150)20`
       
- Ex - Minimum) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'200<50%/100<90%', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false 
        }); 
    </script>
    ``` 

- Ex - Maximum) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'50%<=300/90%', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false
        }); 
    </script>
    ``` 

- Ex - Minimum and Maximum) 
    *@* *!* *@*
    ```html
    <body>
        <!-- None -->    
    </body>
    <script> 
        popman.popTemp({ 
            exp:'(100<20%<=150)20', 
            content:'TEST^^',
            modeTest:true, 
            closebyclickout:false, 
            closebyesc:false
        }); 
    </script>
    ``` 
  
         
       