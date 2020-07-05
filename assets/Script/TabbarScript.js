// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    RebackAction: function() {
        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        if (mainJS.CurrentPoker.node.childrenCount >= 1) {
            var node = mainJS.CurrentPoker.node.children[0];
            mainJS.fanzhuan(node);
        }
        
    },
    PauseAction: function() {
        cc.loader.loadRes("music/btn_click", cc.AudioClip, function(err, clip) {
            cc.audioEngine.play(clip, false, 0.5);
        });
        var mainCanvas = cc.find('Canvas');
        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        mainJS.TimerPause = !mainJS.TimerPause;
        if (mainJS.TimerPause === true) {
            cc.audioEngine.pauseMusic();
            cc.audioEngine.pauseAllEffects();
        } else {
            cc.audioEngine.resumeMusic();
            cc.audioEngine.resumeAllEffects();
        }
        cc.log("yyy"+mainJS.TimerPause);

        var alertNode = cc.find('Canvas/PauseAlertView');
        if (alertNode != null) {
            alertNode.active = true;
        } else {
            var pauseAlert = cc.instantiate(mainJS.PauseAlertView);
            alertNode = pauseAlert;
            pauseAlert._name = "PauseAlertView";
            mainCanvas.addChild(pauseAlert);
        }
        
        var mask = cc.find('Canvas/PauseAlertView/bg').getComponent(cc.Sprite);
        alertNode.zIndex = 999;
        mask.Color = cc.Color(0, 0, 0, 0);
        
    },

    KeepPlayAction: function() {

        cc.loader.loadRes("music/btn_click", cc.AudioClip, function(err, clip) {
            cc.audioEngine.play(clip, false, 0.5);
        });
        
        var alertNode = cc.find('Canvas/PauseAlertView');
        if (alertNode != null) {
            alertNode.active = false;
            var mask = cc.find('Canvas/PauseAlertView/bg').getComponent(cc.Sprite);
            alertNode.zIndex = 999;
            mask.Color = cc.Color(0, 0, 0, 0);
        }
        
        
        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        mainJS.TimerPause = !mainJS.TimerPause;
        if (mainJS.TimerPause === true) {
            cc.audioEngine.pauseMusic();
            cc.audioEngine.pauseAllEffects();
        } else {
            cc.audioEngine.resumeMusic();
            cc.audioEngine.resumeAllEffects();
        }
    },

    ReplayAction: function() {
        cc.loader.loadRes("music/btn_click", cc.AudioClip, function(err, clip) {
            cc.audioEngine.play(clip, false, 0.5);
        });
        cc.director.loadScene("GameScene",null);
    },

    OutMoveAction: function () {
        var alertNode = cc.find('Canvas/OutMoveAlertView');
        if (alertNode != null && alertNode.active === true) {
            return;
        }
        if (alertNode != null) {
            alertNode.active = true;
        } else {
            var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
            var mainCanvas = cc.find('Canvas');
            var gameOverAlert = cc.instantiate(mainJS.OutMoveAlertView);
            alertNode = gameOverAlert;
            gameOverAlert._name = "OutMoveAlertView";
            mainCanvas.addChild(gameOverAlert);
        }
    }


    // update (dt) {},
});
