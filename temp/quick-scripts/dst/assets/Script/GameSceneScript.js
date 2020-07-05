
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