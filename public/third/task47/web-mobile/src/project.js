require=function t(i,e,o){function n(s,h){if(!e[s]){if(!i[s]){var c="function"==typeof require&&require;if(!h&&c)return c(s,!0);if(r)return r(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var u=e[s]={exports:{}};i[s][0].call(u.exports,function(t){var e=i[s][1][t];return n(e?e:t)},u,u.exports,t,i,e,o)}return e[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)n(o[s]);return n}({AStar:[function(t,i,e){"use strict";function o(t,i){return new h(t,i)}function n(t,i){for(var e=0,o=0;o<t.length;o++){var n=t[o].G+t[o].getH(i),r=t[e].G+t[e].getH(i);r>=n&&(e=o)}return e}function r(t,i){for(var e=0;e<t.length;e++)if(i.isEqual(t[e]))return e;return-1}function s(t,i,e){t.G=0;for(var s=[t],h=[];s.length>0;){var c=n(s,i),a=s[c];if(s.splice(c,1),h.push(a),i.isEqual(a)){for(var u=[a];a.parent;)u.unshift(a.parent),a=a.parent;return u}for(var p=a.getNeighbors(),d=0;d<p.length;d++){var f=p[d];if(e(f)&&!(r(h,f)>=0)&&(!(f.getG(a)>1)||e(o(f.r,a.c))||e(o(a.r,f.c)))){f.G=a.G+f.getG(a),f.parent=a;var g=r(s,f);g>=0?f.G<s[g].G&&(s[g].G=f.G,s[g].parent=a):s.push(f)}}}return[]}cc._RFpush(i,"7d186ve9bRCrbA0fMVg10c1","AStar");var h=t("pos");i.exports=s,cc._RFpop()},{pos:"pos"}],enermy:[function(t,i,e){"use strict";cc._RFpush(i,"824efC1uGpGOKo5fkqw4cLg","enermy"),cc.Class({"extends":cc.Component,properties:{watchRange:200,fireInterval:.6},init:function(t){this.game=t,this.time=3},onLoad:function(){},checkFire:function(){if(!(this.time>0)){var t=this.game.hero.position,i=this.node.position;if(cc.pDistance(t,i)<this.watchRange){cc.pToAngle(cc.pSub(t,this.node.position));this.game.createFire(i,t,"enermy")}}},update:function(t){this.game.isOver||(this.time-=t,this.time<=0&&(this.checkFire(),this.time=this.fireInterval))}}),cc._RFpop()},{}],fire:[function(t,i,e){"use strict";cc._RFpush(i,"3aa4et9MuhGC48eV8Nd4X9p","fire"),cc.Class({"extends":cc.Component,properties:{speed:500},init:function(t,i,e){this.game=t,this.speedX=this.speed*Math.cos(i),this.speedY=this.speed*Math.sin(i),this.type=e},onLoad:function(){},update:function(t){this.node.x+=t*this.speedX,this.node.y+=t*this.speedY;var i=this.game.getGirdPos(this.node.position);if(!this.game.checkPos(i))return void this.node.destroy();if("enermy"===this.type&&this.game.hero.getBoundingBox().contains(this.node.position))return this.node.destroy(),void this.game.gameOver();if("hero"===this.type)for(var e=this.game.enermys.length-1;e>=0;e--){var o=this.game.enermys[e];if(o.getBoundingBox().contains(this.node.position))return this.node.destroy(),this.game.enermys.splice(e,1),void o.destroy()}}}),cc._RFpop()},{}],game:[function(t,i,e){"use strict";cc._RFpush(i,"a469eaKNOtEObf4AmY/8JKe","game"),cc.Class({"extends":cc.Component,properties:{girdContainer:cc.Node,roadPre:cc.Prefab,wallPre:cc.Prefab,enermyPre:cc.Prefab,firePre:cc.Prefab,hero:cc.Node,target:cc.Node,rowNum:15,colNum:10,arrIsWall:[],enermys:[cc.Node]},onLoad:function(){this.orginPos=cc.p(-this.girdContainer.width/2,-this.girdContainer.height/2),this.girdWidth=this.girdContainer.width/this.colNum,this.girdHeight=this.girdContainer.height/this.rowNum,this.isOver=!1,this.initWallAndRoad(),this.initHeroAndTarget(),this.initEnermy(),this.addEvnet(),this.hero.getComponent("hero").init(this)},initWallAndRoad:function(){for(var t=0;t<this.rowNum;t++)for(var i=0;i<this.colNum;i++){var e;Math.random()*this.rowNum*this.colNum>o?(e=cc.instantiate(this.roadPre),this.arrIsWall.push(!1)):(e=cc.instantiate(this.wallPre),this.arrIsWall.push(!0)),e.position=this.getCCPos(t,i),e.parent=this.girdContainer}},getGirdPos:function(i){var e=Math.floor((i.y-this.orginPos.y)/this.girdHeight),o=Math.floor((i.x-this.orginPos.x)/this.girdWidth),n=t("pos");return new n(e,o)},getCCPos:function(t,i){return cc.p((i+.5)*this.girdWidth+this.orginPos.x,(t+.5)*this.girdHeight+this.orginPos.y)},initHeroAndTarget:function(){function i(){var i=Math.floor(Math.random()*r.rowNum),e=Math.floor(Math.random()*r.colNum),o=t("pos");return new o(i,e)}var e,o,n,r=this;do{do o=i();while(!this.checkPos(o));do n=i();while(!this.checkPos(n)||n.isEqual(o));var s=t("AStar"),e=s(o,n,function(t){return r.checkPos(t)})}while(e.length<=0);this.hero.position=this.getCCPos(o.r,o.c),this.target.position=this.getCCPos(n.r,n.c)},initEnermy:function(){function i(){var i=Math.floor(Math.random()*e.rowNum),o=Math.floor(Math.random()*e.colNum),n=t("pos");return new n(i,o)}for(var e=this,o=0;3>o;o++){var n=cc.instantiate(this.enermyPre);n.getComponent("enermy").init(this),this.enermys.push(n);var r;do r=i();while(!this.checkPos(r)||cc.pDistance(this.hero.position,this.getCCPos(r.r,r.c))<120);this.girdContainer.addChild(n),n.position=this.getCCPos(r.r,r.c)}},addEvnet:function(){var t=this;this.girdContainer.on("touchend",function(i){if(!t.isOver){for(var e=t.girdContainer.convertTouchToNodeSpaceAR(i),o=!1,n=0;n<t.enermys.length;n++)t.enermys[n].getBoundingBox().contains(e)&&(o=!0);o?t.createFire(t.hero.position,e,"hero"):t.hero.getComponent("hero")["goto"](e)}})},createFire:function(t,i,e){var o=cc.instantiate(this.firePre);o.getComponent("fire").init(this,cc.pToAngle(cc.pSub(i,t)),e),o.position=t,this.girdContainer.addChild(o)},checkPos:function(t){return t.r<0||t.c<0||t.r>=this.rowNum||t.c>=this.colNum?!1:this.arrIsWall[t.r*this.colNum+t.c]?!1:!0},update:function(t){var i=cc.pDistance(this.hero.position,this.target.position);10>i&&this.gameWin()},gameOver:function(){this.hero.getComponent("hero").die(),this.isOver=!0},gameWin:function(){return o+=2,o>60?(alert("You Win All, back to first"),void(o=10)):void cc.director.loadScene("game")}});var o=10;cc._RFpop()},{AStar:"AStar",pos:"pos"}],hero:[function(t,i,e){"use strict";cc._RFpush(i,"47633BafjRLDoGxCLyfEIgE","hero"),cc.Class({"extends":cc.Component,properties:{oneStepTime:.33,blood:cc.Node},onLoad:function(){},"goto":function(i){for(var e=this.game.getGirdPos(i),o=this.game.getGirdPos(this.node.position),n=t("AStar"),r=this,s=n(o,e,function(t){return r.game.checkPos(t)}),h=[],c=1;c<s.length;c++){var a=this.game.getCCPos(s[c].r,s[c].c);h.push(cc.callFunc(function(t,i){i.x>this.node.x&&(this.node.scaleX=1),i.x<this.node.x&&(this.node.scaleX=-1)},this,a)),1===c&&h.push(cc.callFunc(function(){this.getComponent(cc.Animation).play("heroRun")},this)),h.push(cc.moveTo(this.oneStepTime,a))}h.push(cc.callFunc(function(){this.getComponent(cc.Animation).play("heroStand")},this)),this.node.stopAllActions(),this.node.runAction(cc.sequence(h))},init:function(t){this.game=t},die:function(){this.node.stopAllActions(),this.getComponent(cc.Animation).play("heroDead"),this.blood.active=!0,this.blood.getComponent(cc.Animation).play("blood")}}),cc._RFpop()},{AStar:"AStar"}],pos:[function(t,i,e){"use strict";cc._RFpush(i,"d82d44RiEhLpbxr54Q1UvwA","pos");var o=function(t,i){this.r=t,this.c=i};o.prototype.left=function(){return new o(this.r,this.c-1)},o.prototype.right=function(){return new o(this.r,this.c+1)},o.prototype.top=function(){return new o(this.r-1,this.c)},o.prototype.bottom=function(){return new o(this.r+1,this.c)},o.prototype.leftTop=function(){return new o(this.r-1,this.c-1)},o.prototype.leftBottom=function(){return new o(this.r+1,this.c-1)},o.prototype.rightTop=function(){return new o(this.r-1,this.c+1)},o.prototype.rightBottom=function(){return new o(this.r+1,this.c+1)},o.prototype.getNeighbors=function(){return[this.left(),this.right(),this.top(),this.bottom(),this.leftTop(),this.leftBottom(),this.rightTop(),this.rightBottom()]},o.prototype.getG=function(t){var i=Math.abs(this.r-t.r),e=Math.abs(this.c-t.c),o=Math.sqrt(i*i+e*e),o=Math.round(10*o)/10;return o},o.prototype.getH=function(t){var i=Math.abs(this.r-t.r),e=Math.abs(this.c-t.c);return i+e},o.prototype.isEqual=function(t){return this.r===t.r&&this.c===t.c},o.prototype.toString=function(t){return this.r+", "+this.c},i.exports=o,cc._RFpop()},{}]},{},["fire","hero","AStar","enermy","game","pos"]);