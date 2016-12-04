# popman


# 1. 팝

### 1) 등록

```js
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

```js
popMan.pop('dev1');
```



### 3) 닫기

```js
popMan.close('dev1');
```







# 2. 조명하기

### 1) 비추기 ON

```js
popMan.focusOn(element);
```

### 2) 비추기 OFF

```js
popMan.focusOff();
```



# 3. 안내하기 (구상중)

.start();
.before();
.next();
.stop();


[
	{
		id:'guide1', 
		basepath:'aaa/bbb/ccc',
		frame:'',
		focusOn:el,
		next:'',
		time:5000,
		pop:[]
		if:{
			'aaa/bbb/ccc':''
		}
	},
	{

	}
]