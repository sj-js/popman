/****************************************************************************************************
 *  PopMan
 *  Created By sujkim
 ****************************************************************************************************/
function PopMan(){
    var that = this;
    this.event = new SjEvent();

    this.popMap = {};
    this.popElementIdMap = {};
    this.darkElementList = [];
    this.popElementStackList = [];
    this.focusDarkMap = {};
    this.lastPopIndex = 0;
    this.divCamSizeChecker;
    //Close Pop By Key [ESC]
    getEl(document).addEventListener('keydown', function(event){
        var keyCode = (event.keyCode) ? event.keyCode : event.which;
        if (keyCode == 27){ //[ESC] => Close Latest Index Pop
            var latestIndex = that.popElementStackList.length -1;
            var lastestIndexPopElement = that.popElementStackList[latestIndex];
            var lastestIndexPop = that.getPop(lastestIndexPopElement);
            // console.log(latestIndex, lastestIndexPopElement, lastestIndexPop, that.popElementStackList);
            if (lastestIndexPop && lastestIndexPop.closebyesc)
                that.close(lastestIndexPop.element);
        }
    });
    //Automatically Adjust Pop
    getEl().ready(function(){
        getEl().resize(function(){
            for (var popmanId in that.popMap){
                var pop = that.getPopByManId(popmanId);
                if (that.isOn(pop.element))
                    that.adjustPossition(pop.element);
            }
        });
    });
    return this;
}

/*************************
 *
 * DETECT DOM SETUPED WITH POPMAN OPTION
 *
 *************************/
PopMan.prototype.detect= function(afterDetectFunc){
    var that = this;
    getEl().ready(function(){
        var setupedElementList
        /** 객체탐지 적용(팝창) **/
        setupedElementList = document.querySelectorAll('[data-pop]');
        for (var j=0; j<setupedElementList.length; j++){
            that.add(setupedElementList[j]);
        }
        /** Run Function After Detect **/
        if (afterDetectFunc)
            afterDetectFunc(that);
        if (that.hasEventListenerByEventName('afterdetect'))
            that.execEventListenerByEventName('afterdetect');
    });
    return this;
};
PopMan.prototype.afterDetect = function(func){
    this.addEventListenerByEventName('afterdetect', func);
    return this;
};

/*************************
 *
 * EVENT - ADD
 *
 *************************/
PopMan.prototype.addEventListener               = function(element, eventName, eventFunc){ return this.event.addEventListener(element, eventName, eventFunc); };
PopMan.prototype.addEventListenerByEventName    = function(eventName, eventFunc){ return this.event.addEventListenerByEventName(eventName, eventFunc); };

/*************************
 *
 * EVENT - CHECK
 *
 *************************/
PopMan.prototype.hasEventListener               = function(element, eventName, eventFunc){ return this.event.hasEventListener(element, eventName, eventFunc); };
PopMan.prototype.hasEventListenerByEventName    = function(eventName, eventFunc){ return this.event.hasEventListenerByEventName(eventName, eventFunc); };
PopMan.prototype.hasEventListenerByEventFunc    = function(eventFunc){ return this.event.hasEventListenerByEventFunc(eventFunc); };

/*************************
 *
 * EVENT - REMOVE
 *
 *************************/
PopMan.prototype.removeEventListener            = function(element, eventName, eventFunc){ return this.event.removeEventListener(element, eventName, eventFunc); };
PopMan.prototype.removeEventListenerByEventName = function(eventName, eventFunc){ return this.event.removeEventListenerByEventName(eventName, eventFunc); };
PopMan.prototype.removeEventListenerByEventFunc = function(eventFunc){ return this.event.removeEventListenerByEventFunc(eventFunc); };

/*************************
 *
 * EVENT - EXECUTE
 *
 *************************/
PopMan.prototype.execEventListener              = function(element, eventName, event){ return this.event.execEventListener(element, eventName, event); };
PopMan.prototype.execEventListenerByEventName   = function(eventName, event){ return this.event.execEventListenerByEventName(eventName, event); };



/*************************
 *
 * POP
 *
 *************************/
