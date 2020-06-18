// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        leftSeconds: {
            type:cc.integer,
            default:90
        },

        backgroundSong: {
            type:cc.AudioClip,
            default:null
        },
        PauseButton: {
            type:cc.Button,
            default:null
        },
        HelpButton: {
            type:cc.Button,
            default:null
        },
        AudioButton: {
            type:cc.Button,
            default:null
        },
        ReBackButton: {
            type:cc.Button,
            default:null
        },

        TimeCountLabel: {
            type:cc.Button,
            default:null
        },
        RoundLabel: {
            type:cc.Button,
            default:null
        },
        ScoreLabel: {
            type:cc.Button,
            default:null
        },

        PokerContainer: {
            type:cc.Prefab,
            default:null
        },

        myPoker: {
            type:cc.Prefab,
            default:null
        },

        PokerInstanceBackground: {
            type:cc.Sprite,
            default:null
        },

        PokerStashView: {
            type:cc.Button,
            default:null
        },

        CurrentPoker: {
            type:cc.Sprite,
            default:null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.audioEngine.playMusic(this.backgroundSong,true)
        let size = cc.view.getFrameSize();
        cc.log(size.width,size.height)
        let windowSize = cc.view.getVisibleSize();
        cc.log(windowSize.width,windowSize.height);

        var halfWidth = windowSize.width / 2;
        var halfHeight = windowSize.height / 2;
        
        var pauseSize = this.PauseButton.node.getBoundingBox();
        this.PauseButton.node.setAnchorPoint(0,0);
        this.PauseButton.node.setPosition(-halfWidth + 40,-halfHeight + 30)

        this.HelpButton.node.setAnchorPoint(0,0);
        this.HelpButton.node.setPosition(-87 - 40,-halfHeight + 11 + 30)

        this.AudioButton.node.setAnchorPoint(0,0);
        this.AudioButton.node.setPosition(40,-halfHeight + 11 + 30)

        this.ReBackButton.node.setAnchorPoint(0,0);
        this.ReBackButton.node.setPosition(halfWidth - 40 - 110,-halfHeight + 30)

        this.TimeCountLabel.node.setAnchorPoint(1,0);
        this.TimeCountLabel.node.setPosition(0-107,halfHeight - 90 - 50)
        var labelNode = this.TimeCountLabel.node.getChildByName("Background").getChildByName("Label");
        var label = labelNode.getComponent(cc.Label);
        label.string = this.leftSeconds;

        this.RoundLabel.node.setAnchorPoint(0.5,0);
        this.RoundLabel.node.setPosition(0,halfHeight - 90 - 50)
        var bg = this.RoundLabel.node.getChildByName("Background");
        var firstR = bg.getChildByName("FirstRound");
        // firstR.node.opacity = 0;
        // bg.getChildByName("FirstRound").node.hi = false;
        // cc.log(bg.getChildByName("FirstRound"));
        // this.RoundLabel.node.getChildByName("Background").node.getChildByName("FirstRound").active = false;
        // this.RoundLabel.node.getChildByName("Background").node.getChildByName("FirstRound").node.active = false;

        this.ScoreLabel.node.setAnchorPoint(0,0);
        this.ScoreLabel.node.setPosition(107,halfHeight - 90 - 50)

        this.PokerInstanceBackground.node.setAnchorPoint(0.5,0.5);
        // cc.log(this.PokerInstanceBackground.node.getContentSize().width,this.PokerInstanceBackground.node.getContentSize().height);
        // cc.log(this.PokerInstanceBackground.node.getBoundingBox().size.width,this.PokerInstanceBackground.node.getBoundingBox().size.height);
        this.PokerInstanceBackground.node.setPosition(-halfWidth + 130 + 20,-halfHeight + 93 + 160);

        
        this.CurrentPoker.node.setAnchorPoint(0,0.5);
        this.CurrentPoker.node.setPosition(0,-halfHeight + 95 + 160);

        this.PokerStashView.node.setAnchorPoint(1,1);
        this.PokerStashView.node.setPosition(halfWidth - 10,-halfHeight + 190 + 160);


        for (var i = 0; i < 4; i++) {
            let pre = cc.instantiate(this.PokerContainer);
            pre._name="CJH"
            this.node.addChild(pre);
            pre.setAnchorPoint(0.5,0.5);
            pre.setPosition(-halfWidth + 78 + 60 + 157*i,0);
        }
        var array = this.pokerRandom();
        for (let i = 0; i < 52; i++) {
            let pre = cc.instantiate(this.myPoker);
            pre.PokerNumber = array[i];
            // cc.log("PokerInit"+pre.PokerNumber);
            // cc.log("dianshu"+pre.PokerNumber);
            pre._name="Poker_"+i;
            this.node.addChild(pre);
            pre.getChildByName("FrontView").active = false;
            pre.setAnchorPoint(0.5,0.5);
            pre.setPosition(0,0 - 200);
        }

        for (let index = 0; index < this.node.childrenCount; index++) {
            
            // cc.log(this.node.children[index]);
            
        }

        
    },

    start () {

        var Tools = cc.find('Canvas').getComponent('ToolsScript');
        var bg = this.RoundLabel.node.getChildByName("Background");
        bg.getChildByName("FirstRound").active = false;
        bg.getChildByName("SecondRound").active = false;
        bg.getChildByName("ThirdRound").active = false;
        this.fapai(0);
        
        
        var _this = this;
        cc.director.getScheduler().schedule(function(){
            var labelNode = this.TimeCountLabel.node.getChildByName("Background").getChildByName("Label");
            var label = labelNode.getComponent(cc.Label);
            var timeString = Tools.FormatMMSS(_this.leftSeconds);
            cc.log(timeString);
            label.string = timeString;
            _this.leftSeconds --;
            // cc.log(_this.leftSeconds)
        },this,1,100,1,false);
    },
