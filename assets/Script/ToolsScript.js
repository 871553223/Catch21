// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    FormatMMSS:function (seconds) {

        var currentSeconds = parseInt(seconds);
        var timeStr = null;
        var minute = 0;
        var second = 0;
        if (currentSeconds <= 0)
            return "00:00";
        else {
            minute = parseInt(currentSeconds / 60);
            if (minute < 60) {
                second = currentSeconds % 60;
                timeStr = minute + ":" + (second < 10 ? "0"+second : second);
            } else {
                hour = minute / 60;
                minute = minute % 60;
                second = currentSeconds - hour * 3600 - minute * 60;
                timeStr = hour + ":" + minute + ":" + (second < 10 ? "0"+second : second);
            }
        }
        return timeStr;
    },

    ScaleAnimation:function (node) {

        var d1 = cc.delayTime(0.01);
        var sto1 = cc.scaleTo(0.1, 1.8);
        var sto2 = cc.scaleTo(0.1, 1);
        var seque = cc.sequence([d1, sto1,sto2]);
        node.node.runAction(seque);
    },
    // 抛物线
    ParabolaAnimation:function(node) {

        // 先向上抛
        // 随机一个0.2 到 0.3 的上抛过程
        var time1 = this.RandomNum(20,25) / 100.0;
        var moveX1 = this.RandomNum(10,60);
        var moveY1 = this.RandomNum(40,260);
        cc.log("随机小数"+time1);
        // var time = 0.2;
        var d1 = cc.delayTime(time1)
        var mov1 = cc.moveBy(time1, cc.v2(moveX1, moveY1));
        var rota1 = cc.rotateBy(time1, 90);
        var spawn1 = cc.spawn([mov1,rota1]);
        node.runAction(spawn1);



        var _this = this;
        // 回调
        var end_func = cc.callFunc(function(target) {
            var time2 = _this.RandomNum(40,60) / 100.0;
            var moveX2 = _this.RandomNum(90,120);
            var moveY2 = _this.RandomNum(1300,1400) * -1;
            var mov2 = cc.moveBy(time2, cc.v2(moveX2, moveY2));
            var rota2 = cc.rotateBy(time2, 630);
            var spawn2 = cc.spawn([mov2,rota2]);
            target.runAction(spawn2);

            var _target = target;
            _this.scheduleOnce(function(target){
                
                if (_target.parent != null && _target.parent.parent != null) {
                    var scoreLabel = _target.parent.parent.getChildByName("ScoreRect").getChildByName("ScoreLabel");
                    scoreLabel.string = "0";
                }
                if (_target != null) {
                    _target.removeFromParent(false);
                }
                // _target.parent.parent.getChildByName("ScoreRect").getChildByName("ScoreLabel")
                
            },time2);

            
        }.bind(node.node))
        var seque = cc.sequence([d1,end_func]);
        node.runAction(seque);

        // var mov2 = cc.moveBy(1, cc.v2(50, 400));
        // var rota2 = cc.rotateBy(1, 630);
        // var spawn2 = cc.spawn([mov2,rota2]);
        // node.node.runAction(spawn2);

        // var seque = cc.sequence([d1, sto1,sto2]);

    },
    RandomNum:function(minNum, maxNum) {
        var num = Math.floor(Math.random()*(minNum - maxNum) + maxNum);
        return num;
    },

    // update (dt) {},
});
