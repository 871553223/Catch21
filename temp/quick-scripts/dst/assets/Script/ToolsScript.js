
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVG9vbHNTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsIkZvcm1hdE1NU1MiLCJzZWNvbmRzIiwiY3VycmVudFNlY29uZHMiLCJwYXJzZUludCIsInRpbWVTdHIiLCJtaW51dGUiLCJzZWNvbmQiLCJob3VyIiwiU2NhbGVBbmltYXRpb24iLCJub2RlIiwiZDEiLCJkZWxheVRpbWUiLCJzdG8xIiwic2NhbGVUbyIsInN0bzIiLCJzZXF1ZSIsInNlcXVlbmNlIiwicnVuQWN0aW9uIiwiUGFyYWJvbGFBbmltYXRpb24iLCJ0aW1lMSIsIlJhbmRvbU51bSIsIm1vdmVYMSIsIm1vdmVZMSIsImxvZyIsIm1vdjEiLCJtb3ZlQnkiLCJ2MiIsInJvdGExIiwicm90YXRlQnkiLCJzcGF3bjEiLCJzcGF3biIsIl90aGlzIiwiZW5kX2Z1bmMiLCJjYWxsRnVuYyIsInRhcmdldCIsInRpbWUyIiwibW92ZVgyIiwibW92ZVkyIiwibW92MiIsInJvdGEyIiwic3Bhd24yIiwiX3RhcmdldCIsInNjaGVkdWxlT25jZSIsInBhcmVudCIsInNjb3JlTGFiZWwiLCJnZXRDaGlsZEJ5TmFtZSIsInN0cmluZyIsInJlbW92ZUZyb21QYXJlbnQiLCJiaW5kIiwibWluTnVtIiwibWF4TnVtIiwibnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkk7QUFlTEMsRUFBQUEsVUFBVSxFQUFDLG9CQUFVQyxPQUFWLEVBQW1CO0FBRTFCLFFBQUlDLGNBQWMsR0FBR0MsUUFBUSxDQUFDRixPQUFELENBQTdCO0FBQ0EsUUFBSUcsT0FBTyxHQUFHLElBQWQ7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBYjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxDQUFiO0FBQ0EsUUFBSUosY0FBYyxJQUFJLENBQXRCLEVBQ0ksT0FBTyxPQUFQLENBREosS0FFSztBQUNERyxNQUFBQSxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0QsY0FBYyxHQUFHLEVBQWxCLENBQWpCOztBQUNBLFVBQUlHLE1BQU0sR0FBRyxFQUFiLEVBQWlCO0FBQ2JDLFFBQUFBLE1BQU0sR0FBR0osY0FBYyxHQUFHLEVBQTFCO0FBQ0FFLFFBQUFBLE9BQU8sR0FBR0MsTUFBTSxHQUFHLEdBQVQsSUFBZ0JDLE1BQU0sR0FBRyxFQUFULEdBQWMsTUFBSUEsTUFBbEIsR0FBMkJBLE1BQTNDLENBQVY7QUFDSCxPQUhELE1BR087QUFDSEMsUUFBQUEsSUFBSSxHQUFHRixNQUFNLEdBQUcsRUFBaEI7QUFDQUEsUUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUcsRUFBbEI7QUFDQUMsUUFBQUEsTUFBTSxHQUFHSixjQUFjLEdBQUdLLElBQUksR0FBRyxJQUF4QixHQUErQkYsTUFBTSxHQUFHLEVBQWpEO0FBQ0FELFFBQUFBLE9BQU8sR0FBR0csSUFBSSxHQUFHLEdBQVAsR0FBYUYsTUFBYixHQUFzQixHQUF0QixJQUE2QkMsTUFBTSxHQUFHLEVBQVQsR0FBYyxNQUFJQSxNQUFsQixHQUEyQkEsTUFBeEQsQ0FBVjtBQUNIO0FBQ0o7QUFDRCxXQUFPRixPQUFQO0FBQ0gsR0FwQ0k7QUFzQ0xJLEVBQUFBLGNBQWMsRUFBQyx3QkFBVUMsSUFBVixFQUFnQjtBQUUzQixRQUFJQyxFQUFFLEdBQUdmLEVBQUUsQ0FBQ2dCLFNBQUgsQ0FBYSxJQUFiLENBQVQ7QUFDQSxRQUFJQyxJQUFJLEdBQUdqQixFQUFFLENBQUNrQixPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixDQUFYO0FBQ0EsUUFBSUMsSUFBSSxHQUFHbkIsRUFBRSxDQUFDa0IsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBWDtBQUNBLFFBQUlFLEtBQUssR0FBR3BCLEVBQUUsQ0FBQ3FCLFFBQUgsQ0FBWSxDQUFDTixFQUFELEVBQUtFLElBQUwsRUFBVUUsSUFBVixDQUFaLENBQVo7QUFDQUwsSUFBQUEsSUFBSSxDQUFDQSxJQUFMLENBQVVRLFNBQVYsQ0FBb0JGLEtBQXBCO0FBQ0gsR0E3Q0k7QUE4Q0w7QUFDQUcsRUFBQUEsaUJBQWlCLEVBQUMsMkJBQVNULElBQVQsRUFBZTtBQUU3QjtBQUNBO0FBQ0EsUUFBSVUsS0FBSyxHQUFHLEtBQUtDLFNBQUwsQ0FBZSxFQUFmLEVBQWtCLEVBQWxCLElBQXdCLEtBQXBDO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLEtBQUtELFNBQUwsQ0FBZSxFQUFmLEVBQWtCLEVBQWxCLENBQWI7QUFDQSxRQUFJRSxNQUFNLEdBQUcsS0FBS0YsU0FBTCxDQUFlLEVBQWYsRUFBa0IsR0FBbEIsQ0FBYjtBQUNBekIsSUFBQUEsRUFBRSxDQUFDNEIsR0FBSCxDQUFPLFNBQU9KLEtBQWQsRUFQNkIsQ0FRN0I7O0FBQ0EsUUFBSVQsRUFBRSxHQUFHZixFQUFFLENBQUNnQixTQUFILENBQWFRLEtBQWIsQ0FBVDtBQUNBLFFBQUlLLElBQUksR0FBRzdCLEVBQUUsQ0FBQzhCLE1BQUgsQ0FBVU4sS0FBVixFQUFpQnhCLEVBQUUsQ0FBQytCLEVBQUgsQ0FBTUwsTUFBTixFQUFjQyxNQUFkLENBQWpCLENBQVg7QUFDQSxRQUFJSyxLQUFLLEdBQUdoQyxFQUFFLENBQUNpQyxRQUFILENBQVlULEtBQVosRUFBbUIsRUFBbkIsQ0FBWjtBQUNBLFFBQUlVLE1BQU0sR0FBR2xDLEVBQUUsQ0FBQ21DLEtBQUgsQ0FBUyxDQUFDTixJQUFELEVBQU1HLEtBQU4sQ0FBVCxDQUFiO0FBQ0FsQixJQUFBQSxJQUFJLENBQUNRLFNBQUwsQ0FBZVksTUFBZjs7QUFJQSxRQUFJRSxLQUFLLEdBQUcsSUFBWixDQWpCNkIsQ0FrQjdCOzs7QUFDQSxRQUFJQyxRQUFRLEdBQUdyQyxFQUFFLENBQUNzQyxRQUFILENBQVksVUFBU0MsTUFBVCxFQUFpQjtBQUN4QyxVQUFJQyxLQUFLLEdBQUdKLEtBQUssQ0FBQ1gsU0FBTixDQUFnQixFQUFoQixFQUFtQixFQUFuQixJQUF5QixLQUFyQzs7QUFDQSxVQUFJZ0IsTUFBTSxHQUFHTCxLQUFLLENBQUNYLFNBQU4sQ0FBZ0IsRUFBaEIsRUFBbUIsR0FBbkIsQ0FBYjs7QUFDQSxVQUFJaUIsTUFBTSxHQUFHTixLQUFLLENBQUNYLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBcUIsSUFBckIsSUFBNkIsQ0FBQyxDQUEzQztBQUNBLFVBQUlrQixJQUFJLEdBQUczQyxFQUFFLENBQUM4QixNQUFILENBQVVVLEtBQVYsRUFBaUJ4QyxFQUFFLENBQUMrQixFQUFILENBQU1VLE1BQU4sRUFBY0MsTUFBZCxDQUFqQixDQUFYO0FBQ0EsVUFBSUUsS0FBSyxHQUFHNUMsRUFBRSxDQUFDaUMsUUFBSCxDQUFZTyxLQUFaLEVBQW1CLEdBQW5CLENBQVo7QUFDQSxVQUFJSyxNQUFNLEdBQUc3QyxFQUFFLENBQUNtQyxLQUFILENBQVMsQ0FBQ1EsSUFBRCxFQUFNQyxLQUFOLENBQVQsQ0FBYjtBQUNBTCxNQUFBQSxNQUFNLENBQUNqQixTQUFQLENBQWlCdUIsTUFBakI7QUFFQSxVQUFJQyxPQUFPLEdBQUdQLE1BQWQ7O0FBQ0FILE1BQUFBLEtBQUssQ0FBQ1csWUFBTixDQUFtQixVQUFTUixNQUFULEVBQWdCO0FBRS9CLFlBQUlPLE9BQU8sQ0FBQ0UsTUFBUixJQUFrQixJQUFsQixJQUEwQkYsT0FBTyxDQUFDRSxNQUFSLENBQWVBLE1BQWYsSUFBeUIsSUFBdkQsRUFBNkQ7QUFDekQsY0FBSUMsVUFBVSxHQUFHSCxPQUFPLENBQUNFLE1BQVIsQ0FBZUEsTUFBZixDQUFzQkUsY0FBdEIsQ0FBcUMsV0FBckMsRUFBa0RBLGNBQWxELENBQWlFLFlBQWpFLENBQWpCOztBQUNBRCxVQUFBQSxVQUFVLENBQUNFLE1BQVgsR0FBb0IsR0FBcEI7QUFDSDs7QUFDRCxZQUFJTCxPQUFPLElBQUksSUFBZixFQUFxQjtBQUNqQkEsVUFBQUEsT0FBTyxDQUFDTSxnQkFBUixDQUF5QixLQUF6QjtBQUNILFNBUjhCLENBUy9COztBQUVILE9BWEQsRUFXRVosS0FYRjtBQWNILEtBeEIwQixDQXdCekJhLElBeEJ5QixDQXdCcEJ2QyxJQUFJLENBQUNBLElBeEJlLENBQVosQ0FBZjtBQXlCQSxRQUFJTSxLQUFLLEdBQUdwQixFQUFFLENBQUNxQixRQUFILENBQVksQ0FBQ04sRUFBRCxFQUFJc0IsUUFBSixDQUFaLENBQVo7QUFDQXZCLElBQUFBLElBQUksQ0FBQ1EsU0FBTCxDQUFlRixLQUFmLEVBN0M2QixDQStDN0I7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVILEdBckdJO0FBc0dMSyxFQUFBQSxTQUFTLEVBQUMsbUJBQVM2QixNQUFULEVBQWlCQyxNQUFqQixFQUF5QjtBQUMvQixRQUFJQyxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBZUwsTUFBTSxHQUFHQyxNQUF4QixJQUFrQ0EsTUFBN0MsQ0FBVjtBQUNBLFdBQU9DLEdBQVA7QUFDSCxHQXpHSSxDQTJHTDs7QUEzR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIEZvcm1hdE1NU1M6ZnVuY3Rpb24gKHNlY29uZHMpIHtcblxuICAgICAgICB2YXIgY3VycmVudFNlY29uZHMgPSBwYXJzZUludChzZWNvbmRzKTtcbiAgICAgICAgdmFyIHRpbWVTdHIgPSBudWxsO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIHNlY29uZCA9IDA7XG4gICAgICAgIGlmIChjdXJyZW50U2Vjb25kcyA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIFwiMDA6MDBcIjtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChjdXJyZW50U2Vjb25kcyAvIDYwKTtcbiAgICAgICAgICAgIGlmIChtaW51dGUgPCA2MCkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IGN1cnJlbnRTZWNvbmRzICUgNjA7XG4gICAgICAgICAgICAgICAgdGltZVN0ciA9IG1pbnV0ZSArIFwiOlwiICsgKHNlY29uZCA8IDEwID8gXCIwXCIrc2Vjb25kIDogc2Vjb25kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IG1pbnV0ZSAvIDYwO1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IG1pbnV0ZSAlIDYwO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IGN1cnJlbnRTZWNvbmRzIC0gaG91ciAqIDM2MDAgLSBtaW51dGUgKiA2MDtcbiAgICAgICAgICAgICAgICB0aW1lU3RyID0gaG91ciArIFwiOlwiICsgbWludXRlICsgXCI6XCIgKyAoc2Vjb25kIDwgMTAgPyBcIjBcIitzZWNvbmQgOiBzZWNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lU3RyO1xuICAgIH0sXG5cbiAgICBTY2FsZUFuaW1hdGlvbjpmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgIHZhciBkMSA9IGNjLmRlbGF5VGltZSgwLjAxKTtcbiAgICAgICAgdmFyIHN0bzEgPSBjYy5zY2FsZVRvKDAuMSwgMS44KTtcbiAgICAgICAgdmFyIHN0bzIgPSBjYy5zY2FsZVRvKDAuMSwgMSk7XG4gICAgICAgIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSwgc3RvMSxzdG8yXSk7XG4gICAgICAgIG5vZGUubm9kZS5ydW5BY3Rpb24oc2VxdWUpO1xuICAgIH0sXG4gICAgLy8g5oqb54mp57q/XG4gICAgUGFyYWJvbGFBbmltYXRpb246ZnVuY3Rpb24obm9kZSkge1xuXG4gICAgICAgIC8vIOWFiOWQkeS4iuaKm1xuICAgICAgICAvLyDpmo/mnLrkuIDkuKowLjIg5YiwIDAuMyDnmoTkuIrmipvov4fnqItcbiAgICAgICAgdmFyIHRpbWUxID0gdGhpcy5SYW5kb21OdW0oMjAsMjUpIC8gMTAwLjA7XG4gICAgICAgIHZhciBtb3ZlWDEgPSB0aGlzLlJhbmRvbU51bSgxMCw2MCk7XG4gICAgICAgIHZhciBtb3ZlWTEgPSB0aGlzLlJhbmRvbU51bSg0MCwyNjApO1xuICAgICAgICBjYy5sb2coXCLpmo/mnLrlsI/mlbBcIit0aW1lMSk7XG4gICAgICAgIC8vIHZhciB0aW1lID0gMC4yO1xuICAgICAgICB2YXIgZDEgPSBjYy5kZWxheVRpbWUodGltZTEpXG4gICAgICAgIHZhciBtb3YxID0gY2MubW92ZUJ5KHRpbWUxLCBjYy52Mihtb3ZlWDEsIG1vdmVZMSkpO1xuICAgICAgICB2YXIgcm90YTEgPSBjYy5yb3RhdGVCeSh0aW1lMSwgOTApO1xuICAgICAgICB2YXIgc3Bhd24xID0gY2Muc3Bhd24oW21vdjEscm90YTFdKTtcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oc3Bhd24xKTtcblxuXG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8g5Zue6LCDXG4gICAgICAgIHZhciBlbmRfZnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIHRpbWUyID0gX3RoaXMuUmFuZG9tTnVtKDQwLDYwKSAvIDEwMC4wO1xuICAgICAgICAgICAgdmFyIG1vdmVYMiA9IF90aGlzLlJhbmRvbU51bSg5MCwxMjApO1xuICAgICAgICAgICAgdmFyIG1vdmVZMiA9IF90aGlzLlJhbmRvbU51bSgxMzAwLDE0MDApICogLTE7XG4gICAgICAgICAgICB2YXIgbW92MiA9IGNjLm1vdmVCeSh0aW1lMiwgY2MudjIobW92ZVgyLCBtb3ZlWTIpKTtcbiAgICAgICAgICAgIHZhciByb3RhMiA9IGNjLnJvdGF0ZUJ5KHRpbWUyLCA2MzApO1xuICAgICAgICAgICAgdmFyIHNwYXduMiA9IGNjLnNwYXduKFttb3YyLHJvdGEyXSk7XG4gICAgICAgICAgICB0YXJnZXQucnVuQWN0aW9uKHNwYXduMik7XG5cbiAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgX3RoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKF90YXJnZXQucGFyZW50ICE9IG51bGwgJiYgX3RhcmdldC5wYXJlbnQucGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3JlTGFiZWwgPSBfdGFyZ2V0LnBhcmVudC5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZVJlY3RcIikuZ2V0Q2hpbGRCeU5hbWUoXCJTY29yZUxhYmVsXCIpO1xuICAgICAgICAgICAgICAgICAgICBzY29yZUxhYmVsLnN0cmluZyA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX3RhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF90YXJnZXQucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIF90YXJnZXQucGFyZW50LnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlUmVjdFwiKS5nZXRDaGlsZEJ5TmFtZShcIlNjb3JlTGFiZWxcIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sdGltZTIpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfS5iaW5kKG5vZGUubm9kZSkpXG4gICAgICAgIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSxlbmRfZnVuY10pO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihzZXF1ZSk7XG5cbiAgICAgICAgLy8gdmFyIG1vdjIgPSBjYy5tb3ZlQnkoMSwgY2MudjIoNTAsIDQwMCkpO1xuICAgICAgICAvLyB2YXIgcm90YTIgPSBjYy5yb3RhdGVCeSgxLCA2MzApO1xuICAgICAgICAvLyB2YXIgc3Bhd24yID0gY2Muc3Bhd24oW21vdjIscm90YTJdKTtcbiAgICAgICAgLy8gbm9kZS5ub2RlLnJ1bkFjdGlvbihzcGF3bjIpO1xuXG4gICAgICAgIC8vIHZhciBzZXF1ZSA9IGNjLnNlcXVlbmNlKFtkMSwgc3RvMSxzdG8yXSk7XG5cbiAgICB9LFxuICAgIFJhbmRvbU51bTpmdW5jdGlvbihtaW5OdW0sIG1heE51bSkge1xuICAgICAgICB2YXIgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihtaW5OdW0gLSBtYXhOdW0pICsgbWF4TnVtKTtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==