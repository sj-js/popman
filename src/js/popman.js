/****************************************************************************************************
 *  PopMan
 *  Created By sujkim
 ****************************************************************************************************/

function PopMan(){
    var that = this;
    this.popMap = {};
    this.darkList = [];
    this.focusDarkMap = {};
    this.divCamSizeChecker;
    window.addEventListener('resize', function(event){
        for (var name  in that.popMap){
            if (that.isOn(name))
                that.adjustPossition(name);
        }
    });
}

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
PopMan.prototype.add = function(infoObj){
    var that = this;
    var zIndex = 100;

    // popView
    var popView = document.createElement('div');
    popView.style.display = 'inline-block';
    popView.style.background = 'white';
    popView.style.width = (infoObj.width) ? infoObj.width : 0;
    popView.style.height = (infoObj.height) ? infoObj.height : 0;
    popView.style.zIndex = zIndex;
    getEl(popView).addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
    });

    this.popMap[infoObj.name] = infoObj;
    this.popMap[infoObj.name].popEl = popView;
    this.popMap[infoObj.name].darkEl = null;
    this.popMap[infoObj.name].isPoped = false;
    //Create Event
    getEl(popView).hideDiv();
    getEl(document.body).add(popView);

    var addObj = infoObj.add;
    if (typeof addObj == 'function'){
        infoObj.add(infoObj);
    }else if (typeof addObj == 'object'){
        popView.appendChild(addObj);
    }

    return this;
};
PopMan.prototype.spreadDark = function(pop){
    var that = this;    
    var zIndex = 100;
    var color = 'rgba(0,0,0,.7)';
    // dark
    var darkEl = document.createElement('div');
    this.darkList.push(darkEl);
    if (pop.easyclose){
        getEl(darkEl).addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            that.close(pop.name);
        });
    }
    getEl(darkEl).showDiv();
    getEl(document.body).add(darkEl);

    darkEl.style.width = '100%';
    darkEl.style.height = '100%';
    darkEl.style.zIndex = zIndex;
    try{
        darkEl.style.background = color;
    }catch(e){
        if (color.indexOf('rgba') != -1){
            color = color.replace('rgba', 'rgb');
            var endIdx = color.lastIndexOf(',');
            color = color.substring(0, endIdx) +')';
        }
        darkEl.style.background = color;
    }
    return darkEl;
};




PopMan.prototype.adjustPossition = function(name, callback){
    var pop = this.popMap[name];
    var popEl = pop.popEl;
    var parentW = popEl.parentNode.offsetWidth;
    var parentH = popEl.parentNode.offsetHeight;
    parentH = (parentH == 0) ? this.getDivCamSizeChecker().offsetHeight : parentH;
    popEl.style.position = 'absolute';
    // var ml = pop.marginLeft;
    // var mt = pop.marginTop;
    // var mr = pop.marginRight;
    // var mb =pop.marginBottom;
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
    popEl.style.left = nvlDan(xPopExpMap.pos, 'px');   
    popEl.style.top = nvlDan(yPopExpMap.pos, 'px');
    popEl.style.width = nvlDan(xPopExpMap.size, 'px');
    popEl.style.height = nvlDan(yPopExpMap.size, 'px');
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





PopMan.prototype.isOn = function(name){
    var pop = this.popMap[name];
    return pop && pop.isPoped;
};
PopMan.prototype.toggle = function(name){
    if (this.isOn(name))
        this.close(name);
    else
        this.pop(name);
};
PopMan.prototype.pop = function(name, callback){    
    var pop = this.popMap[name];
    if (!pop.isPoped){
        if (pop.pop)
            pop.pop(pop);
        if (!pop.noDark){
            pop.darkEl = this.spreadDark(pop);
            getEl(pop.darkEl).add(pop.popEl);
        }else{
            getEl(document.body).add(pop.popEl);
        }
        this.adjustPossition(name);
        pop.isPoped = true;
        if (callback) callback();
    }
};
PopMan.prototype.close = function(name, callback){    
    var pop = this.popMap[name];
    if (pop.isPoped){
        if (pop.close)
            pop.close(pop);
        getEl(pop.popEl.parentNode).del(pop.popEl);
        if (!pop.noDark)
            this.closeDark(pop.darkEl);
        pop.isPoped = false;
        if (callback) callback();
    }
};
PopMan.prototype.closeDark = function(darkEl){
    var darkList = this.darkList;
    for (var i=0; i<darkList.length; i++){
        if (darkList[i] == darkEl){
            darkList.splice(i, 1);
            getEl(darkEl.parentNode).del(darkEl);
        }
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
            up:     this.getDarkEl(0, 0, camW, y),
            down:   this.getDarkEl(0, y + h, camW, camH),
            left:   this.getDarkEl(0, y, x, y + h),
            right:  this.getDarkEl(x + w, y, camW, y + h),
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
PopMan.prototype.getDarkEl = function getDarkEl(sx, sy, ex, ey){
    var zIndex = 50;
    var color = 'rgba(0,0,0,.7)';
    var darkEl = document.createElement('div');
    var dan = 'px';
    function noMinus(val){
        return (val >= 0) ? val :  0;
    }
    darkEl.style.left = sx + dan;
    darkEl.style.top = sy + dan;
    darkEl.style.width = noMinus(ex - sx) + dan;
    darkEl.style.height = noMinus(ey - sy) + dan;
    darkEl.style.zIndex = zIndex;
    darkEl.style.display = 'block';
    darkEl.style.position = 'absolute';
    darkEl.style.transition = "background-color .5s, transform .5s";
    this.setBackgroundColor(darkEl, 'rgba(255,255,255,0)');
    return darkEl;
};
PopMan.prototype.getArrow = function getDarkEl(sx, sy, comment){
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
PopMan.prototype.getBodyOffset = function (objTemp){
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
                sumOffsetLeft += thisObj.offsetLeft + sjHelper.cross.getBodyScrollX();
                sumOffsetTop += thisObj.offsetTop + sjHelper.cross.getBodyScrollY();
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
//    var objBodyOffset = {x:sumOffsetLeft, y:sumOffsetTop, w:objTemp.offsetWidth, h:objTemp.offsetHeight};
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




