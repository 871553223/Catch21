
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
    } // foo: {
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
  onLoad: function onLoad() {
    this.ScoreLabel.string = '0';
  },
  start: function start() {},
  onClick: function onClick(target) {
    var _this = this;

    var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
    var pokerNode = mainJS.CurrentPoker.node;
    var poker;

    if (pokerNode.childrenCount > 0) {
      poker = pokerNode.children[pokerNode.childrenCount - 1]; // _this.feipai(target.target,poker);

      _this.feipai(target.currentTarget, poker);

      cc.log("RealNumber:" + poker.PokerRealNumber);
      var sum = parseInt(this.ScoreLabel.string) + poker.PokerRealNumber;

      if (sum === 21) {} else if (sum > 21) {}

      var Tools = cc.find('Canvas').getComponent('ToolsScript');
      Tools.ScaleAnimation(_this.ScoreLabel); // cc.log("最终分"+sum);

      _this.ScoreLabel.string = sum.toString(); // 执行牌局跟进

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
  feipai: function feipai(nodeParent, nodeSon) {
    cc.log(nodeParent, nodeSon);
    var curPos1 = nodeSon.convertToWorldSpaceAR(cc.v2(0, 0));
    var curPos2 = nodeParent.convertToWorldSpaceAR(cc.v2(0, 0));

    var _this = this;

    var d2 = cc.delayTime(0.01);
    var mvto = cc.moveBy(0.2, cc.v2(curPos2.x - curPos1.x, curPos2.y - curPos1.y + 175 - 45 * nodeParent.childrenCount));
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
    });
    var sequ = cc.sequence([d2, mvto, animationFinished]);
    nodeSon.runAction(sequ);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29udGFpbmVyUHJlZmFiU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiU2NvcmVSZWN0IiwidHlwZSIsIlNwcml0ZSIsIlNjb3JlTGFiZWwiLCJMYWJlbCIsIlVwVGlwIiwib25Mb2FkIiwic3RyaW5nIiwic3RhcnQiLCJvbkNsaWNrIiwidGFyZ2V0IiwiX3RoaXMiLCJtYWluSlMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwicG9rZXJOb2RlIiwiQ3VycmVudFBva2VyIiwibm9kZSIsInBva2VyIiwiY2hpbGRyZW5Db3VudCIsImNoaWxkcmVuIiwiZmVpcGFpIiwiY3VycmVudFRhcmdldCIsImxvZyIsIlBva2VyUmVhbE51bWJlciIsInN1bSIsInBhcnNlSW50IiwiVG9vbHMiLCJTY2FsZUFuaW1hdGlvbiIsInRvU3RyaW5nIiwiUG9rZXJJbnN0YW5jZUJhY2tncm91bmQiLCJmcm9udFBva2VyIiwiZmFuemh1YW4iLCJub2RlUGFyZW50Iiwibm9kZVNvbiIsImN1clBvczEiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJ2MiIsImN1clBvczIiLCJkMiIsImRlbGF5VGltZSIsIm12dG8iLCJtb3ZlQnkiLCJ4IiwieSIsImFuaW1hdGlvbkZpbmlzaGVkIiwiY2FsbEZ1bmMiLCJwb3MxIiwicG9zMiIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwic2V0UG9zaXRpb24iLCJQcmV2aW91c1BhcmVudCIsInBhcmVudCIsIlByZXZpb3VzUG9zaXRpb24iLCJDdXJyZW50UG9zaXRpb24iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJzZXF1Iiwic2VxdWVuY2UiLCJydW5BY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQ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QUFBQSxNQUFNLENBQUMwQyxNQUFQLEdBQWdCbkIsVUFBaEI7QUFDQXZCLE1BQUFBLE1BQU0sQ0FBQzJDLGdCQUFQLEdBQTBCM0MsTUFBTSxDQUFDNEMsZUFBakM7QUFDQTVDLE1BQUFBLE1BQU0sQ0FBQzRDLGVBQVAsR0FBeUJQLElBQXpCO0FBQ0FuRCxNQUFBQSxFQUFFLENBQUMyQixHQUFILENBQU9VLFVBQVUsQ0FBQ2IsUUFBbEI7QUFDQVYsTUFBQUEsTUFBTSxDQUFDSSxZQUFQLENBQW9CbEIsRUFBRSxDQUFDMkQsTUFBdkIsRUFBK0JDLFlBQS9CLEdBQThDLEtBQTlDLENBbkJpRCxDQW9CakQ7QUFFSCxLQXRCdUIsQ0FBeEI7QUF1QkEsUUFBSUMsSUFBSSxHQUFHN0QsRUFBRSxDQUFDOEQsUUFBSCxDQUFZLENBQUNuQixFQUFELEVBQUlFLElBQUosRUFBU0ksaUJBQVQsQ0FBWixDQUFYO0FBQ0FYLElBQUFBLE9BQU8sQ0FBQ3lCLFNBQVIsQ0FBa0JGLElBQWxCO0FBQ0gsR0FySEksQ0F1SEw7O0FBdkhLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgU2NvcmVSZWN0OiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9LFxuICAgICAgICBTY29yZUxhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFVwVGlwOiB7XG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxuICAgICAgICB9XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5TY29yZUxhYmVsLnN0cmluZyA9ICcwJztcbiAgICB9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIG9uQ2xpY2s6ZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtYWluSlMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0dhbWVTY2VuZVNjcmlwdCcpO1xuICAgICAgICB2YXIgcG9rZXJOb2RlID0gbWFpbkpTLkN1cnJlbnRQb2tlci5ub2RlO1xuXG4gICAgICAgIHZhciBwb2tlcjtcbiAgICAgICAgaWYgKHBva2VyTm9kZS5jaGlsZHJlbkNvdW50ID4gMCkge1xuICAgICAgICAgICAgcG9rZXIgPSBwb2tlck5vZGUuY2hpbGRyZW5bcG9rZXJOb2RlLmNoaWxkcmVuQ291bnQgLSAxXTtcbiAgICAgICAgICAgIC8vIF90aGlzLmZlaXBhaSh0YXJnZXQudGFyZ2V0LHBva2VyKTtcbiAgICAgICAgICAgIF90aGlzLmZlaXBhaSh0YXJnZXQuY3VycmVudFRhcmdldCxwb2tlcik7XG4gICAgICAgICAgICBjYy5sb2coXCJSZWFsTnVtYmVyOlwiICsgcG9rZXIuUG9rZXJSZWFsTnVtYmVyKTtcbiAgICAgICAgICAgIHZhciBzdW0gPSBwYXJzZUludCh0aGlzLlNjb3JlTGFiZWwuc3RyaW5nKSArIHBva2VyLlBva2VyUmVhbE51bWJlcjtcbiAgICAgICAgICAgIGlmIChzdW0gPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN1bSA+IDIxKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBUb29scyA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnVG9vbHNTY3JpcHQnKTtcbiAgICAgICAgICAgIFRvb2xzLlNjYWxlQW5pbWF0aW9uKF90aGlzLlNjb3JlTGFiZWwpO1xuICAgICAgICAgICAgLy8gY2MubG9nKFwi5pyA57uI5YiGXCIrc3VtKTtcbiAgICAgICAgICAgIF90aGlzLlNjb3JlTGFiZWwuc3RyaW5nID0gc3VtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyDmiafooYzniYzlsYDot5/ov5tcbiAgICAgICAgICAgIGNjLmxvZyhtYWluSlMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jaGlsZHJlbik7XG4gICAgICAgICAgICB2YXIgZnJvbnRQb2tlciA9IG1haW5KUy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNoaWxkcmVuW21haW5KUy5Qb2tlckluc3RhbmNlQmFja2dyb3VuZC5ub2RlLmNoaWxkcmVuQ291bnQgLSAxXTtcbiAgICAgICAgICAgIGNjLmxvZyhmcm9udFBva2VyKTtcbiAgICAgICAgICAgIG1haW5KUy5mYW56aHVhbihmcm9udFBva2VyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gaWYgKG1haW5KUy5DdXJyZW50UG9rZXIubm9kZSkge1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHZhciBjdXJQb3MxID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLDApKTtcbiAgICAgICAgLy8gICAgIHZhciBjdXJQb3MyID0gX3RoaXMuUG9rZXJJbnN0YW5jZUJhY2tncm91bmQubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjdXJQb3MxKTtcbiAgICAgICAgLy8gICAgIGNjLmxvZyh0YXJnZXQpO1xuICAgICAgICAvLyAgICAgdGFyZ2V0LnNldFBvc2l0aW9uKGN1clBvczIpO1xuICAgICAgICAvLyAgICAgdGFyZ2V0LnBhcmVudCA9IF90aGlzLlBva2VySW5zdGFuY2VCYWNrZ3JvdW5kLm5vZGU7XG4gICAgICAgIC8vICAgICB0YXJnZXQuQ3VycmVudFBvc2l0aW9uID0gY3VyUG9zMTtcbiAgICAgICAgXG4gICAgfSxcbiAgICAvLyDliqjnlLvku47lrZDoioLngrnpo57liLDniLboioLngrnouqvkuIpcbiAgICBmZWlwYWk6IGZ1bmN0aW9uIChub2RlUGFyZW50LG5vZGVTb24pIHtcbiAgICAgICAgY2MubG9nKG5vZGVQYXJlbnQsbm9kZVNvbik7XG4gICAgICAgIHZhciBjdXJQb3MxID0gbm9kZVNvbi5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgIHZhciBjdXJQb3MyID0gbm9kZVBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBkMiA9IGNjLmRlbGF5VGltZSgwLjAxKTtcbiAgICAgICAgdmFyIG12dG8gPSBjYy5tb3ZlQnkoMC4yLCBjYy52MihjdXJQb3MyLnggLSBjdXJQb3MxLngsY3VyUG9zMi55IC0gY3VyUG9zMS55ICsgMTc1IC0gKDQ1ICogbm9kZVBhcmVudC5jaGlsZHJlbkNvdW50KSkpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmluaXNoZWQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgIC8vIHRhcmdldC5DdXJyZW50UG9zaXRpb24gPSB0YXJnZXQuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gdmFyIGN1clBvczEgPSB0YXJnZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsMCkpO1xuICAgICAgICAgICAgLy8gdmFyIGN1clBvczIgPSBfdGhpcy5DdXJyZW50UG9rZXIubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjdXJQb3MxKTtcbiAgICAgICAgICAgIC8vIGNjLmxvZyh0YXJnZXQpO1xuICAgICAgICAgICAgLy8gdGFyZ2V0LnNldFBvc2l0aW9uKGN1clBvczIpO1xuICAgICAgICAgICAgLy8gdGFyZ2V0LnBhcmVudCA9IF90aGlzLkN1cnJlbnRQb2tlci5ub2RlO1xuICAgICAgICAgICAgLy8gLy8gY2MubG9nKHRhcmdldC5DdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgLy8gdGFyZ2V0LlByZXZpb3VzUG9zaXRpb24gPSB0YXJnZXQuQ3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgLy8gdGFyZ2V0LkN1cnJlbnRQb3NpdGlvbiA9IGN1clBvczE7XG4gICAgICAgICAgICB2YXIgcG9zMSA9IHRhcmdldC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwwKSk7XG4gICAgICAgICAgICB2YXIgcG9zMiA9IG5vZGVQYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocG9zMSk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0UG9zaXRpb24ocG9zMik7XG4gICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQYXJlbnQgPSB0YXJnZXQucGFyZW50O1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudCA9IG5vZGVQYXJlbnQ7XG4gICAgICAgICAgICB0YXJnZXQuUHJldmlvdXNQb3NpdGlvbiA9IHRhcmdldC5DdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICB0YXJnZXQuQ3VycmVudFBvc2l0aW9uID0gcG9zMTtcbiAgICAgICAgICAgIGNjLmxvZyhub2RlUGFyZW50LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHRhcmdldC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNlcXUgPSBjYy5zZXF1ZW5jZShbZDIsbXZ0byxhbmltYXRpb25GaW5pc2hlZF0pO1xuICAgICAgICBub2RlU29uLnJ1bkFjdGlvbihzZXF1KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19