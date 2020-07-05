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
        },
        CurrentScore: {
            type:cc.integer,
            default:0
        }
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
        cc.loader.loadRes("music/move_to_eff", cc.AudioClip, function(err, clip) {
            cc.audioEngine.play(clip, false, 0.5);
        });
        // move_to_eff
        for (let i = 1; i <= 4; i++) {
            cc.log("Pa"+_this.node.parent);
            cc.log("Pa"+this.node.parent);
            var container = _this.node.parent.getChildByName('PokerContainer'+i);
            cc.log("container"+container);
            container.getChildByName("UpTip").active = false;
            mainJS.ArrowTips = 0;
        }
        
        var poker;
        if (pokerNode.childrenCount > 0) {
            var Tools = cc.find('Canvas').getComponent('ToolsScript');
            poker = pokerNode.children[pokerNode.childrenCount - 1];
            // _this.feipai(target.target,poker);
            var sum = parseInt(this.ScoreLabel.string) + poker.PokerRealNumber;
            _this.feipai(target.currentTarget,poker,sum);
            cc.log("RealNumber:" + poker.PokerRealNumber+"    PokerNumber:"+poker.PokerNumber);
            
            Tools.ScaleAnimation(_this.ScoreLabel);
            // Tools.ParabolaAnimation(_this.ScoreLabel);
            // cc.log("最终分"+sum);
            _this.ScoreLabel.string = sum.toString();
            _this.CurrentScore = sum;
            if (sum === 21) {
                mainJS.ComboCount += 1;
                _this.ScoreLabel.string = "0";
                // var bingo 
                cc.loader.loadRes("music/get_target", cc.AudioClip, function(err, clip) {
                    cc.audioEngine.play(clip, false, 0.5);
                });
                var anmationNode = new cc.Node();
                anmationNode.width = 55;
                anmationNode.height = 30;
                // node.setContentSize(cc.Size(20,20));
                _this.ScoreLabel.node.addChild(anmationNode);
                var wrongPoker = anmationNode.addComponent(cc.Sprite);
                var scoreNode = new cc.Node();
                _this.ScoreLabel.node.addChild(scoreNode);
                var getscore = scoreNode.addComponent(cc.Label);
                cc.loader.loadRes("font/score_font", cc.Font, function(err, font) {
                    getscore.font = font;
                });
                getscore.fontSize = 35;
                getscore.color = new cc.color(255,0,0,255);
                getscore.string = "+200";
                wrongPoker.sizeMode = cc.Sprite.SizeMode.SIMPLE;
                wrongPoker.spriteFrame = mainJS.PokerTargetTips;
                cc.log("nodeSize" + anmationNode.getContentSize().width + anmationNode.getContentSize().height);

                var d1 = cc.delayTime(0.01);
                var sto1 = cc.scaleTo(0.4, 2);
                var mov1 = cc.moveBy(0.4,cc.v2(0,100));
                var fadein = cc.fadeIn(0.4);
                var spawn = cc.spawn([d1, sto1,mov1,fadein]);
                anmationNode.runAction(spawn);
                var mov2 = cc.moveBy(0.4,cc.v2(0,40));
                // var spawn2 = cc.spawn([d1, sto1,mov2]);
                scoreNode.runAction(mov2);

                var d3 = cc.delayTime(0.4);
                var animationFinished = cc.callFunc(function(target) {
                    cc.loader.loadRes("font/and_score_font", cc.Font, function(err, font) {
                        getscore.fontSize = 25;
                        getscore.font = font;
                    });

                    var pos1 = scoreNode.convertToWorldSpaceAR(cc.v2(0,0));
                    var scoreLabel = cc.find('Canvas/ScoreLabel/Background/Label');
                    var scoreLabelStrng = scoreLabel.getComponent(cc.Label);
                    var pos2 = scoreLabel.convertToWorldSpaceAR(cc.v2(0,0));
                    var mto = cc.moveBy(0.3, cc.v2(pos2.x - pos1.x,pos2.y - pos1.y));
                    var changeScore = cc.callFunc(function(target) {
                        scoreNode.active = false;
                        _this.updatenNumberAnim(parseInt(scoreLabelStrng.string) + 200, parseInt(scoreLabelStrng.string));
                    });
                    var mySequ = cc.sequence([mto,changeScore]);
                    scoreNode.runAction(mySequ);
                });
                var sequ = cc.sequence(d3,animationFinished);
                scoreNode.runAction(sequ);


                _this.scheduleOnce(function(target){
                
                    anmationNode.active = false;
                    anmationNode.removeFromParent(true);
                    anmationNode.destroy();
                    
                },0.5);


            } else if (sum > 21) {
                cc.loader.loadRes("music/bust_eff", cc.AudioClip, function(err, clip) {
                    cc.audioEngine.play(clip, false, 0.5);
                });
                _this.ScoreLabel.string = "0";
                var first = cc.find("Canvas/RoundLabel/Background/FirstRound");
                var second = cc.find("Canvas/RoundLabel/Background/SecondRound");
                var third = cc.find("Canvas/RoundLabel/Background/ThirdRound");
                // ca.active = true;
                if (first.active === false) {
                    first.active = true;
                } else if (second.active === false) {
                    second.active = true;
                } else if (third.active === false) {
                    //结束
                    third.active = true;
                    var tabbarJS = cc.find('Canvas').getComponent('TabbarScript');
                    tabbarJS.OutMoveAction();
                }
                
                // cc.log(ca);
                _this.BustAnimation();
                var anmationNode = new cc.Node();
                anmationNode.width = 40;
                anmationNode.height = 40;
                // node.setContentSize(cc.Size(20,20));
                _this.ScoreLabel.node.addChild(anmationNode);
                var wrongPoker = anmationNode.addComponent(cc.Sprite);
                
                // wrongPoker.Size = cc.Size(20,20);
                // wrongPoker.spriteFrame = ca.spriteFrame;
                // wrongPoker.type = cc.Sprite.Type.SIMPLE;CUSTOM
                wrongPoker.sizeMode = cc.Sprite.SizeMode.SIMPLE;
                // if (_this.ErrorTips != null || _this.ErrorTips != undefined) {
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
                var mov1 = cc.moveBy(0.4,cc.v2(0,100));
                var fadein = cc.fadeIn(0.4);
                var spawn = cc.spawn([d1, sto1,mov1,fadein]);
                anmationNode.runAction(spawn);

                var animationFinished = cc.callFunc(function(target) {
                    
                });
                _this.scheduleOnce(function(target){
                
                    anmationNode.active = false;
                    anmationNode.removeFromParent(true);
                    anmationNode.destroy();
                    
                },0.5);
            }
            // 执行牌局跟进
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
    feipai: function (nodeParent,nodeSon,totalScore) {
        cc.loader.loadRes("music/move_to_eff", cc.AudioClip, function(err, clip) {
            cc.audioEngine.play(clip, false, 0.5);
        });
        cc.log(nodeParent,nodeSon);
        var curPos1 = nodeSon.convertToWorldSpaceAR(cc.v2(0,0));
        var curPos2 = nodeParent.convertToWorldSpaceAR(cc.v2(0,0));
        var _this = this;
        var d2 = cc.delayTime(0.01);
        var mvto = cc.moveBy(0.1, cc.v2(curPos2.x - curPos1.x,curPos2.y - curPos1.y + 175 - (45 * nodeParent.childrenCount)));
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

            if (totalScore >= 21) {
                _this.node.getChildByName("PokerContainerRect").interactable = false;
                cc.log(">21点处理",nodeParent.childrenCount);
                for (let index = nodeParent.childrenCount - 1; index >= 0; index--) {
                    var node = nodeParent.children[index];
                    cc.log("执行"+node + "延时" + 0.5 * (nodeParent.childrenCount - 1 - index));
                    var Tools = cc.find('Canvas').getComponent('ToolsScript');
                    // Tools.ParabolaAnimation(node,0); 
                    Tools.ParabolaAnimation(node); 
                    var _node = node;
                    _this.scheduleOnce(function(target){
                        Tools.ParabolaAnimation(_node); 
                    },0.5 * (nodeParent.childrenCount - 1 - index));
                //     _this.scheduleOnce(function(target){
                //         var d3 = cc.delayTime(0.5 * (nodeParent.childrenCount - 1 - index));

                //         var animation1 = function () {
                //             var Tools = cc.find('Canvas').getComponent('ToolsScript');
                //             Tools.ParabolaAnimation(target);
                //         };
                //         var sequ = cc.sequence([d3,animation1]);
                //          node.runAction(sequ);
                //    },0);
                    
                }
                _this.scheduleOnce(function(target){
                    // for (let index = nodeParent.childrenCount - 1; index >= 0; index--) {
                    //     var node = nodeParent.children[index];
                    //     node.removeFromParent(false);
                    // }
                    _this.node.getChildByName("PokerContainerRect").interactable = true;
                    cc.log("feipai log"+_this);
                    cc.log("   PokerContainerRect"+_this.node.getChildByName("PokerContainerRect"));
                },1.5);
            }
        });
        var sequ = cc.sequence([d2,mvto,animationFinished]);
        nodeSon.runAction(sequ);
    },

    DetectArrows:function (preScore) {
        var _this = this;
        cc.log(_this.node);
        if (parseInt(_this.ScoreLabel.string) + preScore <= 21) {
            
            var uptip = _this.node.getChildByName("UpTip");
            var pos = uptip.position;
            uptip.setPosition(0,pos.y - 50);
            _this.node.getChildByName("UpTip").active = true;
            cc.log("获取UpTip的位置"+uptip.position);
            var mov = cc.moveBy(0.2,cc.v2(0, 50));
            var fade = cc.fadeIn(0.2);
            var spawn = cc.spawn([mov,fade]);
            uptip.runAction(spawn);
        } else {
            _this.node.getChildByName("UpTip").active = false;
        }
        cc.log("YYYY");
    },
    updatenNumberAnim:function(curNum,originNum) {
        var difference = curNum - originNum;
        var absDifference = Math.abs(difference);
        var changeTimes = absDifference < 8 ? absDifference : 8;
        var changeUnit = absDifference < 8 ? 1 : Math.floor(difference / 8)
        var scoreLabel = cc.find('Canvas/ScoreLabel/Background/Label');
        for (let i = 0; i < changeTimes; i++) {
            (function (i) {
                setTimeout(() => {
                    scoreLabel.getComponent(cc.Label).string = (originNum += changeUnit)
                    if (i == changeTimes - 1) {
                        scoreLabel.getComponent(cc.Label).string = curNum;
                    }
                }, 50*(i+1));
            })(i)
        }
    },

    BustAnimation:function () {
        var _this = this;
        cc.log(_this.node);
        var uptip = _this.node.getChildByName("Bust");
        var pos = uptip.position;
        uptip.setPosition(0,pos.y - 150);
        _this.node.getChildByName("Bust").active = true;
        cc.log("获取Bust的位置"+uptip.position);
        var mov = cc.moveBy(0.3,cc.v2(0, 150));
        var fade = cc.fadeIn(0.3);
        var spawn = cc.spawn([mov,fade]);
        uptip.runAction(spawn);
        _this.scheduleOnce(function(target){
                
            uptip.active = false;
            
        },0.5);
    },


    // updatenNumberAnim: function (curNum,originNum) {
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