PopMan.prototype.add = function(element){
    //ElEMENT 속성에 data-pop이 없으면 자동 추가
    if (element.getAttribute('data-pop') == null || element.getAttribute('data-pop') == undefined)
        element.setAttribute('data-pop', '');

    //ElEMENT 속성만 있고 값은 명시안할 경우 자동 명시
    if (element.getAttribute('data-closebyclickin') != null && element.getAttribute('data-closebyclickin') != undefined && element.getAttribute('data-closebyclickin') == '')
        element.setAttribute('data-closebyclickin', 'true');
    if (element.getAttribute('data-closebyclickout') != null && element.getAttribute('data-closebyclickout') != undefined && element.getAttribute('data-closebyclickout') == '')
        element.setAttribute('data-closebyclickout', 'true');
    if (element.getAttribute('data-escclose') != null && element.getAttribute('data-escclose') != undefined && element.getAttribute('data-escclose') == '')
        element.setAttribute('data-escclose', 'true');

    this.set(element, {
        element:    element,
        expx:       element.getAttribute('data-expx'),
        expy:       element.getAttribute('data-expy'),
        closebyesc:     getData(element.getAttribute('data-escclose')).parse(),
        closebyclickout: getData(element.getAttribute('data-closebyclickout')).parse(),
        closebyclickin: getData(element.getAttribute('data-closebyclickin')).parse(),
        pop:        element.getAttribute('data-pop'),
        close:      element.getAttribute('data-close')
    });
};
PopMan.prototype.new = function(infoObj){
    var newElement = newEl('div', {'data-pop':'true'}, '');
    this.set(newElement, infoObj);
    return newElement;
};
PopMan.prototype.set = function(element, infoObj){
    var that = this;
    var popMap = this.popMap;
    element = getEl(element).obj;
    infoObj = (infoObj) ? infoObj : {};

    //이중적용 방지
    if (element.isAdaptedBox){
        return false;
    }else{
        element.isAdaptedBox = true;
        getEl(element).clas.add('sj-obj-box');
    }

    //MAN ID 적용
    var popmanId = (infoObj.popmanId) ? infoObj.popmanId : getEl(popMap).getNewSeqId('popmanId');
    element.popmanId = popmanId;

    infoObj.element = element;
    infoObj.darkElement = null;
    infoObj.isPoped = false;

    if (infoObj.closebyclickin == undefined || infoObj.closebyclickin == null)
        infoObj.closebyclickin = false;

    if (infoObj.closebyclickout == undefined || infoObj.closebyclickout == null)
        infoObj.closebyclickout = true;

    if (infoObj.closebyesc == undefined || infoObj.closebyesc == null)
        infoObj.closebyesc = true;
    //Set View
    infoObj.popContainerElement = this.setView(infoObj);
    //컬렉션에 저장
    this.popMap[popmanId] = infoObj;
    this.popElementIdMap[element.id] = infoObj;
};

PopMan.prototype.setView = function(infoObj){
    var that = this;
    var popView = document.createElement('div');
    popView.style.display = 'inline-block';
    popView.style.background = 'white';
    popView.style.width = (infoObj.width) ? infoObj.width : '100%';
    popView.style.height = (infoObj.height) ? infoObj.height : '100%';
    popView.style.overflow = 'hidden';
    getEl(popView).hideDiv();
    // popView - Event
    if (infoObj.closebyclickin){
        getEl(popView).addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            that.close(infoObj.element);
        });
    }else{
        getEl(popView).addEventListener('click', function(event){
            // event.preventDefault();
            event.stopPropagation();
        });
    }

    // body <- popView
    getEl(document.body).add(popView);
    // popView <- Some Dom
    var element = infoObj.element;
    if (typeof element == 'function'){
        getEl(popView).add( element(infoObj) );
    }else if (typeof element == 'object'){
        getEl(popView).add(element);
        element.style.display = 'block';
        // addObj.style.position = '';
        // addObj.style.left = '0px';
        // addObj.style.top = '0px';
        element.style.width = '100%';
        element.style.height = '100%';
    }
    return popView;
};


