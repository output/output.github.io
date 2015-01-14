/**
 * Created by lingjianfeng on 14-8-31.
 */

var DishuType = [
    {
        type: 0,
        textureName: "E0.png",
        bulletType: "W2.png",
        HP: 1,
        moveType: GC.ENEMY_MOVE_TYPE.ATTACK,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: 15, comment: "苍蝇"


    },
    {
        type: 1,
        textureName: "E1.png",
        bulletType: "W2.png",
        HP: 2,
        moveType: GC.ENEMY_MOVE_TYPE.ATTACK,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: 40,
        comment: "蚊子"
    },
    {
        type: 2,
        textureName: "E2.png",
        bulletType: "W2.png",
        HP: 4,
        moveType: GC.ENEMY_MOVE_TYPE.HORIZONTAL,
        attackMode: GC.ENEMY_ATTACK_MODE.TSUIHIKIDAN,
        scoreValue: 60,
        comment: "蟑螂"
    },
    {
        type: 3,
        textureName: "E3.png",
        bulletType: "W2.png",
        HP: 6,
        moveType: GC.ENEMY_MOVE_TYPE.OVERLAP,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: 100,
        comment: "老鼠"
    },
    {
        type: 4,
        textureName: "E4.png",
        bulletType: "W2.png",
        HP: 10,
        moveType: GC.ENEMY_MOVE_TYPE.HORIZONTAL,
        attackMode: GC.ENEMY_ATTACK_MODE.TSUIHIKIDAN,
        scoreValue: -20,
        comment: "青蛙"
    },
    {
        type: 5,
        textureName: "E5.png",
        bulletType: "W2.png",
        HP: 15,
        moveType: GC.ENEMY_MOVE_TYPE.HORIZONTAL,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: -50,
        comment: "麻雀"
    }
];
