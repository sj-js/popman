# New/Pop/Close
Pop Element를 등록하고 열고 닫습니다.
   
*@* *+prefix* *x* *@* 
```html
<script src="../crossman/crossman.js"></script>
<script src="../popman/popman.js"></script>
<script>
    var popman = new PopMan();
</script>
```   



## popman.new({OPTIONS..})
Pop Element를 정의하여 등록합니다.

#### ※ 속성
속성 | 형식 | 기본값 | 특징
-----|------|--------|------
id | String | {AUTO_GEN} | Pop Element의 ID
name | String | null | Pop Element의 Name
content | String | '' | POP노드가 등록될 때 
exp | String | 50%/50% | Pop Element의 사이즈와 위치 표현식
expx | String | null |Pop Element의 가로 사이즈와 위치 표현식
expy | String | null |Pop Element의 세로 사이즈와 위치 표현식
modeTest | Boolean | false | test를 위해 CSS 설정없이 눈에 띄는 Style을 자동 설정
modeDark | Boolean | true | 배경을 어두운 반투명 처리합니다.
modeAuto | Boolean | false | 등록과 동시에 Pop Element를 엽니다.
modeAnimation | Boolean | false | PopElement를 Fade-In/Fade-Out 효과와 함께 열고 닫습니다. 설정시 `popman.setup({modeAnimation:true});`도 함께 설정해야합니다.
closebyclickin | Boolean | false | Pop Element의 내부를 클릭했을 때 창을 닫습니다.
closebyclickout | Boolean | true | Pop Element의 외부(어두운 영역)을 클릭했을 때 창을 닫습니다.
closebyesc | Boolean | true | `[ESC]`키를 누를 경우 창을 닫습니다.
add | Function | null | 등록시 발생하는 Event          
pop | Function | null | Pop Element가 열릴 때 발생하는 Event
afterpop | Function | null | 'pop' Event 후에 발생하는 Event
close | Function | null | Pop Element가 닫힐 때 발생하는 Event
afterclose | Function | null | 'close' Event 후에 발생하는 Event

- All Options
    *@* *!* *@*
    ```html
    <body>
        <button onclick="popman.pop('pop-test');">POP</button>
    </body>
    <script>
        popman.new({
            id:'pop-test',
            name:'some-pop',
            content:'Test pop',
            exp:'20(*)20/*(50%)',
            // expx:'20(*)20',
            // expy:'*(50%)',
            modeTest:true,        //To show you testing example
            modeDark:true,
            modeAuto:true,        //Automatically Pop
            modeAnimation:false,  //Experimental..  ( If you want to set true, also you needs to popman.setup({modeAnimation:true}) );
            closebyclickin:false,
            closebyclickout:true,
            closebyesc:true,
            add:function(data){ 
                //To show you example
                data.element.appendChild( document.createElement('input') ); 
            },
            pop:function(data){  },
            afterPop:function(data){  },
            close:function(data){  },
            afterClose:function(data){  }    
        });
    </script>
    ```
  
  
  



