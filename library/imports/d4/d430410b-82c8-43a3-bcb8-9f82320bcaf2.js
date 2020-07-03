"use strict";
cc._RF.push(module, 'd4304ELgshDo7y4n4IyC8ry', 'TabbarScript');
// Script/TabbarScript.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
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
  start: function start() {},
  RebackAction: function RebackAction() {
    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');

    if (mainJS.CurrentPoker.node.childrenCount >= 1) {
      var node = mainJS.CurrentPoker.node.children[0];
      mainJS.fanzhuan(node);
    }
  },
  PauseAction: function PauseAction() {
    cc.loader.loadRes("music/btn_click", cc.AudioClip, function (err, clip) {
      cc.audioEngine.play(clip, false, 0.5);
    });
    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    mainJS.TimerPause = !mainJS.TimerPause;

    if (mainJS.TimerPause === true) {
      cc.audioEngine.pauseMusic();
      cc.audioEngine.pauseAllEffects();
    } else {
      cc.audioEngine.resumeMusic();
      cc.audioEngine.resumeAllEffects();
    }

    cc.log("yyy" + mainJS.TimerPause);
    var alertNode = cc.find('Canvas/AlertView');
    alertNode.active = true;
    var mask = cc.find('Canvas/AlertView/bg').getComponent(cc.Sprite);
    alertNode.zIndex = 999;
    mask.Color = cc.Color(0, 0, 0, 0);
  },
  KeepPlayAction: function KeepPlayAction() {
    var alertNode = cc.find('Canvas/AlertView');
    alertNode.active = false;
    var mask = cc.find('Canvas/AlertView/bg').getComponent(cc.Sprite);
    alertNode.zIndex = 999;
    mask.Color = cc.Color(0, 0, 0, 0);
    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    mainJS.TimerPause = !mainJS.TimerPause;

    if (mainJS.TimerPause === true) {
      cc.audioEngine.pauseMusic();
      cc.audioEngine.pauseAllEffects();
    } else {
      cc.audioEngine.resumeMusic();
      cc.audioEngine.resumeAllEffects();
    }
  } // update (dt) {},

});

cc._RF.pop();