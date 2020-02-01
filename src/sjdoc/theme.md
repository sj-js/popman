# Theme

*@* *+prefix* *x* *@* 
```html
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
     var popman = new PopMan();
</script> 
```



## Theme
### Not yet prepared.. but you can customize with class



## Class
#### ※ 표
Class | 설명 | 
-----|------|
sj-popman-obj-container | pop, alert, confirm, loading 공통으로 갖는 Class
sj-popman-obj-context-pop |  Pop Element의 상위 Element가 갖는 Class  
sj-popman-obj-context-alert | Alert Element의 상위  Element가 갖는 Class
sj-popman-obj-context-confirm | Confirm Element의 상위  Element가 갖는 Class
sj-popman-obj-context-loading | Loading Element의 상위  Element가 갖는 Class
sj-popman-obj-content | Alert, Confirm, Loading에서 contnet를 표시하는 div element가 갖는 Class 
sj-popman-obj-btn | Alert과 Confirm의 버튼이 갖는 Class
sj-popman-obj-btn-alert | Alert의 OK 버튼이 갖는 Class
sj-popman-obj-btn-confirm | Confirm의 OK 버튼이 갖는 Class
sj-popman-obj-btn-cancel | Confirm의 Cancel 버튼이 갖는 Class
sj-popman-obj-preveiwer | Preview Element가 갖는 Class
sj-popman-obj-previewable | Preview 속성으로 기능이 적용된 Element가 갖는 Class

- Pop
    *@* *!* *@*
    ```html
    <style>
        .sj-popman-obj-container { }
        .sj-popman-obj-context-pop {
            border:1px solid black; border-radius:20px; background:white;
        }
        div[data-pop] {  }
        div[data-pop] > div { padding-left:20px; font-size:20px; font-weight:bold; }
    </style>
    <script>
        function test(){
            popman.popTemp({content:'Hello!???<div>Apple<br/>Mango</div>'});
        }
    </script>
    <body onload="test();">
        <button onclick="test();">POP</button>
    </body>    
    ```

- Alert
    *@* *!* *@*
    ```html
    <style>
        .sj-popman-obj-container { }
        .sj-popman-obj-context-alert { 
            border:1px solid black; border-radius:20px; background:white;  
        }
        .sj-popman-obj-content{
            font-size:18px; color:deepskyblue; margin-bottom:20px;
        }   
        .sj-popman-obj-btn {
            border:0px solid; border-radius:10px; background:#BBBBBB; cursor:pointer;
            font-weight:bold; font-size:20px; width:50px; height:35px;
        }
        .sj-popman-obj-btn:hover { background:#EEEEEE; }
        .sj-popman-obj-btn-alert { color:hotpink; }       
        div[data-pop] {  }
    </style>
    <script>
        popman.setup({alertExp:'50%'});
        function test(){
            popman.alert('Hello!???', function(){
                alert('OK!');
                return true;
            });
        }   
    </script>
    <body onload="test();">
        <button onclick="test();">ALERT</button>
    </body>
    ```

- Confirm
    *@* *!* *@*
    ```html
    <style>
        .sj-popman-obj-container { }
        .sj-popman-obj-context-confirm { 
            border:1px solid black; border-radius:50px; background:white;
        }
        .sj-popman-obj-content{
            font-size:18px; color:deepskyblue; margin-bottom:20px;
        }
        .sj-popman-obj-btn {
            border:0px solid; border-radius:10px; background:#BBBBBB; cursor:pointer;
            font-weight:bold; font-size:20px; width:50px; height:35px;
        }
        .sj-popman-obj-btn:hover { background:#EEEEEE; }
        .sj-popman-obj-btn-confirm { color:deeppink; }
        .sj-popman-obj-btn-cancel { color:lightpink; }
        div[data-pop] {  }
    </style>
    <script>
        popman.setup({confirmExp:'50%'})
        function test(){
            popman.confirm('Right? Ok?',
                function(popObject){
                    alert('Yes!');
                    return true;
                },
                function(popObject){
                    alert('No!');
                    return true;
                },
            );
        }   
    </script>
    <body onload="test();">
        <button onclick="test();">CONFIRM</button>
    </body>
    ```

- Loading
    *@* *!* *@*
    ```html
    <style>
        .sj-popman-obj-container { }
        .sj-popman-obj-context-loading { 
            font-size:50px; font-weight:bold; color:lightsalmon;
        }
        .sj-popman-obj-content{ }
        div[data-pop] {  }
    </style>
    <script>
        popman.setup({loadingExp:'50%'});
        function test(){
            popman.loading('Loading..', function(resolve, reject){    
                setTimeout(function(){ 
                    resolve();
                }, 2000);
            });
        }   
    </script>
    <body onload="test();">
        <button onclick="test();">LOADING</button>
    </body>
    ```

- Preview
    *@* *!* *@*
    ```html
    <style>
      .sj-popman-obj-previewer { border:0px solid; border-radius:8px; background:#000000; color:#FFFFFF; font-size:30px;}
    </style>
    <script>
        popman.setup({modeTest:true, modeAnimation:true, alertExp:'50%', confirmExp:'80%'}).detect();
    </script>
    <body>
        <button data-preview="Hello 🙋‍♀️🙋‍♂️어이~ 안녕~?" onclick="popman.alert('Hello there?');">Hello</button>
        <button data-preview="💪불끈불끈" onclick="popman.alert('You already get power!');">Get power</button>
        <button data-preview="💎머니머니" onclick="popman.confirm('Did you get some money?');">Get money</button>
    </body>
    ```