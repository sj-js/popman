# popman


# 1. 팝

### 1) 등록

```
popMan.add({
    name:'dev1',
    expx:'90%',
    expy:'*',
    easyclose:true,
	add:function(data){
	   console.log('When add');
	   console.log(data);
	   data.popEl.innerHTML = 'hahahahaa<br/><br/>';
	},
    pop:function(data){
        console.log('When pop');
    },
    close:function(data){
        console.log('When close');
    }
});
```




### 2) 열기

```
popMan.pop('dev1');
```



### 3) 닫기

```
popMan.close('dev1');
```







# 2. 조명하기

### 1) 비추기 ON

```
popMan.focusOn(element);
```

### 2) 비추기 OFF

```
popMan.focusOff();
```