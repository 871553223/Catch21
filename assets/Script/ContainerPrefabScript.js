// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        ScoreRect: {
            type:cc.Sprite,
            default:null
        },
        ScoreLabel: {
            type:cc.Label,
            default:null
        },
        UpTip: {
            type:cc.Sprite,
            default:null
        }
        // foo: {
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

    onLoad () {
        this.ScoreLabel.string = '0';
    },

    start () {

    },

    onClick:function(target) {
        var _this = this;
        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        var pokerNode = mainJS.CurrentPoker.node;

        var poker;
        if (pokerNode.childrenCount > 0) {
            poker = pokerNode.children[pokerNode.childrenCount - 1];
            // _this.feipai(target.target,poker);
            _this.feipai(target.currentTarget,poker);
            cc.log("RealNumber:" + poker.PokerRealNumber);
            var sum = parseInt(this.ScoreLabel.string) + poker.PokerRealNumber;
            if (sum === 21) {
                
            } else if (sum > 21) {

            }
            var Tools = cc.find('Canvas').getComponent('ToolsScript');
            Tools.ScaleAnimation(_this.ScoreLabel);
            // cc.log("最终分"+sum);
            _this.ScoreLabel.string = sum.toString();
            // 执行牌局跟进
            cc.log(mainJS.PokerInstanceBackground.node.children);
            var frontPoker = mainJS.PokerInstanceBackground.node.children[mainJS.PokerInstanceBackground.node.childrenCount - 1];
            cc.log(frontPoker);
            mainJS.fanzhuan(frontPoker);
        }
        
        // if (mainJS.CurrentPoker.node) {
            
        // }
        
        // var curPos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
        //     var curPos2 = _this.PokerInstanceBackground.node.convertToNodeSpaceAR(curPos1);
        //     cc.log(target);
        //     target.setPosition(curPos2);
        //     target.parent = _this.PokerInstanceBackground.node;
        //     target.CurrentPosition = curPos1;
        
    },
    // 动画从子节点飞到父节点身上
    feipai: function (nodeParent,nodeSon) {
        cc.log(nodeParent,nodeSon);
        var curPos1 = nodeSon.convertToWorldSpaceAR(cc.v2(0,0));
        var curPos2 = nodeParent.convertToWorldSpaceAR(cc.v2(0,0));
        var _this = this;
        var d2 = cc.delayTime(0.01);
        var mvto = cc.moveBy(0.2, cc.v2(curPos2.x - curPos1.x,curPos2.y - curPos1.y + 175 - (45 * nodeParent.childrenCount)));
        var animationFinished = cc.callFunc(function(target) {
            // target.CurrentPosition = target.getPosition();
            
            // var curPos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
            // var curPos2 = _this.CurrentPoker.node.convertToNodeSpaceAR(curPos1);
            // cc.log(target);
            // target.setPosition(curPos2);
            // target.parent = _this.CurrentPoker.node;
            // // cc.log(target.CurrentPosition);
            // target.PreviousPosition = target.CurrentPosition;
            // target.CurrentPosition = curPos1;
            var pos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
            var pos2 = nodeParent.convertToNodeSpaceAR(pos1);
            target.setPosition(pos2);
            target.PreviousParent = target.parent;
            target.parent = nodeParent;
            target.PreviousPosition = target.CurrentPosition;
            target.CurrentPosition = pos1;
            cc.log(nodeParent.children);
            target.getComponent(cc.Button).interactable = false;
            // target.interactable = false;

        });
        var sequ = cc.sequence([d2,mvto,animationFinished]);
        nodeSon.runAction(sequ);
    }

    // update (dt) {},
});
