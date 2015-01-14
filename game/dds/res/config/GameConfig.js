/**
 * Created by lingjianfeng on 14-8-31.
 */



var GC = GC || {};

GC.winSize = cc.size(720, 1200);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = true;

GC.GAME_STATE_ENUM = {
    HOME : 0,
    PLAY : 1,
    OVER : 2
}

GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;


//container
GC.CONTAINER = {
    ENEMIES : [],
    ENEMY_BULLETS : [],
    PLAYER_BULLETS : [],
    SPARKS : [],
    EXPLOSIONS : []

};

//bullet speed
GC.BULLET_SPEED = {
    ENEMY : -200,
    SHIP : 900
};

//attack mode
GC.ENEMY_ATTACK_MODE = {
    NORMAL : 1,
    TSUIHIKIDAN : 2
};

//unit tag
GC.UNIT_TAG = {
    ENMEY_BULLET : 900,
    PLAYER_BULLET : 901,
    ENEMY : 1000,
    PLAYER : 1000
};

//enemy move type
GC.ENEMY_MOVE_TYPE = {
    ATTACK:0,
    VERTICAL:1,
    HORIZONTAL:2,
    OVERLAP:3
};
