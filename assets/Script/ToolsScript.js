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
        var sto1 = cc.scaleTo(0.1, 1.5);
        var sto2 = cc.scaleTo(0.1, 1);
        var seque = cc.sequence([d1, sto1,sto2]);
        node.node.runAction(seque);
    }

    // update (dt) {},
});
