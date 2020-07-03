// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        BackgroundImage: {
            type:cc.Sprite,
            default:null
        },

        FrontImage: {
            type:cc.Sprite,
            default:null
        },

        NumView: {
            type:cc.Sprite,
            default:null
        },
        DecorsSmallView: {
            type:cc.Sprite,
            default:null
        },
        DecorsBigView: {
            type:cc.Sprite,
            default:null
        },
        PreviousPosition: {
            type:cc.Vec2,
            default:cc.v2(0,0)
        },
        CurrentPosition: {
            type:cc.Vec2,
            default:cc.v2(0,0),
            // get () {
            //     this._CurrentPosition;
            // },
            // set (value) {
            //     this._CurrentPosition = value;
            // }
        },
        PreviousParent: {
            type:cc.Node,
            default:null
        },
        PokerNumber: {
            type:cc.integer,
            default:0,
            // get () {
            //     cc.log("InitPokerGet");
            //     return this._PokerNumber;
            // },
            // set (value) {
            //     cc.log("InitPokerSet");
            //     this._PokerNumber = value;
            // }
        },
        PokerRealNumber: {
            type:cc.integer,
            default:0,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        

    },

    start () {

        this.InitPoker(this.node.PokerNumber);
    },

    onClick:function() {
        // this.fanzhuan(this.node);
        // cc.log(cc.find('Canvas'));
        var mainJS = cc.find('Canvas').getComponent('GameSceneScript');
        var currentNode = cc.find('Canvas').getChildByName('CurrentPoker');
        var pokerInitBg = cc.find('Canvas').getChildByName('PokerInstanceBackground');
        // cc.log(cc.find('Canvas').getChildByName('CurrentPoker'));
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

    fanzhuan:function(pokernode) {
        let size = cc.view.getVisibleSize();
        // 先反转90变正面数据，再反转-90回来，结束，整个过程移动牌面到指定位置
        var d1 = cc.delayTime(0.01);
        var mto = cc.moveTo(0.3, cc.v2(69,(-size.height / 2) + 95 + 160));
        var fan1 = cc.scaleTo(0.3, 0.2, 1);
        // var fan1 = cc.flipX(true);
        var changeFront = cc.callFunc(function(target) {
            target.getChildByName("FrontView").active = true;
            target.getChildByName("Background").active = false;
            // target.convertToWorldSpaceAR(cc.v2(0,0))
        });
        var spawn = cc.spawn([mto,fan1]);
        pokernode.runAction(spawn);
        var d2 = cc.delayTime(0.3);
        var fan2 = cc.scaleTo(0.1, 1, 1);
        var sequ = cc.sequence([d2,changeFront,fan2]);
        pokernode.runAction(sequ);
    },

    InitPoker:function (dianshu) {
        var _this = this;
        var mainSceneScript = cc.find('Canvas').getComponent('GameSceneScript');;
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
                _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_0_'+num);
                _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_2');
                _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_2');
                decorsString = "红桃"
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
                _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_0_'+num);
                _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_0');
                _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_0');
                decorsString = "方片"
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

                _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_1_'+num);
                _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_3');
                _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_3');
                decorsString = "黑桃"
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
                _this.NumView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_1_'+num);
                _this.DecorsSmallView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_small_1');
                _this.DecorsBigView.spriteFrame = mainSceneScript.PokerAtlas.getSpriteFrame('solitaire_big_1');
                decorsString = "草花"
                break;
        
            default:
                break;
        }
        cc.log("点数:"+num+"   "+"花色:"+decorsString+"    实际点数"+_this.node.PokerRealNumber);
        
    }


    // update (dt) {},
});