PopMan.prototype.getPop = function(element){
    if (typeof element == 'string'){
        return this.getPopById(element);
    }else if (element instanceof Element){
        return this.getPopByEl(element);
    }else{
        var resultList = this.getPopsByCondition(element);
        if (resultList != null && resultList.length > 0)
            return resultList[0];
    }
    return;
};
PopMan.prototype.getPopById = function(id){
    return this.popElementIdMap[id];
};
PopMan.prototype.getPopByEl = function(el){
    var popMap = this.popMap;
    if (el && el.popmanId){
        var popmanId = el.popmanId;
        var popInfo = popMap[popmanId];
        return popInfo;
    }
};
PopMan.prototype.getPopByManId = function(manid){
    return this.popMap[manid];
};
PopMan.prototype.getPops = function(){
    return this.popMap;
};
PopMan.prototype.getPopsByCondition = function(condition){
    var resultList = [];
    var popMap = this.popMap;
    for (var popmanId in popMap){
        var popInfo = popMap[popmanId];
        var result = getEl(popInfo).find(condition);
        if (result)
            resultList.push(result);
    }
    return resultList;
};
PopMan.prototype.getPopsByDomAttributeCondition = function(condition){
    var resultList = [];
    var popMap = this.popMap;
    for (var popmanId in popMap){
        var popInfo = popMap[popmanId];
        var el = popInfo.element;
        var result = getEl(el).findDomAttribute(condition);
        if (result)
            resultList.push(result);
    }
    return resultList;
};




PopMan.prototype.isOn = function(element){
    var pop = this.getPop(element);
    return pop && pop.isPoped;
};

PopMan.prototype.toggle = function(element){
    (this.isOn(element)) ? this.close(element) : this.pop(element);
};

PopMan.prototype.pop = function(element, callback){
    var pop = this.getPop(element);
    var userSetPopElement = pop.element;
    userSetPopElement.popIndex = (++this.lastPopIndex);
    userSetPopElement.setAttribute('data-pop-index', userSetPopElement.popIndex);
    if (!pop.isPoped){
        if (this.hasEventListener(element, 'pop'))
            this.execEventListener(element, 'pop');
        if (!pop.noDark){
            pop.darkElement = this.spreadDark(pop);
            getEl(pop.darkElement).add(pop.popContainerElement);
            this.popElementStackList.push(userSetPopElement);
        }else{
            getEl(document.body).add(pop.popContainerElement);
        }
        this.adjustPossition(element);
        pop.isPoped = true;        
        if (callback)
            callback(pop.element);
    }
};

PopMan.prototype.close = function(element, callback){
    var pop = this.getPop(element);
    if (pop.isPoped){
        if (this.hasEventListener(element, 'close'))
            this.execEventListener(element, 'close');
        getEl(pop.popContainerElement.parentNode).del(pop.popContainerElement);
        //Close DarkElement
        if (!pop.noDark)
            this.closeDark(pop.darkElement);
        //Close Status
        pop.isPoped = false;
        this.removeStack(element);
        if (callback) callback();
    }
};

PopMan.prototype.focusOn = function(el){
    if (!this.focusDarkMap.up && el){
        var that = this;        
        var offset = (el.getBoundingClientRect) ? el.getBoundingClientRect() : this.getBodyOffset(el);
        var doc = el.ownerDocument;
        var win = doc.defaultView || doc.parentWindow;
        var frameOffset = this.getFrameOffset(win);
        var x = offset.left + frameOffset.left;
        var y = offset.top + frameOffset.top;
        var w = el.offsetWidth;
        var h = el.offsetHeight;

        if (w == 0) return false;  // there are cases that when display is not block, has height 0
        var camW = this.getDivCamSizeChecker().offsetWidth;
        var camH = this.getDivCamSizeChecker().offsetHeight;
        this.focusDarkMap = {
            up:     this.getDarkElement(0, 0, camW, y),
            down:   this.getDarkElement(0, y + h, camW, camH),
            left:   this.getDarkElement(0, y, x, y + h),
            right:  this.getDarkElement(x + w, y, camW, y + h),
            arrow:  this.getArrow(x -30, y -9, '>>>')
        };
        for (var darkElName in this.focusDarkMap){
            var darkElPart = this.focusDarkMap[darkElName];
            getEl(document.body).add(darkElPart);
            window.getComputedStyle(darkElPart).background;
            if (darkElName != 'arrow') this.setBackgroundColor(darkElPart, 'rgba(0,0,0,.7)');
        }
        return true;
    }
};

PopMan.prototype.focusOff = function(){
    var that = this;    
    for (var darkElName in this.focusDarkMap){
        var darkElPart = this.focusDarkMap[darkElName];
        getEl(darkElPart.parentNode).del(darkElPart);
        delete this.focusDarkMap[darkElName];
    }
};





