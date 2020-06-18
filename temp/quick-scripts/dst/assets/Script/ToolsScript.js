
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
    var sto1 = cc.scaleTo(0.1, 1.5);
    var sto2 = cc.scaleTo(0.1, 1);
    var seque = cc.sequence([d1, sto1, sto2]);
    node.node.runAction(seque);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVG9vbHNTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGFydCIsIkZvcm1hdE1NU1MiLCJzZWNvbmRzIiwiY3VycmVudFNlY29uZHMiLCJwYXJzZUludCIsInRpbWVTdHIiLCJtaW51dGUiLCJzZWNvbmQiLCJob3VyIiwiU2NhbGVBbmltYXRpb24iLCJub2RlIiwiZDEiLCJkZWxheVRpbWUiLCJzdG8xIiwic2NhbGVUbyIsInN0bzIiLCJzZXF1ZSIsInNlcXVlbmNlIiwicnVuQWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkk7QUFlTEMsRUFBQUEsVUFBVSxFQUFDLG9CQUFVQyxPQUFWLEVBQW1CO0FBRTFCLFFBQUlDLGNBQWMsR0FBR0MsUUFBUSxDQUFDRixPQUFELENBQTdCO0FBQ0EsUUFBSUcsT0FBTyxHQUFHLElBQWQ7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBYjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxDQUFiO0FBQ0EsUUFBSUosY0FBYyxJQUFJLENBQXRCLEVBQ0ksT0FBTyxPQUFQLENBREosS0FFSztBQUNERyxNQUFBQSxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0QsY0FBYyxHQUFHLEVBQWxCLENBQWpCOztBQUNBLFVBQUlHLE1BQU0sR0FBRyxFQUFiLEVBQWlCO0FBQ2JDLFFBQUFBLE1BQU0sR0FBR0osY0FBYyxHQUFHLEVBQTFCO0FBQ0FFLFFBQUFBLE9BQU8sR0FBR0MsTUFBTSxHQUFHLEdBQVQsSUFBZ0JDLE1BQU0sR0FBRyxFQUFULEdBQWMsTUFBSUEsTUFBbEIsR0FBMkJBLE1BQTNDLENBQVY7QUFDSCxPQUhELE1BR087QUFDSEMsUUFBQUEsSUFBSSxHQUFHRixNQUFNLEdBQUcsRUFBaEI7QUFDQUEsUUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUcsRUFBbEI7QUFDQUMsUUFBQUEsTUFBTSxHQUFHSixjQUFjLEdBQUdLLElBQUksR0FBRyxJQUF4QixHQUErQkYsTUFBTSxHQUFHLEVBQWpEO0FBQ0FELFFBQUFBLE9BQU8sR0FBR0csSUFBSSxHQUFHLEdBQVAsR0FBYUYsTUFBYixHQUFzQixHQUF0QixJQUE2QkMsTUFBTSxHQUFHLEVBQVQsR0FBYyxNQUFJQSxNQUFsQixHQUEyQkEsTUFBeEQsQ0FBVjtBQUNIO0FBQ0o7QUFDRCxXQUFPRixPQUFQO0FBQ0gsR0FwQ0k7QUFzQ0xJLEVBQUFBLGNBQWMsRUFBQyx3QkFBVUMsSUFBVixFQUFnQjtBQUUzQixRQUFJQyxFQUFFLEdBQUdmLEVBQUUsQ0FBQ2dCLFNBQUgsQ0FBYSxJQUFiLENBQVQ7QUFDQSxRQUFJQyxJQUFJLEdBQUdqQixFQUFFLENBQUNrQixPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixDQUFYO0FBQ0EsUUFBSUMsSUFBSSxHQUFHbkIsRUFBRSxDQUFDa0IsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBWDtBQUNBLFFBQUlFLEtBQUssR0FBR3BCLEVBQUUsQ0FBQ3FCLFFBQUgsQ0FBWSxDQUFDTixFQUFELEVBQUtFLElBQUwsRUFBVUUsSUFBVixDQUFaLENBQVo7QUFDQUwsSUFBQUEsSUFBSSxDQUFDQSxJQUFMLENBQVVRLFNBQVYsQ0FBb0JGLEtBQXBCO0FBQ0gsR0E3Q0ksQ0ErQ0w7O0FBL0NLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICBGb3JtYXRNTVNTOmZ1bmN0aW9uIChzZWNvbmRzKSB7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRTZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcyk7XG4gICAgICAgIHZhciB0aW1lU3RyID0gbnVsbDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBzZWNvbmQgPSAwO1xuICAgICAgICBpZiAoY3VycmVudFNlY29uZHMgPD0gMClcbiAgICAgICAgICAgIHJldHVybiBcIjAwOjAwXCI7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQoY3VycmVudFNlY29uZHMgLyA2MCk7XG4gICAgICAgICAgICBpZiAobWludXRlIDwgNjApIHtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBjdXJyZW50U2Vjb25kcyAlIDYwO1xuICAgICAgICAgICAgICAgIHRpbWVTdHIgPSBtaW51dGUgKyBcIjpcIiArIChzZWNvbmQgPCAxMCA/IFwiMFwiK3NlY29uZCA6IHNlY29uZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvdXIgPSBtaW51dGUgLyA2MDtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBtaW51dGUgJSA2MDtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBjdXJyZW50U2Vjb25kcyAtIGhvdXIgKiAzNjAwIC0gbWludXRlICogNjA7XG4gICAgICAgICAgICAgICAgdGltZVN0ciA9IGhvdXIgKyBcIjpcIiArIG1pbnV0ZSArIFwiOlwiICsgKHNlY29uZCA8IDEwID8gXCIwXCIrc2Vjb25kIDogc2Vjb25kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZVN0cjtcbiAgICB9LFxuXG4gICAgU2NhbGVBbmltYXRpb246ZnVuY3Rpb24gKG5vZGUpIHtcblxuICAgICAgICB2YXIgZDEgPSBjYy5kZWxheVRpbWUoMC4wMSk7XG4gICAgICAgIHZhciBzdG8xID0gY2Muc2NhbGVUbygwLjEsIDEuNSk7XG4gICAgICAgIHZhciBzdG8yID0gY2Muc2NhbGVUbygwLjEsIDEpO1xuICAgICAgICB2YXIgc2VxdWUgPSBjYy5zZXF1ZW5jZShbZDEsIHN0bzEsc3RvMl0pO1xuICAgICAgICBub2RlLm5vZGUucnVuQWN0aW9uKHNlcXVlKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19