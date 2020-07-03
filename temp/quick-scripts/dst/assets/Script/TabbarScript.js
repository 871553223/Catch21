
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGFiYmFyU2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiLCJSZWJhY2tBY3Rpb24iLCJtYWluSlMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiQ3VycmVudFBva2VyIiwibm9kZSIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsImZhbnpodWFuIiwiUGF1c2VBY3Rpb24iLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvRW5naW5lIiwicGxheSIsIlRpbWVyUGF1c2UiLCJwYXVzZU11c2ljIiwicGF1c2VBbGxFZmZlY3RzIiwicmVzdW1lTXVzaWMiLCJyZXN1bWVBbGxFZmZlY3RzIiwibG9nIiwiYWxlcnROb2RlIiwiYWN0aXZlIiwibWFzayIsIlNwcml0ZSIsInpJbmRleCIsIkNvbG9yIiwiS2VlcFBsYXlBY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQTtBQUVBQyxFQUFBQSxLQXpCSyxtQkF5QkksQ0FFUixDQTNCSTtBQTZCTEMsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFFBQUlDLE1BQU0sR0FBR04sRUFBRSxDQUFDTyxJQUFILENBQVEsUUFBUixFQUFrQkMsWUFBbEIsQ0FBK0IsaUJBQS9CLENBQWI7O0FBQ0EsUUFBSUYsTUFBTSxDQUFDRyxZQUFQLENBQW9CQyxJQUFwQixDQUF5QkMsYUFBekIsSUFBMEMsQ0FBOUMsRUFBaUQ7QUFDN0MsVUFBSUQsSUFBSSxHQUFHSixNQUFNLENBQUNHLFlBQVAsQ0FBb0JDLElBQXBCLENBQXlCRSxRQUF6QixDQUFrQyxDQUFsQyxDQUFYO0FBQ0FOLE1BQUFBLE1BQU0sQ0FBQ08sUUFBUCxDQUFnQkgsSUFBaEI7QUFDSDtBQUVKLEdBcENJO0FBcUNMSSxFQUFBQSxXQUFXLEVBQUUsdUJBQVc7QUFDcEJkLElBQUFBLEVBQUUsQ0FBQ2UsTUFBSCxDQUFVQyxPQUFWLENBQWtCLGlCQUFsQixFQUFxQ2hCLEVBQUUsQ0FBQ2lCLFNBQXhDLEVBQW1ELFVBQVNDLEdBQVQsRUFBY0MsSUFBZCxFQUFvQjtBQUNuRW5CLE1BQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZUMsSUFBZixDQUFvQkYsSUFBcEIsRUFBMEIsS0FBMUIsRUFBaUMsR0FBakM7QUFDSCxLQUZEO0FBR0EsUUFBSWIsTUFBTSxHQUFHTixFQUFFLENBQUNPLElBQUgsQ0FBUSxRQUFSLEVBQWtCQyxZQUFsQixDQUErQixpQkFBL0IsQ0FBYjtBQUNBRixJQUFBQSxNQUFNLENBQUNnQixVQUFQLEdBQW9CLENBQUNoQixNQUFNLENBQUNnQixVQUE1Qjs7QUFDQSxRQUFJaEIsTUFBTSxDQUFDZ0IsVUFBUCxLQUFzQixJQUExQixFQUFnQztBQUM1QnRCLE1BQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZUcsVUFBZjtBQUNBdkIsTUFBQUEsRUFBRSxDQUFDb0IsV0FBSCxDQUFlSSxlQUFmO0FBQ0gsS0FIRCxNQUdPO0FBQ0h4QixNQUFBQSxFQUFFLENBQUNvQixXQUFILENBQWVLLFdBQWY7QUFDQXpCLE1BQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZU0sZ0JBQWY7QUFDSDs7QUFDRDFCLElBQUFBLEVBQUUsQ0FBQzJCLEdBQUgsQ0FBTyxRQUFNckIsTUFBTSxDQUFDZ0IsVUFBcEI7QUFFQSxRQUFJTSxTQUFTLEdBQUc1QixFQUFFLENBQUNPLElBQUgsQ0FBUSxrQkFBUixDQUFoQjtBQUNBcUIsSUFBQUEsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsUUFBSUMsSUFBSSxHQUFHOUIsRUFBRSxDQUFDTyxJQUFILENBQVEscUJBQVIsRUFBK0JDLFlBQS9CLENBQTRDUixFQUFFLENBQUMrQixNQUEvQyxDQUFYO0FBQ0FILElBQUFBLFNBQVMsQ0FBQ0ksTUFBVixHQUFtQixHQUFuQjtBQUNBRixJQUFBQSxJQUFJLENBQUNHLEtBQUwsR0FBYWpDLEVBQUUsQ0FBQ2lDLEtBQUgsQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBYjtBQUVILEdBMURJO0FBNERMQyxFQUFBQSxjQUFjLEVBQUUsMEJBQVc7QUFDdkIsUUFBSU4sU0FBUyxHQUFHNUIsRUFBRSxDQUFDTyxJQUFILENBQVEsa0JBQVIsQ0FBaEI7QUFDQXFCLElBQUFBLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixLQUFuQjtBQUNBLFFBQUlDLElBQUksR0FBRzlCLEVBQUUsQ0FBQ08sSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxZQUEvQixDQUE0Q1IsRUFBRSxDQUFDK0IsTUFBL0MsQ0FBWDtBQUNBSCxJQUFBQSxTQUFTLENBQUNJLE1BQVYsR0FBbUIsR0FBbkI7QUFDQUYsSUFBQUEsSUFBSSxDQUFDRyxLQUFMLEdBQWFqQyxFQUFFLENBQUNpQyxLQUFILENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLENBQWxCLENBQWI7QUFFQSxRQUFJM0IsTUFBTSxHQUFHTixFQUFFLENBQUNPLElBQUgsQ0FBUSxRQUFSLEVBQWtCQyxZQUFsQixDQUErQixpQkFBL0IsQ0FBYjtBQUNBRixJQUFBQSxNQUFNLENBQUNnQixVQUFQLEdBQW9CLENBQUNoQixNQUFNLENBQUNnQixVQUE1Qjs7QUFDQSxRQUFJaEIsTUFBTSxDQUFDZ0IsVUFBUCxLQUFzQixJQUExQixFQUFnQztBQUM1QnRCLE1BQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZUcsVUFBZjtBQUNBdkIsTUFBQUEsRUFBRSxDQUFDb0IsV0FBSCxDQUFlSSxlQUFmO0FBQ0gsS0FIRCxNQUdPO0FBQ0h4QixNQUFBQSxFQUFFLENBQUNvQixXQUFILENBQWVLLFdBQWY7QUFDQXpCLE1BQUFBLEVBQUUsQ0FBQ29CLFdBQUgsQ0FBZU0sZ0JBQWY7QUFDSDtBQUNKLEdBNUVJLENBK0VMOztBQS9FSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cbiAgICBSZWJhY2tBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgaWYgKG1haW5KUy5DdXJyZW50UG9rZXIubm9kZS5jaGlsZHJlbkNvdW50ID49IDEpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbWFpbkpTLkN1cnJlbnRQb2tlci5ub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgbWFpbkpTLmZhbnpodWFuKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG4gICAgUGF1c2VBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIm11c2ljL2J0bl9jbGlja1wiLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uKGVyciwgY2xpcCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCBmYWxzZSwgMC41KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBtYWluSlMgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0dhbWVTY2VuZVNjcmlwdCcpO1xuICAgICAgICBtYWluSlMuVGltZXJQYXVzZSA9ICFtYWluSlMuVGltZXJQYXVzZTtcbiAgICAgICAgaWYgKG1haW5KUy5UaW1lclBhdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGxFZmZlY3RzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKFwieXl5XCIrbWFpbkpTLlRpbWVyUGF1c2UpO1xuXG4gICAgICAgIHZhciBhbGVydE5vZGUgPSBjYy5maW5kKCdDYW52YXMvQWxlcnRWaWV3Jyk7XG4gICAgICAgIGFsZXJ0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgbWFzayA9IGNjLmZpbmQoJ0NhbnZhcy9BbGVydFZpZXcvYmcnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgYWxlcnROb2RlLnpJbmRleCA9IDk5OTtcbiAgICAgICAgbWFzay5Db2xvciA9IGNjLkNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgS2VlcFBsYXlBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWxlcnROb2RlID0gY2MuZmluZCgnQ2FudmFzL0FsZXJ0VmlldycpO1xuICAgICAgICBhbGVydE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBtYXNrID0gY2MuZmluZCgnQ2FudmFzL0FsZXJ0Vmlldy9iZycpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBhbGVydE5vZGUuekluZGV4ID0gOTk5O1xuICAgICAgICBtYXNrLkNvbG9yID0gY2MuQ29sb3IoMCwgMCwgMCwgMCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWFpbkpTID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdHYW1lU2NlbmVTY3JpcHQnKTtcbiAgICAgICAgbWFpbkpTLlRpbWVyUGF1c2UgPSAhbWFpbkpTLlRpbWVyUGF1c2U7XG4gICAgICAgIGlmIChtYWluSlMuVGltZXJQYXVzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsRWZmZWN0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19