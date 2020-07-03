
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