PopMan.prototype.getDivCamSizeChecker = function(){
    if (!this.divCamSizeChecker){
        var div = document.createElement('div');
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.position = "absolute";
        div.style.left = "-7777px";
        div.style.top = "-7777px";
        document.body.appendChild(div);
        this.divCamSizeChecker = div;
    };
    return this.divCamSizeChecker;
};
PopMan.prototype.spreadDark = function(pop){
    var that = this;    
    var zIndex = getData().findHighestZIndex(['div']) + 1;
    var color = 'rgba(0,0,0,.7)';
    // dark
    var darkElement = document.createElement('div');
    this.darkElementList.push(darkElement);
    // dark - event
    if (pop.closebyclickout){
        getEl(darkElement).addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            that.close(pop.element);
        });
    }
    getEl(darkElement).showDiv();
    getEl(document.body).add(darkElement);
    //dark - style
    darkElement.style.display = 'block';
    darkElement.style.width = '100%';
    darkElement.style.height = '100%';
    darkElement.style.zIndex = zIndex;
    try{
        darkElement.style.background = color;
    }catch(e){
        if (color.indexOf('rgba') != -1){
            color = color.replace('rgba', 'rgb');
            var endIdx = color.lastIndexOf(',');
            color = color.substring(0, endIdx) +')';
        }
        darkElement.style.background = color;
    }
    return darkElement;
};




PopMan.prototype.adjustPossition = function(element, callback){
    var pop = this.getPop(element);
    var popContainerElement = pop.popContainerElement;
    var parentW = popContainerElement.parentNode.offsetWidth;
    var parentH = popContainerElement.parentNode.offsetHeight;
    parentH = (parentH == 0) ? this.getDivCamSizeChecker().offsetHeight : parentH;
    popContainerElement.style.position = 'absolute';
    // var ml = pop.marginLeft;
    // var mt = pop.marginTop;
    // var mr = pop.marginRight;
    // var mb = pop.marginBottom;
    // var w = pop.width;
    // var h = pop.height;    
    // popexp
    var xPopExpMap = this.getSolvedPopExpMap(parentW, pop.expx);
    var yPopExpMap = this.getSolvedPopExpMap(parentH, pop.expy);    
    function nvlDan(num, dan){
        var allLeng = (num+'').length;
        var onlyNumLeng = (parseFloat(num)+'').length;
        if (onlyNumLeng == allLeng)
            result = num + dan;
        else
            result = num;
        return result;
    }   
    popContainerElement.style.left = nvlDan(xPopExpMap.pos, 'px');
    popContainerElement.style.top = nvlDan(yPopExpMap.pos, 'px');
    popContainerElement.style.width = nvlDan(xPopExpMap.size, 'px');
    popContainerElement.style.height = nvlDan(yPopExpMap.size, 'px');
};
PopMan.prototype.getSolvedPopExpMap = function(parentSize, popexp){    
    var getSize = this.getSize;
    var popExpMap;
    var expStart;
    var expSize;
    var expEnd;
    var start;
    var size;
    var end;    
    var pos;
    var isPopExp;
    if (popexp){
        var idxL = popexp.indexOf('(');
        var idxR = popexp.indexOf(')');
        isPopExp = (idxL != -1 && idxR != -1);
        if (isPopExp){
            expStart = popexp.substring(0, idxL);
            expEnd = popexp.substring(idxR +1, popexp.length);
            expSize = popexp.substring(idxL +1, idxR);
        }else{            
            expStart = '*';
            expSize = popexp;
            expEnd = '*';
        }        
        start = getSize(parentSize, expStart);        
        size = getSize(parentSize, expSize);
        end = getSize(parentSize, expEnd);     
        if (expSize == '*'){            
            size = parentSize - start - end;          
        }
        if (expStart == '*' && expEnd != '*'){            
            pos = (parentSize - size) - end;
        }else if (expStart != '*' && expEnd == '*'){
            pos = 0;
        }else if (expStart == '*' && expEnd == '*'){            
            pos = (parentSize - size) / 2;
        }else{
            pos = start;
        }
        popExpMap = {
            isPopExp:isPopExp,
            expStart:expStart,
            expEnd:expEnd,
            expSize:expSize,
            pos:pos,
            size:size
        };
    // Default Setting - If (popexp == '') 
    }else{
        popExpMap = {
            isPopExp:false,
            expStart:expStart,
            expEnd:expEnd,
            expSize:expSize,
            pos:parentSize - (parentSize/2) - (parentSize/4),
            size:parentSize/2
        };
    }
    return popExpMap;
};
PopMan.prototype.getSize = function(parentSize, num){
    if (typeof num == 'undefined'){
        return 0;
    }else if ((num+'').indexOf('%') != -1){
        return parentSize * (parseFloat(num)/100);    
    }else if ((num+'').indexOf('*') != -1){
        return 0;
    }
    return num;
};