## popman.pop(ID or ELEMENT or CONDITION)
등록된 노드를 화면에 표시합니다.
- `popman.new({..})`로 반환된 element로 `popman.pop(ELEMENT)`하면 popup됩니다. 
    *@* *!* *@*
    ```html
    <body>POPMAN TEST - Pop with element</body>
    <script>
        var newPopNode = popman.new({content: 'NOTICE<br/> Hello popman', modeTest:true});
        popman.pop(newPopNode);
    </script>
    ```
 - `popman.pop(ID)` or `popman.pop({PROPERTIES})`
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST - Pop with several ways
        <button onclick="popman.pop('pop-test');">Pop with ID</button>
        <button onclick="popman.pop({name:'some-pop'});">Pop with name</button>
        <button onclick="popman.pop({customTestProp:'*T_00*'});">Pop with Condition</button>
    </body>
    <script>
        popman.new({id:'pop-test', name:'some-pop', customTestProp:'TEST_001', content: 'NOTICE<br/> Hello popman', modeTest:true});
        popman.pop('pop-test');
    </script>
    ```
 


## popman.popTemp({OPTIONS..})
- 등록없이 일시적으로 Pop Element를 만듭니다.
    *@* *!* *@*
    ```html
    <body>POPMAN TEST - popTemp</body>
    <script>
        popman.popTemp({content:'NOTICE<br/> Hello popman', modeTest:true});
    </script>
    ```



## exp / expx / expy
- Pop Element의 크기와 위치를 특정표현식으로 정의합니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST
        <button onclick="popman.pop('poptest-1');">POP</button>
    </body>
    <script>
        popman.setup({modeTest:true});
        //Pop 1
        var newPopNode = popman.new({
            id: 'poptest-1',
            exp: '200/100',   // Width:200px, Height:100px
            // expx: 200,        // Width:200px
            // expy: 100,        // Height:100px
            content: 'NOTICE<br/> Hello popman',
            modeAuto: true,
            add: function(data){
                var buttonToPop2 = document.createElement('button');
                buttonToPop2.innerHTML = 'POP2';
                buttonToPop2.onclick = function(){ popman.pop('poptest-2'); };
                data.element.appendChild(buttonToPop2);
            }
        });
      
        //Pop 2
        var newPopNode2 = popman.new({
            id: 'poptest-2',
            exp: '100/40%',   // Width:100px, Height:40%
            // expx: 100,        // Width:100px
            // expy: '40%',      // Height:40%
            content: 'Hello again ~'
        });
    </script>
    ```
    
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST
        <button onclick="popman.pop('poptest');">POP</button>
    </body>
    <script>
        popman.new({
            id: 'poptest',
            expx: '10(200)',      //왼쪽 10px 띄고, 200px의 크기로 설정
            expy: '*(50%)10',     //오른쪽 10px 띄고, 50%의 크기로 설정
            content: 'NOTICE<br/> Hello popman',
            modeTest:true,
            modeAuto:true
        });
    </script>
    ```
    
## closeby...
- 쉽게 노드를 닫을 수 있도록 옵션을 설정할 수 있습니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST
        <button onclick="popman.pop('poptest');">POP</button>
    </body>
    <script>
        popman.new({
            id: 'poptest',
            exp: '70%',
            closebyclickin: false,    //Click inside of pop element to close
            closebyclickout: true,    //Click outisde of pop element to close
            closebyesc: true,         //Press [ESC] button to close
            content: 'NOTICE<br/> Hello popman',
            modeTest: true
        });        
        popman.pop('poptest');
    </script>
    ```
    


## popman.close(ID or ELEMENT or CONDITION)
- 특정 Pop Element를 닫습니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST
        <button onclick="popman.pop('poptest');">POP</button>
    </body> 
    <script>
        popman.new({
            id: 'poptest',
            content: 'NOTICE<br/> Hello popman',
            modeTest: true,
            add: function(data){
                var buttonToClose = document.createElement('button');
                buttonToClose.innerHTML = 'Close this pop';
                buttonToClose.onclick = function(){ popman.close('poptest'); };
                data.element.appendChild(buttonToClose);  
            }       
        });        
    </script>
    ```
  
  
  
## popman.closeAll()
- 열려있는 모든 Pop Element를 닫습니다.
    *@* *!* *@*
    ```html
    <body>
        POPMAN TEST
        <button onclick="popman.pop('poptest-1');">POP</button>
    </body> 
    <script>
        popman.new({
            id: 'poptest-1',
            content: 'Hello popman -1',
            modeTest: true,
            modeAuto: true,
            add: function(data){
                var buttonToPop2 = document.createElement('button');
                buttonToPop2.innerHTML = 'Pop 2';
                buttonToPop2.onclick = function(){ popman.pop('poptest-2'); };
                data.element.appendChild(buttonToPop2);  
            }       
        });
  
        popman.new({
            id: 'poptest-2',
            content: 'Hello popman - 2',
            exp: '40%',
            closebyclickin: false,     //Click inside of pop element to close
            closebyclickout: false,    //Click outisde of pop element to close
            closebyesc: false,         //Press [ESC] button to close
            modeTest: true,
            add: function(data){
                var buttonToClose = document.createElement('button');
                buttonToClose.innerHTML = 'Close this pop';
                buttonToClose.onclick = function(){ popman.close('poptest-2'); };
                data.element.appendChild(buttonToClose);
                var buttonToCloseAll = document.createElement('button');
                buttonToCloseAll.innerHTML = 'Close All';
                buttonToCloseAll.onclick = function(){ popman.closeAll(); };
                data.element.appendChild(buttonToCloseAll);  
            }       
        });        
    </script>
    ```
