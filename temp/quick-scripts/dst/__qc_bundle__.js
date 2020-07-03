
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
    var alertNode = cc.find('Canvas/AlertView');
    alertNode.active = false;
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

      if (_this.leftSeconds == 30) {
        cc.loader.loadRes("music/time_tip", cc.AudioClip, function (err, clip) {
          cc.audioEngine.play(clip, false, 0.5);
        });
        cc.loader.loadRes("font/red_time_font", cc.Font, function (err, font) {
          label.font = font;
        });
      }

      var timeString = Tools.FormatMMSS(_this.leftSeconds);
      cc.log(timeString);
      label.string = timeString;
      label.color = new cc.Color(255, 0, 0, 255); // cc.log(_this.TimerPause)
    }, _this, 1, 100, 1, false);
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
        var frontPoker = mainJS.PokerInstanceBackground.node.children[mainJS.PokerInstanceBackground.node.childrenCount - 1];
        cc.log(frontPoker);
        mainJS.fanzhuan(frontPoker);
      }
    }
  },
  stashAnimation: function stashAnimation(staBut) {
    if (condition) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZVNjZW5lU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGVmdFNlY29uZHMiLCJ0eXBlIiwiaW50ZWdlciIsIkFycm93VGlwcyIsImJhY2tncm91bmRTb25nIiwiQXVkaW9DbGlwIiwiUGF1c2VCdXR0b24iLCJCdXR0b24iLCJIZWxwQnV0dG9uIiwiQXVkaW9CdXR0b24iLCJSZUJhY2tCdXR0b24iLCJUaW1lQ291bnRMYWJlbCIsIlJvdW5kTGFiZWwiLCJTY29yZUxhYmVsIiwiUG9rZXJDb250YWluZXIiLCJQcmVmYWIiLCJteVBva2VyIiwiUG9rZXJJbnN0YW5jZUJhY2tncm91bmQiLCJTcHJpdGUiLCJQb2tlclN0YXNoVmlldyIsIkN1cnJlbnRQb2tlciIsIlRpbWVyUGF1c2UiLCJCb29sZWFuIiwiTGFzdE5vZGUiLCJOb2RlIiwiUG9rZXJFcnJvclRpcHMiLCJTcHJpdGVGcmFtZSIsIlBva2VyVGFyZ2V0VGlwcyIsIlBva2VyQXRsYXMiLCJTcHJpdGVBdGxhcyIsIkNvbWJvQ291bnQiLCJvbkxvYWQiLCJUb29scyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJhdWRpb0VuZ2luZSIsInBsYXlNdXNpYyIsInNpemUiLCJ2aWV3IiwiZ2V0RnJhbWVTaXplIiwibG9nIiwid2lkdGgiLCJoZWlnaHQiLCJ3aW5kb3dTaXplIiwiZ2V0VmlzaWJsZVNpemUiLCJoYWxmV2lkdGgiLCJoYWxmSGVpZ2h0IiwicGF1c2VTaXplIiwibm9kZSIsImdldEJvdW5kaW5nQm94Iiwic2V0QW5jaG9yUG9pbnQiLCJzZXRQb3NpdGlvbiIsImxhYmVsTm9kZSIsImdldENoaWxkQnlOYW1lIiwibGFiZWwiLCJMYWJlbCIsInRpbWVTdHJpbmciLCJGb3JtYXRNTVNTIiwic3RyaW5nIiwiYmciLCJmaXJzdFIiLCJpIiwicHJlIiwiaW5zdGFudGlhdGUiLCJfbmFtZSIsImFjdGl2ZSIsImFkZENoaWxkIiwiYXJyYXkiLCJwb2tlclJhbmRvbSIsIlBva2VyTnVtYmVyIiwiaW5kZXgiLCJjaGlsZHJlbkNvdW50Iiwic3RhcnQiLCJhbGVydE5vZGUiLCJmYXBhaSIsIl90aGlzIiwiZGlyZWN0b3IiLCJnZXRTY2hlZHVsZXIiLCJzY2hlZHVsZSIsImNvbnRhaW5lciIsInBva2VyTm9kZSIsInBva2VyIiwiY2hpbGRyZW4iLCJEZXRlY3RBcnJvd3MiLCJQb2tlclJlYWxOdW1iZXIiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwiY2xpcCIsInBsYXkiLCJGb250IiwiZm9udCIsImNvbG9yIiwiQ29sb3IiLCJzZXEiLCJsYXN0UG9ja2VyIiwiY3VycmVudFBva2VyIiwiZmFuemh1YW4iLCJlbmRfZnVuYyIsImNhbGxGdW5jIiwidGFyZ2V0IiwiYmFzZV9jb3VudCIsInBhcnNlSW50Iiwic3BsaXQiLCJjdXJQb3MxIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwidjIiLCJjdXJQb3MyIiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJQcmV2aW91c1BhcmVudCIsInBhcmVudCIsIkN1cnJlbnRQb3NpdGlvbiIsImJpbmQiLCJtdG8iLCJtb3ZlVG8iLCJkMSIsImRlbGF5VGltZSIsInNlcXVlIiwic2VxdWVuY2UiLCJydW5BY3Rpb24iLCJwb2tlcm5vZGUiLCJwb3MxIiwicG9zMiIsIlByZXZpb3VzUG9zaXRpb24iLCJtb3ZlQnkiLCJ4IiwieSIsImZhbjEiLCJzY2FsZVRvIiwiY2hhbmdlRnJvbnQiLCJzcGF3biIsImQyIiwiZmFuMiIsImFuaW1hdGlvbkZpbmlzaGVkIiwiZ2V0UG9zaXRpb24iLCJzZXF1IiwiY3VycmVudFBvc2l0aW9uIiwiQXJyYXkiLCJudW0iLCJyYW5kb21OdW0iLCJpbmRleE9mIiwicHVzaCIsImxlbmd0aCIsIm1pbk51bSIsIm1heE51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlN0YXNoQ2xpY2siLCJzdGFCdXQiLCJtYWluSlMiLCJCYWNrZ3JvdW5kVmlldyIsImN1cnJlbnRUYXJnZXQiLCJwb3MzIiwidG90YXRpb24iLCJyb3RhdGVUbyIsImludGVyYWN0YWJsZSIsImN1clBvczMiLCJmcm9udFBva2VyIiwic3Rhc2hBbmltYXRpb24iLCJjb25kaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUVSQyxJQUFBQSxXQUFXLEVBQUU7QUFDVEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLE9BREM7QUFFVCxpQkFBUTtBQUZDLEtBRkw7QUFPUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BGLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTSxPQUREO0FBRVAsaUJBQVE7QUFGRCxLQVBIO0FBWVJFLElBQUFBLGNBQWMsRUFBRTtBQUNaSCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ1MsU0FESTtBQUVaLGlCQUFRO0FBRkksS0FaUjtBQWdCUkMsSUFBQUEsV0FBVyxFQUFFO0FBQ1RMLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVyxNQURDO0FBRVQsaUJBQVE7QUFGQyxLQWhCTDtBQW9CUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JQLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVyxNQURBO0FBRVIsaUJBQVE7QUFGQSxLQXBCSjtBQXdCUkUsSUFBQUEsV0FBVyxFQUFFO0FBQ1RSLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVyxNQURDO0FBRVQsaUJBQVE7QUFGQyxLQXhCTDtBQTRCUkcsSUFBQUEsWUFBWSxFQUFFO0FBQ1ZULE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVyxNQURFO0FBRVYsaUJBQVE7QUFGRSxLQTVCTjtBQWlDUkksSUFBQUEsY0FBYyxFQUFFO0FBQ1pWLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVyxNQURJO0FBRVosaUJBQVE7QUFGSSxL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Q2tDLFFBQTNDO0FBQ0EsWUFBSTRFLFVBQVUsR0FBR1IsTUFBTSxDQUFDckksdUJBQVAsQ0FBK0IrQixJQUEvQixDQUFvQ2tDLFFBQXBDLENBQTZDb0UsTUFBTSxDQUFDckksdUJBQVAsQ0FBK0IrQixJQUEvQixDQUFvQ3VCLGFBQXBDLEdBQW9ELENBQWpHLENBQWpCO0FBQ0EzRSxRQUFBQSxFQUFFLENBQUM0QyxHQUFILENBQU9zSCxVQUFQO0FBQ0FSLFFBQUFBLE1BQU0sQ0FBQ3JELFFBQVAsQ0FBZ0I2RCxVQUFoQjtBQUNIO0FBQ0o7QUFDSixHQWplSTtBQW1lTEMsRUFBQUEsY0FBYyxFQUFDLHdCQUFVVixNQUFWLEVBQWtCO0FBQzdCLFFBQUlXLFNBQUosRUFBZSxDQUVkO0FBQ0osR0F2ZUksQ0F5ZUw7O0FBemVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgbGVmdFNlY29uZHM6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuaW50ZWdlcixcbiAgICAgICAgICAgIGRlZmF1bHQ6MjQwXG4gICAgICAgIH0sXG5cbiAgICAgICAgQXJyb3dUaXBzOiB7XG4gICAgICAgICAgICB0eXBlOmNjLmludGVnZXIsXG4gICAgICAgICAgICBkZWZhdWx0OjNcbiAgICAgICAgfSxcblxuICAgICAgICBiYWNrZ3JvdW5kU29uZzoge1xuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgUGF1c2VCdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIEhlbHBCdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIEF1ZGlvQnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOmNjLkJ1dHRvbixcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBSZUJhY2tCdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgVGltZUNvdW50TGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFJvdW5kTGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFNjb3JlTGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgUG9rZXJDb250YWluZXI6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuUHJlZmFiLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgbXlQb2tlcjoge1xuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBQb2tlckluc3RhbmNlQmFja2dyb3VuZDoge1xuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBQb2tlclN0YXNoVmlldzoge1xuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBDdXJyZW50UG9rZXI6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgVGltZXJQYXVzZToge1xuICAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDpmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIExhc3ROb2RlOiB7XG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcblxuICAgICAgICBQb2tlckVycm9yVGlwczoge1xuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBQb2tlclRhcmdldFRpcHM6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlRnJhbWUsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgUG9rZXJBdGxhczoge1xuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVBdGxhcyxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBDb21ib0NvdW50OiB7XG4gICAgICAgICAgICB0eXBlOmNjLmludGVnZXIsXG4gICAgICAgICAgICBkZWZhdWx0OjBcbiAgICAgICAgfVxuXG5cblxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgdmFyIFRvb2xzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdUb29sc1NjcmlwdCcpO1xuXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJhY2tncm91bmRTb25nLHRydWUpXG4gICAgICAgIGxldCBzaXplID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKTtcbiAgICAgICAgY2MubG9nKHNpemUud2lkdGgsc2l6ZS5oZWlnaHQpXG4gICAgICAgIGxldCB3aW5kb3dTaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xuICAgICAgICBjYy5sb2cod2luZG93U2l6ZS53aWR0aCx3aW5kb3dTaXplLmhlaWdodCk7XG5cbiAgICAgICAgdmFyIGhhbGZXaWR0aCA9IHdpbmRvd1NpemUud2lkdGggLyAyO1xuICAgICAgICB2YXIgaGFsZkhlaWdodCA9IHdpbmRvd1NpemUuaGVpZ2h0IC8gMjtcbiAgICAgICAgXG4gICAgICAgIHZhciBwYXVzZVNpemUgPSB0aGlzLlBhdXNlQnV0dG9uLm5vZGUuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgdGhpcy5QYXVzZUJ1dHRvbi5ub2RlLnNldEFuY2hvclBvaW50KDAsMCk7XG4gICAgICAgIHRoaXMuUGF1c2VCdXR0b24ubm9kZS5zZXRQb3NpdGlvbigtaGFsZldpZHRoICsgNDAsLWhhbGZIZWlnaHQgKyAzMClcblxuICAgICAgICB0aGlzLkhlbHBCdXR0b24ubm9kZS5zZXRBbmNob3JQb2ludCgwLDApO1xuICAgICAgICB0aGlzLkhlbHBCdXR0b24ubm9kZS5zZXRQb3NpdGlvbigtODcgLSA0MCwtaGFsZkhlaWdodCArIDExICsgMzApXG5cbiAgICAgICAgdGhpcy5BdWRpb0J1dHRvbi5ub2RlLnNldEFuY2hvclBvaW50KDAsMCk7XG4gICAgICAgIHRoaXMuQXVkaW9CdXR0b24ubm9kZS5zZXRQb3NpdGlvbig0MCwtaGFsZkhlaWdodCArIDExICsgMzApXG5cbiAgICAgICAgdGhpcy5SZUJhY2tCdXR0b24ubm9kZS5zZXRBbmNob3JQb2ludCgwLDApO1xuICAgICAgICB0aGlzLlJlQmFja0J1dHRvbi5ub2RlLnNldFBvc2l0aW9uKGhhbGZXaWR0aCAtIDQwIC0gMTEwLC1oYWxmSGVpZ2h0ICsgMzApXG5cbiAgICAgICAgdGhpcy5UaW1lQ291bnRMYWJlbC5ub2RlLnNldEFuY2hvclBvaW50KDEsMCk7XG4gICAgICAgIHRoaXMuVGltZUNvdW50TGFiZWwubm9kZS5zZXRQb3NpdGlvbigwLTEwNyxoYWxmSGVpZ2h0IC0gOTAgLSA1MClcbiAgICAgICAgdmFyIGxhYmVsTm9kZSA9IHRoaXMuVGltZUNvdW50TGFiZWwubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKTtcbiAgICAgICAgdmFyIGxhYmVsID0gbGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIHZhciB0aW1lU3RyaW5nID0gVG9vbHMuRm9ybWF0TU1TUyh0aGlzLmxlZnRTZWNvbmRzKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGltZVN0cmluZztcblxuICAgICAgICB0aGlzLlJvdW5kTGFiZWwubm9kZS5zZXRBbmNob3JQb2ludCgwLjUsMCk7XG4gICAgICAgIHRoaXMuUm91bmRMYWJlbC5ub2RlLnNldFBvc2l0aW9uKDAsaGFsZkhlaWdodCAtIDkwIC0gNTApXG4gICAgICAgIHZhciBiZyA9IHRoaXMuUm91bmRMYWJlbC5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKTtcbiAgICAgICAgdmFyIGZpcnN0UiA9IGJnLmdldENoaWxkQnlOYW1lKFwiRmlyc3RSb3VuZFwiKTtcbiAgICAgICAgLy8gZmlyc3RSLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgIC8vIGJnLmdldENoaWxkQnlOYW1lKFwiRmlyc3RSb3VuZFwiKS5ub2RlLmhpID0gZmFsc2U7XG4gICAgICAgIC8vIGNjLmxvZyhiZy5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0Um91bmRcIikpO1xuICAgICAgICAvLyB0aGlzLlJvdW5kTGFiZWwubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkZpcnN0Um91bmRcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuUm91bmRMYWJlbC5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5ub2RlLmdldENoaWxkQnlOYW1lKFwiRmlyc3RSb3VuZFwiKS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuU2NvcmVMYWJlbC5ub2RlLnNldEFuY2hvclBvaW50KDAsMCk7XG4gICAgICAgIHRoaXMuU2NvcmVMYWJlbC5ub2RlLnNldFBvc2l0aW9uKDEwNyxoYWxmSGVpZ2h0IC0gOTAgLSA1MClcblxuICAgICAgICB0aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuc2V0QW5jaG9yUG9pbnQoMC41LDAuNSk7XG4gICAgICAgIC8vIGNjLmxvZyh0aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCx0aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xuICAgICAgICAvLyBjYy5sb2codGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmdldEJvdW5kaW5nQm94KCkuc2l6ZS53aWR0aCx0aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuZ2V0Qm91bmRpbmdCb3goKS5zaXplLmhlaWdodCk7XG4gICAgICAgIHRoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5zZXRQb3NpdGlvbigtaGFsZldpZHRoICsgMTMwICsgMjAsLWhhbGZIZWlnaHQgKyA5MyArIDE2MCk7XG5cbiAgICAgICAgXG4gICAgICAgIHRoaXMuQ3VycmVudFBva2VyLm5vZGUuc2V0QW5jaG9yUG9pbnQoMCwwLjUpO1xuICAgICAgICB0aGlzLkN1cnJlbnRQb2tlci5ub2RlLnNldFBvc2l0aW9uKDAsLWhhbGZIZWlnaHQgKyA5NSArIDE2MCk7XG5cbiAgICAgICAgdGhpcy5Qb2tlclN0YXNoVmlldy5ub2RlLnNldEFuY2hvclBvaW50KDEsMSk7XG4gICAgICAgIHRoaXMuUG9rZXJTdGFzaFZpZXcubm9kZS5zZXRQb3NpdGlvbihoYWxmV2lkdGggLSAxMCwtaGFsZkhlaWdodCArIDE5MCArIDE2MCk7XG5cbiAgICAgICAgXG5cbiAgICAgICAgdGhpcy5BcnJvd1RpcHMgPSAzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUG9rZXJDb250YWluZXIpO1xuICAgICAgICAgICAgcHJlLl9uYW1lPVwiUG9rZXJDb250YWluZXJcIisoaSArIDEpO1xuICAgICAgICAgICAgcHJlLmdldENoaWxkQnlOYW1lKFwiVXBUaXBcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQocHJlKTtcbiAgICAgICAgICAgIHByZS5zZXRBbmNob3JQb2ludCgwLjUsMC41KTtcbiAgICAgICAgICAgIHByZS5zZXRQb3NpdGlvbigtaGFsZldpZHRoICsgNzggKyA2MCArIDE1NyppLDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcnJheSA9IHRoaXMucG9rZXJSYW5kb20oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJlID0gY2MuaW5zdGFudGlhdGUodGhpcy5teVBva2VyKTtcbiAgICAgICAgICAgIHByZS5Qb2tlck51bWJlciA9IGFycmF5W2ldO1xuICAgICAgICAgICAgLy8gcHJlLlBva2VyTnVtYmVyID0gNTI7XG4gICAgICAgICAgICAvLyBjYy5sb2coXCJQb2tlckluaXRcIitwcmUuUG9rZXJOdW1iZXIpO1xuICAgICAgICAgICAgLy8gY2MubG9nKFwiZGlhbnNodVwiK3ByZS5Qb2tlck51bWJlcik7XG4gICAgICAgICAgICBwcmUuX25hbWU9XCJQb2tlcl9cIitpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHByZSk7XG4gICAgICAgICAgICBwcmUuZ2V0Q2hpbGRCeU5hbWUoXCJGcm9udFZpZXdcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBwcmUuc2V0QW5jaG9yUG9pbnQoMC41LDAuNSk7XG4gICAgICAgICAgICBwcmUuc2V0UG9zaXRpb24oMCwwIC0gMjAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDsgaW5kZXgrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjYy5sb2codGhpcy5ub2RlLmNoaWxkcmVuW2luZGV4XSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICAgICAgdmFyIFRvb2xzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdUb29sc1NjcmlwdCcpO1xuICAgICAgICB2YXIgYmcgPSB0aGlzLlJvdW5kTGFiZWwubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIik7XG4gICAgICAgIGJnLmdldENoaWxkQnlOYW1lKFwiRmlyc3RSb3VuZFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgYmcuZ2V0Q2hpbGRCeU5hbWUoXCJTZWNvbmRSb3VuZFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgYmcuZ2V0Q2hpbGRCeU5hbWUoXCJUaGlyZFJvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBhbGVydE5vZGUgPSBjYy5maW5kKCdDYW52YXMvQWxlcnRWaWV3Jyk7XG4gICAgICAgIGFsZXJ0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuXG4gICAgICAgIHRoaXMuZmFwYWkoMCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2NoZWR1bGUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChfdGhpcy5UaW1lclBhdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmxlZnRTZWNvbmRzIC0tO1xuICAgICAgICAgICAgICAgIF90aGlzLkFycm93VGlwcyArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5BcnJvd1RpcHMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ1Bva2VyQ29udGFpbmVyJytpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBva2VyTm9kZSA9IF90aGlzLkN1cnJlbnRQb2tlci5ub2RlO1xuICAgICAgICAgICAgICAgICAgICBwb2tlciA9IHBva2VyTm9kZS5jaGlsZHJlbltwb2tlck5vZGUuY2hpbGRyZW5Db3VudCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZihwb2tlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb250YWluZXIuU2NvcmVMYWJlbC5zdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nZXRDb21wb25lbnQoXCJDb250YWluZXJQcmVmYWJTY3JpcHRcIikuRGV0ZWN0QXJyb3dzKHBva2VyLlBva2VyUmVhbE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZ2V0Q29tcG9uZW50KFwiQ29udGFpbmVyUHJlZmFiU2NyaXB0XCIpLkRldGVjdEFycm93cygwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGFiZWxOb2RlID0gdGhpcy5UaW1lQ291bnRMYWJlbC5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpO1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gbGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMubGVmdFNlY29uZHMgPT0gMzApIHtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL3RpbWVfdGlwXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJmb250L3JlZF90aW1lX2ZvbnRcIiwgY2MuRm9udCwgZnVuY3Rpb24oZXJyLCBmb250KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLmZvbnQgPSBmb250O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRpbWVTdHJpbmcgPSBUb29scy5Gb3JtYXRNTVNTKF90aGlzLmxlZnRTZWNvbmRzKTtcbiAgICAgICAgICAgIGNjLmxvZyh0aW1lU3RyaW5nKTtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IHRpbWVTdHJpbmc7XG4gICAgICAgICAgICBsYWJlbC5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDAsIDAsIDI1NSk7XG4gICAgICAgICAgICAvLyBjYy5sb2coX3RoaXMuVGltZXJQYXVzZSlcbiAgICAgICAgfSxfdGhpcywxLDEwMCwxLGZhbHNlKTtcbiAgICB9LFxuLy8g5Y+R54mM5Ye95pWwXG4gICAgZmFwYWk6ZnVuY3Rpb24oc2VxKSB7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgbGV0IHNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XG4gICAgICAgIGxldCBsYXN0UG9ja2VyID0gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBva2VyX1wiKyhzZXEgLSAxKSk7XG4gICAgICAgIGxldCBjdXJyZW50UG9rZXIgPSBfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUG9rZXJfXCIrc2VxKTtcbiAgICAgICAgaWYgKGN1cnJlbnRQb2tlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY2MubG9nKFwiVGVzdFwiLGxhc3RQb2NrZXIsY3VycmVudFBva2VyKTtcbiAgICAgICAgICAgIF90aGlzLmZhbnpodWFuKGxhc3RQb2NrZXIpO1xuICAgICAgICAgICAgX3RoaXMuQXJyb3dUaXBzID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2luaXRfcGFpXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIGZhbHNlLCAwLjMpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5Zue6LCDXG4gICAgICAgIHZhciBlbmRfZnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIGJhc2VfY291bnQgPSBwYXJzZUludCh0YXJnZXQuX25hbWUuc3BsaXQoXCJfXCIpWzFdKSArIDE7XG5cbiAgICAgICAgICAgIHZhciBjdXJQb3MxID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgIHZhciBjdXJQb3MyID0gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjdXJQb3MxKTtcbiAgICAgICAgICAgIC8vIGNjLmxvZyh0YXJnZXQpO1xuICAgICAgICAgICAgdGFyZ2V0LnNldFBvc2l0aW9uKGN1clBvczIpO1xuICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUGFyZW50ID0gdGFyZ2V0LnBhcmVudDtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnQgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlO1xuICAgICAgICAgICAgdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IGN1clBvczE7XG4gICAgICAgICAgICBfdGhpcy5mYXBhaShiYXNlX2NvdW50KTtcblxuICAgICAgICB9LmJpbmQoY3VycmVudFBva2VyKSlcblxuICAgICAgICB2YXIgbXRvID0gY2MubW92ZVRvKDAuMDUsIGNjLnYyKCgtc2l6ZS53aWR0aCAvIDIpKyAyMCArIDcyKzIuMipzZXEsKC1zaXplLmhlaWdodCAvIDIpICsgOTUgKyAxNjApKTtcbiAgICAgICAgdmFyIGQxID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICB2YXIgc2VxdWUgPSBjYy5zZXF1ZW5jZShbZDEsIG10bywgZW5kX2Z1bmNdKTtcbiAgICAgICAgY3VycmVudFBva2VyLnJ1bkFjdGlvbihzZXF1ZSk7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBmYW56aHVhbjpmdW5jdGlvbihwb2tlcm5vZGUpIHtcbiAgICAgICAgbGV0IHNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgLy8g5aaC5p6c5b2T5YmN6IqC54K555qEcGFyZW505Li6UG9rZXJJbnN0YW5jZUJhY2tncm91bmTvvIzliJnor7TmmI7pnIDopoHlvoDkuK3pl7Tnp7vliqjvvIzlpoLmnpzmmK/lnKjkuK3pl7TliJnpnIDopoHlvoDlt6bovrnnp7vliqhcbiAgICAgICAgLy8gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZVxuICAgICAgICBpZiAocG9rZXJub2RlLnBhcmVudCA9PT0gX3RoaXMuQ3VycmVudFBva2VyLm5vZGUpIHtcbiAgICAgICAgICAgIHZhciBkMSA9IGNjLmRlbGF5VGltZSgwLjAxKTtcbiAgICAgICAgICAgIHZhciBwb3MxID0gcG9rZXJub2RlLkN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciBwb3MyID0gcG9rZXJub2RlLlByZXZpb3VzUG9zaXRpb247XG4gICAgICAgICAgICB2YXIgbXRvID0gY2MubW92ZUJ5KDAuMTUsIGNjLnYyKHBvczIueCAtIHBvczEueCxwb3MyLnkgLSBwb3MxLnkpKTtcbiAgICAgICAgICAgIHZhciBmYW4xID0gY2Muc2NhbGVUbygwLjE1LCAwLjIsIDEpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZUZyb250ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmdldENoaWxkQnlOYW1lKFwiRnJvbnRWaWV3XCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRhcmdldC5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHNwYXduID0gY2Muc3Bhd24oW210byxmYW4xXSk7XG4gICAgICAgICAgICBwb2tlcm5vZGUucnVuQWN0aW9uKHNwYXduKTtcblxuICAgICAgICAgICAgdmFyIGQyID0gY2MuZGVsYXlUaW1lKDAuMTUpO1xuICAgICAgICAgICAgdmFyIGZhbjIgPSBjYy5zY2FsZVRvKDAuMSwgMSwgMSk7XG4gICAgICAgICAgICB2YXIgYW5pbWF0aW9uRmluaXNoZWQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuQ3VycmVudFBvc2l0aW9uID0gdGFyZ2V0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGN1clBvczEgPSB0YXJnZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MyID0gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjdXJQb3MxKTtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2codGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0UG9zaXRpb24oY3VyUG9zMik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUGFyZW50ID0gdGFyZ2V0LnBhcmVudDtcbiAgICAgICAgICAgICAgICB0YXJnZXQucGFyZW50ID0gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZTtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2codGFyZ2V0LkN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUG9zaXRpb24gPSB0YXJnZXQuQ3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHRhcmdldC5DdXJyZW50UG9zaXRpb24gPSBjdXJQb3MxO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc2VxdSA9IGNjLnNlcXVlbmNlKFtkMixjaGFuZ2VGcm9udCxmYW4yLGFuaW1hdGlvbkZpbmlzaGVkXSk7XG4gICAgICAgICAgICBwb2tlcm5vZGUucnVuQWN0aW9uKHNlcXUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL3NvbGl0YWlyZV9kZWVsXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHBva2Vybm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyDlhYjlj43ovaw5MOWPmOato+mdouaVsOaNru+8jOWGjeWPjei9rC05MOWbnuadpe+8jOe7k+adn++8jOaVtOS4qui/h+eoi+enu+WKqOeJjOmdouWIsOaMh+WumuS9jee9rlxuICAgICAgICAgICAgdmFyIGQxID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICAgICAgLy8gdmFyIG10byA9IGNjLm1vdmVUbygwLjMsIGNjLnYyKDAgKyA2OSwoLXNpemUuaGVpZ2h0IC8gMikgKyA5NSArIDE2MCkpO1xuICAgICAgICAgICAgdmFyIHBvczEgPSBwb2tlcm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczIgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICB2YXIgbXRvID0gY2MubW92ZUJ5KDAuMTUsIGNjLnYyKHBvczIueCAtIHBvczEueCArIDY2LHBvczIueSAtIHBvczEueSkpO1xuICAgICAgICAgICAgdmFyIGZhbjEgPSBjYy5zY2FsZVRvKDAuMTUsIDAuMiwgMSk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlRnJvbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJGcm9udFZpZXdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihbbXRvLGZhbjFdKTtcbiAgICAgICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc3Bhd24pO1xuXG5cbiAgICAgICAgICAgIHZhciBkMiA9IGNjLmRlbGF5VGltZSgwLjE1KTtcbiAgICAgICAgICAgIHZhciBmYW4yID0gY2Muc2NhbGVUbygwLjEsIDEsIDEpO1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbkZpbmlzaGVkID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IHRhcmdldC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MxID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VyUG9zMiA9IF90aGlzLkN1cnJlbnRQb2tlci5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGN1clBvczEpO1xuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRQb3NpdGlvbihjdXJQb3MyKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQYXJlbnQgPSB0YXJnZXQucGFyZW50O1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnQgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZTtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2codGFyZ2V0LkN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IGN1clBvczE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzZXF1ID0gY2Muc2VxdWVuY2UoW2QyLGNoYW5nZUZyb250LGZhbjIsYW5pbWF0aW9uRmluaXNoZWRdKTtcbiAgICAgICAgICAgIHBva2Vybm9kZS5ydW5BY3Rpb24oc2VxdSk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICAgLy8gdmFyIGQzID0gY2MuZGVsYXlUaW1lKDEuMyk7XG4gICAgICAgIC8vIHZhciBkZXN0cm95UG9rZXJOb2RlID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIC8vICAgICB0YXJnZXQucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgLy8gICAgIHRhcmdldC5kZXN0cm95KCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyB2YXIgc2VxdTIgPSBjYy5zZXF1ZW5jZShbZDMsZGVzdHJveVBva2VyTm9kZV0pO1xuICAgICAgICAvLyBwb2tlcm5vZGUucnVuQWN0aW9uKHNlcXUyKTtcbiAgICB9LFxuXG5cbiAgICBwb2tlclJhbmRvbTpmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhciBudW0gPSB0aGlzLnJhbmRvbU51bSgxLDUzKTtcbiAgICAgICAgICAgIGlmIChhcnJheS5pbmRleE9mKG51bSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChudW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKG51bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGFycmF5Lmxlbmd0aCA8IDUyKTtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH0sXG4gICAgLy/nlJ/miJDku45taW5OdW3liLBtYXhOdW3nmoTpmo/mnLrmlbBcbiAgICByYW5kb21OdW06ZnVuY3Rpb24obWluTnVtLCBtYXhOdW0pIHtcbiAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWluTnVtIC0gbWF4TnVtKSArIG1heE51bSk7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfSxcblxuICAgIFN0YXNoQ2xpY2s6ZnVuY3Rpb24gKHN0YUJ1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgdmFyIHBva2VyTm9kZSA9IG1haW5KUy5DdXJyZW50UG9rZXIubm9kZTtcbiAgICAgICAgdmFyIEJhY2tncm91bmRWaWV3ID0gc3RhQnV0LmN1cnJlbnRUYXJnZXQuZ2V0Q2hpbGRCeU5hbWUoJ0JhY2tncm91bmQnKTtcbiAgICAgICAgY2MubG9nKEJhY2tncm91bmRWaWV3KTtcbiAgICAgICAgaWYgKEJhY2tncm91bmRWaWV3LmNoaWxkcmVuQ291bnQgPiAwKSB7XG5cblxuXG4gICAgICAgICAgICBpZiAocG9rZXJOb2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5Lit6Ze06IqC54K56KKr5Y2g5LqGLOmcgOimgeWFiOaJp+ihjOS4remXtOWNoeeJjOWKqOeUu1wiKTtcbiAgICAgICAgICAgICAgICBtYWluSlMuZmFuemh1YW4ocG9rZXJOb2RlLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy8g5omn6KGM5Zue6L2s5Yqo55S7XG4gICAgICAgICAgICB2YXIgcG9rZXIgPSBCYWNrZ3JvdW5kVmlldy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIC8vIOWFiOWIh+aNouaMgui9veeahOiKgueCuVxuICAgICAgICAgICAgLy8gdmFyIGN1clBvczEgPSBwb2tlci5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgY3VyUG9zMyA9IHBva2VyTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyBwb2tlci5zZXRQb3NpdGlvbihjYy52MihjdXJQb3MxLnggLSBjdXJQb3MzLngsY3VyUG9zMS55IC0gY3VyUG9zMy55KSk7XG4gICAgICAgICAgICAvLyBwb2tlci5wYXJlbnQgPSBwb2tlck5vZGU7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdmFyIHBvczEgPSBwb2tlci5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgcG9zMiA9IHBva2VyTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAvLyB2YXIgbXRvID0gY2MubW92ZUJ5KDAuMywgY2MudjIocG9zMi54IC0gcG9zMS54ICsgNjUscG9zMi55IC0gcG9zMS55KSk7XG4gICAgICAgICAgICAvLyB2YXIgdG90YXRpb24gPSBjYy5yb3RhdGVUbygwLjMsMCk7XG4gICAgICAgICAgICAvLyB2YXIgc3Bhd24gPSBjYy5zcGF3bihbbXRvLHRvdGF0aW9uXSk7XG4gICAgICAgICAgICAvLyBwb2tlci5ydW5BY3Rpb24oc3Bhd24pO1xuXG5cbiAgICAgICAgICAgIHZhciBwb3MxID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczMgPSBwb2tlck5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczIgPSBwb2tlck5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zMSk7XG4gICAgICAgICAgICBwb2tlci5zZXRQb3NpdGlvbihwb3MyKTtcbiAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4xNSwgY2MudjIocG9zMy54IC0gcG9zMS54ICsgNjUscG9zMy55IC0gcG9zMS55KSk7XG4gICAgICAgICAgICB2YXIgdG90YXRpb24gPSBjYy5yb3RhdGVUbygwLjE1LDApO1xuICAgICAgICAgICAgdmFyIHNwYXduID0gY2Muc3Bhd24oW210byx0b3RhdGlvbl0pO1xuICAgICAgICAgICAgcG9rZXIucnVuQWN0aW9uKHNwYXduKTtcbiAgICAgICAgICAgIHBva2VyLlByZXZpb3VzUGFyZW50ID0gcG9rZXIucGFyZW50O1xuICAgICAgICAgICAgcG9rZXIucGFyZW50ID0gcG9rZXJOb2RlO1xuICAgICAgICAgICAgcG9rZXIuQ3VycmVudFBvc2l0aW9uID0gcG9rZXIuUHJldmlvdXNQb3NpdGlvbjtcbiAgICAgICAgICAgIHBva2VyLlByZXZpb3VzUG9zaXRpb24gPSBjYy52MigwLDApO1xuICAgICAgICAgICAgcG9rZXIuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIOaJp+ihjOeJjOWxgOWbnumAgFxuXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlbkNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuaIkeacieWtqeWtkOiKgueCuVwiKTtcbiAgICAgICAgICAgICAgICAvLyDmiafooYzml4vovazliqjnlLtcbiAgICAgICAgICAgICAgICB2YXIgcG9rZXIgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlblswXTtcblxuICAgICAgICAgICAgICAgIC8vIOWFiOWIh+aNouaMgui9veeahOiKgueCuVxuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MxID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJQb3MzID0gQmFja2dyb3VuZFZpZXcuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHBva2VyLnNldFBvc2l0aW9uKGNjLnYyKGN1clBvczEueCAtIGN1clBvczMueCxjdXJQb3MxLnkgLSBjdXJQb3MzLnkpKTtcbiAgICAgICAgICAgICAgICBwb2tlci5QcmV2aW91c1BhcmVudCA9IHBva2VyLnBhcmVudDtcbiAgICAgICAgICAgICAgICBwb2tlci5wYXJlbnQgPSBCYWNrZ3JvdW5kVmlldztcblxuICAgICAgICAgICAgICAgIHZhciBwb3MxID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBwb3MyID0gQmFja2dyb3VuZFZpZXcuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4xNSwgY2MudjIocG9zMi54IC0gcG9zMS54LHBvczIueSAtIHBvczEueSkpO1xuICAgICAgICAgICAgICAgIHZhciB0b3RhdGlvbiA9IGNjLnJvdGF0ZVRvKDAuMTUsMTcpO1xuICAgICAgICAgICAgICAgIHZhciBzcGF3biA9IGNjLnNwYXduKFttdG8sdG90YXRpb25dKTtcbiAgICAgICAgICAgICAgICBwb2tlci5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICAgICAgICAgIHBva2VyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBva2VyLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBwb3MzID0gcG9rZXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgICAgIHBva2VyLlByZXZpb3VzUG9zaXRpb24gPSBwb2tlci5DdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgcG9rZXIuQ3VycmVudFBvc2l0aW9uID0gcG9zMztcbiAgICAgICAgICAgICAgICAvLyDmiafooYzniYzlsYDot5/ov5tcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBjYy5sb2cobWFpbkpTLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIHZhciBmcm9udFBva2VyID0gbWFpbkpTLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY2hpbGRyZW5bbWFpbkpTLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY2hpbGRyZW5Db3VudCAtIDFdO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhmcm9udFBva2VyKTtcbiAgICAgICAgICAgICAgICBtYWluSlMuZmFuemh1YW4oZnJvbnRQb2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3Rhc2hBbmltYXRpb246ZnVuY3Rpb24gKHN0YUJ1dCkge1xuICAgICAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGFiYmFyU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiLCJSZWJhY2tBY3Rpb24iLCJtYWluSlMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiQ3VycmVudFBva2VyIiwibm9kZSIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsImZhbnpodWFuIiwiUGF1c2VBY3Rpb24iLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvRW5naW5lIiwicGxheSIsIlRpbWVyUGF1c2UiLCJwYXVzZU11c2ljIiwicGF1c2VBbGxFZmZlY3RzIiwicmVzdW1lTXVzaWMiLCJyZXN1bWVBbGxFZmZlY3RzIiwibG9nIiwiYWxlcnROb2RlIiwiYWN0aXZlIiwibWFzayIsIlNwcml0ZSIsInpJbmRleCIsIkNvbG9yIiwiS2VlcFBsYXlBY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQTtBQUVBQyxFQUFBQSxLQXpCSyxtQkF5QkksQ0FFUixDQTNCSTtBQTZCTEMsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFFBQUlDLE1BQU0sR0FBR04sRUFBRSxDQUFDTyxJQUFILENBQVEsUUFBUixFQUFrQkMsWUFBbEIsQ0FBK0IsaUJBQS9CLENBQWI7O0FBQ0EsUUFBSUYsTUFBTSxDQUFDRyxZQUFQLENBQW9CQyxJQUFwQixDQUF5QkMsYUFBekIsSUFBMEMsQ0FBOUMsRUFBaUQ7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QSxFQUFFLENBQUNvQixXQUFILENBQWVLLFdBQWY7QUFDQXpCLE1BQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZU0sZ0JBQWY7QUFDSDtBQUNKLEdBNUVJLENBK0VMOztBQS9FSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICBSZWJhY2tBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgaWYgKG1haW5KUy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlbkNvdW50ID49IDEpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbWFpbkpTLkN1cnJlbnRQb2tlci5ub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgbWFpbkpTLmZhbnpodWFuKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG4gICAgUGF1c2VBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2J0bl9jbGlja1wiLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uKGVyciwgY2xpcCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBtYWluSlMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0dhbWVTY2VuZVNjcmlwdCcpO1xuICAgICAgICBtYWluSlMuVGltZXJQYXVzZSA9ICFtYWluSlMuVGltZXJQYXVzZTtcbiAgICAgICAgaWYgKG1haW5KUy5UaW1lclBhdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGxFZmZlY3RzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKFwieXl5XCIrbWFpbkpTLlRpbWVyUGF1c2UpO1xuXG4gICAgICAgIHZhciBhbGVydE5vZGUgPSBjYy5maW5kKCdDYW52YXMvQWxlcnRWaWV3Jyk7XG4gICAgICAgIGFsZXJ0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgbWFzayA9IGNjLmZpbmQoJ0NhbnZhcy9BbGVydFZpZXcvYmcnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgYWxlcnROb2RlLnpJbmRleCA9IDk5OTtcbiAgICAgICAgbWFzay5Db2xvciA9IGNjLkNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgS2VlcFBsYXlBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWxlcnROb2RlID0gY2MuZmluZCgnQ2FudmFzL0FsZXJ0VmlldycpO1xuICAgICAgICBhbGVydE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBtYXNrID0gY2MuZmluZCgnQ2FudmFzL0FsZXJ0Vmlldy9iZycpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBhbGVydE5vZGUuekluZGV4ID0gOTk5O1xuICAgICAgICBtYXNrLkNvbG9yID0gY2MuQ29sb3IoMCwgMCwgMCwgMCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgbWFpbkpTLlRpbWVyUGF1c2UgPSAhbWFpbkpTLlRpbWVyUGF1c2U7XG4gICAgICAgIGlmIChtYWluSlMuVGltZXJQYXVzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsRWZmZWN0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
        getscore.string = "+200"; // wrongPoker.Size = cc.Size(20,20);
        // wrongPoker.spriteFrame = ca.spriteFrame;
        // wrongPoker.type = cc.Sprite.Type.SIMPLE;

        wrongPoker.sizeMode = cc.Sprite.SizeMode.SIMPLE; // if (_this.TargetTips != null || _this.TargetTips != undefined) {
        //     wrongPoker.spriteFrame = _this.TargetTips;
        // } else {
        //     cc.loader.loadRes('base_ui/21point_tip',cc.SpriteFrame,function(err,pointFrame){ 　
        //         pointFrame.setRect(cc.Rect(0,0,187,108));
        //         wrongPoker.spriteFrame = pointFrame;
        //         _this.TargetTips = pointFrame;
        //     });
        // }

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
        } else if (third.active === false) {} //结束
        // cc.log(ca);


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
      var frontPoker = mainJS.PokerInstanceBackground.node.children[mainJS.PokerInstanceBackground.node.childrenCount - 1];
      cc.log(frontPoker);
      mainJS.fanzhuan(frontPoker);
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
        }, 100 * (i + 1));
      })(i);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29udGFpbmVyUHJlZmFiU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiU2NvcmVSZWN0IiwidHlwZSIsIlNwcml0ZSIsIlNjb3JlTGFiZWwiLCJMYWJlbCIsIlVwVGlwIiwiQ3VycmVudFNjb3JlIiwiaW50ZWdlciIsIm9uTG9hZCIsInN0cmluZyIsInN0YXJ0Iiwib25DbGljayIsInRhcmdldCIsIl90aGlzIiwibWFpbkpTIiwiZmluZCIsImdldENvbXBvbmVudCIsInBva2VyTm9kZSIsIkN1cnJlbnRQb2tlciIsIm5vZGUiLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvRW5naW5lIiwicGxheSIsImkiLCJsb2ciLCJwYXJlbnQiLCJjb250YWluZXIiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIkFycm93VGlwcyIsInBva2VyIiwiY2hpbGRyZW5Db3VudCIsIlRvb2xzIiwiY2hpbGRyZW4iLCJzdW0iLCJwYXJzZUludCIsIlBva2VyUmVhbE51bWJlciIsImZlaXBhaSIsImN1cnJlbnRUYXJnZXQiLCJQb2tlck51bWJlciIsIlNjYWxlQW5pbWF0aW9uIiwidG9TdHJpbmciLCJhbm1hdGlvbk5vZGUiLCJOb2RlIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRDaGlsZCIsIndyb25nUG9rZXIiLCJhZGRDb21wb25lbnQiLCJzY29yZU5vZGUiLCJnZXRzY29yZSIsIkZvbnQiLCJmb250IiwiZm9udFNpemUiLCJjb2xvciIsInNpemVNb2RlIiwiU2l6ZU1vZGUiLCJTSU1QTEUiLCJzcHJpdGVGcmFtZSIsIlBva2VyVGFyZ2V0VGlwcyIsImdldENvbnRlbnRTaXplIiwiZDEiLCJkZWxheVRpbWUiLCJzdG8xIiwic2NhbGVUbyIsIm1vdjEiLCJtb3ZlQnkiLCJ2MiIsImZhZGVpbiIsImZhZGVJbiIsInNwYXduIiwicnVuQWN0aW9uIiwibW92MiIsImQzIiwiYW5pbWF0aW9uRmluaXNoZWQiLCJjYWxsRnVuYyIsInBvczEiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJzY29yZUxhYmVsIiwic2NvcmVMYWJlbFN0cm5nIiwicG9zMiIsIm10byIsIngiLCJ5IiwiY2hhbmdlU2NvcmUiLCJ1cGRhdGVuTnVtYmVyQW5pbSIsIm15U2VxdSIsInNlcXVlbmNlIiwic2VxdSIsInNjaGVkdWxlT25jZSIsInJlbW92ZUZyb21QYXJlbnQiLCJkZXN0cm95IiwiZmlyc3QiLCJzZWNvbmQiLCJ0aGlyZCIsIlBva2VyRXJyb3JUaXBzIiwiUG9rZXJJbnN0YW5jZUJhY2tncm91bmQiLCJmcm9udFBva2VyIiwiZmFuemh1YW4iLCJub2RlUGFyZW50Iiwibm9kZVNvbiIsInRvdGFsU2NvcmUiLCJjdXJQb3MxIiwiY3VyUG9zMiIsImQyIiwibXZ0byIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwic2V0UG9zaXRpb24iLCJQcmV2aW91c1BhcmVudCIsIlByZXZpb3VzUG9zaXRpb24iLCJDdXJyZW50UG9zaXRpb24iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJpbmRleCIsIlBhcmFib2xhQW5pbWF0aW9uIiwiX25vZGUiLCJEZXRlY3RBcnJvd3MiLCJwcmVTY29yZSIsInVwdGlwIiwicG9zIiwicG9zaXRpb24iLCJtb3YiLCJmYWRlIiwiY3VyTnVtIiwib3JpZ2luTnVtIiwiZGlmZmVyZW5jZSIsImFic0RpZmZlcmVuY2UiLCJNYXRoIiwiYWJzIiwiY2hhbmdlVGltZXMiLCJjaGFuZ2VVbml0IiwiZmxvb3IiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFFUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLElBQUksRUFBQ0wsRUFB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T0dBLENBUEg7QUFRSDtBQUNKLEdBaFZJLENBbVZMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFyV0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBTY29yZVJlY3Q6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFNjb3JlTGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcbiAgICAgICAgfSxcbiAgICAgICAgVXBUaXA6IHtcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIEN1cnJlbnRTY29yZToge1xuICAgICAgICAgICAgdHlwZTpjYy5pbnRlZ2VyLFxuICAgICAgICAgICAgZGVmYXVsdDowXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLlNjb3JlTGFiZWwuc3RyaW5nID0gJzAnO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgb25DbGljazpmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1haW5KUyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnR2FtZVNjZW5lU2NyaXB0Jyk7XG4gICAgICAgIHZhciBwb2tlck5vZGUgPSBtYWluSlMuQ3VycmVudFBva2VyLm5vZGU7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibXVzaWMvbW92ZV90b19lZmZcIiwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbihlcnIsIGNsaXApIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBtb3ZlX3RvX2VmZlxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIlBhXCIrX3RoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICAgICAgY2MubG9nKFwiUGFcIit0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBfdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnUG9rZXJDb250YWluZXInK2kpO1xuICAgICAgICAgICAgY2MubG9nKFwiY29udGFpbmVyXCIrY29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5nZXRDaGlsZEJ5TmFtZShcIlVwVGlwXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgbWFpbkpTLkFycm93VGlwcyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBwb2tlcjtcbiAgICAgICAgaWYgKHBva2VyTm9kZS5jaGlsZHJlbkNvdW50ID4gMCkge1xuICAgICAgICAgICAgdmFyIFRvb2xzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdUb29sc1NjcmlwdCcpO1xuICAgICAgICAgICAgcG9rZXIgPSBwb2tlck5vZGUuY2hpbGRyZW5bcG9rZXJOb2RlLmNoaWxkcmVuQ291bnQgLSAxXTtcbiAgICAgICAgICAgIC8vIF90aGlzLmZlaXBhaSh0YXJnZXQudGFyZ2V0LHBva2VyKTtcbiAgICAgICAgICAgIHZhciBzdW0gPSBwYXJzZUludCh0aGlzLlNjb3JlTGFiZWwuc3RyaW5nKSArIHBva2VyLlBva2VyUmVhbE51bWJlcjtcbiAgICAgICAgICAgIF90aGlzLmZlaXBhaSh0YXJnZXQuY3VycmVudFRhcmdldCxwb2tlcixzdW0pO1xuICAgICAgICAgICAgY2MubG9nKFwiUmVhbE51bWJlcjpcIiArIHBva2VyLlBva2VyUmVhbE51bWJlcitcIiAgICBQb2tlck51bWJlcjpcIitwb2tlci5Qb2tlck51bWJlcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRvb2xzLlNjYWxlQW5pbWF0aW9uKF90aGlzLlNjb3JlTGFiZWwpO1xuICAgICAgICAgICAgLy8gVG9vbHMuUGFyYWJvbGFBbmltYXRpb24oX3RoaXMuU2NvcmVMYWJlbCk7XG4gICAgICAgICAgICAvLyBjYy5sb2coXCLmnIDnu4jliIZcIitzdW0pO1xuICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5zdHJpbmcgPSBzdW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIF90aGlzLkN1cnJlbnRTY29yZSA9IHN1bTtcbiAgICAgICAgICAgIGlmIChzdW0gPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAvLyB2YXIgYmluZ28gXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJtdXNpYy9nZXRfdGFyZ2V0XCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIGFubWF0aW9uTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLndpZHRoID0gNTU7XG4gICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmhlaWdodCA9IDMwO1xuICAgICAgICAgICAgICAgIC8vIG5vZGUuc2V0Q29udGVudFNpemUoY2MuU2l6ZSgyMCwyMCkpO1xuICAgICAgICAgICAgICAgIF90aGlzLlNjb3JlTGFiZWwubm9kZS5hZGRDaGlsZChhbm1hdGlvbk5vZGUpO1xuICAgICAgICAgICAgICAgIHZhciB3cm9uZ1Bva2VyID0gYW5tYXRpb25Ob2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgIHZhciBzY29yZU5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLlNjb3JlTGFiZWwubm9kZS5hZGRDaGlsZChzY29yZU5vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBnZXRzY29yZSA9IHNjb3JlTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwiZm9udC9zY29yZV9mb250XCIsIGNjLkZvbnQsIGZ1bmN0aW9uKGVyciwgZm9udCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRzY29yZS5mb250ID0gZm9udDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBnZXRzY29yZS5mb250U2l6ZSA9IDM1O1xuICAgICAgICAgICAgICAgIGdldHNjb3JlLmNvbG9yID0gbmV3IGNjLmNvbG9yKDI1NSwwLDAsMjU1KTtcbiAgICAgICAgICAgICAgICBnZXRzY29yZS5zdHJpbmcgPSBcIisyMDBcIjtcbiAgICAgICAgICAgICAgICAvLyB3cm9uZ1Bva2VyLlNpemUgPSBjYy5TaXplKDIwLDIwKTtcbiAgICAgICAgICAgICAgICAvLyB3cm9uZ1Bva2VyLnNwcml0ZUZyYW1lID0gY2Euc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgLy8gd3JvbmdQb2tlci50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0lNUExFO1xuICAgICAgICAgICAgICAgIHdyb25nUG9rZXIuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuU0lNUExFO1xuICAgICAgICAgICAgICAgIC8vIGlmIChfdGhpcy5UYXJnZXRUaXBzICE9IG51bGwgfHwgX3RoaXMuVGFyZ2V0VGlwcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgd3JvbmdQb2tlci5zcHJpdGVGcmFtZSA9IF90aGlzLlRhcmdldFRpcHM7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2Jhc2VfdWkvMjFwb2ludF90aXAnLGNjLlNwcml0ZUZyYW1lLGZ1bmN0aW9uKGVycixwb2ludEZyYW1lKXsg44CAXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBwb2ludEZyYW1lLnNldFJlY3QoY2MuUmVjdCgwLDAsMTg3LDEwOCkpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgd3JvbmdQb2tlci5zcHJpdGVGcmFtZSA9IHBvaW50RnJhbWU7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBfdGhpcy5UYXJnZXRUaXBzID0gcG9pbnRGcmFtZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHdyb25nUG9rZXIuc3ByaXRlRnJhbWUgPSBtYWluSlMuUG9rZXJUYXJnZXRUaXBzO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIm5vZGVTaXplXCIgKyBhbm1hdGlvbk5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCArIGFubWF0aW9uTm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZDEgPSBjYy5kZWxheVRpbWUoMC4wMSk7XG4gICAgICAgICAgICAgICAgdmFyIHN0bzEgPSBjYy5zY2FsZVRvKDAuNCwgMik7XG4gICAgICAgICAgICAgICAgdmFyIG1vdjEgPSBjYy5tb3ZlQnkoMC40LGNjLnYyKDAsMTAwKSk7XG4gICAgICAgICAgICAgICAgdmFyIGZhZGVpbiA9IGNjLmZhZGVJbigwLjQpO1xuICAgICAgICAgICAgICAgIHZhciBzcGF3biA9IGNjLnNwYXduKFtkMSwgc3RvMSxtb3YxLGZhZGVpbl0pO1xuICAgICAgICAgICAgICAgIGFubWF0aW9uTm9kZS5ydW5BY3Rpb24oc3Bhd24pO1xuICAgICAgICAgICAgICAgIHZhciBtb3YyID0gY2MubW92ZUJ5KDAuNCxjYy52MigwLDQwKSk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIHNwYXduMiA9IGNjLnNwYXduKFtkMSwgc3RvMSxtb3YyXSk7XG4gICAgICAgICAgICAgICAgc2NvcmVOb2RlLnJ1bkFjdGlvbihtb3YyKTtcblxuICAgICAgICAgICAgICAgIHZhciBkMyA9IGNjLmRlbGF5VGltZSgwLjQpO1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25GaW5pc2hlZCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImZvbnQvYW5kX3Njb3JlX2ZvbnRcIiwgY2MuRm9udCwgZnVuY3Rpb24oZXJyLCBmb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRzY29yZS5mb250U2l6ZSA9IDI1O1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0c2NvcmUuZm9udCA9IGZvbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MxID0gc2NvcmVOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3JlTGFiZWwgPSBjYy5maW5kKCdDYW52YXMvU2NvcmVMYWJlbC9CYWNrZ3JvdW5kL0xhYmVsJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29yZUxhYmVsU3RybmcgPSBzY29yZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MyID0gc2NvcmVMYWJlbC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtdG8gPSBjYy5tb3ZlQnkoMC4zLCBjYy52Mihwb3MyLnggLSBwb3MxLngscG9zMi55IC0gcG9zMS55KSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VTY29yZSA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlbk51bWJlckFuaW0ocGFyc2VJbnQoc2NvcmVMYWJlbFN0cm5nLnN0cmluZykgKyAyMDAsIHBhcnNlSW50KHNjb3JlTGFiZWxTdHJuZy5zdHJpbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBteVNlcXUgPSBjYy5zZXF1ZW5jZShbbXRvLGNoYW5nZVNjb3JlXSk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlTm9kZS5ydW5BY3Rpb24obXlTZXF1KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgc2VxdSA9IGNjLnNlcXVlbmNlKGQzLGFuaW1hdGlvbkZpbmlzaGVkKTtcbiAgICAgICAgICAgICAgICBzY29yZU5vZGUucnVuQWN0aW9uKHNlcXUpO1xuXG5cbiAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSwwLjUpO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VtID4gMjEpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2J1c3RfZWZmXCIsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24oZXJyLCBjbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuU2NvcmVMYWJlbC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSBjYy5maW5kKFwiQ2FudmFzL1JvdW5kTGFiZWwvQmFja2dyb3VuZC9GaXJzdFJvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHZhciBzZWNvbmQgPSBjYy5maW5kKFwiQ2FudmFzL1JvdW5kTGFiZWwvQmFja2dyb3VuZC9TZWNvbmRSb3VuZFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcmQgPSBjYy5maW5kKFwiQ2FudmFzL1JvdW5kTGFiZWwvQmFja2dyb3VuZC9UaGlyZFJvdW5kXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNhLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0LmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZC5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcmQuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAvL+e7k+adn1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coY2EpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBhbm1hdGlvbk5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgICAgIGFubWF0aW9uTm9kZS53aWR0aCA9IDQwO1xuICAgICAgICAgICAgICAgIGFubWF0aW9uTm9kZS5oZWlnaHQgPSA0MDtcbiAgICAgICAgICAgICAgICAvLyBub2RlLnNldENvbnRlbnRTaXplKGNjLlNpemUoMjAsMjApKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5TY29yZUxhYmVsLm5vZGUuYWRkQ2hpbGQoYW5tYXRpb25Ob2RlKTtcbiAgICAgICAgICAgICAgICB2YXIgd3JvbmdQb2tlciA9IGFubWF0aW9uTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyB3cm9uZ1Bva2VyLlNpemUgPSBjYy5TaXplKDIwLDIwKTtcbiAgICAgICAgICAgICAgICAvLyB3cm9uZ1Bva2VyLnNwcml0ZUZyYW1lID0gY2Euc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgLy8gd3JvbmdQb2tlci50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0lNUExFO0NVU1RPTVxuICAgICAgICAgICAgICAgIHdyb25nUG9rZXIuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuU0lNUExFO1xuICAgICAgICAgICAgICAgIC8vIGlmIChfdGhpcy5FcnJvclRpcHMgIT0gbnVsbCB8fCBfdGhpcy5FcnJvclRpcHMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHdyb25nUG9rZXIuc3ByaXRlRnJhbWUgPSBfdGhpcy5FcnJvclRpcHM7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2Jhc2VfdWkvZXJyb3JfdGlwJyxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByRnJhbWUpeyDjgIBcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNjLmxvZyhcIiBhc3NldHMvdGV4dHVyZS9lcnJvcl90aXAgXCIrZXJyKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNwckZyYW1lLnNldFJlY3QoY2MuUmVjdCgwLDAsOTUsODgpKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHdyb25nUG9rZXIuc3ByaXRlRnJhbWUgPSBzcHJGcmFtZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIF90aGlzLkVycm9yVGlwcyA9IHNwckZyYW1lO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2MubG9nKHdyb25nUG9rZXIpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgd3JvbmdQb2tlci5zcHJpdGVGcmFtZSA9IG1haW5KUy5Qb2tlckVycm9yVGlwcztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJub2RlU2l6ZVwiICsgYW5tYXRpb25Ob2RlLmdldENvbnRlbnRTaXplKCkud2lkdGggKyBhbm1hdGlvbk5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGQxID0gY2MuZGVsYXlUaW1lKDAuMDEpO1xuICAgICAgICAgICAgICAgIHZhciBzdG8xID0gY2Muc2NhbGVUbygwLjQsIDIpO1xuICAgICAgICAgICAgICAgIHZhciBtb3YxID0gY2MubW92ZUJ5KDAuNCxjYy52MigwLDEwMCkpO1xuICAgICAgICAgICAgICAgIHZhciBmYWRlaW4gPSBjYy5mYWRlSW4oMC40KTtcbiAgICAgICAgICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihbZDEsIHN0bzEsbW92MSxmYWRlaW5dKTtcbiAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUucnVuQWN0aW9uKHNwYXduKTtcblxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25GaW5pc2hlZCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBhbm1hdGlvbk5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYW5tYXRpb25Ob2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSwwLjUpO1xuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5omn6KGM54mM5bGA6Lef6L+bXG4gICAgICAgICAgICBjYy5sb2cobWFpbkpTLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgdmFyIGZyb250UG9rZXIgPSBtYWluSlMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jaGlsZHJlblttYWluSlMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jaGlsZHJlbkNvdW50IC0gMV07XG4gICAgICAgICAgICBjYy5sb2coZnJvbnRQb2tlcik7XG4gICAgICAgICAgICBtYWluSlMuZmFuemh1YW4oZnJvbnRQb2tlcik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGlmIChtYWluSlMuQ3VycmVudFBva2VyLm5vZGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB9XG4gICAgICAgIFxuICAgICAgICAvLyB2YXIgY3VyUG9zMSA9IHRhcmdldC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgIC8vICAgICB2YXIgY3VyUG9zMiA9IF90aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY3VyUG9zMSk7XG4gICAgICAgIC8vICAgICBjYy5sb2codGFyZ2V0KTtcbiAgICAgICAgLy8gICAgIHRhcmdldC5zZXRQb3NpdGlvbihjdXJQb3MyKTtcbiAgICAgICAgLy8gICAgIHRhcmdldC5wYXJlbnQgPSBfdGhpcy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlO1xuICAgICAgICAvLyAgICAgdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IGN1clBvczE7XG4gICAgICAgIFxuICAgIH0sXG4gICAgLy8g5Yqo55S75LuO5a2Q6IqC54K56aOe5Yiw54i26IqC54K56Lqr5LiKXG4gICAgZmVpcGFpOiBmdW5jdGlvbiAobm9kZVBhcmVudCxub2RlU29uLHRvdGFsU2NvcmUpIHtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJtdXNpYy9tb3ZlX3RvX2VmZlwiLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uKGVyciwgY2xpcCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNjLmxvZyhub2RlUGFyZW50LG5vZGVTb24pO1xuICAgICAgICB2YXIgY3VyUG9zMSA9IG5vZGVTb24uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICB2YXIgY3VyUG9zMiA9IG5vZGVQYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZDIgPSBjYy5kZWxheVRpbWUoMC4wMSk7XG4gICAgICAgIHZhciBtdnRvID0gY2MubW92ZUJ5KDAuMSwgY2MudjIoY3VyUG9zMi54IC0gY3VyUG9zMS54LGN1clBvczIueSAtIGN1clBvczEueSArIDE3NSAtICg0NSAqIG5vZGVQYXJlbnQuY2hpbGRyZW5Db3VudCkpKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbmlzaGVkID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyB0YXJnZXQuQ3VycmVudFBvc2l0aW9uID0gdGFyZ2V0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHZhciBjdXJQb3MxID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgICAgIC8vIHZhciBjdXJQb3MyID0gX3RoaXMuQ3VycmVudFBva2VyLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY3VyUG9zMSk7XG4gICAgICAgICAgICAvLyBjYy5sb2codGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIHRhcmdldC5zZXRQb3NpdGlvbihjdXJQb3MyKTtcbiAgICAgICAgICAgIC8vIHRhcmdldC5wYXJlbnQgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZTtcbiAgICAgICAgICAgIC8vIC8vIGNjLmxvZyh0YXJnZXQuQ3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vIHRhcmdldC5QcmV2aW91c1Bvc2l0aW9uID0gdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgIC8vIHRhcmdldC5DdXJyZW50UG9zaXRpb24gPSBjdXJQb3MxO1xuICAgICAgICAgICAgdmFyIHBvczEgPSB0YXJnZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgdmFyIHBvczIgPSBub2RlUGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvczEpO1xuICAgICAgICAgICAgdGFyZ2V0LnNldFBvc2l0aW9uKHBvczIpO1xuICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUGFyZW50ID0gdGFyZ2V0LnBhcmVudDtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnQgPSBub2RlUGFyZW50O1xuICAgICAgICAgICAgdGFyZ2V0LlByZXZpb3VzUG9zaXRpb24gPSB0YXJnZXQuQ3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IHBvczE7XG4gICAgICAgICAgICBjYy5sb2cobm9kZVBhcmVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB0YXJnZXQuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0b3RhbFNjb3JlID49IDIxKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBva2VyQ29udGFpbmVyUmVjdFwiKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCI+MjHngrnlpITnkIZcIixub2RlUGFyZW50LmNoaWxkcmVuQ291bnQpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gbm9kZVBhcmVudC5jaGlsZHJlbkNvdW50IC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVQYXJlbnQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLmiafooYxcIitub2RlICsgXCLlu7bml7ZcIiArIDAuNSAqIChub2RlUGFyZW50LmNoaWxkcmVuQ291bnQgLSAxIC0gaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIFRvb2xzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdUb29sc1NjcmlwdCcpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUb29scy5QYXJhYm9sYUFuaW1hdGlvbihub2RlLDApOyBcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMuUGFyYWJvbGFBbmltYXRpb24obm9kZSk7IFxuICAgICAgICAgICAgICAgICAgICB2YXIgX25vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLlBhcmFib2xhQW5pbWF0aW9uKF9ub2RlKTsgXG4gICAgICAgICAgICAgICAgICAgIH0sMC41ICogKG5vZGVQYXJlbnQuY2hpbGRyZW5Db3VudCAtIDEgLSBpbmRleCkpO1xuICAgICAgICAgICAgICAgIC8vICAgICBfdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBkMyA9IGNjLmRlbGF5VGltZSgwLjUgKiAobm9kZVBhcmVudC5jaGlsZHJlbkNvdW50IC0gMSAtIGluZGV4KSk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBhbmltYXRpb24xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHZhciBUb29scyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnVG9vbHNTY3JpcHQnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBUb29scy5QYXJhYm9sYUFuaW1hdGlvbih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBzZXF1ID0gY2Muc2VxdWVuY2UoW2QzLGFuaW1hdGlvbjFdKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICBub2RlLnJ1bkFjdGlvbihzZXF1KTtcbiAgICAgICAgICAgICAgICAvLyAgICB9LDApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gbm9kZVBhcmVudC5jaGlsZHJlbkNvdW50IC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmFyIG5vZGUgPSBub2RlUGFyZW50LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBva2VyQ29udGFpbmVyUmVjdFwiKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJmZWlwYWkgbG9nXCIrX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCIgICBQb2tlckNvbnRhaW5lclJlY3RcIitfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiUG9rZXJDb250YWluZXJSZWN0XCIpKTtcbiAgICAgICAgICAgICAgICB9LDEuNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2VxdSA9IGNjLnNlcXVlbmNlKFtkMixtdnRvLGFuaW1hdGlvbkZpbmlzaGVkXSk7XG4gICAgICAgIG5vZGVTb24ucnVuQWN0aW9uKHNlcXUpO1xuICAgIH0sXG5cbiAgICBEZXRlY3RBcnJvd3M6ZnVuY3Rpb24gKHByZVNjb3JlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNjLmxvZyhfdGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKHBhcnNlSW50KF90aGlzLlNjb3JlTGFiZWwuc3RyaW5nKSArIHByZVNjb3JlIDw9IDIxKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB1cHRpcCA9IF90aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJVcFRpcFwiKTtcbiAgICAgICAgICAgIHZhciBwb3MgPSB1cHRpcC5wb3NpdGlvbjtcbiAgICAgICAgICAgIHVwdGlwLnNldFBvc2l0aW9uKDAscG9zLnkgLSA1MCk7XG4gICAgICAgICAgICBfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVXBUaXBcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNjLmxvZyhcIuiOt+WPllVwVGlw55qE5L2N572uXCIrdXB0aXAucG9zaXRpb24pO1xuICAgICAgICAgICAgdmFyIG1vdiA9IGNjLm1vdmVCeSgwLjIsY2MudjIoMCwgNTApKTtcbiAgICAgICAgICAgIHZhciBmYWRlID0gY2MuZmFkZUluKDAuMik7XG4gICAgICAgICAgICB2YXIgc3Bhd24gPSBjYy5zcGF3bihbbW92LGZhZGVdKTtcbiAgICAgICAgICAgIHVwdGlwLnJ1bkFjdGlvbihzcGF3bik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVXBUaXBcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKFwiWVlZWVwiKTtcbiAgICB9LFxuICAgIHVwZGF0ZW5OdW1iZXJBbmltOmZ1bmN0aW9uKGN1ck51bSxvcmlnaW5OdW0pIHtcbiAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBjdXJOdW0gLSBvcmlnaW5OdW07XG4gICAgICAgIHZhciBhYnNEaWZmZXJlbmNlID0gTWF0aC5hYnMoZGlmZmVyZW5jZSk7XG4gICAgICAgIHZhciBjaGFuZ2VUaW1lcyA9IGFic0RpZmZlcmVuY2UgPCA4ID8gYWJzRGlmZmVyZW5jZSA6IDg7XG4gICAgICAgIHZhciBjaGFuZ2VVbml0ID0gYWJzRGlmZmVyZW5jZSA8IDggPyAxIDogTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gOClcbiAgICAgICAgdmFyIHNjb3JlTGFiZWwgPSBjYy5maW5kKCdDYW52YXMvU2NvcmVMYWJlbC9CYWNrZ3JvdW5kL0xhYmVsJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlVGltZXM7IGkrKykge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAob3JpZ2luTnVtICs9IGNoYW5nZVVuaXQpXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IGNoYW5nZVRpbWVzIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGN1ck51bTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEwMCooaSsxKSk7XG4gICAgICAgICAgICB9KShpKVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGVuTnVtYmVyQW5pbTogZnVuY3Rpb24gKGN1ck51bSxvcmlnaW5OdW0pIHtcbiAgICAvLyAgICAgdmFyIGRpZmZlcmVuY2UgPSBjdXJOdW0gLSBvcmlnaW5OdW07XG4gICAgLy8gICAgIHZhciBhYnNEaWZmZXJlbmNlID0gTWF0aC5hYnMoZGlmZmVyZW5jZSk7XG4gICAgLy8gICAgIHZhciBjaGFuZ2VUaW1lcyA9IGFic0RpZmZlcmVuY2UgPCA4ID8gYWJzRGlmZmVyZW5jZSA6IDg7XG4gICAgLy8gICAgIHZhciBjaGFuZ2VVbml0ID0gYWJzRGlmZmVyZW5jZSA8IDggPyAxIDogTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gOClcbiAgICAvLyAgICAgdmFyIHNjb3JlTGFiZWwgPSBjYy5maW5kKCdDYW52YXMvU2NvcmVMYWJlbC9CYWNrZ3JvdW5kL0xhYmVsJyk7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlVGltZXM7IGkrKykge1xuICAgIC8vICAgICAgICAgKGZ1bmN0aW9uIChpKSB7XG4gICAgLy8gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNjb3JlTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAob3JpZ2luTnVtICs9IGNoYW5nZVVuaXQpXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChpID09IGNoYW5nZVRpbWVzIC0gMSkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgc2NvcmVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpID0gY3VyTnVtO1xuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfSwgMTAwKihpKzEpKTtcbiAgICAvLyAgICAgICAgIH0pKGkpXG4gICAgLy8gICAgIH1cbiAgICAvLyB9LCBcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