PopMan.prototype.closeDark = function(darkElement){
    var darkElementList = this.darkElementList;
    for (var i=0; i<darkElementList.length; i++){
        if (darkElementList[i] == darkElement){
            darkElementList.splice(i, 1);
            getEl(darkElement.parentNode).del(darkElement);
        }
    }
};

PopMan.prototype.removeStack = function(popElement){
    var popElementStackList = this.popElementStackList;
    for (var i=0; i<popElementStackList.length; i++){
        if (popElementStackList[i] == popElement){
            popElementStackList.splice(i, 1);
        }
    }
};


PopMan.prototype.getDarkElement = function(sx, sy, ex, ey){
    var zIndex = 50;
    var color = 'rgba(0,0,0,.7)';
    var darkElement = document.createElement('div');
    var dan = 'px';
    function noMinus(val){
        return (val >= 0) ? val :  0;
    }
    darkElement.style.left = sx + dan;
    darkElement.style.top = sy + dan;
    darkElement.style.width = noMinus(ex - sx) + dan;
    darkElement.style.height = noMinus(ey - sy) + dan;
    darkElement.style.zIndex = zIndex;
    darkElement.style.display = 'block';
    darkElement.style.position = 'absolute';
    darkElement.style.transition = "background-color .5s, transform .5s";
    this.setBackgroundColor(darkElement, 'rgba(255,255,255,0)');
    return darkElement;
};
PopMan.prototype.getArrow = function(sx, sy, comment){
    var zIndex = 51;
    var color = 'rgba(0,0,0,.7)';
    var arrowEl = document.createElement('div');
    var dan = 'px';
    function noMinus(val){
        return (val >= 0) ? val :  0;
    }
    arrowEl.style.left = sx + dan;
    arrowEl.style.top = sy + dan;
    arrowEl.style.width = '30px';
    arrowEl.style.height = '30px';
    arrowEl.style.zIndex = zIndex;
    arrowEl.style.display = 'block';
    arrowEl.style.position = 'absolute';
    arrowEl.style.transition = "background-color .5s, transform .5s";
    arrowEl.style.color = "white";
    arrowEl.innerHTML = comment;
    return arrowEl;
};
PopMan.prototype.getBodyOffset = function(objTemp){
    var sumOffsetLeft = 0;
    var sumOffsetTop = 0;
    var thisObj = objTemp;
    var parentObj = objTemp.parentNode;
    while(parentObj){
        var scrollX = 0;
        var scrollY = 0;
        if (thisObj != document.body){
            scrollX = thisObj.scrollLeft;
            scrollY = thisObj.scrollTop;
        }
        if (parentObj.style){
            if (parentObj.style.position == 'absolute') {
                sumOffsetLeft += thisObj.offsetLeft - scrollX;
                sumOffsetTop += thisObj.offsetTop - scrollY;
            }else if(parentObj.style.position == 'fixed' || thisObj.style.position == 'fixed'){
                sumOffsetLeft += thisObj.offsetLeft + this.getBodyScrollX();
                sumOffsetTop += thisObj.offsetTop + this.getBodyScrollY();
                break;
            }else{
                sumOffsetLeft += (thisObj.offsetLeft - parentObj.offsetLeft) - scrollX;
                sumOffsetTop += (thisObj.offsetTop - parentObj.offsetTop) - scrollY;
            }
        }else{
            break;
        }
        thisObj = parentObj;
        parentObj = parentObj.parentNode;
    }
    var objBodyOffset = {left:sumOffsetLeft, top:sumOffsetTop, width:objTemp.offsetWidth, height:objTemp.offsetHeight};
    return objBodyOffset;
};
PopMan.prototype.getFrameOffset = function (win, dims){
    dims = (typeof dims === 'undefined')?{ top: 0, left: 0}:dims;
    if (win !== top) {
        var rect = win.frameElement.getBoundingClientRect();
        dims.left += rect.left;
        dims.top += rect.top;
        dims = this.getFrameOffset(win.parent, dims ); // recursion
    }
    return dims;
};
PopMan.prototype.setBackgroundColor = function(el, color){
    try{
        el.style.background = color;
    }catch(e){
        if (color.indexOf('rgba') != -1){
            color = color.replace('rgba', 'rgb');
            var endIdx = color.lastIndexOf(',');
            color = color.substring(0, endIdx) +')';
        }
        el.style.background = color;
    }
};




