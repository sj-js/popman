# Preview
마우스를 올렸을 때 미리 특정 정보를 얻을 수 있습니다.

*@* *+prefix* *x* *@*
```html 
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```



## With template
- `data-preview`속성에 특정정보를 서술합니다.
    *@* *!* *@*
    ```html
    <script>
        popman.setup({modeTest:true, modeAnimation:true, alertExp:'50%', confirmExp:'80%'}).detect();
    </script>
    <body>
        <button data-preview="Hello 🙋‍♀️🙋‍♂️어이~ 안녕~?" onclick="popman.alert('Hello there?');">Hello</button>
        <button data-preview="💪불끈불끈" onclick="popman.alert('You already get power!');">Get power</button>
        <button data-preview="💎머니머니" onclick="popman.confirm('Did you get some money?');">Get money</button>
    </body>
    ```
  


## Custom Preview
- 다음을 활용하여 상황에 맞는 Preview를 만들 수 있습니다.  
    - `popman.startPreveiw(EVENT, POSITION_X, POSITION_Y, HTML, CLASS)`
    - `popman.movePreveiw(EVENT, POSITION_X, POSITION_Y, HTML)`
    - `popman.stopPreveiw()`
    *@* *!* *@*
    ```html
    <style>
        .sj-popman-obj-previewer { border:1px solid lightslategray; border-radius:8px; }
        .preview { background:slategray; color:white; font-size:20px; }  
    </style>
    <script>
        popman.setup({modeTest:true, modeAnimation:true, alertExp:'50%', confirmExp:'80%'}).detect();
        var lastTargetId = null;
        window.addEventListener('mousemove', function(event){
            var target = event.target;
            var statusOn = (target && target.tagName.toUpperCase() == 'BUTTON');
            var statusSame = (statusOn && target.id == lastTargetId);
            lastTargetId = (statusOn) ? target.id : null;                  
            if (statusOn){ //MouseOver
                (statusSame) ? popman.movePreviewer(event, 30, 35) : popman.startPreviewer(event, 30, 35,  ('[Preview Test] ' + lastTargetId), 'preview');
            }else{ //MouseOut
                popman.stopPreviewer();
            }
        });
    </script>
    <body>
        <button id="preview-test-1" onclick="popman.alert('Hello there?');">Hello</button>
        <button id="preview-test-2" onclick="popman.alert('You already get power!');">Get power</button>
        <button id="preview-test-3" onclick="popman.confirm('Did you get some money?');">Get money</button>
    </body>
    ```

  
