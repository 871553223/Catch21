
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