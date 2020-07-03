
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