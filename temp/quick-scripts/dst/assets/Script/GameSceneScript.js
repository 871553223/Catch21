
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