// 发牌函数
    fapai:function(seq) {

        var _this = this;
        let size = cc.view.getVisibleSize();
        let lastPocker = _this.PokerInstanceBackground.node.getChildByName("Poker_"+(seq - 1));
        let currentPoker = _this.node.getChildByName("Poker_"+seq);
        if (currentPoker === null) {
            cc.log("Test",lastPocker,currentPoker);
            _this.fanzhuan(lastPocker);
            return;
        }
        
        // 回调
        var end_func = cc.callFunc(function(target) {
            var base_count = parseInt(target._name.split("_")[1]) + 1;

            var curPos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
            var curPos2 = _this.PokerInstanceBackground.node.convertToNodeSpaceAR(curPos1);
            // cc.log(target);
            target.setPosition(curPos2);
            target.PreviousParent = target.parent;
            target.parent = _this.PokerInstanceBackground.node;
            target.CurrentPosition = curPos1;
            _this.fapai(base_count);

        }.bind(currentPoker))

        var mto = cc.moveTo(0.05, cc.v2((-size.width / 2)+ 20 + 72+2.2*seq,(-size.height / 2) + 95 + 160));
        var d1 = cc.delayTime(0.01);
        var seque = cc.sequence([d1, mto, end_func]);
        currentPoker.runAction(seque);
        
    },

    fanzhuan:function(pokernode) {
        let size = cc.view.getVisibleSize();
        var _this = this;
        // 先反转90变正面数据，再反转-90回来，结束，整个过程移动牌面到指定位置
        var d1 = cc.delayTime(0.01);
        // var mto = cc.moveTo(0.3, cc.v2(0 + 69,(-size.height / 2) + 95 + 160));

        var pos1 = pokernode.convertToWorldSpaceAR(cc.v2(0,0));
        var pos2 = _this.CurrentPoker.node.convertToWorldSpaceAR(cc.v2(0,0));
        var mto = cc.moveBy(0.15, cc.v2(pos2.x - pos1.x + 66,pos2.y - pos1.y));
        var fan1 = cc.scaleTo(0.15, 0.2, 1);
        var changeFront = cc.callFunc(function(target) {
            target.getChildByName("FrontView").active = true;
            target.getChildByName("Background").active = false;
        });
        
        var spawn = cc.spawn([mto,fan1]);
        pokernode.runAction(spawn);
        var d2 = cc.delayTime(0.15);
        var fan2 = cc.scaleTo(0.1, 1, 1);
        var animationFinished = cc.callFunc(function(target) {
            target.CurrentPosition = target.getPosition();
            
            var curPos1 = target.convertToWorldSpaceAR(cc.v2(0,0));
            var curPos2 = _this.CurrentPoker.node.convertToNodeSpaceAR(curPos1);
            // cc.log(target);
            target.setPosition(curPos2);
            target.PreviousParent = target.parent;
            target.parent = _this.CurrentPoker.node;
            // cc.log(target.CurrentPosition);
            target.PreviousPosition = target.CurrentPosition;
            target.CurrentPosition = curPos1;
        });
        var sequ = cc.sequence([d2,changeFront,fan2,animationFinished]);
        pokernode.runAction(sequ);

        // var d3 = cc.delayTime(1.3);
        // var destroyPokerNode = cc.callFunc(function(target) {
        //     target.removeFromParent(true);
        //     target.destroy();
        // });
        // var sequ2 = cc.sequence([d3,destroyPokerNode]);
        // pokernode.runAction(sequ2);
    },


    pokerRandom:function() {
        var array = new Array();
        do {
            var num = this.randomNum(1,53);
            if (array.indexOf(num) === -1) {
                array.push(num);
            } else {
                var index = array.indexOf(num);
            }
        } while (array.length < 52);
        return array;
    },
    //生成从minNum到maxNum的随机数
    randomNum:function(minNum, maxNum) {
        var num = Math.floor(Math.random()*(minNum - maxNum) + maxNum);
        return num;
    },

    StashClick:function (staBut) {
        var _this = this;
        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        var pokerNode = mainJS.CurrentPoker.node;
        var BackgroundView = staBut.currentTarget.getChildByName('Background');
        if (BackgroundView.childrenCount > 0) {



            if (pokerNode.childrenCount > 0) {
                cc.log("中间节点被占了,需要先执行中间卡牌动画");
            } else {
                
            }


            // 执行回转动画
            var poker = BackgroundView.children[0];
            // 先切换挂载的节点
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


            var pos1 = poker.convertToWorldSpaceAR(cc.v2(0,0));
            var pos3 = pokerNode.convertToWorldSpaceAR(cc.v2(0,0));
            var pos2 = pokerNode.convertToNodeSpaceAR(pos1);
            poker.setPosition(pos2);
            var mto = cc.moveBy(0.15, cc.v2(pos3.x - pos1.x + 65,pos3.y - pos1.y));
            var totation = cc.rotateTo(0.15,0);
            var spawn = cc.spawn([mto,totation]);
            poker.runAction(spawn);
            poker.PreviousParent = poker.parent;
            poker.parent = pokerNode;
            poker.CurrentPosition = poker.PreviousPosition;
            poker.PreviousPosition = cc.v2(0,0);
            // 执行牌局回退


        } else {
            if (_this.CurrentPoker.node.childrenCount > 0) {
                cc.log("我有孩子节点");
                // 执行旋转动画
                var poker = _this.CurrentPoker.node.children[0];

                // 先切换挂载的节点
                var curPos1 = poker.convertToWorldSpaceAR(cc.v2(0,0));
                var curPos3 = BackgroundView.convertToWorldSpaceAR(cc.v2(0,0));
                poker.setPosition(cc.v2(curPos1.x - curPos3.x,curPos1.y - curPos3.y));
                poker.PreviousParent = poker.parent;
                poker.parent = BackgroundView;

                var pos1 = poker.convertToWorldSpaceAR(cc.v2(0,0));
                var pos2 = BackgroundView.convertToWorldSpaceAR(cc.v2(0,0));
                var mto = cc.moveBy(0.15, cc.v2(pos2.x - pos1.x,pos2.y - pos1.y));
                var totation = cc.rotateTo(0.15,17);
                var spawn = cc.spawn([mto,totation]);
                poker.runAction(spawn);
                poker.getComponent(cc.Button).interactable = false;
                poker.interactable = false;
                var pos3 = poker.convertToWorldSpaceAR(cc.v2(0,0));
                poker.PreviousPosition = poker.CurrentPosition;
                poker.CurrentPosition = pos3;
                // 执行牌局跟进
                var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
                cc.log(mainJS.PokerInstanceBackground.node.children);
                var frontPoker = mainJS.PokerInstanceBackground.node.children[mainJS.PokerInstanceBackground.node.childrenCount - 1];
                cc.log(frontPoker);
                mainJS.fanzhuan(frontPoker);
            }
        }
    },

    stashAnimation:function (staBut) {
        if (condition) {
            
        }
    }

    // update (dt) {},
});
