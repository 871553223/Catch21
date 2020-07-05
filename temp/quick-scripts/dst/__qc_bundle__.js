
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/ContainerPrefabScript');
require('./assets/Script/GameSceneScript');
require('./assets/Script/LoadViewScript');
require('./assets/Script/PokerPrefabScript');
require('./assets/Script/TabbarScript');
require('./assets/Script/ToolsScript');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameSceneScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82bddpNDw9NMZSSqDnDP3Wd', 'GameSceneScript');
// Script/GameSceneScript.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    leftSeconds: {
      type: cc.integer,
      "default": 240
    },
    ArrowTips: {
      type: cc.integer,
      "default": 3
    },
    backgroundSong: {
      type: cc.AudioClip,
      "default": null
    },
    PauseButton: {
      type: cc.Button,
      "default": null
    },
    HelpButton: {
      type: cc.Button,
      "default": null
    },
    AudioButton: {
      type: cc.Button,
      "default": null
    },
    ReBackButton: {
      type: cc.Button,
      "default": null
    },
    TimeCountLabel: {
      type: cc.Button,
      "default": null
    },
    RoundLabel: {
      type: cc.Button,
      "default": null
    },
    ScoreLabel: {
      type: cc.Button,
      "default": null
    },
    PokerContainer: {
      type: cc.Prefab,
      "default": null
    },
    myPoker: {
      type: cc.Prefab,
      "default": null
    },
    PauseAlertView: {
      type: cc.Prefab,
      "default": null
    },
    GameOverAlertView: {
      type: cc.Prefab,
      "default": null
    },
    OutMoveAlertView: {
      type: cc.Prefab,
      "default": null
    },
    PokerInstanceBackground: {
      type: cc.Sprite,
      "default": null
    },
    PokerStashView: {
      type: cc.Button,
      "default": null
    },
    CurrentPoker: {
      type: cc.Sprite,
      "default": null
    },
    TimerPause: {
      type: cc.Boolean,
      "default": false
    },
    LastNode: {
      type: cc.Node,
      "default": null
    },
    PokerErrorTips: {
      type: cc.SpriteFrame,
      "default": null
    },
    PokerTargetTips: {
      type: cc.SpriteFrame,
      "default": null
    },
    PokerAtlas: {
      type: cc.SpriteAtlas,
      "default": null
    },
    ComboCount: {
      type: cc.integer,
      "default": 0
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var Tools = cc.find('Canvas').getComponent('ToolsScript');
    cc.audioEngine.playMusic(this.backgroundSong, true);
    var size = cc.view.getFrameSize();
    cc.log(size.width, size.height);
    var windowSize = cc.view.getVisibleSize();
    cc.log(windowSize.width, windowSize.height);
    var halfWidth = windowSize.width / 2;
    var halfHeight = windowSize.height / 2;
    var pauseSize = this.PauseButton.node.getBoundingBox();
    this.PauseButton.node.setAnchorPoint(0, 0);
    this.PauseButton.node.setPosition(-halfWidth + 40, -halfHeight + 30);
    this.HelpButton.node.setAnchorPoint(0, 0);
    this.HelpButton.node.setPosition(-87 - 40, -halfHeight + 11 + 30);
    this.AudioButton.node.setAnchorPoint(0, 0);
    this.AudioButton.node.setPosition(40, -halfHeight + 11 + 30);
    this.ReBackButton.node.setAnchorPoint(0, 0);
    this.ReBackButton.node.setPosition(halfWidth - 40 - 110, -halfHeight + 30);
    this.TimeCountLabel.node.setAnchorPoint(1, 0);
    this.TimeCountLabel.node.setPosition(0 - 107, halfHeight - 90 - 50);
    var labelNode = this.TimeCountLabel.node.getChildByName("Background").getChildByName("Label");
    var label = labelNode.getComponent(cc.Label);
    var timeString = Tools.FormatMMSS(this.leftSeconds);
    label.string = timeString;
    this.RoundLabel.node.setAnchorPoint(0.5, 0);
    this.RoundLabel.node.setPosition(0, halfHeight - 90 - 50);
    var bg = this.RoundLabel.node.getChildByName("Background");
    var firstR = bg.getChildByName("FirstRound"); // firstR.node.opacity = 0;
    // bg.getChildByName("FirstRound").node.hi = false;
    // cc.log(bg.getChildByName("FirstRound"));
    // this.RoundLabel.node.getChildByName("Background").node.getChildByName("FirstRound").active = false;
    // this.RoundLabel.node.getChildByName("Background").node.getChildByName("FirstRound").node.active = false;

    this.ScoreLabel.node.setAnchorPoint(0, 0);
    this.ScoreLabel.node.setPosition(107, halfHeight - 90 - 50);
    this.PokerInstanceBackground.node.setAnchorPoint(0.5, 0.5); // cc.log(this.PokerInstanceBackground.node.getContentSize().width,this.PokerInstanceBackground.node.getContentSize().height);
    // cc.log(this.PokerInstanceBackground.node.getBoundingBox().size.width,this.PokerInstanceBackground.node.getBoundingBox().size.height);

    this.PokerInstanceBackground.node.setPosition(-halfWidth + 130 + 20, -halfHeight + 93 + 160);
    this.CurrentPoker.node.setAnchorPoint(0, 0.5);
    this.CurrentPoker.node.setPosition(0, -halfHeight + 95 + 160);
    this.PokerStashView.node.setAnchorPoint(1, 1);
    this.PokerStashView.node.setPosition(halfWidth - 10, -halfHeight + 190 + 160);
    this.ArrowTips = 3;

    for (var i = 0; i < 4; i++) {
      var pre = cc.instantiate(this.PokerContainer);
      pre._name = "PokerContainer" + (i + 1);
      pre.getChildByName("UpTip").active = false;
      pre.getChildByName("Bust").active = false;
      this.node.addChild(pre);
      pre.setAnchorPoint(0.5, 0.5);
      pre.setPosition(-halfWidth + 78 + 60 + 157 * i, 0);
    }

    var array = this.pokerRandom();

    for (var _i = 0; _i < 52; _i++) {
      var _pre = cc.instantiate(this.myPoker);

      _pre.PokerNumber = array[_i]; // pre.PokerNumber = 52;
      // cc.log("PokerInit"+pre.PokerNumber);
      // cc.log("dianshu"+pre.PokerNumber);

      _pre._name = "Poker_" + _i;
      this.node.addChild(_pre);
      _pre.getChildByName("FrontView").active = false;

      _pre.setAnchorPoint(0.5, 0.5);

      _pre.setPosition(0, 0 - 200);
    }

    for (var index = 0; index < this.node.childrenCount; index++) {// cc.log(this.node.children[index]);
    }
  },
  start: function start() {
    var Tools = cc.find('Canvas').getComponent('ToolsScript');
    var bg = this.RoundLabel.node.getChildByName("Background");
    bg.getChildByName("FirstRound").active = false;
    bg.getChildByName("SecondRound").active = false;
    bg.getChildByName("ThirdRound").active = false;
    this.fapai(0);

    var _this = this;

    cc.director.getScheduler().schedule(function () {
      if (_this.TimerPause === true) {} else {
        _this.leftSeconds--;
        _this.ArrowTips++;
      }

      if (_this.ArrowTips === 2) {
        for (var i = 1; i <= 4; i++) {
          var container = _this.node.getChildByName('PokerContainer' + i);

          var pokerNode = _this.CurrentPoker.node;
          poker = pokerNode.children[pokerNode.childrenCount - 1];

          if (poker != null) {
            // container.ScoreLabel.string
            container.getComponent("ContainerPrefabScript").DetectArrows(poker.PokerRealNumber);
          } else {
            container.getComponent("ContainerPrefabScript").DetectArrows(0);
          }

          cc.log(container);
        }
      }

      var labelNode = this.TimeCountLabel.node.getChildByName("Background").getChildByName("Label");
      var label = labelNode.getComponent(cc.Label);

      if (_this.leftSeconds === 30) {
        cc.loader.loadRes("music/time_tip", cc.AudioClip, function (err, clip) {
          cc.audioEngine.play(clip, false, 0.5);
        });
        cc.loader.loadRes("font/red_time_font", cc.Font, function (err, font) {
          label.font = font;
        });
      } else if (_this.leftSeconds === 0) {
        _this.TimeOut();
      }

      var timeString = Tools.FormatMMSS(_this.leftSeconds);
      cc.log(timeString);
      label.string = timeString;
      label.color = new cc.Color(255, 0, 0, 255); // cc.log(_this.TimerPause)
    }, _this, 1, cc.macro.REPEAT_FOREVER, 1, false);
  },
  // 发牌函数
  fapai: function fapai(seq) {
    var _this = this;

    var size = cc.view.getVisibleSize();

    var lastPocker = _this.PokerInstanceBackground.node.getChildByName("Poker_" + (seq - 1));

    var currentPoker = _this.node.getChildByName("Poker_" + seq);

    if (currentPoker === null) {
      cc.log("Test", lastPocker, currentPoker);

      _this.fanzhuan(lastPocker);

      _this.ArrowTips = 0;
      return;
    }

    cc.loader.loadRes("music/init_pai", cc.AudioClip, function (err, clip) {
      cc.audioEngine.play(clip, false, 0.3);
    }); // 回调

    var end_func = cc.callFunc(function (target) {
      var base_count = parseInt(target._name.split("_")[1]) + 1;
      var curPos1 = target.convertToWorldSpaceAR(cc.v2(0, 0));

      var curPos2 = _this.PokerInstanceBackground.node.convertToNodeSpaceAR(curPos1); // cc.log(target);


      target.setPosition(curPos2);
      target.PreviousParent = target.parent;
      target.parent = _this.PokerInstanceBackground.node;
      target.CurrentPosition = curPos1;

      _this.fapai(base_count);

      var initCountNode = cc.find('Canvas/PokerInstanceBackground/CountLabel');
      var initLabel = initCountNode.getComponent(cc.Label);
      initLabel.string = (parseInt(initLabel.string) + 1).toString();
    }.bind(currentPoker));
    var mto = cc.moveTo(0.05, cc.v2(-size.width / 2 + 20 + 72 + 2.2 * seq, -size.height / 2 + 95 + 160));
    var d1 = cc.delayTime(0.01);
    var seque = cc.sequence([d1, mto, end_func]);
    currentPoker.runAction(seque);
  },
  fanzhuan: function fanzhuan(pokernode) {
    var size = cc.view.getVisibleSize();

    var _this = this; // 如果当前节点的parent为PokerInstanceBackground，则说明需要往中间移动，如果是在中间则需要往左边移动
    // _this.PokerInstanceBackground.node


    if (pokernode.parent === _this.CurrentPoker.node) {
      var initCountNode = cc.find('Canvas/PokerInstanceBackground/CountLabel');
      var initLabel = initCountNode.getComponent(cc.Label);
      initLabel.string = (parseInt(initLabel.string) + 1).toString();
      var d1 = cc.delayTime(0.01);
      var pos1 = pokernode.CurrentPosition;
      var pos2 = pokernode.PreviousPosition;
      var mto = cc.moveBy(0.15, cc.v2(pos2.x - pos1.x, pos2.y - pos1.y));
      var fan1 = cc.scaleTo(0.15, 0.2, 1);
      var changeFront = cc.callFunc(function (target) {
        target.getChildByName("FrontView").active = false;
        target.getChildByName("Background").active = true;
      });
      var spawn = cc.spawn([mto, fan1]);
      pokernode.runAction(spawn);
      var d2 = cc.delayTime(0.15);
      var fan2 = cc.scaleTo(0.1, 1, 1);
      var animationFinished = cc.callFunc(function (target) {
        target.CurrentPosition = target.getPosition();
        var curPos1 = target.convertToWorldSpaceAR(cc.v2(0, 0));

        var curPos2 = _this.PokerInstanceBackground.node.convertToNodeSpaceAR(curPos1); // cc.log(target);


        target.setPosition(curPos2);
        target.PreviousParent = target.parent;
        target.parent = _this.PokerInstanceBackground.node; // cc.log(target.CurrentPosition);

        target.PreviousPosition = target.CurrentPosition;
        target.CurrentPosition = curPos1;
      });
      var sequ = cc.sequence([d2, changeFront, fan2, animationFinished]);
      pokernode.runAction(sequ);
      return;
    } else {
      var initCountNode = cc.find('Canvas/PokerInstanceBackground/CountLabel');
      var initLabel = initCountNode.getComponent(cc.Label);
      initLabel.string = (parseInt(initLabel.string) - 1).toString();
      cc.loader.loadRes("music/solitaire_deel", cc.AudioClip, function (err, clip) {
        cc.audioEngine.play(clip, false, 0.5);
      });
      var currentPosition = pokernode.convertToWorldSpaceAR(cc.v2(0, 0)); // 先反转90变正面数据，再反转-90回来，结束，整个过程移动牌面到指定位置

      var d1 = cc.delayTime(0.01); // var mto = cc.moveTo(0.3, cc.v2(0 + 69,(-size.height / 2) + 95 + 160));

      var pos1 = pokernode.convertToWorldSpaceAR(cc.v2(0, 0));

      var pos2 = _this.CurrentPoker.node.convertToWorldSpaceAR(cc.v2(0, 0));

      var mto = cc.moveBy(0.15, cc.v2(pos2.x - pos1.x + 66, pos2.y - pos1.y));
      var fan1 = cc.scaleTo(0.15, 0.2, 1);
      var changeFront = cc.callFunc(function (target) {
        target.getChildByName("FrontView").active = true;
        target.getChildByName("Background").active = false;
      });
      var spawn = cc.spawn([mto, fan1]);
      pokernode.runAction(spawn);
      var d2 = cc.delayTime(0.15);
      var fan2 = cc.scaleTo(0.1, 1, 1);
      var animationFinished = cc.callFunc(function (target) {
        // target.CurrentPosition = target.getPosition();
        var curPos1 = target.convertToWorldSpaceAR(cc.v2(0, 0));

        var curPos2 = _this.CurrentPoker.node.convertToNodeSpaceAR(curPos1); // cc.log(target);


        target.setPosition(curPos2);
        target.PreviousParent = target.parent;
        target.parent = _this.CurrentPoker.node; // cc.log(target.CurrentPosition);

        target.PreviousPosition = currentPosition;
        target.CurrentPosition = curPos1;
      });
      var sequ = cc.sequence([d2, changeFront, fan2, animationFinished]);
      pokernode.runAction(sequ);
    } // var d3 = cc.delayTime(1.3);
    // var destroyPokerNode = cc.callFunc(function(target) {
    //     target.removeFromParent(true);
    //     target.destroy();
    // });
    // var sequ2 = cc.sequence([d3,destroyPokerNode]);
    // pokernode.runAction(sequ2);

  },
  pokerRandom: function pokerRandom() {
    var array = new Array();

    do {
      var num = this.randomNum(1, 53);

      if (array.indexOf(num) === -1) {
        array.push(num);
      } else {
        var index = array.indexOf(num);
      }
    } while (array.length < 52);

    return array;
  },
  //生成从minNum到maxNum的随机数
  randomNum: function randomNum(minNum, maxNum) {
    var num = Math.floor(Math.random() * (minNum - maxNum) + maxNum);
    return num;
  },
  StashClick: function StashClick(staBut) {
    var _this = this;

    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    var pokerNode = mainJS.CurrentPoker.node;
    var BackgroundView = staBut.currentTarget.getChildByName('Background');
    cc.log(BackgroundView);

    if (BackgroundView.childrenCount > 0) {
      if (pokerNode.childrenCount > 0) {
        cc.log("中间节点被占了,需要先执行中间卡牌动画");
        mainJS.fanzhuan(pokerNode.children[0]);
      } else {} // 执行回转动画


      var poker = BackgroundView.children[0]; // 先切换挂载的节点
      // var curPos1 = poker.convertToWorldSpaceAR(cc.v2(0,0));
      // var curPos3 = pokerNode.convertToWorldSpaceAR(cc.v2(0,0));
      // poker.setPosition(cc.v2(curPos1.x - curPos3.x,curPos1.y - curPos3.y));
      // poker.parent = pokerNode;
      // var pos1 = poker.convertToWorldSpaceAR(cc.v2(0,0));
      // var pos2 = pokerNode.convertToWorldSpaceAR(cc.v2(0,0));
      // var mto = cc.moveBy(0.3, cc.v2(pos2.x - pos1.x + 65,pos2.y - pos1.y));
      // var totation = cc.rotateTo(0.3,0);
      // var spawn = cc.spawn([mto,totation]);
      // poker.runAction(spawn);

      var pos1 = poker.convertToWorldSpaceAR(cc.v2(0, 0));
      var pos3 = pokerNode.convertToWorldSpaceAR(cc.v2(0, 0));
      var pos2 = pokerNode.convertToNodeSpaceAR(pos1);
      poker.setPosition(pos2);
      var mto = cc.moveBy(0.15, cc.v2(pos3.x - pos1.x + 65, pos3.y - pos1.y));
      var totation = cc.rotateTo(0.15, 0);
      var spawn = cc.spawn([mto, totation]);
      poker.runAction(spawn);
      poker.PreviousParent = poker.parent;
      poker.parent = pokerNode;
      poker.CurrentPosition = poker.PreviousPosition;
      poker.PreviousPosition = cc.v2(0, 0);
      poker.interactable = true; // 执行牌局回退
    } else {
      if (_this.CurrentPoker.node.childrenCount > 0) {
        cc.log("我有孩子节点"); // 执行旋转动画

        var poker = _this.CurrentPoker.node.children[0]; // 先切换挂载的节点

        var curPos1 = poker.convertToWorldSpaceAR(cc.v2(0, 0));
        var curPos3 = BackgroundView.convertToWorldSpaceAR(cc.v2(0, 0));
        poker.setPosition(cc.v2(curPos1.x - curPos3.x, curPos1.y - curPos3.y));
        poker.PreviousParent = poker.parent;
        poker.parent = BackgroundView;
        var pos1 = poker.convertToWorldSpaceAR(cc.v2(0, 0));
        var pos2 = BackgroundView.convertToWorldSpaceAR(cc.v2(0, 0));
        var mto = cc.moveBy(0.15, cc.v2(pos2.x - pos1.x, pos2.y - pos1.y));
        var totation = cc.rotateTo(0.15, 17);
        var spawn = cc.spawn([mto, totation]);
        poker.runAction(spawn);
        poker.getComponent(cc.Button).interactable = false;
        poker.interactable = false;
        var pos3 = poker.convertToWorldSpaceAR(cc.v2(0, 0));
        poker.PreviousPosition = poker.CurrentPosition;
        poker.CurrentPosition = pos3; // 执行牌局跟进

        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        cc.log(mainJS.PokerInstanceBackground.node.children);

        if (mainJS.PokerInstanceBackground.node.childrenCount > 1) {
          var frontPoker = mainJS.PokerInstanceBackground.node.children[mainJS.PokerInstanceBackground.node.childrenCount - 1];
          cc.log(frontPoker);
          mainJS.fanzhuan(frontPoker);
        }
      }
    }
  },
  stashAnimation: function stashAnimation(staBut) {
    if (condition) {}
  },
  TimeOut: function TimeOut() {
    var alertNode = cc.find('Canvas/GameOverAlertView');

    if (alertNode != null && alertNode.active === true) {
      return;
    }

    cc.loader.loadRes("music/result_eff1", cc.AudioClip, function (err, clip) {
      cc.audioEngine.play(clip, false, 0.5);
    });
    var mainCanvas = cc.find('Canvas');
    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    mainJS.TimerPause = true;
    cc.audioEngine.pauseMusic();

    if (alertNode != null) {
      alertNode.active = true;
    } else {
      var gameOverAlert = cc.instantiate(mainJS.GameOverAlertView);
      alertNode = gameOverAlert;
      gameOverAlert._name = "GameOverAlertView";
      mainCanvas.addChild(gameOverAlert);
    }

    var mask = cc.find('Canvas/GameOverAlertView/bg').getComponent(cc.Sprite);
    alertNode.zIndex = 999;
    mask.Color = cc.Color(0, 0, 0, 0);
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZVNjZW5lU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGVmdFNlY29uZHMiLCJ0eXBlIiwiaW50ZWdlciIsIkFycm93VGlwcyIsImJhY2tncm91bmRTb25nIiwiQXVkaW9DbGlwIiwiUGF1c2VCdXR0b24iLCJCdXR0b24iLCJIZWxwQnV0dG9uIiwiQXVkaW9CdXR0b24iLCJSZUJhY2tCdXR0b24iLCJUaW1lQ291bnRMYWJlbCIsIlJvdW5kTGFiZWwiLCJTY29yZUxhYmVsIiwiUG9rZXJDb250YWluZXIiLCJQcmVmYWIiLCJteVBva2VyIiwiUGF1c2VBbGVydFZpZXciLCJHYW1lT3ZlckFsZXJ0VmlldyIsIk91dE1vdmVBbGVydFZpZXciLCJQb2tlckluc3RhbmNlQmFja2dyb3VuZCIsIlNwcml0ZSIsIlBva2VyU3Rhc2hWaWV3IiwiQ3VycmVudFBva2VyIiwiVGltZXJQYXVzZSIsIkJvb2xlYW4iLCJMYXN0Tm9kZSIsIk5vZGUiLCJQb2tlckVycm9yVGlwcyIsIlNwcml0ZUZyYW1lIiwiUG9rZXJUYXJnZXRUaXBzIiwiUG9rZXJBdGxhcyIsIlNwcml0ZUF0bGFzIiwiQ29tYm9Db3VudCIsIm9uTG9hZCIsIlRvb2xzIiwiZmluZCIsImdldENvbXBvbmVudCIsImF1ZGlvRW5naW5lIiwicGxheU11c2ljIiwic2l6ZSIsInZpZXciLCJnZXRGcmFtZVNpemUiLCJsb2ciLCJ3aWR0aCIsImhlaWdodCIsIndpbmRvd1NpemUiLCJnZXRWaXNpYmxlU2l6ZSIsImhhbGZXaWR0aCIsImhhbGZIZWlnaHQiLCJwYXVzZVNpemUiLCJub2RlIiwiZ2V0Qm91bmRpbmdCb3giLCJzZXRBbmNob3JQb2ludCIsInNldFBvc2l0aW9uIiwibGFiZWxOb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJsYWJlbCIsIkxhYmVsIiwidGltZVN0cmluZyIsIkZvcm1hdE1NU1MiLCJzdHJpbmciLCJiZyIsImZpcnN0UiIsImkiLCJwcmUiLCJpbnN0YW50aWF0ZSIsIl9uYW1lIiwiYWN0aXZlIiwiYWRkQ2hpbGQiLCJhcnJheSIsInBva2VyUmFuZG9tIiwiUG9rZXJOdW1iZXIiLCJpbmRleCIsImNoaWxkcmVuQ291bnQiLCJzdGFydCIsImZhcGFpIiwiX3RoaXMiLCJkaXJlY3RvciIsImdldFNjaGVkdWxlciIsInNjaGVkdWxlIiwiY29udGFpbmVyIiwicG9rZXJOb2RlIiwicG9rZXIiLCJjaGlsZHJlbiIsIkRldGVjdEFycm93cyIsIlBva2VyUmVhbE51bWJlciIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJjbGlwIiwicGxheSIsIkZvbnQiLCJmb250IiwiVGltZU91dCIsImNvbG9yIiwiQ29sb3IiLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwic2VxIiwibGFzdFBvY2tlciIsImN1cnJlbnRQb2tlciIsImZhbnpodWFuIiwiZW5kX2Z1bmMiLCJjYWxsRnVuYyIsInRhcmdldCIsImJhc2VfY291bnQiLCJwYXJzZUludCIsInNwbGl0IiwiY3VyUG9zMSIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInYyIiwiY3VyUG9zMiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiUHJldmlvdXNQYXJlbnQiLCJwYXJlbnQiLCJDdXJyZW50UG9zaXRpb24iLCJpbml0Q291bnROb2RlIiwiaW5pdExhYmVsIiwidG9TdHJpbmciLCJiaW5kIiwibXRvIiwibW92ZVRvIiwiZDEiLCJkZWxheVRpbWUiLCJzZXF1ZSIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwicG9rZXJub2RlIiwicG9zMSIsInBvczIiLCJQcmV2aW91c1Bvc2l0aW9uIiwibW92ZUJ5IiwieCIsInkiLCJmYW4xIiwic2NhbGVUbyIsImNoYW5nZUZyb250Iiwic3Bhd24iLCJkMiIsImZhbjIiLCJhbmltYXRpb25GaW5pc2hlZCIsImdldFBvc2l0aW9uIiwic2VxdSIsImN1cnJlbnRQb3NpdGlvbiIsIkFycmF5IiwibnVtIiwicmFuZG9tTnVtIiwiaW5kZXhPZiIsInB1c2giLCJsZW5ndGgiLCJtaW5OdW0iLCJtYXhOdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJTdGFzaENsaWNrIiwic3RhQnV0IiwibWFpbkpTIiwiQmFja2dyb3VuZFZpZXciLCJjdXJyZW50VGFyZ2V0IiwicG9zMyIsInRvdGF0aW9uIiwicm90YXRlVG8iLCJpbnRlcmFjdGFibGUiLCJjdXJQb3MzIiwiZnJvbnRQb2tlciIsInN0YXNoQW5pbWF0aW9uIiwiY29uZGl0aW9uIiwiYWxlcnROb2RlIiwibWFpbkNhbnZhcyIsInBhdXNlTXVzaWMiLCJnYW1lT3ZlckFsZXJ0IiwibWFzayIsInpJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFdBQVcsRUFBRTtBQUNUQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ00sT0FEQztBQUVULGlCQUFRO0FBRkMsS0FGTDtBQU9SQyxJQUFBQSxTQUFTLEVBQUU7QUFDUEYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLE9BREQ7QUFFUCxpQkFBUTtBQUZELEtBUEg7QUFZUkUsSUFBQUEsY0FBYyxFQUFFO0FBQ1pILE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDUyxTQURJO0FBRVosaUJBQVE7QUFGSSxLQVpSO0FBZ0JSQyxJQUFBQSxXQUFXLEVBQUU7QUFDVEwsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNXLE1BREM7QUFFVCxpQkFBUTtBQUZDLEtBaEJMO0FBb0JSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUlAsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNXLE1BREE7QUFFUixpQkFBUTtBQUZBLEtBcEJKO0FBd0JSRSxJQUFBQSxXQUFXLEVBQUU7QUFDVFIsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNXLE1B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QUFBQSxJQUFJLENBQUM3RSxLQUFMLEdBQWFwRyxFQUFFLENBQUNvRyxLQUFILENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLENBQWxCLENBQWI7QUFFSCxHQTdoQkksQ0EraEJMOztBQS9oQkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBsZWZ0U2Vjb25kczoge1xuICAgICAgICAgICAgdHlwZTpjYy5pbnRlZ2VyLFxuICAgICAgICAgICAgZGVmYXVsdDoyNDBcbiAgICAgICAgfSxcblxuICAgICAgICBBcnJvd1RpcHM6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuaW50ZWdlcixcbiAgICAgICAgICAgIGRlZmF1bHQ6M1xuICAgICAgICB9LFxuXG4gICAgICAgIGJhY2tncm91bmRTb25nOiB7XG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBQYXVzZUJ1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgSGVscEJ1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgQXVkaW9CdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFJlQmFja0J1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBUaW1lQ291bnRMYWJlbDoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgUm91bmRMYWJlbDoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgU2NvcmVMYWJlbDoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBQb2tlckNvbnRhaW5lcjoge1xuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBteVBva2VyOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYixcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIFBhdXNlQWxlcnRWaWV3OiB7XG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYixcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIEdhbWVPdmVyQWxlcnRWaWV3OiB7XG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYixcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIE91dE1vdmVBbGVydFZpZXc6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuUHJlZmFiLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgUG9rZXJJbnN0YW5jZUJhY2tncm91bmQ6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgUG9rZXJTdGFzaFZpZXc6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ3VycmVudFBva2VyOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIFRpbWVyUGF1c2U6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6ZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBMYXN0Tm9kZToge1xuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgUG9rZXJFcnJvclRpcHM6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgUG9rZXJUYXJnZXRUaXBzOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFBva2VyQXRsYXM6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlQXRsYXMsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgQ29tYm9Db3VudDoge1xuICAgICAgICAgICAgdHlwZTpjYy5pbnRlZ2VyLFxuICAgICAgICAgICAgZGVmYXVsdDowXG4gICAgICAgIH1cblxuXG5cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIHZhciBUb29scyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnVG9vbHNTY3JpcHQnKTtcblxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iYWNrZ3JvdW5kU29uZyx0cnVlKVxuICAgICAgICBsZXQgc2l6ZSA9IGNjLnZpZXcuZ2V0RnJhbWVTaXplKCk7XG4gICAgICAgIGNjLmxvZyhzaXplLndpZHRoLHNpemUuaGVpZ2h0KVxuICAgICAgICBsZXQgd2luZG93U2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcbiAgICAgICAgY2MubG9nKHdpbmRvd1NpemUud2lkdGgsd2luZG93U2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIHZhciBoYWxmV2lkdGggPSB3aW5kb3dTaXplLndpZHRoIC8gMjtcbiAgICAgICAgdmFyIGhhbGZIZWlnaHQgPSB3aW5kb3dTaXplLmhlaWdodCAvIDI7XG4gICAgICAgIFxuICAgICAgICB2YXIgcGF1c2VTaXplID0gdGhpcy5QYXVzZUJ1dHRvbi5ub2RlLmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgIHRoaXMuUGF1c2VCdXR0b24ubm9kZS5zZXRBbmNob3JQb2ludCgwLDApO1xuICAgICAgICB0aGlzLlBhdXNlQnV0dG9uLm5vZGUuc2V0UG9zaXRpb24oLWhhbGZXaWR0aCArIDQwLC1oYWxmSGVpZ2h0ICsgMzApXG5cbiAgICAgICAgdGhpcy5IZWxwQnV0dG9uLm5vZGUuc2V0QW5jaG9yUG9pbnQoMCwwKTtcbiAgICAgICAgdGhpcy5IZWxwQnV0dG9uLm5vZGUuc2V0UG9zaXRpb24oLTg3IC0gNDAsLWhhbGZIZWlnaHQgKyAxMSArIDMwKVxuXG4gICAgICAgIHRoaXMuQXVkaW9CdXR0b24ubm9kZS5zZXRBbmNob3JQb2ludCgwLDApO1xuICAgICAgICB0aGlzLkF1ZGlvQnV0dG9uLm5vZGUuc2V0UG9zaXRpb24oNDAsLWhhbGZIZWlnaHQgKyAxMSArIDMwKVxuXG4gICAgICAgIHRoaXMuUmVCYWNrQnV0dG9uLm5vZGUuc2V0QW5jaG9yUG9pbnQoMCwwKTtcbiAgICAgICAgdGhpcy5SZUJhY2tCdXR0b24ubm9kZS5zZXRQb3NpdGlvbihoYWxmV2lkdGggLSA0MCAtIDExMCwtaGFsZkhlaWdodCArIDMwKVxuXG4gICAgICAgIHRoaXMuVGltZUNvdW50TGFiZWwubm9kZS5zZXRBbmNob3JQb2ludCgxLDApO1xuICAgICAgICB0aGlzLlRpbWVDb3VudExhYmVsLm5vZGUuc2V0UG9zaXRpb24oMC0xMDcsaGFsZkhlaWdodCAtIDkwIC0gNTApXG4gICAgICAgIHZhciBsYWJlbE5vZGUgPSB0aGlzLlRpbWVDb3VudExhYmVsLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIik7XG4gICAgICAgIHZhciBsYWJlbCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB2YXIgdGltZVN0cmluZyA9IFRvb2xzLkZvcm1hdE1NU1ModGhpcy5sZWZ0U2Vjb25kcyk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9IHRpbWVTdHJpbmc7XG5cbiAgICAgICAgdGhpcy5Sb3VuZExhYmVsLm5vZGUuc2V0QW5jaG9yUG9pbnQoMC41LDApO1xuICAgICAgICB0aGlzLlJvdW5kTGFiZWwubm9kZS5zZXRQb3NpdGlvbigwLGhhbGZIZWlnaHQgLSA5MCAtIDUwKVxuICAgICAgICB2YXIgYmcgPSB0aGlzLlJvdW5kTGFiZWwubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIik7XG4gICAgICAgIHZhciBmaXJzdFIgPSBiZy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0Um91bmRcIik7XG4gICAgICAgIC8vIGZpcnN0Ui5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICAvLyBiZy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0Um91bmRcIikubm9kZS5oaSA9IGZhbHNlO1xuICAgICAgICAvLyBjYy5sb2coYmcuZ2V0Q2hpbGRCeU5hbWUoXCJGaXJzdFJvdW5kXCIpKTtcbiAgICAgICAgLy8gdGhpcy5Sb3VuZExhYmVsLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJGaXJzdFJvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLlJvdW5kTGFiZWwubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0Um91bmRcIikubm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLlNjb3JlTGFiZWwubm9kZS5zZXRBbmNob3JQb2ludCgwLDApO1xuICAgICAgICB0aGlzLlNjb3JlTGFiZWwubm9kZS5zZXRQb3NpdGlvbigxMDcsaGFsZkhlaWdodCAtIDkwIC0gNTApXG5cbiAgICAgICAgdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLnNldEFuY2hvclBvaW50KDAuNSwwLjUpO1xuICAgICAgICAvLyBjYy5sb2codGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGgsdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0KTtcbiAgICAgICAgLy8gY2MubG9nKHRoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5nZXRCb3VuZGluZ0JveCgpLnNpemUud2lkdGgsdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmdldEJvdW5kaW5nQm94KCkuc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuc2V0UG9zaXRpb24oLWhhbGZXaWR0aCArIDEzMCArIDIwLC1oYWxmSGVpZ2h0ICsgOTMgKyAxNjApO1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLkN1cnJlbnRQb2tlci5ub2RlLnNldEFuY2hvclBvaW50KDAsMC41KTtcbiAgICAgICAgdGhpcy5DdXJyZW50UG9rZXIubm9kZS5zZXRQb3NpdGlvbigwLC1oYWxmSGVpZ2h0ICsgOTUgKyAxNjApO1xuXG4gICAgICAgIHRoaXMuUG9rZXJTdGFzaFZpZXcubm9kZS5zZXRBbmNob3JQb2ludCgxLDEpO1xuICAgICAgICB0aGlzLlBva2VyU3Rhc2hWaWV3Lm5vZGUuc2V0UG9zaXRpb24oaGFsZldpZHRoIC0gMTAsLWhhbGZIZWlnaHQgKyAxOTAgKyAxNjApO1xuXG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuQXJyb3dUaXBzID0gMztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBva2VyQ29udGFpbmVyKTtcbiAgICAgICAgICAgIHByZS5fbmFtZT1cIlBva2VyQ29udGFpbmVyXCIrKGkgKyAxKTtcbiAgICAgICAgICAgIHByZS5nZXRDaGlsZEJ5TmFtZShcIlVwVGlwXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcHJlLmdldENoaWxkQnlOYW1lKFwiQnVzdFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChwcmUpO1xuICAgICAgICAgICAgcHJlLnNldEFuY2hvclBvaW50KDAuNSwwLjUpO1xuICAgICAgICAgICAgcHJlLnNldFBvc2l0aW9uKC1oYWxmV2lkdGggKyA3OCArIDYwICsgMTU3KmksMCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFycmF5ID0gdGhpcy5wb2tlclJhbmRvbSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUyOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm15UG9rZXIpO1xuICAgICAgICAgICAgcHJlLlBva2VyTnVtYmVyID0gYXJyYXlbaV07XG4gICAgICAgICAgICAvLyBwcmUuUG9rZXJOdW1iZXIgPSA1MjtcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIlBva2VySW5pdFwiK3ByZS5Qb2tlck51bWJlcik7XG4gICAgICAgICAgICAvLyBjYy5sb2coXCJkaWFuc2h1XCIrcHJlLlBva2VyTnVtYmVyKTtcbiAgICAgICAgICAgIHByZS5fbmFtZT1cIlBva2VyX1wiK2k7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQocHJlKTtcbiAgICAgICAgICAgIHByZS5nZXRDaGlsZEJ5TmFtZShcIkZyb250Vmlld1wiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHByZS5zZXRBbmNob3JQb2ludCgwLjUsMC41KTtcbiAgICAgICAgICAgIHByZS5zZXRQb3NpdGlvbigwLDAgLSAyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNjLmxvZyh0aGlzLm5vZGUuY2hpbGRyZW5baW5kZXhdKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgICAgICB2YXIgVG9vbHMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ1Rvb2xzU2NyaXB0Jyk7XG4gICAgICAgIHZhciBiZyA9IHRoaXMuUm91bmRMYWJlbC5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKTtcbiAgICAgICAgYmcuZ2V0Q2hpbGRCeU5hbWUoXCJGaXJzdFJvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBiZy5nZXRDaGlsZEJ5TmFtZShcIlNlY29uZFJvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBiZy5nZXRDaGlsZEJ5TmFtZShcIlRoaXJkUm91bmRcIikuYWN0aXZlID0gZmFsc2U7XG5cblxuICAgICAgICB0aGlzLmZhcGFpKDApO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoX3RoaXMuVGltZXJQYXVzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5sZWZ0U2Vjb25kcyAtLTtcbiAgICAgICAgICAgICAgICBfdGhpcy5BcnJvd1RpcHMgKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuQXJyb3dUaXBzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdQb2tlckNvbnRhaW5lcicraSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2tlck5vZGUgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIgPSBwb2tlck5vZGUuY2hpbGRyZW5bcG9rZXJOb2RlLmNoaWxkcmVuQ291bnQgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYocG9rZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udGFpbmVyLlNjb3JlTGFiZWwuc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZ2V0Q29tcG9uZW50KFwiQ29udGFpbmVyUHJlZmFiU2NyaXB0XCIpLkRldGVjdEFycm93cyhwb2tlci5Qb2tlclJlYWxOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmdldENvbXBvbmVudChcIkNvbnRhaW5lclByZWZhYlNjcmlwdFwiKS5EZXRlY3RBcnJvd3MoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxhYmVsTm9kZSA9IHRoaXMuVGltZUNvdW50TGFiZWwubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmxlZnRTZWNvbmRzID09PSAzMCkge1xuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibXVzaWMvdGltZV90aXBcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImZvbnQvcmVkX3RpbWVfZm9udFwiLCBjYy5Gb250LCBmdW5jdGlvbihlcnIsIGZvbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuZm9udCA9IGZvbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLmxlZnRTZWNvbmRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuVGltZU91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRpbWVTdHJpbmcgPSBUb29scy5Gb3JtYXRNTVNTKF90aGlzLmxlZnRTZWNvbmRzKTtcbiAgICAgICAgICAgIGNjLmxvZyh0aW1lU3RyaW5nKTtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IHRpbWVTdHJpbmc7XG4gICAgICAgICAgICBsYWJlbC5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDAsIDAsIDI1NSk7XG4gICAgICAgICAgICAvLyBjYy5sb2coX3RoaXMuVGltZXJQYXVzZSlcbiAgICAgICAgfSxfdGhpcywxLGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLDEsZmFsc2UpO1xuICAgIH0sXG4vLyDlj5HniYzlh73mlbBcbiAgICBmYXBhaTpmdW5jdGlvbihzZXEpIHtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBsZXQgc2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcbiAgICAgICAgbGV0IGxhc3RQb2NrZXIgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmdldENoaWxkQnlOYW1lKFwiUG9rZXJfXCIrKHNlcSAtIDEpKTtcbiAgICAgICAgbGV0IGN1cnJlbnRQb2tlciA9IF90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQb2tlcl9cIitzZXEpO1xuICAgICAgICBpZiAoY3VycmVudFBva2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJUZXN0XCIsbGFzdFBvY2tlcixjdXJyZW50UG9rZXIpO1xuICAgICAgICAgICAgX3RoaXMuZmFuemh1YW4obGFzdFBvY2tlcik7XG4gICAgICAgICAgICBfdGhpcy5BcnJvd1RpcHMgPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibXVzaWMvaW5pdF9wYWlcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuMyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDlm57osINcbiAgICAgICAgdmFyIGVuZF9mdW5jID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgYmFzZV9jb3VudCA9IHBhcnNlSW50KHRhcmdldC5fbmFtZS5zcGxpdChcIl9cIilbMV0pICsgMTtcblxuICAgICAgICAgICAgdmFyIGN1clBvczEgPSB0YXJnZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIGN1clBvczIgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGN1clBvczEpO1xuICAgICAgICAgICAgLy8gY2MubG9nKHRhcmdldCk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0UG9zaXRpb24oY3VyUG9zMik7XG4gICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQYXJlbnQgPSB0YXJnZXQucGFyZW50O1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudCA9IF90aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGU7XG4gICAgICAgICAgICB0YXJnZXQuQ3VycmVudFBvc2l0aW9uID0gY3VyUG9zMTtcbiAgICAgICAgICAgIF90aGlzLmZhcGFpKGJhc2VfY291bnQpO1xuICAgICAgICAgICAgdmFyIGluaXRDb3VudE5vZGUgPSBjYy5maW5kKCdDYW52YXMvUG9rZXJJbnN0YW5jZUJhY2tncm91bmQvQ291bnRMYWJlbCcpO1xuICAgICAgICAgICAgdmFyIGluaXRMYWJlbCA9IGluaXRDb3VudE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGluaXRMYWJlbC5zdHJpbmcgPSAocGFyc2VJbnQoaW5pdExhYmVsLnN0cmluZykgKyAxKS50b1N0cmluZygpO1xuXG4gICAgICAgIH0uYmluZChjdXJyZW50UG9rZXIpKVxuXG4gICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlVG8oMC4wNSwgY2MudjIoKC1zaXplLndpZHRoIC8gMikrIDIwICsgNzIrMi4yKnNlcSwoLXNpemUuaGVpZ2h0IC8gMikgKyA5NSArIDE2MCkpO1xuICAgICAgICB2YXIgZDEgPSBjYy5kZWxheVRpbWUoMC4wMSk7XG4gICAgICAgIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSwgbXRvLCBlbmRfZnVuY10pO1xuICAgICAgICBjdXJyZW50UG9rZXIucnVuQWN0aW9uKHNlcXVlKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGZhbnpodWFuOmZ1bmN0aW9uKHBva2Vybm9kZSkge1xuICAgICAgICBsZXQgc2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAvLyDlpoLmnpzlvZPliY3oioLngrnnmoRwYXJlbnTkuLpQb2tlckluc3RhbmNlQmFja2dyb3VuZO+8jOWImeivtOaYjumcgOimgeW+gOS4remXtOenu+WKqO+8jOWmguaenOaYr+WcqOS4remXtOWImemcgOimgeW+gOW3pui+ueenu+WKqFxuICAgICAgICAvLyBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlXG4gICAgICAgIGlmIChwb2tlcm5vZGUucGFyZW50ID09PSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZSkge1xuICAgICAgICAgICAgdmFyIGluaXRDb3VudE5vZGUgPSBjYy5maW5kKCdDYW52YXMvUG9rZXJJbnN0YW5jZUJhY2tncm91bmQvQ291bnRMYWJlbCcpO1xuICAgICAgICAgICAgdmFyIGluaXRMYWJlbCA9IGluaXRDb3VudE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGluaXRMYWJlbC5zdHJpbmcgPSAocGFyc2VJbnQoaW5pdExhYmVsLnN0cmluZykgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIGQxID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICAgICAgdmFyIHBvczEgPSBwb2tlcm5vZGUuQ3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgdmFyIHBvczIgPSBwb2tlcm5vZGUuUHJldmlvdXNQb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4xNSwgY2MudjIocG9zMi54IC0gcG9zMS54LHBvczIueSAtIHBvczEueSkpO1xuICAgICAgICAgICAgdmFyIGZhbjEgPSBjYy5zY2FsZVRvKDAuMTUsIDAuMiwgMSk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlRnJvbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJGcm9udFZpZXdcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihbbXRvLGZhbjFdKTtcbiAgICAgICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc3Bhd24pO1xuXG4gICAgICAgICAgICB2YXIgZDIgPSBjYy5kZWxheVRpbWUoMC4xNSk7XG4gICAgICAgICAgICB2YXIgZmFuMiA9IGNjLnNjYWxlVG8oMC4xLCAxLCAxKTtcbiAgICAgICAgICAgIHZhciBhbmltYXRpb25GaW5pc2hlZCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5DdXJyZW50UG9zaXRpb24gPSB0YXJnZXQuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgY3VyUG9zMSA9IHRhcmdldC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAgICAgdmFyIGN1clBvczIgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGN1clBvczEpO1xuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRQb3NpdGlvbihjdXJQb3MyKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQYXJlbnQgPSB0YXJnZXQucGFyZW50O1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnQgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlO1xuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0YXJnZXQuQ3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQb3NpdGlvbiA9IHRhcmdldC5DdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IGN1clBvczE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzZXF1ID0gY2Muc2VxdWVuY2UoW2QyLGNoYW5nZUZyb250LGZhbjIsYW5pbWF0aW9uRmluaXNoZWRdKTtcbiAgICAgICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc2VxdSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaW5pdENvdW50Tm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9Qb2tlckluc3RhbmNlQmFja2dyb3VuZC9Db3VudExhYmVsJyk7XG4gICAgICAgICAgICB2YXIgaW5pdExhYmVsID0gaW5pdENvdW50Tm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgaW5pdExhYmVsLnN0cmluZyA9IChwYXJzZUludChpbml0TGFiZWwuc3RyaW5nKSAtIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL3NvbGl0YWlyZV9kZWVsXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHBva2Vybm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyDlhYjlj43ovaw5MOWPmOato+mdouaVsOaNru+8jOWGjeWPjei9rC05MOWbnuadpe+8jOe7k+adn++8jOaVtOS4qui/h+eoi+enu+WKqOeJjOmdouWIsOaMh+WumuS9jee9rlxuICAgICAgICAgICAgdmFyIGQxID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICAgICAgLy8gdmFyIG10byA9IGNjLm1vdmVUbygwLjMsIGNjLnYyKDAgKyA2OSwoLXNpemUuaGVpZ2h0IC8gMikgKyA5NSArIDE2MCkpO1xuICAgICAgICAgICAgdmFyIHBvczEgPSBwb2tlcm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczIgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICB2YXIgbXRvID0gY2MubW92ZUJ5KDAuMTUsIGNjLnYyKHBvczIueCAtIHBvczEueCArIDY2LHBvczIueSAtIHBvczEueSkpO1xuICAgICAgICAgICAgdmFyIGZhbjEgPSBjYy5zY2FsZVRvKDAuMTUsIDAuMiwgMSk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlRnJvbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJGcm9udFZpZXdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihbbXRvLGZhbjFdKTtcbiAgICAgICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc3Bhd24pO1xuXG5cbiAgICAgICAgICAgIHZhciBkMiA9IGNjLmRlbGF5VGltZSgwLjE1KTtcbiAgICAgICAgICAgIHZhciBmYW4yID0gY2Muc2NhbGVUbygwLjEsIDEsIDEpO1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbkZpbmlzaGVkID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IHRhcmdldC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MxID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VyUG9zMiA9IF90aGlzLkN1cnJlbnRQb2tlci5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGN1clBvczEpO1xuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRQb3NpdGlvbihjdXJQb3MyKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQYXJlbnQgPSB0YXJnZXQucGFyZW50O1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnQgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZTtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2codGFyZ2V0LkN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IGN1clBvczE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzZXF1ID0gY2Muc2VxdWVuY2UoW2QyLGNoYW5nZUZyb250LGZhbjIsYW5pbWF0aW9uRmluaXNoZWRdKTtcbiAgICAgICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc2VxdSk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICAgLy8gdmFyIGQzID0gY2MuZGVsYXlUaW1lKDEuMyk7XG4gICAgICAgIC8vIHZhciBkZXN0cm95UG9rZXJOb2RlID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIC8vICAgICB0YXJnZXQucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgLy8gICAgIHRhcmdldC5kZXN0cm95KCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyB2YXIgc2VxdTIgPSBjYy5zZXF1ZW5jZShbZDMsZGVzdHJveVBva2VyTm9kZV0pO1xuICAgICAgICAvLyBwb2tlcm5vZGUucnVuQWN0aW9uKHNlcXUyKTtcbiAgICB9LFxuXG5cbiAgICBwb2tlclJhbmRvbTpmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhciBudW0gPSB0aGlzLnJhbmRvbU51bSgxLDUzKTtcbiAgICAgICAgICAgIGlmIChhcnJheS5pbmRleE9mKG51bSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChudW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKG51bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGFycmF5Lmxlbmd0aCA8IDUyKTtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH0sXG4gICAgLy/nlJ/miJDku45taW5OdW3liLBtYXhOdW3nmoTpmo/mnLrmlbBcbiAgICByYW5kb21OdW06ZnVuY3Rpb24obWluTnVtLCBtYXhOdW0pIHtcbiAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWluTnVtIC0gbWF4TnVtKSArIG1heE51bSk7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfSxcblxuICAgIFN0YXNoQ2xpY2s6ZnVuY3Rpb24gKHN0YUJ1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgdmFyIHBva2VyTm9kZSA9IG1haW5KUy5DdXJyZW50UG9rZXIubm9kZTtcbiAgICAgICAgdmFyIEJhY2tncm91bmRWaWV3ID0gc3RhQnV0LmN1cnJlbnRUYXJnZXQuZ2V0Q2hpbGRCeU5hbWUoJ0JhY2tncm91bmQnKTtcbiAgICAgICAgY2MubG9nKEJhY2tncm91bmRWaWV3KTtcbiAgICAgICAgaWYgKEJhY2tncm91bmRWaWV3LmNoaWxkcmVuQ291bnQgPiAwKSB7XG5cblxuXG4gICAgICAgICAgICBpZiAocG9rZXJOb2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5Lit6Ze06IqC54K56KKr5Y2g5LqGLOmcgOimgeWFiOaJp+ihjOS4remXtOWNoeeJjOWKqOeUu1wiKTtcbiAgICAgICAgICAgICAgICBtYWluSlMuZmFuemh1YW4ocG9rZXJOb2RlLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8g5omn6KGM5Zue6L2s5Yqo55S7XG4gICAgICAgICAgICB2YXIgcG9rZXIgPSBCYWNrZ3JvdW5kVmlldy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIC8vIOWFiOWIh+aNouaMgui9veeahOiKgueCuVxuICAgICAgICAgICAgLy8gdmFyIGN1clBvczEgPSBwb2tlci5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgY3VyUG9zMyA9IHBva2VyTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyBwb2tlci5zZXRQb3NpdGlvbihjYy52MihjdXJQb3MxLnggLSBjdXJQb3MzLngsY3VyUG9zMS55IC0gY3VyUG9zMy55KSk7XG4gICAgICAgICAgICAvLyBwb2tlci5wYXJlbnQgPSBwb2tlck5vZGU7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdmFyIHBvczEgPSBwb2tlci5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgcG9zMiA9IHBva2VyTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgbXRvID0gY2MubW92ZUJ5KDAuMywgY2MudjIocG9zMi54IC0gcG9zMS54ICsgNjUscG9zMi55IC0gcG9zMS55KSk7XG4gICAgICAgICAgICAvLyB2YXIgdG90YXRpb24gPSBjYy5yb3RhdGVUbygwLjMsMCk7XG4gICAgICAgICAgICAvLyB2YXIgc3Bhd24gPSBjYy5zcGF3bihbbXRvLHRvdGF0aW9uXSk7XG4gICAgICAgICAgICAvLyBwb2tlci5ydW5BY3Rpb24oc3Bhd24pO1xuXG5cbiAgICAgICAgICAgIHZhciBwb3MxID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczMgPSBwb2tlck5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczIgPSBwb2tlck5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zMSk7XG4gICAgICAgICAgICBwb2tlci5zZXRQb3NpdGlvbihwb3MyKTtcbiAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4xNSwgY2MudjIocG9zMy54IC0gcG9zMS54ICsgNjUscG9zMy55IC0gcG9zMS55KSk7XG4gICAgICAgICAgICB2YXIgdG90YXRpb24gPSBjYy5yb3RhdGVUbygwLjE1LDApO1xuICAgICAgICAgICAgdmFyIHNwYXduID0gY2Muc3Bhd24oW210byx0b3RhdGlvbl0pO1xuICAgICAgICAgICAgcG9rZXIucnVuQWN0aW9uKHNwYXduKTtcbiAgICAgICAgICAgIHBva2VyLlByZXZpb3VzUGFyZW50ID0gcG9rZXIucGFyZW50O1xuICAgICAgICAgICAgcG9rZXIucGFyZW50ID0gcG9rZXJOb2RlO1xuICAgICAgICAgICAgcG9rZXIuQ3VycmVudFBvc2l0aW9uID0gcG9rZXIuUHJldmlvdXNQb3NpdGlvbjtcbiAgICAgICAgICAgIHBva2VyLlByZXZpb3VzUG9zaXRpb24gPSBjYy52MigwLDApO1xuICAgICAgICAgICAgcG9rZXIuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIOaJp+ihjOeJjOWxgOWbnumAgFxuXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlbkNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuaIkeacieWtqeWtkOiKgueCuVwiKTtcbiAgICAgICAgICAgICAgICAvLyDmiafooYzml4vovazliqjnlLtcbiAgICAgICAgICAgICAgICB2YXIgcG9rZXIgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlblswXTtcblxuICAgICAgICAgICAgICAgIC8vIOWFiOWIh+aNouaMgui9veeahOiKgueCuVxuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MxID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MzID0gQmFja2dyb3VuZFZpZXcuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHBva2VyLnNldFBvc2l0aW9uKGNjLnYyKGN1clBvczEueCAtIGN1clBvczMueCxjdXJQb3MxLnkgLSBjdXJQb3MzLnkpKTtcbiAgICAgICAgICAgICAgICBwb2tlci5QcmV2aW91c1BhcmVudCA9IHBva2VyLnBhcmVudDtcbiAgICAgICAgICAgICAgICBwb2tlci5wYXJlbnQgPSBCYWNrZ3JvdW5kVmlldztcblxuICAgICAgICAgICAgICAgIHZhciBwb3MxID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gQmFja2dyb3VuZFZpZXcuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4xNSwgY2MudjIocG9zMi54IC0gcG9zMS54LHBvczIueSAtIHBvczEueSkpO1xuICAgICAgICAgICAgICAgIHZhciB0b3RhdGlvbiA9IGNjLnJvdGF0ZVRvKDAuMTUsMTcpO1xuICAgICAgICAgICAgICAgIHZhciBzcGF3biA9IGNjLnNwYXduKFttdG8sdG90YXRpb25dKTtcbiAgICAgICAgICAgICAgICBwb2tlci5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICAgICAgICAgIHBva2VyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBva2VyLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBwb3MzID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHBva2VyLlByZXZpb3VzUG9zaXRpb24gPSBwb2tlci5DdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgcG9rZXIuQ3VycmVudFBvc2l0aW9uID0gcG9zMztcbiAgICAgICAgICAgICAgICAvLyDmiafooYzniYzlsYDot5/ov5tcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBjYy5sb2cobWFpbkpTLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIGlmIChtYWluSlMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jaGlsZHJlbkNvdW50ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZnJvbnRQb2tlciA9IG1haW5KUy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNoaWxkcmVuW21haW5KUy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNoaWxkcmVuQ291bnQgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKGZyb250UG9rZXIpO1xuICAgICAgICAgICAgICAgICAgICBtYWluSlMuZmFuemh1YW4oZnJvbnRQb2tlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXNoQW5pbWF0aW9uOmZ1bmN0aW9uIChzdGFCdXQpIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgVGltZU91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbGVydE5vZGUgPSBjYy5maW5kKCdDYW52YXMvR2FtZU92ZXJBbGVydFZpZXcnKTtcbiAgICAgICAgaWYgKGFsZXJ0Tm9kZSAhPSBudWxsICYmIGFsZXJ0Tm9kZS5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL3Jlc3VsdF9lZmYxXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIGZhbHNlLCAwLjUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG1haW5DYW52YXMgPSBjYy5maW5kKCdDYW52YXMnKTtcbiAgICAgICAgdmFyIG1haW5KUyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZVNjZW5lU2NyaXB0Jyk7XG4gICAgICAgIG1haW5KUy5UaW1lclBhdXNlID0gdHJ1ZTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuXG4gICAgICAgIFxuICAgICAgICBpZiAoYWxlcnROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFsZXJ0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGdhbWVPdmVyQWxlcnQgPSBjYy5pbnN0YW50aWF0ZShtYWluSlMuR2FtZU92ZXJBbGVydFZpZXcpO1xuICAgICAgICAgICAgYWxlcnROb2RlID0gZ2FtZU92ZXJBbGVydDtcbiAgICAgICAgICAgIGdhbWVPdmVyQWxlcnQuX25hbWUgPSBcIkdhbWVPdmVyQWxlcnRWaWV3XCI7XG4gICAgICAgICAgICBtYWluQ2FudmFzLmFkZENoaWxkKGdhbWVPdmVyQWxlcnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgbWFzayA9IGNjLmZpbmQoJ0NhbnZhcy9HYW1lT3ZlckFsZXJ0Vmlldy9iZycpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBhbGVydE5vZGUuekluZGV4ID0gOTk5O1xuICAgICAgICBtYXNrLkNvbG9yID0gY2MuQ29sb3IoMCwgMCwgMCwgMCk7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PokerPrefabScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b44b7NMjvhMooF1IpLYSEdL', 'PokerPrefabScript');
// Script/PokerPrefabScript.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    BackgroundImage: {
      type: cc.Sprite,
      "default": null
    },
    FrontImage: {
      type: cc.Sprite,
      "default": null
    },
    NumView: {
      type: cc.Sprite,
      "default": null
    },
    DecorsSmallView: {
      type: cc.Sprite,
      "default": null
    },
    DecorsBigView: {
      type: cc.Sprite,
      "default": null
    },
    PreviousPosition: {
      type: cc.Vec2,
      "default": cc.v2(0, 0)
    },
    CurrentPosition: {
      type: cc.Vec2,
      "default": cc.v2(0, 0) // get () {
      //     this._CurrentPosition;
      // },
      // set (value) {
      //     this._CurrentPosition = value;
      // }

    },
    PreviousParent: {
      type: cc.Node,
      "default": null
    },
    PokerNumber: {
      type: cc.integer,
      "default": 0 // get () {
      //     cc.log("InitPokerGet");
      //     return this._PokerNumber;
      // },
      // set (value) {
      //     cc.log("InitPokerSet");
      //     this._PokerNumber = value;
      // }

    },
    PokerRealNumber: {
      type: cc.integer,
      "default": 0
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    this.InitPoker(this.node.PokerNumber);
  },
  onClick: function onClick() {
    // this.fanzhuan(this.node);
    // cc.log(cc.find('Canvas'));
    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    var currentNode = cc.find('Canvas').getChildByName('CurrentPoker');
    var pokerInitBg = cc.find('Canvas').getChildByName('PokerInstanceBackground'); // cc.log(cc.find('Canvas').getChildByName('CurrentPoker'));
    // cc.log(cc.find('Canvas').getChildByName('PokerInstanceBackground'));
    // cc.log(mainJS.CurrentPoker);
    // cc.log(mainJS.CurrentPoker.node);

    if (this.node.parent === mainJS.CurrentPoker.node) {
      cc.log('GGGGGGGG');
    } else if (this.node.parent === mainJS.PokerInstanceBackground.node) {
      // 判断中间存放牌的位置，是否已被占用
      if (mainJS.CurrentPoker.node.childrenCount >= 1) {
        cc.log('FFFF');
      } else {
        mainJS.fanzhuan(this.node);
      }
    }

    cc.log(this.node.parent);
  },
  fanzhuan: function fanzhuan(pokernode) {
    var size = cc.view.getVisibleSize(); // 先反转90变正面数据，再反转-90回来，结束，整个过程移动牌面到指定位置

    var d1 = cc.delayTime(0.01);
    var mto = cc.moveTo(0.3, cc.v2(69, -size.height / 2 + 95 + 160));
    var fan1 = cc.scaleTo(0.3, 0.2, 1); // var fan1 = cc.flipX(true);

    var changeFront = cc.callFunc(function (target) {
      target.getChildByName("FrontView").active = true;
      target.getChildByName("Background").active = false; // target.convertToWorldSpaceAR(cc.v2(0,0))
    });
    var spawn = cc.spawn([mto, fan1]);
    pokernode.runAction(spawn);
    var d2 = cc.delayTime(0.3);
    var fan2 = cc.scaleTo(0.1, 1, 1);
    var sequ = cc.sequence([d2, changeFront, fan2]);
    pokernode.runAction(sequ);
  },
  InitPoker: function InitPoker(dianshu) {
    var _this = this;

    var mainSceneScript = cc.find('Canvas').getComponent('GameSceneScript');
    ;
    var num = dianshu % 13;

    if (num === 0) {
      num = 13;
    }

    if (num >= 10) {
      _this.node.PokerRealNumber = 10;
    } else {
      _this.node.PokerRealNumber = num;
    }

    var decors = parseInt((dianshu - 1) / 13);
    var decorsString = '';

    switch (decors) {
      case 0:
        // cc.loader.loadRes('poker',cc.SpriteAtlas,function(err,atlas){
        //     if(err) {
        //         cc.log(err);
        //         return;
        //     }
        //     _this.NumView.spriteFrame = atlas.getSpriteFrame('solitaire_0_'+num);
        //     _this.DecorsSmallView.spriteFrame = atlas.getSpriteFrame('solitaire_small_2');
        //     _this.DecorsBigView.spriteFrame = atlas.getSpriteFrame('solitaire_big_2');
        // });
        _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_0_' + num);
        _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_2');
        _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_2');
        decorsString = "红桃";
        break;

      case 1:
        // cc.loader.loadRes('poker',cc.SpriteAtlas,function(err,atlas){
        //     if(err) {
        //         cc.log(err);
        //         return;
        //     }
        //     _this.NumView.spriteFrame = atlas.getSpriteFrame('solitaire_0_'+num);
        //     _this.DecorsSmallView.spriteFrame = atlas.getSpriteFrame('solitaire_small_0');
        //     _this.DecorsBigView.spriteFrame = atlas.getSpriteFrame('solitaire_big_0');
        // });
        _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_0_' + num);
        _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_0');
        _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_0');
        decorsString = "方片";
        break;

      case 2:
        // cc.loader.loadRes('poker',cc.SpriteAtlas,function(err,atlas){
        //     if(err) {
        //         cc.log(err);
        //         return;
        //     }
        //     _this.NumView.spriteFrame = atlas.getSpriteFrame('solitaire_1_'+num);
        //     _this.DecorsSmallView.spriteFrame = atlas.getSpriteFrame('solitaire_small_3');
        //     _this.DecorsBigView.spriteFrame = atlas.getSpriteFrame('solitaire_big_3');
        // });
        _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_1_' + num);
        _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_3');
        _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_3');
        decorsString = "黑桃";
        break;

      case 3:
        // cc.loader.loadRes('poker',cc.SpriteAtlas,function(err,atlas){
        //     if(err) {
        //         cc.log(err);
        //         return;
        //     }
        //     _this.NumView.spriteFrame = atlas.getSpriteFrame('solitaire_1_'+num);
        //     _this.DecorsSmallView.spriteFrame = atlas.getSpriteFrame('solitaire_small_1');
        //     _this.DecorsBigView.spriteFrame = atlas.getSpriteFrame('solitaire_big_1');
        // });
        _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_1_' + num);
        _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_1');
        _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_1');
        decorsString = "草花";
        break;

      default:
        break;
    }

    cc.log("点数:" + num + "   " + "花色:" + decorsString + "    实际点数" + _this.node.PokerRealNumber);
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvUG9rZXJQcmVmYWJTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJCYWNrZ3JvdW5kSW1hZ2UiLCJ0eXBlIiwiU3ByaXRlIiwiRnJvbnRJbWFnZSIsIk51bVZpZXciLCJEZWNvcnNTbWFsbFZpZXciLCJEZWNvcnNCaWdWaWV3IiwiUHJldmlvdXNQb3NpdGlvbiIsIlZlYzIiLCJ2MiIsIkN1cnJlbnRQb3NpdGlvbiIsIlByZXZpb3VzUGFyZW50IiwiTm9kZSIsIlBva2VyTnVtYmVyIiwiaW50ZWdlciIsIlBva2VyUmVhbE51bWJlciIsIm9uTG9hZCIsInN0YXJ0IiwiSW5pdFBva2VyIiwibm9kZSIsIm9uQ2xpY2siLCJtYWluSlMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiY3VycmVudE5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsInBva2VySW5pdEJnIiwicGFyZW50IiwiQ3VycmVudFBva2VyIiwibG9nIiwiUG9rZXJJbnN0YW5jZUJhY2tncm91bmQiLCJjaGlsZHJlbkNvdW50IiwiZmFuemh1YW4iLCJwb2tlcm5vZGUiLCJzaXplIiwidmlldyIsImdldFZpc2libGVTaXplIiwiZDEiLCJkZWxheVRpbWUiLCJtdG8iLCJtb3ZlVG8iLCJoZWlnaHQiLCJmYW4xIiwic2NhbGVUbyIsImNoYW5nZUZyb250IiwiY2FsbEZ1bmMiLCJ0YXJnZXQiLCJhY3RpdmUiLCJzcGF3biIsInJ1bkFjdGlvbiIsImQyIiwiZmFuMiIsInNlcXUiLCJzZXF1ZW5jZSIsImRpYW5zaHUiLCJfdGhpcyIsIm1haW5TY2VuZVNjcmlwdCIsIm51bSIsImRlY29ycyIsInBhcnNlSW50IiwiZGVjb3JzU3RyaW5nIiwic3ByaXRlRnJhbWUiLCJQb2tlckF0bGFzIiwiZ2V0U3ByaXRlRnJhbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFB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QUssQ0FBQ2xELGVBQU4sQ0FBc0J3RCxXQUF0QixHQUFvQ0wsZUFBZSxDQUFDTSxVQUFoQixDQUEyQkMsY0FBM0IsQ0FBMEMsbUJBQTFDLENBQXBDO0FBQ0FSLFFBQUFBLEtBQUssQ0FBQ2pELGFBQU4sQ0FBb0J1RCxXQUFwQixHQUFrQ0wsZUFBZSxDQUFDTSxVQUFoQixDQUEyQkMsY0FBM0IsQ0FBMEMsaUJBQTFDLENBQWxDO0FBQ0FILFFBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FMLFFBQUFBLEtBQUssQ0FBQ25ELE9BQU4sQ0FBY3lELFdBQWQsR0FBNEJMLGVBQWUsQ0FBQ00sVUFBaEIsQ0FBMkJDLGNBQTNCLENBQTBDLGlCQUFlTixHQUF6RCxDQUE1QjtBQUNBRixRQUFBQSxLQUFLLENBQUNsRCxlQUFOLENBQXNCd0QsV0FBdEIsR0FBb0NMLGVBQWUsQ0FBQ00sVUFBaEIsQ0FBMkJDLGNBQTNCLENBQTBDLG1CQUExQyxDQUFwQztBQUNBUixRQUFBQSxLQUFLLENBQUNqRCxhQUFOLENBQW9CdUQsV0FBcEIsR0FBa0NMLGVBQWUsQ0FBQ00sVUFBaEIsQ0FBMkJDLGNBQTNCLENBQTBDLGlCQUExQyxDQUFsQztBQUNBSCxRQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBOztBQUVKO0FBQ0k7QUFoRVI7O0FBa0VBaEUsSUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLFFBQU00QixHQUFOLEdBQVUsS0FBVixHQUFnQixLQUFoQixHQUFzQkcsWUFBdEIsR0FBbUMsVUFBbkMsR0FBOENMLEtBQUssQ0FBQ3BDLElBQU4sQ0FBV0osZUFBaEU7QUFFSCxHQTFNSSxDQTZNTDs7QUE3TUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgQmFja2dyb3VuZEltYWdlOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIEZyb250SW1hZ2U6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgTnVtVmlldzoge1xuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgRGVjb3JzU21hbGxWaWV3OiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBEZWNvcnNCaWdWaWV3OiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBQcmV2aW91c1Bvc2l0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlZlYzIsXG4gICAgICAgICAgICBkZWZhdWx0OmNjLnYyKDAsMClcbiAgICAgICAgfSxcbiAgICAgICAgQ3VycmVudFBvc2l0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlZlYzIsXG4gICAgICAgICAgICBkZWZhdWx0OmNjLnYyKDAsMCksXG4gICAgICAgICAgICAvLyBnZXQgKCkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuX0N1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAvLyBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5fQ3VycmVudFBvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIFByZXZpb3VzUGFyZW50OiB7XG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgUG9rZXJOdW1iZXI6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuaW50ZWdlcixcbiAgICAgICAgICAgIGRlZmF1bHQ6MCxcbiAgICAgICAgICAgIC8vIGdldCAoKSB7XG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiSW5pdFBva2VyR2V0XCIpO1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLl9Qb2tlck51bWJlcjtcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAvLyBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiSW5pdFBva2VyU2V0XCIpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuX1Bva2VyTnVtYmVyID0gdmFsdWU7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIFBva2VyUmVhbE51bWJlcjoge1xuICAgICAgICAgICAgdHlwZTpjYy5pbnRlZ2VyLFxuICAgICAgICAgICAgZGVmYXVsdDowLFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcblxuICAgICAgICBcblxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICAgICAgdGhpcy5Jbml0UG9rZXIodGhpcy5ub2RlLlBva2VyTnVtYmVyKTtcbiAgICB9LFxuXG4gICAgb25DbGljazpmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gdGhpcy5mYW56aHVhbih0aGlzLm5vZGUpO1xuICAgICAgICAvLyBjYy5sb2coY2MuZmluZCgnQ2FudmFzJykpO1xuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q2hpbGRCeU5hbWUoJ0N1cnJlbnRQb2tlcicpO1xuICAgICAgICB2YXIgcG9rZXJJbml0QmcgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDaGlsZEJ5TmFtZSgnUG9rZXJJbnN0YW5jZUJhY2tncm91bmQnKTtcbiAgICAgICAgLy8gY2MubG9nKGNjLmZpbmQoJ0NhbnZhcycpLmdldENoaWxkQnlOYW1lKCdDdXJyZW50UG9rZXInKSk7XG4gICAgICAgIC8vIGNjLmxvZyhjYy5maW5kKCdDYW52YXMnKS5nZXRDaGlsZEJ5TmFtZSgnUG9rZXJJbnN0YW5jZUJhY2tncm91bmQnKSk7XG4gICAgICAgIC8vIGNjLmxvZyhtYWluSlMuQ3VycmVudFBva2VyKTtcbiAgICAgICAgLy8gY2MubG9nKG1haW5KUy5DdXJyZW50UG9rZXIubm9kZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQgPT09IG1haW5KUy5DdXJyZW50UG9rZXIubm9kZSkge1xuICAgICAgICAgICAgY2MubG9nKCdHR0dHR0dHRycpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS5wYXJlbnQgPT09IG1haW5KUy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlKSB7XG4gICAgICAgICAgICAvLyDliKTmlq3kuK3pl7TlrZjmlL7niYznmoTkvY3nva7vvIzmmK/lkKblt7LooqvljaDnlKhcbiAgICAgICAgICAgIGlmIChtYWluSlMuQ3VycmVudFBva2VyLm5vZGUuY2hpbGRyZW5Db3VudCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCdGRkZGJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1haW5KUy5mYW56aHVhbih0aGlzLm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2MubG9nKHRoaXMubm9kZS5wYXJlbnQpO1xuICAgIH0sXG5cbiAgICBmYW56aHVhbjpmdW5jdGlvbihwb2tlcm5vZGUpIHtcbiAgICAgICAgbGV0IHNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XG4gICAgICAgIC8vIOWFiOWPjei9rDkw5Y+Y5q2j6Z2i5pWw5o2u77yM5YaN5Y+N6L2sLTkw5Zue5p2l77yM57uT5p2f77yM5pW05Liq6L+H56iL56e75Yqo54mM6Z2i5Yiw5oyH5a6a5L2N572uXG4gICAgICAgIHZhciBkMSA9IGNjLmRlbGF5VGltZSgwLjAxKTtcbiAgICAgICAgdmFyIG10byA9IGNjLm1vdmVUbygwLjMsIGNjLnYyKDY5LCgtc2l6ZS5oZWlnaHQgLyAyKSArIDk1ICsgMTYwKSk7XG4gICAgICAgIHZhciBmYW4xID0gY2Muc2NhbGVUbygwLjMsIDAuMiwgMSk7XG4gICAgICAgIC8vIHZhciBmYW4xID0gY2MuZmxpcFgodHJ1ZSk7XG4gICAgICAgIHZhciBjaGFuZ2VGcm9udCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgdGFyZ2V0LmdldENoaWxkQnlOYW1lKFwiRnJvbnRWaWV3XCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNwYXduID0gY2Muc3Bhd24oW210byxmYW4xXSk7XG4gICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICB2YXIgZDIgPSBjYy5kZWxheVRpbWUoMC4zKTtcbiAgICAgICAgdmFyIGZhbjIgPSBjYy5zY2FsZVRvKDAuMSwgMSwgMSk7XG4gICAgICAgIHZhciBzZXF1ID0gY2Muc2VxdWVuY2UoW2QyLGNoYW5nZUZyb250LGZhbjJdKTtcbiAgICAgICAgcG9rZXJub2RlLnJ1bkFjdGlvbihzZXF1KTtcbiAgICB9LFxuXG4gICAgSW5pdFBva2VyOmZ1bmN0aW9uIChkaWFuc2h1KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtYWluU2NlbmVTY3JpcHQgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0dhbWVTY2VuZVNjcmlwdCcpOztcbiAgICAgICAgdmFyIG51bSA9IGRpYW5zaHUgJSAxMztcbiAgICAgICAgaWYgKG51bSA9PT0gMCkge1xuICAgICAgICAgICAgbnVtID0gMTM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bSA+PSAxMCkge1xuICAgICAgICAgICAgX3RoaXMubm9kZS5Qb2tlclJlYWxOdW1iZXIgPSAxMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLm5vZGUuUG9rZXJSZWFsTnVtYmVyID0gbnVtO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWNvcnMgPSBwYXJzZUludCgoZGlhbnNodSAtIDEpIC8gMTMpO1xuICAgICAgICB2YXIgZGVjb3JzU3RyaW5nID0gJyc7XG4gICAgICAgIHN3aXRjaCAoZGVjb3JzKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgLy8gY2MubG9hZGVyLmxvYWRSZXMoJ3Bva2VyJyxjYy5TcHJpdGVBdGxhcyxmdW5jdGlvbihlcnIsYXRsYXMpe1xuICAgICAgICAgICAgICAgIC8vICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNjLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIF90aGlzLk51bVZpZXcuc3ByaXRlRnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlXzBfJytudW0pO1xuICAgICAgICAgICAgICAgIC8vICAgICBfdGhpcy5EZWNvcnNTbWFsbFZpZXcuc3ByaXRlRnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlX3NtYWxsXzInKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgX3RoaXMuRGVjb3JzQmlnVmlldy5zcHJpdGVGcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfYmlnXzInKTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5OdW1WaWV3LnNwcml0ZUZyYW1lID0gbWFpblNjZW5lU2NyaXB0LlBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV8wXycrbnVtKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5EZWNvcnNTbWFsbFZpZXcuc3ByaXRlRnJhbWUgPSBtYWluU2NlbmVTY3JpcHQuUG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlX3NtYWxsXzInKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5EZWNvcnNCaWdWaWV3LnNwcml0ZUZyYW1lID0gbWFpblNjZW5lU2NyaXB0LlBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV9iaWdfMicpO1xuICAgICAgICAgICAgICAgIGRlY29yc1N0cmluZyA9IFwi57qi5qGDXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2FkZXIubG9hZFJlcygncG9rZXInLGNjLlNwcml0ZUF0bGFzLGZ1bmN0aW9uKGVycixhdGxhcyl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2MubG9nKGVycik7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgX3RoaXMuTnVtVmlldy5zcHJpdGVGcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfMF8nK251bSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIF90aGlzLkRlY29yc1NtYWxsVmlldy5zcHJpdGVGcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfc21hbGxfMCcpO1xuICAgICAgICAgICAgICAgIC8vICAgICBfdGhpcy5EZWNvcnNCaWdWaWV3LnNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV9iaWdfMCcpO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLk51bVZpZXcuc3ByaXRlRnJhbWUgPSBtYWluU2NlbmVTY3JpcHQuUG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlXzBfJytudW0pO1xuICAgICAgICAgICAgICAgIF90aGlzLkRlY29yc1NtYWxsVmlldy5zcHJpdGVGcmFtZSA9IG1haW5TY2VuZVNjcmlwdC5Qb2tlckF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfc21hbGxfMCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLkRlY29yc0JpZ1ZpZXcuc3ByaXRlRnJhbWUgPSBtYWluU2NlbmVTY3JpcHQuUG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlX2JpZ18wJyk7XG4gICAgICAgICAgICAgICAgZGVjb3JzU3RyaW5nID0gXCLmlrnniYdcIlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKCdwb2tlcicsY2MuU3ByaXRlQXRsYXMsZnVuY3Rpb24oZXJyLGF0bGFzKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjYy5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICBfdGhpcy5OdW1WaWV3LnNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV8xXycrbnVtKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgX3RoaXMuRGVjb3JzU21hbGxWaWV3LnNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV9zbWFsbF8zJyk7XG4gICAgICAgICAgICAgICAgLy8gICAgIF90aGlzLkRlY29yc0JpZ1ZpZXcuc3ByaXRlRnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlX2JpZ18zJyk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpcy5OdW1WaWV3LnNwcml0ZUZyYW1lID0gbWFpblNjZW5lU2NyaXB0LlBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV8xXycrbnVtKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5EZWNvcnNTbWFsbFZpZXcuc3ByaXRlRnJhbWUgPSBtYWluU2NlbmVTY3JpcHQuUG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlX3NtYWxsXzMnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5EZWNvcnNCaWdWaWV3LnNwcml0ZUZyYW1lID0gbWFpblNjZW5lU2NyaXB0LlBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV9iaWdfMycpO1xuICAgICAgICAgICAgICAgIGRlY29yc1N0cmluZyA9IFwi6buR5qGDXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2FkZXIubG9hZFJlcygncG9rZXInLGNjLlNwcml0ZUF0bGFzLGZ1bmN0aW9uKGVycixhdGxhcyl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2MubG9nKGVycik7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgX3RoaXMuTnVtVmlldy5zcHJpdGVGcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfMV8nK251bSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIF90aGlzLkRlY29yc1NtYWxsVmlldy5zcHJpdGVGcmFtZSA9IGF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfc21hbGxfMScpO1xuICAgICAgICAgICAgICAgIC8vICAgICBfdGhpcy5EZWNvcnNCaWdWaWV3LnNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NvbGl0YWlyZV9iaWdfMScpO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLk51bVZpZXcuc3ByaXRlRnJhbWUgPSBtYWluU2NlbmVTY3JpcHQuUG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlXzFfJytudW0pO1xuICAgICAgICAgICAgICAgIF90aGlzLkRlY29yc1NtYWxsVmlldy5zcHJpdGVGcmFtZSA9IG1haW5TY2VuZVNjcmlwdC5Qb2tlckF0bGFzLmdldFNwcml0ZUZyYW1lKCdzb2xpdGFpcmVfc21hbGxfMScpO1xuICAgICAgICAgICAgICAgIF90aGlzLkRlY29yc0JpZ1ZpZXcuc3ByaXRlRnJhbWUgPSBtYWluU2NlbmVTY3JpcHQuUG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZSgnc29saXRhaXJlX2JpZ18xJyk7XG4gICAgICAgICAgICAgICAgZGVjb3JzU3RyaW5nID0gXCLojYnoirFcIlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKFwi54K55pWwOlwiK251bStcIiAgIFwiK1wi6Iqx6ImyOlwiK2RlY29yc1N0cmluZytcIiAgICDlrp7pmYXngrnmlbBcIitfdGhpcy5ub2RlLlBva2VyUmVhbE51bWJlcik7XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/TabbarScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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

    cc.log("yyy" + mainJS.TimerPause);
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
  KeepPlayAction: function KeepPlayAction() {
    cc.loader.loadRes("music/btn_click", cc.AudioClip, function (err, clip) {
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
  ReplayAction: function ReplayAction() {
    cc.loader.loadRes("music/btn_click", cc.AudioClip, function (err, clip) {
      cc.audioEngine.play(clip, false, 0.5);
    });
    cc.director.loadScene("GameScene", null);
  },
  OutMoveAction: function OutMoveAction() {
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
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGFiYmFyU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiLCJSZWJhY2tBY3Rpb24iLCJtYWluSlMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiQ3VycmVudFBva2VyIiwibm9kZSIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsImZhbnpodWFuIiwiUGF1c2VBY3Rpb24iLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvRW5naW5lIiwicGxheSIsIm1haW5DYW52YXMiLCJUaW1lclBhdXNlIiwicGF1c2VNdXNpYyIsInBhdXNlQWxsRWZmZWN0cyIsInJlc3VtZU11c2ljIiwicmVzdW1lQWxsRWZmZWN0cyIsImxvZyIsImFsZXJ0Tm9kZSIsImFjdGl2ZSIsInBhdXNlQWxlcnQiLCJpbnN0YW50aWF0ZSIsIlBhdXNlQWxlcnRWaWV3IiwiX25hbWUiLCJhZGRDaGlsZCIsIm1hc2siLCJTcHJpdGUiLCJ6SW5kZXgiLCJDb2xvciIsIktlZXBQbGF5QWN0aW9uIiwiUmVwbGF5QWN0aW9uIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJPdXRNb3ZlQWN0aW9uIiwiZ2FtZU92ZXJBbGVydCIsIk91dE1vdmVBbGVydFZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQTtBQUVBQyxFQUFBQSxLQXpCSyxtQkF5QkksQ0FFUixDQTNCSTtBQTZCTEMsRUFBQUEsWUFB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bUQsVUFBU0MsR0FBVCxFQUFjQyxJQUFkLEVBQW9CO0FBQ25FbkIsTUFBQUEsRUFBRSxDQUFDb0IsV0FBSCxDQUFlQyxJQUFmLENBQW9CRixJQUFwQixFQUEwQixLQUExQixFQUFpQyxHQUFqQztBQUNILEtBRkQ7QUFHQW5CLElBQUFBLEVBQUUsQ0FBQzBDLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixXQUF0QixFQUFrQyxJQUFsQztBQUNILEdBcEdJO0FBc0dMQyxFQUFBQSxhQUFhLEVBQUUseUJBQVk7QUFDdkIsUUFBSWYsU0FBUyxHQUFHN0IsRUFBRSxDQUFDTyxJQUFILENBQVEseUJBQVIsQ0FBaEI7O0FBQ0EsUUFBSXNCLFNBQVMsSUFBSSxJQUFiLElBQXFCQSxTQUFTLENBQUNDLE1BQVYsS0FBcUIsSUFBOUMsRUFBb0Q7QUFDaEQ7QUFDSDs7QUFDRCxRQUFJRCxTQUFTLElBQUksSUFBakIsRUFBdUI7QUFDbkJBLE1BQUFBLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixJQUFuQjtBQUNILEtBRkQsTUFFTztBQUNILFVBQUl4QixNQUFNLEdBQUdOLEVBQUUsQ0FBQ08sSUFBSCxDQUFRLFFBQVIsRUFBa0JDLFlBQWxCLENBQStCLGlCQUEvQixDQUFiO0FBQ0EsVUFBSWMsVUFBVSxHQUFHdEIsRUFBRSxDQUFDTyxJQUFILENBQVEsUUFBUixDQUFqQjtBQUNBLFVBQUlzQyxhQUFhLEdBQUc3QyxFQUFFLENBQUNnQyxXQUFILENBQWUxQixNQUFNLENBQUN3QyxnQkFBdEIsQ0FBcEI7QUFDQWpCLE1BQUFBLFNBQVMsR0FBR2dCLGFBQVo7QUFDQUEsTUFBQUEsYUFBYSxDQUFDWCxLQUFkLEdBQXNCLGtCQUF0QjtBQUNBWixNQUFBQSxVQUFVLENBQUNhLFFBQVgsQ0FBb0JVLGFBQXBCO0FBQ0g7QUFDSixHQXJISSxDQXdITDs7QUF4SEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgUmViYWNrQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1haW5KUyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZVNjZW5lU2NyaXB0Jyk7XG4gICAgICAgIGlmIChtYWluSlMuQ3VycmVudFBva2VyLm5vZGUuY2hpbGRyZW5Db3VudCA+PSAxKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IG1haW5KUy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIG1haW5KUy5mYW56aHVhbihub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9LFxuICAgIFBhdXNlQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJtdXNpYy9idG5fY2xpY2tcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbWFpbkNhbnZhcyA9IGNjLmZpbmQoJ0NhbnZhcycpO1xuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgbWFpbkpTLlRpbWVyUGF1c2UgPSAhbWFpbkpTLlRpbWVyUGF1c2U7XG4gICAgICAgIGlmIChtYWluSlMuVGltZXJQYXVzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsRWZmZWN0cygpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhcInl5eVwiK21haW5KUy5UaW1lclBhdXNlKTtcblxuICAgICAgICB2YXIgYWxlcnROb2RlID0gY2MuZmluZCgnQ2FudmFzL1BhdXNlQWxlcnRWaWV3Jyk7XG4gICAgICAgIGlmIChhbGVydE5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWxlcnROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcGF1c2VBbGVydCA9IGNjLmluc3RhbnRpYXRlKG1haW5KUy5QYXVzZUFsZXJ0Vmlldyk7XG4gICAgICAgICAgICBhbGVydE5vZGUgPSBwYXVzZUFsZXJ0O1xuICAgICAgICAgICAgcGF1c2VBbGVydC5fbmFtZSA9IFwiUGF1c2VBbGVydFZpZXdcIjtcbiAgICAgICAgICAgIG1haW5DYW52YXMuYWRkQ2hpbGQocGF1c2VBbGVydCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBtYXNrID0gY2MuZmluZCgnQ2FudmFzL1BhdXNlQWxlcnRWaWV3L2JnJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGFsZXJ0Tm9kZS56SW5kZXggPSA5OTk7XG4gICAgICAgIG1hc2suQ29sb3IgPSBjYy5Db2xvcigwLCAwLCAwLCAwKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIEtlZXBQbGF5QWN0aW9uOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2J0bl9jbGlja1wiLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uKGVyciwgY2xpcCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgYWxlcnROb2RlID0gY2MuZmluZCgnQ2FudmFzL1BhdXNlQWxlcnRWaWV3Jyk7XG4gICAgICAgIGlmIChhbGVydE5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWxlcnROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIG1hc2sgPSBjYy5maW5kKCdDYW52YXMvUGF1c2VBbGVydFZpZXcvYmcnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgIGFsZXJ0Tm9kZS56SW5kZXggPSA5OTk7XG4gICAgICAgICAgICBtYXNrLkNvbG9yID0gY2MuQ29sb3IoMCwgMCwgMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgbWFpbkpTLlRpbWVyUGF1c2UgPSAhbWFpbkpTLlRpbWVyUGF1c2U7XG4gICAgICAgIGlmIChtYWluSlMuVGltZXJQYXVzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsRWZmZWN0cygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFJlcGxheUFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibXVzaWMvYnRuX2NsaWNrXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIGZhbHNlLCAwLjUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIsbnVsbCk7XG4gICAgfSxcblxuICAgIE91dE1vdmVBY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFsZXJ0Tm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9PdXRNb3ZlQWxlcnRWaWV3Jyk7XG4gICAgICAgIGlmIChhbGVydE5vZGUgIT0gbnVsbCAmJiBhbGVydE5vZGUuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsZXJ0Tm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBhbGVydE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtYWluSlMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0dhbWVTY2VuZVNjcmlwdCcpO1xuICAgICAgICAgICAgdmFyIG1haW5DYW52YXMgPSBjYy5maW5kKCdDYW52YXMnKTtcbiAgICAgICAgICAgIHZhciBnYW1lT3ZlckFsZXJ0ID0gY2MuaW5zdGFudGlhdGUobWFpbkpTLk91dE1vdmVBbGVydFZpZXcpO1xuICAgICAgICAgICAgYWxlcnROb2RlID0gZ2FtZU92ZXJBbGVydDtcbiAgICAgICAgICAgIGdhbWVPdmVyQWxlcnQuX25hbWUgPSBcIk91dE1vdmVBbGVydFZpZXdcIjtcbiAgICAgICAgICAgIG1haW5DYW52YXMuYWRkQ2hpbGQoZ2FtZU92ZXJBbGVydCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/LoadViewScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '768d1wREINLi4rhRLubZess', 'LoadViewScript');
// Script/LoadViewScript.js

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
  start: function start() {
    cc.director.loadScene("GameScene", null);
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTG9hZFZpZXdTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsQ0FDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmUSxHQUhQO0FBcUJMO0FBRUE7QUFFQUMsRUFBQUEsS0F6QkssbUJBeUJJO0FBRUxKLElBQUFBLEVBQUUsQ0FBQ0ssUUFBSCxDQUFZQyxTQUFaLENBQXNCLFdBQXRCLEVBQWtDLElBQWxDO0FBRUgsR0E3QkksQ0ErQkw7O0FBL0JLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiLG51bGwpO1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ToolsScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6fa68oKItVDQqOzUi2wdDpY', 'ToolsScript');
// Script/ToolsScript.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  FormatMMSS: function FormatMMSS(seconds) {
    var currentSeconds = parseInt(seconds);
    var timeStr = null;
    var minute = 0;
    var second = 0;
    if (currentSeconds <= 0) return "00:00";else {
      minute = parseInt(currentSeconds / 60);

      if (minute < 60) {
        second = currentSeconds % 60;
        timeStr = minute + ":" + (second < 10 ? "0" + second : second);
      } else {
        hour = minute / 60;
        minute = minute % 60;
        second = currentSeconds - hour * 3600 - minute * 60;
        timeStr = hour + ":" + minute + ":" + (second < 10 ? "0" + second : second);
      }
    }
    return timeStr;
  },
  ScaleAnimation: function ScaleAnimation(node) {
    var d1 = cc.delayTime(0.01);
    var sto1 = cc.scaleTo(0.1, 1.8);
    var sto2 = cc.scaleTo(0.1, 1);
    var seque = cc.sequence([d1, sto1, sto2]);
    node.node.runAction(seque);
  },
  // 抛物线
  ParabolaAnimation: function ParabolaAnimation(node) {
    // 先向上抛
    // 随机一个0.2 到 0.3 的上抛过程
    var time1 = this.RandomNum(20, 25) / 100.0;
    var moveX1 = this.RandomNum(10, 60);
    var moveY1 = this.RandomNum(40, 260);
    cc.log("随机小数" + time1); // var time = 0.2;

    var d1 = cc.delayTime(time1);
    var mov1 = cc.moveBy(time1, cc.v2(moveX1, moveY1));
    var rota1 = cc.rotateBy(time1, 90);
    var spawn1 = cc.spawn([mov1, rota1]);
    node.runAction(spawn1);

    var _this = this; // 回调


    var end_func = cc.callFunc(function (target) {
      var time2 = _this.RandomNum(40, 60) / 100.0;

      var moveX2 = _this.RandomNum(90, 120);

      var moveY2 = _this.RandomNum(1300, 1400) * -1;
      var mov2 = cc.moveBy(time2, cc.v2(moveX2, moveY2));
      var rota2 = cc.rotateBy(time2, 630);
      var spawn2 = cc.spawn([mov2, rota2]);
      target.runAction(spawn2);
      var _target = target;

      _this.scheduleOnce(function (target) {
        if (_target.parent != null && _target.parent.parent != null) {
          var scoreLabel = _target.parent.parent.getChildByName("ScoreRect").getChildByName("ScoreLabel");

          scoreLabel.string = "0";
        }

        if (_target != null) {
          _target.removeFromParent(false);
        } // _target.parent.parent.getChildByName("ScoreRect").getChildByName("ScoreLabel")

      }, time2);
    }.bind(node.node));
    var seque = cc.sequence([d1, end_func]);
    node.runAction(seque); // var mov2 = cc.moveBy(1, cc.v2(50, 400));
    // var rota2 = cc.rotateBy(1, 630);
    // var spawn2 = cc.spawn([mov2,rota2]);
    // node.node.runAction(spawn2);
    // var seque = cc.sequence([d1, sto1,sto2]);
  },
  RandomNum: function RandomNum(minNum, maxNum) {
    var num = Math.floor(Math.random() * (minNum - maxNum) + maxNum);
    return num;
  } // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVG9vbHNTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsIkZvcm1hdE1NU1MiLCJzZWNvbmRzIiwiY3VycmVudFNlY29uZHMiLCJwYXJzZUludCIsInRpbWVTdHIiLCJtaW51dGUiLCJzZWNvbmQiLCJob3VyIiwiU2NhbGVBbmltYXRpb24iLCJub2RlIiwiZDEiLCJkZWxheVRpbWUiLCJzdG8xIiwic2NhbGVUbyIsInN0bzIiLCJzZXF1ZSIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwiUGFyYWJvbGFBbmltYXRpb24iLCJ0aW1lMSIsIlJhbmRvbU51bSIsIm1vdmVYMSIsIm1vdmVZMSIsImxvZyIsIm1vdjEiLCJtb3ZlQnkiLCJ2MiIsInJvdGExIiwicm90YXRlQnkiLCJzcGF3bjEiLCJzcGF3biIsIl90aGlzIiwiZW5kX2Z1bmMiLCJjYWxsRnVuYyIsInRhcmdldCIsInRpbWUyIiwibW92ZVgyIiwibW92ZVkyIiwibW92MiIsInJvdGEyIiwic3Bhd24yIiwiX3RhcmdldCIsInNjaGVkdWxlT25jZSIsInBhcmVudCIsInNjb3JlTGFiZWwiLCJnZXRDaGlsZEJ5TmFtZSIsInN0cmluZyIsInJlbW92ZUZyb21QYXJlbnQiLCJiaW5kIiwibWluTnVtIiwibWF4TnVtIiwibnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkk7QUFlTEMsRUFBQUEsVUFBVSxFQUFDLG9CQUFVQyxPQUFWLEVBQW1CO0FBRTFCLFFBQUlDLGNBQWMsR0FBR0MsUUFB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ZixFQUFxQjtBQUNqQkEsVUFBQUEsT0FBTyxDQUFDTSxnQkFBUixDQUF5QixLQUF6QjtBQUNILFNBUjhCLENBUy9COztBQUVILE9BWEQsRUFXRVosS0FYRjtBQWNILEtBeEIwQixDQXdCekJhLElBeEJ5QixDQXdCcEJ2QyxJQUFJLENBQUNBLElBeEJlLENBQVosQ0FBZjtBQXlCQSxRQUFJTSxLQUFLLEdBQUdwQixFQUFFLENBQUNxQixRQUFILENBQVksQ0FBQ04sRUFBRCxFQUFJc0IsUUFBSixDQUFaLENBQVo7QUFDQXZCLElBQUFBLElBQUksQ0FBQ1EsU0FBTCxDQUFlRixLQUFmLEVBN0M2QixDQStDN0I7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVILEdBckdJO0FBc0dMSyxFQUFBQSxTQUFTLEVBQUMsbUJBQVM2QixNQUFULEVBQWlCQyxNQUFqQixFQUF5QjtBQUMvQixRQUFJQyxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBZUwsTUFBTSxHQUFHQyxNQUF4QixJQUFrQ0EsTUFBN0MsQ0FBVjtBQUNBLFdBQU9DLEdBQVA7QUFDSCxHQXpHSSxDQTJHTDs7QUEzR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIEZvcm1hdE1NU1M6ZnVuY3Rpb24gKHNlY29uZHMpIHtcblxuICAgICAgICB2YXIgY3VycmVudFNlY29uZHMgPSBwYXJzZUludChzZWNvbmRzKTtcbiAgICAgICAgdmFyIHRpbWVTdHIgPSBudWxsO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIHNlY29uZCA9IDA7XG4gICAgICAgIGlmIChjdXJyZW50U2Vjb25kcyA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIFwiMDA6MDBcIjtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChjdXJyZW50U2Vjb25kcyAvIDYwKTtcbiAgICAgICAgICAgIGlmIChtaW51dGUgPCA2MCkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IGN1cnJlbnRTZWNvbmRzICUgNjA7XG4gICAgICAgICAgICAgICAgdGltZVN0ciA9IG1pbnV0ZSArIFwiOlwiICsgKHNlY29uZCA8IDEwID8gXCIwXCIrc2Vjb25kIDogc2Vjb25kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IG1pbnV0ZSAvIDYwO1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IG1pbnV0ZSAlIDYwO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IGN1cnJlbnRTZWNvbmRzIC0gaG91ciAqIDM2MDAgLSBtaW51dGUgKiA2MDtcbiAgICAgICAgICAgICAgICB0aW1lU3RyID0gaG91ciArIFwiOlwiICsgbWludXRlICsgXCI6XCIgKyAoc2Vjb25kIDwgMTAgPyBcIjBcIitzZWNvbmQgOiBzZWNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lU3RyO1xuICAgIH0sXG5cbiAgICBTY2FsZUFuaW1hdGlvbjpmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgIHZhciBkMSA9IGNjLmRlbGF5VGltZSgwLjAxKTtcbiAgICAgICAgdmFyIHN0bzEgPSBjYy5zY2FsZVRvKDAuMSwgMS44KTtcbiAgICAgICAgdmFyIHN0bzIgPSBjYy5zY2FsZVRvKDAuMSwgMSk7XG4gICAgICAgIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSwgc3RvMSxzdG8yXSk7XG4gICAgICAgIG5vZGUubm9kZS5ydW5BY3Rpb24oc2VxdWUpO1xuICAgIH0sXG4gICAgLy8g5oqb54mp57q/XG4gICAgUGFyYWJvbGFBbmltYXRpb246ZnVuY3Rpb24obm9kZSkge1xuXG4gICAgICAgIC8vIOWFiOWQkeS4iuaKm1xuICAgICAgICAvLyDpmo/mnLrkuIDkuKowLjIg5YiwIDAuMyDnmoTkuIrmipvov4fnqItcbiAgICAgICAgdmFyIHRpbWUxID0gdGhpcy5SYW5kb21OdW0oMjAsMjUpIC8gMTAwLjA7XG4gICAgICAgIHZhciBtb3ZlWDEgPSB0aGlzLlJhbmRvbU51bSgxMCw2MCk7XG4gICAgICAgIHZhciBtb3ZlWTEgPSB0aGlzLlJhbmRvbU51bSg0MCwyNjApO1xuICAgICAgICBjYy5sb2coXCLpmo/mnLrlsI/mlbBcIit0aW1lMSk7XG4gICAgICAgIC8vIHZhciB0aW1lID0gMC4yO1xuICAgICAgICB2YXIgZDEgPSBjYy5kZWxheVRpbWUodGltZTEpXG4gICAgICAgIHZhciBtb3YxID0gY2MubW92ZUJ5KHRpbWUxLCBjYy52Mihtb3ZlWDEsIG1vdmVZMSkpO1xuICAgICAgICB2YXIgcm90YTEgPSBjYy5yb3RhdGVCeSh0aW1lMSwgOTApO1xuICAgICAgICB2YXIgc3Bhd24xID0gY2Muc3Bhd24oW21vdjEscm90YTFdKTtcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oc3Bhd24xKTtcblxuXG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8g5Zue6LCDXG4gICAgICAgIHZhciBlbmRfZnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIHRpbWUyID0gX3RoaXMuUmFuZG9tTnVtKDQwLDYwKSAvIDEwMC4wO1xuICAgICAgICAgICAgdmFyIG1vdmVYMiA9IF90aGlzLlJhbmRvbU51bSg5MCwxMjApO1xuICAgICAgICAgICAgdmFyIG1vdmVZMiA9IF90aGlzLlJhbmRvbU51bSgxMzAwLDE0MDApICogLTE7XG4gICAgICAgICAgICB2YXIgbW92MiA9IGNjLm1vdmVCeSh0aW1lMiwgY2MudjIobW92ZVgyLCBtb3ZlWTIpKTtcbiAgICAgICAgICAgIHZhciByb3RhMiA9IGNjLnJvdGF0ZUJ5KHRpbWUyLCA2MzApO1xuICAgICAgICAgICAgdmFyIHNwYXduMiA9IGNjLnNwYXduKFttb3YyLHJvdGEyXSk7XG4gICAgICAgICAgICB0YXJnZXQucnVuQWN0aW9uKHNwYXduMik7XG5cbiAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgX3RoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKF90YXJnZXQucGFyZW50ICE9IG51bGwgJiYgX3RhcmdldC5wYXJlbnQucGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3JlTGFiZWwgPSBfdGFyZ2V0LnBhcmVudC5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZVJlY3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZUxhYmVsXCIpO1xuICAgICAgICAgICAgICAgICAgICBzY29yZUxhYmVsLnN0cmluZyA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX3RhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF90YXJnZXQucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIF90YXJnZXQucGFyZW50LnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlUmVjdFwiKS5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlTGFiZWxcIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sdGltZTIpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfS5iaW5kKG5vZGUubm9kZSkpXG4gICAgICAgIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSxlbmRfZnVuY10pO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihzZXF1ZSk7XG5cbiAgICAgICAgLy8gdmFyIG1vdjIgPSBjYy5tb3ZlQnkoMSwgY2MudjIoNTAsIDQwMCkpO1xuICAgICAgICAvLyB2YXIgcm90YTIgPSBjYy5yb3RhdGVCeSgxLCA2MzApO1xuICAgICAgICAvLyB2YXIgc3Bhd24yID0gY2Muc3Bhd24oW21vdjIscm90YTJdKTtcbiAgICAgICAgLy8gbm9kZS5ub2RlLnJ1bkFjdGlvbihzcGF3bjIpO1xuXG4gICAgICAgIC8vIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSwgc3RvMSxzdG8yXSk7XG5cbiAgICB9LFxuICAgIFJhbmRvbU51bTpmdW5jdGlvbihtaW5OdW0sIG1heE51bSkge1xuICAgICAgICB2YXIgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihtaW5OdW0gLSBtYXhOdW0pICsgbWF4TnVtKTtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ContainerPrefabScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b74fbmycVLz731IpvOhsMr', 'ContainerPrefabScript');
// Script/ContainerPrefabScript.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    ScoreRect: {
      type: cc.Sprite,
      "default": null
    },
    ScoreLabel: {
      type: cc.Label,
      "default": null
    },
    UpTip: {
      type: cc.Sprite,
      "default": null
    },
    CurrentScore: {
      type: cc.integer,
      "default": 0
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.ScoreLabel.string = '0';
  },
  start: function start() {},
  onClick: function onClick(target) {
    var _this = this;

    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    var pokerNode = mainJS.CurrentPoker.node;
    cc.loader.loadRes("music/move_to_eff", cc.AudioClip, function (err, clip) {
      cc.audioEngine.play(clip, false, 0.5);
    }); // move_to_eff

    for (var i = 1; i <= 4; i++) {
      cc.log("Pa" + _this.node.parent);
      cc.log("Pa" + this.node.parent);

      var container = _this.node.parent.getChildByName('PokerContainer' + i);

      cc.log("container" + container);
      container.getChildByName("UpTip").active = false;
      mainJS.ArrowTips = 0;
    }

    var poker;

    if (pokerNode.childrenCount > 0) {
      var Tools = cc.find('Canvas').getComponent('ToolsScript');
      poker = pokerNode.children[pokerNode.childrenCount - 1]; // _this.feipai(target.target,poker);

      var sum = parseInt(this.ScoreLabel.string) + poker.PokerRealNumber;

      _this.feipai(target.currentTarget, poker, sum);

      cc.log("RealNumber:" + poker.PokerRealNumber + "    PokerNumber:" + poker.PokerNumber);
      Tools.ScaleAnimation(_this.ScoreLabel); // Tools.ParabolaAnimation(_this.ScoreLabel);
      // cc.log("最终分"+sum);

      _this.ScoreLabel.string = sum.toString();
      _this.CurrentScore = sum;

      if (sum === 21) {
        mainJS.ComboCount += 1;
        _this.ScoreLabel.string = "0"; // var bingo 

        cc.loader.loadRes("music/get_target", cc.AudioClip, function (err, clip) {
          cc.audioEngine.play(clip, false, 0.5);
        });
        var anmationNode = new cc.Node();
        anmationNode.width = 55;
        anmationNode.height = 30; // node.setContentSize(cc.Size(20,20));

        _this.ScoreLabel.node.addChild(anmationNode);

        var wrongPoker = anmationNode.addComponent(cc.Sprite);
        var scoreNode = new cc.Node();

        _this.ScoreLabel.node.addChild(scoreNode);

        var getscore = scoreNode.addComponent(cc.Label);
        cc.loader.loadRes("font/score_font", cc.Font, function (err, font) {
          getscore.font = font;
        });
        getscore.fontSize = 35;
        getscore.color = new cc.color(255, 0, 0, 255);
        getscore.string = "+200";
        wrongPoker.sizeMode = cc.Sprite.SizeMode.SIMPLE;
        wrongPoker.spriteFrame = mainJS.PokerTargetTips;
        cc.log("nodeSize" + anmationNode.getContentSize().width + anmationNode.getContentSize().height);
        var d1 = cc.delayTime(0.01);
        var sto1 = cc.scaleTo(0.4, 2);
        var mov1 = cc.moveBy(0.4, cc.v2(0, 100));
        var fadein = cc.fadeIn(0.4);
        var spawn = cc.spawn([d1, sto1, mov1, fadein]);
        anmationNode.runAction(spawn);
        var mov2 = cc.moveBy(0.4, cc.v2(0, 40)); // var spawn2 = cc.spawn([d1, sto1,mov2]);

        scoreNode.runAction(mov2);
        var d3 = cc.delayTime(0.4);
        var animationFinished = cc.callFunc(function (target) {
          cc.loader.loadRes("font/and_score_font", cc.Font, function (err, font) {
            getscore.fontSize = 25;
            getscore.font = font;
          });
          var pos1 = scoreNode.convertToWorldSpaceAR(cc.v2(0, 0));
          var scoreLabel = cc.find('Canvas/ScoreLabel/Background/Label');
          var scoreLabelStrng = scoreLabel.getComponent(cc.Label);
          var pos2 = scoreLabel.convertToWorldSpaceAR(cc.v2(0, 0));
          var mto = cc.moveBy(0.3, cc.v2(pos2.x - pos1.x, pos2.y - pos1.y));
          var changeScore = cc.callFunc(function (target) {
            scoreNode.active = false;

            _this.updatenNumberAnim(parseInt(scoreLabelStrng.string) + 200, parseInt(scoreLabelStrng.string));
          });
          var mySequ = cc.sequence([mto, changeScore]);
          scoreNode.runAction(mySequ);
        });
        var sequ = cc.sequence(d3, animationFinished);
        scoreNode.runAction(sequ);

        _this.scheduleOnce(function (target) {
          anmationNode.active = false;
          anmationNode.removeFromParent(true);
          anmationNode.destroy();
        }, 0.5);
      } else if (sum > 21) {
        cc.loader.loadRes("music/bust_eff", cc.AudioClip, function (err, clip) {
          cc.audioEngine.play(clip, false, 0.5);
        });
        _this.ScoreLabel.string = "0";
        var first = cc.find("Canvas/RoundLabel/Background/FirstRound");
        var second = cc.find("Canvas/RoundLabel/Background/SecondRound");
        var third = cc.find("Canvas/RoundLabel/Background/ThirdRound"); // ca.active = true;

        if (first.active === false) {
          first.active = true;
        } else if (second.active === false) {
          second.active = true;
        } else if (third.active === false) {
          //结束
          third.active = true;
          var tabbarJS = cc.find('Canvas').getComponent('TabbarScript');
          tabbarJS.OutMoveAction();
        } // cc.log(ca);


        _this.BustAnimation();

        var anmationNode = new cc.Node();
        anmationNode.width = 40;
        anmationNode.height = 40; // node.setContentSize(cc.Size(20,20));

        _this.ScoreLabel.node.addChild(anmationNode);

        var wrongPoker = anmationNode.addComponent(cc.Sprite); // wrongPoker.Size = cc.Size(20,20);
        // wrongPoker.spriteFrame = ca.spriteFrame;
        // wrongPoker.type = cc.Sprite.Type.SIMPLE;CUSTOM

        wrongPoker.sizeMode = cc.Sprite.SizeMode.SIMPLE; // if (_this.ErrorTips != null || _this.ErrorTips != undefined) {
        //     wrongPoker.spriteFrame = _this.ErrorTips;
        // } else {
        //     cc.loader.loadRes('base_ui/error_tip',cc.SpriteFrame,function(err,sprFrame){ 　
        //         cc.log(" assets/texture/error_tip "+err);
        //         sprFrame.setRect(cc.Rect(0,0,95,88));
        //         wrongPoker.spriteFrame = sprFrame;
        //         _this.ErrorTips = sprFrame;
        //         cc.log(wrongPoker);
        //     });
        // }

        wrongPoker.spriteFrame = mainJS.PokerErrorTips;
        cc.log("nodeSize" + anmationNode.getContentSize().width + anmationNode.getContentSize().height);
        var d1 = cc.delayTime(0.01);
        var sto1 = cc.scaleTo(0.4, 2);
        var mov1 = cc.moveBy(0.4, cc.v2(0, 100));
        var fadein = cc.fadeIn(0.4);
        var spawn = cc.spawn([d1, sto1, mov1, fadein]);
        anmationNode.runAction(spawn);
        var animationFinished = cc.callFunc(function (target) {});

        _this.scheduleOnce(function (target) {
          anmationNode.active = false;
          anmationNode.removeFromParent(true);
          anmationNode.destroy();
        }, 0.5);
      } // 执行牌局跟进


      cc.log(mainJS.PokerInstanceBackground.node.children);

      if (mainJS.PokerInstanceBackground.node.childrenCount > 1) {
        var frontPoker = mainJS.PokerInstanceBackground.node.children[mainJS.PokerInstanceBackground.node.childrenCount - 1];
        cc.log(frontPoker);
        mainJS.fanzhuan(frontPoker);
      } else {
        var stashedPoker = cc.find('Canvas/StashButton/Background');

        if (stashedPoker.childrenCount === 0) {
          mainJS.TimeOut();
        }
      }
    } // if (mainJS.CurrentPoker.node) {
    // }
    // var curPos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
    //     var curPos2 = _this.PokerInstanceBackground.node.convertToNodeSpaceAR(curPos1);
    //     cc.log(target);
    //     target.setPosition(curPos2);
    //     target.parent = _this.PokerInstanceBackground.node;
    //     target.CurrentPosition = curPos1;

  },
  // 动画从子节点飞到父节点身上
  feipai: function feipai(nodeParent, nodeSon, totalScore) {
    cc.loader.loadRes("music/move_to_eff", cc.AudioClip, function (err, clip) {
      cc.audioEngine.play(clip, false, 0.5);
    });
    cc.log(nodeParent, nodeSon);
    var curPos1 = nodeSon.convertToWorldSpaceAR(cc.v2(0, 0));
    var curPos2 = nodeParent.convertToWorldSpaceAR(cc.v2(0, 0));

    var _this = this;

    var d2 = cc.delayTime(0.01);
    var mvto = cc.moveBy(0.1, cc.v2(curPos2.x - curPos1.x, curPos2.y - curPos1.y + 175 - 45 * nodeParent.childrenCount));
    var animationFinished = cc.callFunc(function (target) {
      // target.CurrentPosition = target.getPosition();
      // var curPos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
      // var curPos2 = _this.CurrentPoker.node.convertToNodeSpaceAR(curPos1);
      // cc.log(target);
      // target.setPosition(curPos2);
      // target.parent = _this.CurrentPoker.node;
      // // cc.log(target.CurrentPosition);
      // target.PreviousPosition = target.CurrentPosition;
      // target.CurrentPosition = curPos1;
      var pos1 = target.convertToWorldSpaceAR(cc.v2(0, 0));
      var pos2 = nodeParent.convertToNodeSpaceAR(pos1);
      target.setPosition(pos2);
      target.PreviousParent = target.parent;
      target.parent = nodeParent;
      target.PreviousPosition = target.CurrentPosition;
      target.CurrentPosition = pos1;
      cc.log(nodeParent.children);
      target.getComponent(cc.Button).interactable = false; // target.interactable = false;

      if (totalScore >= 21) {
        _this.node.getChildByName("PokerContainerRect").interactable = false;
        cc.log(">21点处理", nodeParent.childrenCount);

        for (var index = nodeParent.childrenCount - 1; index >= 0; index--) {
          var node = nodeParent.children[index];
          cc.log("执行" + node + "延时" + 0.5 * (nodeParent.childrenCount - 1 - index));
          var Tools = cc.find('Canvas').getComponent('ToolsScript'); // Tools.ParabolaAnimation(node,0); 

          Tools.ParabolaAnimation(node);
          var _node = node;

          _this.scheduleOnce(function (target) {
            Tools.ParabolaAnimation(_node);
          }, 0.5 * (nodeParent.childrenCount - 1 - index)); //     _this.scheduleOnce(function(target){
          //         var d3 = cc.delayTime(0.5 * (nodeParent.childrenCount - 1 - index));
          //         var animation1 = function () {
          //             var Tools = cc.find('Canvas').getComponent('ToolsScript');
          //             Tools.ParabolaAnimation(target);
          //         };
          //         var sequ = cc.sequence([d3,animation1]);
          //          node.runAction(sequ);
          //    },0);

        }

        _this.scheduleOnce(function (target) {
          // for (let index = nodeParent.childrenCount - 1; index >= 0; index--) {
          //     var node = nodeParent.children[index];
          //     node.removeFromParent(false);
          // }
          _this.node.getChildByName("PokerContainerRect").interactable = true;
          cc.log("feipai log" + _this);
          cc.log("   PokerContainerRect" + _this.node.getChildByName("PokerContainerRect"));
        }, 1.5);
      }
    });
    var sequ = cc.sequence([d2, mvto, animationFinished]);
    nodeSon.runAction(sequ);
  },
  DetectArrows: function DetectArrows(preScore) {
    var _this = this;

    cc.log(_this.node);

    if (parseInt(_this.ScoreLabel.string) + preScore <= 21) {
      var uptip = _this.node.getChildByName("UpTip");

      var pos = uptip.position;
      uptip.setPosition(0, pos.y - 50);
      _this.node.getChildByName("UpTip").active = true;
      cc.log("获取UpTip的位置" + uptip.position);
      var mov = cc.moveBy(0.2, cc.v2(0, 50));
      var fade = cc.fadeIn(0.2);
      var spawn = cc.spawn([mov, fade]);
      uptip.runAction(spawn);
    } else {
      _this.node.getChildByName("UpTip").active = false;
    }

    cc.log("YYYY");
  },
  updatenNumberAnim: function updatenNumberAnim(curNum, originNum) {
    var difference = curNum - originNum;
    var absDifference = Math.abs(difference);
    var changeTimes = absDifference < 8 ? absDifference : 8;
    var changeUnit = absDifference < 8 ? 1 : Math.floor(difference / 8);
    var scoreLabel = cc.find('Canvas/ScoreLabel/Background/Label');

    for (var i = 0; i < changeTimes; i++) {
      (function (i) {
        setTimeout(function () {
          scoreLabel.getComponent(cc.Label).string = originNum += changeUnit;

          if (i == changeTimes - 1) {
            scoreLabel.getComponent(cc.Label).string = curNum;
          }
        }, 50 * (i + 1));
      })(i);
    }
  },
  BustAnimation: function BustAnimation() {
    var _this = this;

    cc.log(_this.node);

    var uptip = _this.node.getChildByName("Bust");

    var pos = uptip.position;
    uptip.setPosition(0, pos.y - 150);
    _this.node.getChildByName("Bust").active = true;
    cc.log("获取Bust的位置" + uptip.position);
    var mov = cc.moveBy(0.3, cc.v2(0, 150));
    var fade = cc.fadeIn(0.3);
    var spawn = cc.spawn([mov, fade]);
    uptip.runAction(spawn);

    _this.scheduleOnce(function (target) {
      uptip.active = false;
    }, 0.5);
  } // updatenNumberAnim: function (curNum,originNum) {
  //     var difference = curNum - originNum;
  //     var absDifference = Math.abs(difference);
  //     var changeTimes = absDifference < 8 ? absDifference : 8;
  //     var changeUnit = absDifference < 8 ? 1 : Math.floor(difference / 8)
  //     var scoreLabel = cc.find('Canvas/ScoreLabel/Background/Label');
  //     for (let i = 0; i < changeTimes; i++) {
  //         (function (i) {
  //             setTimeout(() => {
  //                 scoreLabel.getComponent(cc.Label).string = (originNum += changeUnit)
  //                 if (i == changeTimes - 1) {
  //                     scoreLabel.getComponent(cc.Label) = curNum;
  //                 }
  //             }, 100*(i+1));
  //         })(i)
  //     }
  // }, 
  // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29udGFpbmVyUHJlZmFiU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiU2NvcmVSZWN0IiwidHlwZSIsIlNwcml0ZSIsIlNjb3JlTGFiZWwiLCJMYWJlbCIsIlVwVGlwIiwiQ3VycmVudFNjb3JlIiwiaW50ZWdlciIsIm9uTG9hZCIsInN0cmluZyIsInN0YXJ0Iiwib25DbGljayIsInRhcmdldCIsIl90aGlzIiwibWFpbkpTIiwiZmluZCIsImdldENvbXBvbmVudCIsInBva2VyTm9kZSIsIkN1cnJlbnRQb2tlciIsIm5vZGUiLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvRW5naW5lIiwicGxheSIsImkiLCJsb2ciLCJwYXJlbnQiLCJjb250YWluZXIiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIkFycm93VGlwcyIsInBva2VyIiwiY2hpbGRyZW5Db3VudCIsIlRvb2xzIiwiY2hpbGRyZW4iLCJzdW0iLCJwYXJzZUludCIsIlBva2VyUmVhbE51bWJlciIsImZlaXBhaSIsImN1cnJlbnRUYXJnZXQiLCJQb2tlck51bWJlciIsIlNjYWxlQW5pbWF0aW9uIiwidG9TdHJpbmciLCJDb21ib0NvdW50IiwiYW5tYXRpb25Ob2RlIiwiTm9kZSIsIndpZHRoIiwiaGVpZ2h0IiwiYWRkQ2hpbGQiLCJ3cm9uZ1Bva2VyIiwiYWRkQ29tcG9uZW50Iiwic2NvcmVOb2RlIiwiZ2V0c2NvcmUiLCJGb250IiwiZm9udCIsImZvbnRTaXplIiwiY29sb3IiLCJzaXplTW9kZSIsIlNpemVNb2RlIiwiU0lNUExFIiwic3ByaXRlRnJhbWUiLCJQb2tlclRhcmdldFRpcHMiLCJnZXRDb250ZW50U2l6ZSIsImQxIiwiZGVsYXlUaW1lIiwic3RvMSIsInNjYWxlVG8iLCJtb3YxIiwibW92ZUJ5IiwidjIiLCJmYWRlaW4iLCJmYWRlSW4iLCJzcGF3biIsInJ1bkFjdGlvbiIsIm1vdjIiLCJkMyIsImFuaW1hdGlvbkZpbmlzaGVkIiwiY2FsbEZ1bmMiLCJwb3MxIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwic2NvcmVMYWJlbCIsInNjb3JlTGFiZWxTdHJuZyIsInBvczIiLCJtdG8iLCJ4IiwieSIsImNoYW5nZVNjb3JlIiwidXBkYXRlbk51bWJlckFuaW0iLCJteVNlcXUiLCJzZXF1ZW5jZSIsInNlcXUiLCJzY2hlZHVsZU9uY2UiLCJyZW1vdmVGcm9tUGFyZW50IiwiZGVzdHJveSIsImZpcnN0Iiwic2Vjb25kIiwidGhpcmQiLCJ0YWJiYXJKUyIsIk91dE1vdmVBY3Rpb24iLCJCdXN0QW5pbWF0aW9uIiwiUG9rZXJFcnJvclRpcHMiLCJQb2tlckluc3RhbmNlQmFja2dyb3VuZCIsImZyb250UG9rZXIiLCJmYW56aHVhbiIsInN0YXNoZWRQb2tlciIsIlRpbWVPdXQiLCJub2RlUGFyZW50Iiwibm9kZVNvbiIsInRvdGFsU2NvcmUiLCJjdXJQb3MxIiwiY3VyUG9zMiIsImQyIiwibXZ0byIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwic2V0UG9zaXRpb24iLCJQcmV2aW91c1BhcmVudCIsIlByZXZpb3VzUG9zaXRpb24iLCJDdXJyZW50UG9zaXRpb24iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJpbmRleCIsIlBhcmFib2xhQW5pbWF0aW9uIiwiX25vZGUiLCJEZXRlY3RBcnJvd3MiLCJwcmVTY29yZSIsInVwdGlwIiwicG9zIiwicG9zaXRpb24iLCJtb3YiLCJmYWRlIiwiY3VyTnVtIiwib3JpZ2luTnVtIiwiZGlmZmVyZW5jZSIsImFic0RpZmZlcmVuY2UiLCJNYXRoIiwiYWJzIiwiY2hhbmdlVGltZXMiLCJjaGFuZ2VVbml0IiwiZmxvb3IiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUs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Q0FBTyxjQUFZb0csS0FBSyxDQUFDRSxRQUF6QjtBQUNBLFFBQUlDLEdBQUcsR0FBR3ZJLEVBQUUsQ0FBQzJFLE1BQUgsQ0FBVSxHQUFWLEVBQWMzRSxFQUFFLENBQUM0RSxFQUFILENBQU0sQ0FBTixFQUFTLEdBQVQsQ0FBZCxDQUFWO0FBQ0EsUUFBSTRELElBQUksR0FBR3hJLEVBQUUsQ0FBQzhFLE1BQUgsQ0FBVSxHQUFWLENBQVg7QUFDQSxRQUFJQyxLQUFLLEdBQUcvRSxFQUFFLENBQUMrRSxLQUFILENBQVMsQ0FBQ3dELEdBQUQsRUFBS0MsSUFBTCxDQUFULENBQVo7QUFDQUosSUFBQUEsS0FBSyxDQUFDcEQsU0FBTixDQUFnQkQsS0FBaEI7O0FBQ0E5RCxJQUFBQSxLQUFLLENBQUNpRixZQUFOLENBQW1CLFVBQVNsRixNQUFULEVBQWdCO0FBRS9Cb0gsTUFBQUEsS0FBSyxDQUFDaEcsTUFBTixHQUFlLEtBQWY7QUFFSCxLQUpELEVBSUUsR0FKRjtBQUtILEdBL1ZJLENBa1dMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFwWEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBTY29yZVJlY3Q6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFNjb3JlTGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgVXBUaXA6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIEN1cnJlbnRTY29yZToge1xuICAgICAgICAgICAgdHlwZTpjYy5pbnRlZ2VyLFxuICAgICAgICAgICAgZGVmYXVsdDowXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLlNjb3JlTGFiZWwuc3RyaW5nID0gJzAnO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgb25DbGljazpmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1haW5KUyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZVNjZW5lU2NyaXB0Jyk7XG4gICAgICAgIHZhciBwb2tlck5vZGUgPSBtYWluSlMuQ3VycmVudFBva2VyLm5vZGU7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibXVzaWMvbW92ZV90b19lZmZcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBtb3ZlX3RvX2VmZlxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIlBhXCIrX3RoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICAgICAgY2MubG9nKFwiUGFcIit0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBfdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnUG9rZXJDb250YWluZXInK2kpO1xuICAgICAgICAgICAgY2MubG9nKFwiY29udGFpbmVyXCIrY29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIlVwVGlwXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgbWFpbkpTLkFycm93VGlwcyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBwb2tlcjtcbiAgICAgICAgaWYgKHBva2VyTm9kZS5jaGlsZHJlbkNvdW50ID4gMCkge1xuICAgICAgICAgICAgdmFyIFRvb2xzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdUb29sc1NjcmlwdCcpO1xuICAgICAgICAgICAgcG9rZXIgPSBwb2tlck5vZGUuY2hpbGRyZW5bcG9rZXJOb2RlLmNoaWxkcmVuQ291bnQgLSAxXTtcbiAgICAgICAgICAgIC8vIF90aGlzLmZlaXBhaSh0YXJnZXQudGFyZ2V0LHBva2VyKTtcbiAgICAgICAgICAgIHZhciBzdW0gPSBwYXJzZUludCh0aGlzLlNjb3JlTGFiZWwuc3RyaW5nKSArIHBva2VyLlBva2VyUmVhbE51bWJlcjtcbiAgICAgICAgICAgIF90aGlzLmZlaXBhaSh0YXJnZXQuY3VycmVudFRhcmdldCxwb2tlcixzdW0pO1xuICAgICAgICAgICAgY2MubG9nKFwiUmVhbE51bWJlcjpcIiArIHBva2VyLlBva2VyUmVhbE51bWJlcitcIiAgICBQb2tlck51bWJlcjpcIitwb2tlci5Qb2tlck51bWJlcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRvb2xzLlNjYWxlQW5pbWF0aW9uKF90aGlzLlNjb3JlTGFiZWwpO1xuICAgICAgICAgICAgLy8gVG9vbHMuUGFyYWJvbGFBbmltYXRpb24oX3RoaXMuU2NvcmVMYWJlbCk7XG4gICAgICAgICAgICAvLyBjYy5sb2coXCLmnIDnu4jliIZcIitzdW0pO1xuICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5zdHJpbmcgPSBzdW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIF90aGlzLkN1cnJlbnRTY29yZSA9IHN1bTtcbiAgICAgICAgICAgIGlmIChzdW0gPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgbWFpbkpTLkNvbWJvQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICBfdGhpcy5TY29yZUxhYmVsLnN0cmluZyA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIC8vIHZhciBiaW5nbyBcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2dldF90YXJnZXRcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgYW5tYXRpb25Ob2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUud2lkdGggPSA1NTtcbiAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUuaGVpZ2h0ID0gMzA7XG4gICAgICAgICAgICAgICAgLy8gbm9kZS5zZXRDb250ZW50U2l6ZShjYy5TaXplKDIwLDIwKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5ub2RlLmFkZENoaWxkKGFubWF0aW9uTm9kZSk7XG4gICAgICAgICAgICAgICAgdmFyIHdyb25nUG9rZXIgPSBhbm1hdGlvbk5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5ub2RlLmFkZENoaWxkKHNjb3JlTm9kZSk7XG4gICAgICAgICAgICAgICAgdmFyIGdldHNjb3JlID0gc2NvcmVOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJmb250L3Njb3JlX2ZvbnRcIiwgY2MuRm9udCwgZnVuY3Rpb24oZXJyLCBmb250KSB7XG4gICAgICAgICAgICAgICAgICAgIGdldHNjb3JlLmZvbnQgPSBmb250O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGdldHNjb3JlLmZvbnRTaXplID0gMzU7XG4gICAgICAgICAgICAgICAgZ2V0c2NvcmUuY29sb3IgPSBuZXcgY2MuY29sb3IoMjU1LDAsMCwyNTUpO1xuICAgICAgICAgICAgICAgIGdldHNjb3JlLnN0cmluZyA9IFwiKzIwMFwiO1xuICAgICAgICAgICAgICAgIHdyb25nUG9rZXIuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuU0lNUExFO1xuICAgICAgICAgICAgICAgIHdyb25nUG9rZXIuc3ByaXRlRnJhbWUgPSBtYWluSlMuUG9rZXJUYXJnZXRUaXBzO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIm5vZGVTaXplXCIgKyBhbm1hdGlvbk5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCArIGFubWF0aW9uTm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZDEgPSBjYy5kZWxheVRpbWUoMC4wMSk7XG4gICAgICAgICAgICAgICAgdmFyIHN0bzEgPSBjYy5zY2FsZVRvKDAuNCwgMik7XG4gICAgICAgICAgICAgICAgdmFyIG1vdjEgPSBjYy5tb3ZlQnkoMC40LGNjLnYyKDAsMTAwKSk7XG4gICAgICAgICAgICAgICAgdmFyIGZhZGVpbiA9IGNjLmZhZGVJbigwLjQpO1xuICAgICAgICAgICAgICAgIHZhciBzcGF3biA9IGNjLnNwYXduKFtkMSwgc3RvMSxtb3YxLGZhZGVpbl0pO1xuICAgICAgICAgICAgICAgIGFubWF0aW9uTm9kZS5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICAgICAgICAgIHZhciBtb3YyID0gY2MubW92ZUJ5KDAuNCxjYy52MigwLDQwKSk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIHNwYXduMiA9IGNjLnNwYXduKFtkMSwgc3RvMSxtb3YyXSk7XG4gICAgICAgICAgICAgICAgc2NvcmVOb2RlLnJ1bkFjdGlvbihtb3YyKTtcblxuICAgICAgICAgICAgICAgIHZhciBkMyA9IGNjLmRlbGF5VGltZSgwLjQpO1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25GaW5pc2hlZCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImZvbnQvYW5kX3Njb3JlX2ZvbnRcIiwgY2MuRm9udCwgZnVuY3Rpb24oZXJyLCBmb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRzY29yZS5mb250U2l6ZSA9IDI1O1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0c2NvcmUuZm9udCA9IGZvbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MxID0gc2NvcmVOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3JlTGFiZWwgPSBjYy5maW5kKCdDYW52YXMvU2NvcmVMYWJlbC9CYWNrZ3JvdW5kL0xhYmVsJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29yZUxhYmVsU3RybmcgPSBzY29yZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gc2NvcmVMYWJlbC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4zLCBjYy52Mihwb3MyLnggLSBwb3MxLngscG9zMi55IC0gcG9zMS55KSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VTY29yZSA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlbk51bWJlckFuaW0ocGFyc2VJbnQoc2NvcmVMYWJlbFN0cm5nLnN0cmluZykgKyAyMDAsIHBhcnNlSW50KHNjb3JlTGFiZWxTdHJuZy5zdHJpbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBteVNlcXUgPSBjYy5zZXF1ZW5jZShbbXRvLGNoYW5nZVNjb3JlXSk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlTm9kZS5ydW5BY3Rpb24obXlTZXF1KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgc2VxdSA9IGNjLnNlcXVlbmNlKGQzLGFuaW1hdGlvbkZpbmlzaGVkKTtcbiAgICAgICAgICAgICAgICBzY29yZU5vZGUucnVuQWN0aW9uKHNlcXUpO1xuXG5cbiAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSwwLjUpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VtID4gMjEpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2J1c3RfZWZmXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSBjYy5maW5kKFwiQ2FudmFzL1JvdW5kTGFiZWwvQmFja2dyb3VuZC9GaXJzdFJvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjYy5maW5kKFwiQ2FudmFzL1JvdW5kTGFiZWwvQmFja2dyb3VuZC9TZWNvbmRSb3VuZFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcmQgPSBjYy5maW5kKFwiQ2FudmFzL1JvdW5kTGFiZWwvQmFja2dyb3VuZC9UaGlyZFJvdW5kXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNhLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0LmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZC5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcmQuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAvL+e7k+adn1xuICAgICAgICAgICAgICAgICAgICB0aGlyZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFiYmFySlMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ1RhYmJhclNjcmlwdCcpO1xuICAgICAgICAgICAgICAgICAgICB0YWJiYXJKUy5PdXRNb3ZlQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhjYSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuQnVzdEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBhbm1hdGlvbk5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgICAgIGFubWF0aW9uTm9kZS53aWR0aCA9IDQwO1xuICAgICAgICAgICAgICAgIGFubWF0aW9uTm9kZS5oZWlnaHQgPSA0MDtcbiAgICAgICAgICAgICAgICAvLyBub2RlLnNldENvbnRlbnRTaXplKGNjLlNpemUoMjAsMjApKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5TY29yZUxhYmVsLm5vZGUuYWRkQ2hpbGQoYW5tYXRpb25Ob2RlKTtcbiAgICAgICAgICAgICAgICB2YXIgd3JvbmdQb2tlciA9IGFubWF0aW9uTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyB3cm9uZ1Bva2VyLlNpemUgPSBjYy5TaXplKDIwLDIwKTtcbiAgICAgICAgICAgICAgICAvLyB3cm9uZ1Bva2VyLnNwcml0ZUZyYW1lID0gY2Euc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgLy8gd3JvbmdQb2tlci50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0lNUExFO0NVU1RPTVxuICAgICAgICAgICAgICAgIHdyb25nUG9rZXIuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuU0lNUExFO1xuICAgICAgICAgICAgICAgIC8vIGlmIChfdGhpcy5FcnJvclRpcHMgIT0gbnVsbCB8fCBfdGhpcy5FcnJvclRpcHMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHdyb25nUG9rZXIuc3ByaXRlRnJhbWUgPSBfdGhpcy5FcnJvclRpcHM7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2Jhc2VfdWkvZXJyb3JfdGlwJyxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByRnJhbWUpeyDjgIBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNjLmxvZyhcIiBhc3NldHMvdGV4dHVyZS9lcnJvcl90aXAgXCIrZXJyKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNwckZyYW1lLnNldFJlY3QoY2MuUmVjdCgwLDAsOTUsODgpKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHdyb25nUG9rZXIuc3ByaXRlRnJhbWUgPSBzcHJGcmFtZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIF90aGlzLkVycm9yVGlwcyA9IHNwckZyYW1lO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2MubG9nKHdyb25nUG9rZXIpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgd3JvbmdQb2tlci5zcHJpdGVGcmFtZSA9IG1haW5KUy5Qb2tlckVycm9yVGlwcztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJub2RlU2l6ZVwiICsgYW5tYXRpb25Ob2RlLmdldENvbnRlbnRTaXplKCkud2lkdGggKyBhbm1hdGlvbk5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGQxID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICAgICAgICAgIHZhciBzdG8xID0gY2Muc2NhbGVUbygwLjQsIDIpO1xuICAgICAgICAgICAgICAgIHZhciBtb3YxID0gY2MubW92ZUJ5KDAuNCxjYy52MigwLDEwMCkpO1xuICAgICAgICAgICAgICAgIHZhciBmYWRlaW4gPSBjYy5mYWRlSW4oMC40KTtcbiAgICAgICAgICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihbZDEsIHN0bzEsbW92MSxmYWRlaW5dKTtcbiAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUucnVuQWN0aW9uKHNwYXduKTtcblxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25GaW5pc2hlZCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSwwLjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5omn6KGM54mM5bGA6Lef6L+bXG4gICAgICAgICAgICBjYy5sb2cobWFpbkpTLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgaWYgKG1haW5KUy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNoaWxkcmVuQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb250UG9rZXIgPSBtYWluSlMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jaGlsZHJlblttYWluSlMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jaGlsZHJlbkNvdW50IC0gMV07XG4gICAgICAgICAgICAgICAgY2MubG9nKGZyb250UG9rZXIpO1xuICAgICAgICAgICAgICAgIG1haW5KUy5mYW56aHVhbihmcm9udFBva2VyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXNoZWRQb2tlciA9IGNjLmZpbmQoJ0NhbnZhcy9TdGFzaEJ1dHRvbi9CYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXNoZWRQb2tlci5jaGlsZHJlbkNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haW5KUy5UaW1lT3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBpZiAobWFpbkpTLkN1cnJlbnRQb2tlci5ub2RlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICAgICAgLy8gdmFyIGN1clBvczEgPSB0YXJnZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAvLyAgICAgdmFyIGN1clBvczIgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGN1clBvczEpO1xuICAgICAgICAvLyAgICAgY2MubG9nKHRhcmdldCk7XG4gICAgICAgIC8vICAgICB0YXJnZXQuc2V0UG9zaXRpb24oY3VyUG9zMik7XG4gICAgICAgIC8vICAgICB0YXJnZXQucGFyZW50ID0gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZTtcbiAgICAgICAgLy8gICAgIHRhcmdldC5DdXJyZW50UG9zaXRpb24gPSBjdXJQb3MxO1xuICAgICAgICBcbiAgICB9LFxuICAgIC8vIOWKqOeUu+S7juWtkOiKgueCuemjnuWIsOeItuiKgueCuei6q+S4ilxuICAgIGZlaXBhaTogZnVuY3Rpb24gKG5vZGVQYXJlbnQsbm9kZVNvbix0b3RhbFNjb3JlKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibXVzaWMvbW92ZV90b19lZmZcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYy5sb2cobm9kZVBhcmVudCxub2RlU29uKTtcbiAgICAgICAgdmFyIGN1clBvczEgPSBub2RlU29uLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgdmFyIGN1clBvczIgPSBub2RlUGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGQyID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICB2YXIgbXZ0byA9IGNjLm1vdmVCeSgwLjEsIGNjLnYyKGN1clBvczIueCAtIGN1clBvczEueCxjdXJQb3MyLnkgLSBjdXJQb3MxLnkgKyAxNzUgLSAoNDUgKiBub2RlUGFyZW50LmNoaWxkcmVuQ291bnQpKSk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaW5pc2hlZCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgLy8gdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IHRhcmdldC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB2YXIgY3VyUG9zMSA9IHRhcmdldC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgY3VyUG9zMiA9IF90aGlzLkN1cnJlbnRQb2tlci5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGN1clBvczEpO1xuICAgICAgICAgICAgLy8gY2MubG9nKHRhcmdldCk7XG4gICAgICAgICAgICAvLyB0YXJnZXQuc2V0UG9zaXRpb24oY3VyUG9zMik7XG4gICAgICAgICAgICAvLyB0YXJnZXQucGFyZW50ID0gX3RoaXMuQ3VycmVudFBva2VyLm5vZGU7XG4gICAgICAgICAgICAvLyAvLyBjYy5sb2codGFyZ2V0LkN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAvLyB0YXJnZXQuUHJldmlvdXNQb3NpdGlvbiA9IHRhcmdldC5DdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAvLyB0YXJnZXQuQ3VycmVudFBvc2l0aW9uID0gY3VyUG9zMTtcbiAgICAgICAgICAgIHZhciBwb3MxID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgIHZhciBwb3MyID0gbm9kZVBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MxKTtcbiAgICAgICAgICAgIHRhcmdldC5zZXRQb3NpdGlvbihwb3MyKTtcbiAgICAgICAgICAgIHRhcmdldC5QcmV2aW91c1BhcmVudCA9IHRhcmdldC5wYXJlbnQ7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50ID0gbm9kZVBhcmVudDtcbiAgICAgICAgICAgIHRhcmdldC5QcmV2aW91c1Bvc2l0aW9uID0gdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgIHRhcmdldC5DdXJyZW50UG9zaXRpb24gPSBwb3MxO1xuICAgICAgICAgICAgY2MubG9nKG5vZGVQYXJlbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgdGFyZ2V0LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGFyZ2V0LmludGVyYWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodG90YWxTY29yZSA+PSAyMSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQb2tlckNvbnRhaW5lclJlY3RcIikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwiPjIx54K55aSE55CGXCIsbm9kZVBhcmVudC5jaGlsZHJlbkNvdW50KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IG5vZGVQYXJlbnQuY2hpbGRyZW5Db3VudCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBub2RlUGFyZW50LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwi5omn6KGMXCIrbm9kZSArIFwi5bu25pe2XCIgKyAwLjUgKiAobm9kZVBhcmVudC5jaGlsZHJlbkNvdW50IC0gMSAtIGluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBUb29scyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnVG9vbHNTY3JpcHQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9vbHMuUGFyYWJvbGFBbmltYXRpb24obm9kZSwwKTsgXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLlBhcmFib2xhQW5pbWF0aW9uKG5vZGUpOyBcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9ub2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBUb29scy5QYXJhYm9sYUFuaW1hdGlvbihfbm9kZSk7IFxuICAgICAgICAgICAgICAgICAgICB9LDAuNSAqIChub2RlUGFyZW50LmNoaWxkcmVuQ291bnQgLSAxIC0gaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgX3RoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YXIgZDMgPSBjYy5kZWxheVRpbWUoMC41ICogKG5vZGVQYXJlbnQuY2hpbGRyZW5Db3VudCAtIDEgLSBpbmRleCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YXIgYW5pbWF0aW9uMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB2YXIgVG9vbHMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ1Rvb2xzU2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgVG9vbHMuUGFyYWJvbGFBbmltYXRpb24odGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YXIgc2VxdSA9IGNjLnNlcXVlbmNlKFtkMyxhbmltYXRpb24xXSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgbm9kZS5ydW5BY3Rpb24oc2VxdSk7XG4gICAgICAgICAgICAgICAgLy8gICAgfSwwKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbih0YXJnZXQpe1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IG5vZGVQYXJlbnQuY2hpbGRyZW5Db3VudCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhciBub2RlID0gbm9kZVBhcmVudC5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQb2tlckNvbnRhaW5lclJlY3RcIikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiZmVpcGFpIGxvZ1wiK190aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiICAgUG9rZXJDb250YWluZXJSZWN0XCIrX3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBva2VyQ29udGFpbmVyUmVjdFwiKSk7XG4gICAgICAgICAgICAgICAgfSwxLjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNlcXUgPSBjYy5zZXF1ZW5jZShbZDIsbXZ0byxhbmltYXRpb25GaW5pc2hlZF0pO1xuICAgICAgICBub2RlU29uLnJ1bkFjdGlvbihzZXF1KTtcbiAgICB9LFxuXG4gICAgRGV0ZWN0QXJyb3dzOmZ1bmN0aW9uIChwcmVTY29yZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjYy5sb2coX3RoaXMubm9kZSk7XG4gICAgICAgIGlmIChwYXJzZUludChfdGhpcy5TY29yZUxhYmVsLnN0cmluZykgKyBwcmVTY29yZSA8PSAyMSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdXB0aXAgPSBfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVXBUaXBcIik7XG4gICAgICAgICAgICB2YXIgcG9zID0gdXB0aXAucG9zaXRpb247XG4gICAgICAgICAgICB1cHRpcC5zZXRQb3NpdGlvbigwLHBvcy55IC0gNTApO1xuICAgICAgICAgICAgX3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVwVGlwXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBjYy5sb2coXCLojrflj5ZVcFRpcOeahOS9jee9rlwiK3VwdGlwLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIHZhciBtb3YgPSBjYy5tb3ZlQnkoMC4yLGNjLnYyKDAsIDUwKSk7XG4gICAgICAgICAgICB2YXIgZmFkZSA9IGNjLmZhZGVJbigwLjIpO1xuICAgICAgICAgICAgdmFyIHNwYXduID0gY2Muc3Bhd24oW21vdixmYWRlXSk7XG4gICAgICAgICAgICB1cHRpcC5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlVwVGlwXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhcIllZWVlcIik7XG4gICAgfSxcbiAgICB1cGRhdGVuTnVtYmVyQW5pbTpmdW5jdGlvbihjdXJOdW0sb3JpZ2luTnVtKSB7XG4gICAgICAgIHZhciBkaWZmZXJlbmNlID0gY3VyTnVtIC0gb3JpZ2luTnVtO1xuICAgICAgICB2YXIgYWJzRGlmZmVyZW5jZSA9IE1hdGguYWJzKGRpZmZlcmVuY2UpO1xuICAgICAgICB2YXIgY2hhbmdlVGltZXMgPSBhYnNEaWZmZXJlbmNlIDwgOCA/IGFic0RpZmZlcmVuY2UgOiA4O1xuICAgICAgICB2YXIgY2hhbmdlVW5pdCA9IGFic0RpZmZlcmVuY2UgPCA4ID8gMSA6IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIDgpXG4gICAgICAgIHZhciBzY29yZUxhYmVsID0gY2MuZmluZCgnQ2FudmFzL1Njb3JlTGFiZWwvQmFja2dyb3VuZC9MYWJlbCcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5nZVRpbWVzOyBpKyspIHtcbiAgICAgICAgICAgIChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzY29yZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKG9yaWdpbk51bSArPSBjaGFuZ2VVbml0KVxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBjaGFuZ2VUaW1lcyAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjdXJOdW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCA1MCooaSsxKSk7XG4gICAgICAgICAgICB9KShpKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIEJ1c3RBbmltYXRpb246ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjYy5sb2coX3RoaXMubm9kZSk7XG4gICAgICAgIHZhciB1cHRpcCA9IF90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCdXN0XCIpO1xuICAgICAgICB2YXIgcG9zID0gdXB0aXAucG9zaXRpb247XG4gICAgICAgIHVwdGlwLnNldFBvc2l0aW9uKDAscG9zLnkgLSAxNTApO1xuICAgICAgICBfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQnVzdFwiKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBjYy5sb2coXCLojrflj5ZCdXN055qE5L2N572uXCIrdXB0aXAucG9zaXRpb24pO1xuICAgICAgICB2YXIgbW92ID0gY2MubW92ZUJ5KDAuMyxjYy52MigwLCAxNTApKTtcbiAgICAgICAgdmFyIGZhZGUgPSBjYy5mYWRlSW4oMC4zKTtcbiAgICAgICAgdmFyIHNwYXduID0gY2Muc3Bhd24oW21vdixmYWRlXSk7XG4gICAgICAgIHVwdGlwLnJ1bkFjdGlvbihzcGF3bik7XG4gICAgICAgIF90aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbih0YXJnZXQpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdXB0aXAuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgfSwwLjUpO1xuICAgIH0sXG5cblxuICAgIC8vIHVwZGF0ZW5OdW1iZXJBbmltOiBmdW5jdGlvbiAoY3VyTnVtLG9yaWdpbk51bSkge1xuICAgIC8vICAgICB2YXIgZGlmZmVyZW5jZSA9IGN1ck51bSAtIG9yaWdpbk51bTtcbiAgICAvLyAgICAgdmFyIGFic0RpZmZlcmVuY2UgPSBNYXRoLmFicyhkaWZmZXJlbmNlKTtcbiAgICAvLyAgICAgdmFyIGNoYW5nZVRpbWVzID0gYWJzRGlmZmVyZW5jZSA8IDggPyBhYnNEaWZmZXJlbmNlIDogODtcbiAgICAvLyAgICAgdmFyIGNoYW5nZVVuaXQgPSBhYnNEaWZmZXJlbmNlIDwgOCA/IDEgOiBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyA4KVxuICAgIC8vICAgICB2YXIgc2NvcmVMYWJlbCA9IGNjLmZpbmQoJ0NhbnZhcy9TY29yZUxhYmVsL0JhY2tncm91bmQvTGFiZWwnKTtcbiAgICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2VUaW1lczsgaSsrKSB7XG4gICAgLy8gICAgICAgICAoZnVuY3Rpb24gKGkpIHtcbiAgICAvLyAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgc2NvcmVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChvcmlnaW5OdW0gKz0gY2hhbmdlVW5pdClcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGkgPT0gY2hhbmdlVGltZXMgLSAxKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBzY29yZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkgPSBjdXJOdW07XG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9LCAxMDAqKGkrMSkpO1xuICAgIC8vICAgICAgICAgfSkoaSlcbiAgICAvLyAgICAgfVxuICAgIC8vIH0sIFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/NewScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8bafcuYbVlPHrf1MQyfgffh', 'NewScript');
// Script/NewScript.js

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
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTmV3U2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQTtBQUVBQyxFQUFBQSxLQXpCSyxtQkF5QkksQ0FFUixDQTNCSSxDQTZCTDs7QUE3QkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------
