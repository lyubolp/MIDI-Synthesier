class Queue extends Array {
    enqueue(val) {
        this.push(val);
    }

    dequeue() {
        return this.shift();
    }

    peek() {
        return this[0];
    }

    isEmpty() {
        return this.length === 0;
    }
}

class PlayingNote {
    constructor(note, startTime, endTime) {
        this.note = note;
        this.start = startTime;
        this.end = endTime;
        this.soundObj = null;
        this.color = null;
    }

    get noteName() {
        return this.note;
    }

    get startTime() {
        return this.start;
    }

    get endTime() {
        return this.end;
    }

    get sound() {
        return this.soundObj;
    }

    set setSound(x) {
        this.soundObj = x;
    }

    get getColor() {
        return this.color;
    }

    set setColor(x) {
        this.color = x;
    }
}

const notes_to_play = new Queue();
let sound;
let currentSoundsCount = 0;
let notes_playing = [];
let fallingNotesObject = new Queue();
const screen_height = window.innerHeight;
const notes_field_height = 0.75 * screen_height;
const milliseconds_on_notes_field = 10000;
const pixels_per_millisecond = notes_field_height / milliseconds_on_notes_field;
let falling_notes_count = 0;
let lastRender = 0;
const white_key_width = 1.9;
const colors = ['D1253C', 'FAAB17', '287D61', 'F43815', '199C72', 'f51720', 'f8d210', 'A7C30E'];
let playing = true;
let real_timestamp = 0;

function load_sounds() {
    sounds = new Map();
    sounds.set('a0', new Howl({
        src: ['sounds/a0.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_0', new Howl({
        src: ['sounds/a-0.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b0', new Howl({
        src: ['sounds/b0.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c1', new Howl({
        src: ['sounds/c1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_1', new Howl({
        src: ['sounds/c-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d1', new Howl({
        src: ['sounds/d1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_1', new Howl({
        src: ['sounds/d-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e1', new Howl({
        src: ['sounds/e1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f1', new Howl({
        src: ['sounds/f1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_1', new Howl({
        src: ['sounds/f-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g1', new Howl({
        src: ['sounds/g1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_1', new Howl({
        src: ['sounds/g-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a1', new Howl({
        src: ['sounds/a1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_1', new Howl({
        src: ['sounds/a-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b1', new Howl({
        src: ['sounds/b1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c2', new Howl({
        src: ['sounds/c2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_2', new Howl({
        src: ['sounds/c-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d2', new Howl({
        src: ['sounds/d2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_2', new Howl({
        src: ['sounds/d-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e2', new Howl({
        src: ['sounds/e2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f2', new Howl({
        src: ['sounds/f2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_2', new Howl({
        src: ['sounds/f-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g2', new Howl({
        src: ['sounds/g2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_2', new Howl({
        src: ['sounds/g-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a2', new Howl({
        src: ['sounds/a2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_2', new Howl({
        src: ['sounds/a-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b2', new Howl({
        src: ['sounds/b2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c3', new Howl({
        src: ['sounds/c3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_3', new Howl({
        src: ['sounds/c-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d3', new Howl({
        src: ['sounds/d3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_3', new Howl({
        src: ['sounds/d-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e3', new Howl({
        src: ['sounds/e3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f3', new Howl({
        src: ['sounds/f3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_3', new Howl({
        src: ['sounds/f-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g3', new Howl({
        src: ['sounds/g3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_3', new Howl({
        src: ['sounds/g-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a3', new Howl({
        src: ['sounds/a3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_3', new Howl({
        src: ['sounds/a-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b3', new Howl({
        src: ['sounds/b3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c4', new Howl({
        src: ['sounds/c4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_4', new Howl({
        src: ['sounds/c-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d4', new Howl({
        src: ['sounds/d4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_4', new Howl({
        src: ['sounds/d-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e4', new Howl({
        src: ['sounds/e4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f4', new Howl({
        src: ['sounds/f4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_4', new Howl({
        src: ['sounds/f-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g4', new Howl({
        src: ['sounds/g4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_4', new Howl({
        src: ['sounds/g-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a4', new Howl({
        src: ['sounds/a4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_4', new Howl({
        src: ['sounds/a-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b4', new Howl({
        src: ['sounds/b4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c5', new Howl({
        src: ['sounds/c5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_5', new Howl({
        src: ['sounds/c-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d5', new Howl({
        src: ['sounds/d5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_5', new Howl({
        src: ['sounds/d-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e5', new Howl({
        src: ['sounds/e5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f5', new Howl({
        src: ['sounds/f5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_5', new Howl({
        src: ['sounds/f-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g5', new Howl({
        src: ['sounds/g5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_5', new Howl({
        src: ['sounds/g-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a5', new Howl({
        src: ['sounds/a5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_5', new Howl({
        src: ['sounds/a-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b5', new Howl({
        src: ['sounds/b5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c6', new Howl({
        src: ['sounds/c6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_6', new Howl({
        src: ['sounds/c-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d6', new Howl({
        src: ['sounds/d6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_6', new Howl({
        src: ['sounds/d-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e6', new Howl({
        src: ['sounds/e6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f6', new Howl({
        src: ['sounds/f6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_6', new Howl({
        src: ['sounds/f-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g6', new Howl({
        src: ['sounds/g6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_6', new Howl({
        src: ['sounds/g-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a6', new Howl({
        src: ['sounds/a6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_6', new Howl({
        src: ['sounds/a-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b6', new Howl({
        src: ['sounds/b6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c7', new Howl({
        src: ['sounds/c7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_7', new Howl({
        src: ['sounds/c-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d7', new Howl({
        src: ['sounds/d7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_7', new Howl({
        src: ['sounds/d-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e7', new Howl({
        src: ['sounds/e7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f7', new Howl({
        src: ['sounds/f7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_7', new Howl({
        src: ['sounds/f-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g7', new Howl({
        src: ['sounds/g7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_7', new Howl({
        src: ['sounds/g-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a7', new Howl({
        src: ['sounds/a7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_7', new Howl({
        src: ['sounds/a-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b7', new Howl({
        src: ['sounds/b7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c8', new Howl({
        src: ['sounds/c8.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sound = new Howl({
        src: ['piano.ogg', 'piano.mp3'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
        sprite: {
            a_0: [0, 9150.113378684808],
            a0: [11000, 9240.090702947848],
            a_1: [22000, 15561.723356009068],
            a1: [39000, 10017.959183673469],
            a_2: [51000, 10607.165532879815],
            a2: [63000, 7637.9138321995415],
            a_3: [72000, 9762.539682539675],
            a3: [83000, 8215.510204081642],
            a_4: [93000, 8328.707482993195],
            a4: [103000, 6427.573696145118],
            a_5: [111000, 5835.464852607707],
            a5: [118000, 5014.058956916109],
            a_6: [125000, 3031.655328798195],
            a6: [130000, 2869.1156462585204],
            a_7: [134000, 1493.333333333343],
            a7: [137000, 1034.7392290249409],
            b0: [140000, 10319.81859410432],
            b1: [152000, 7516.009070294793],
            b2: [161000, 6349.206349206361],
            b3: [169000, 9791.564625850326],
            b4: [180000, 6198.2766439909465],
            b5: [188000, 4265.2154195011535],
            b6: [194000, 2564.3537414965976],
            b7: [198000, 2152.199546485266],
            c_1: [202000, 10842.267573696154],
            c1: [214000, 10183.40136054423],
            c_2: [226000, 10662.31292517006],
            c2: [238000, 11292.154195011331],
            c_3: [251000, 11654.965986394614],
            c3: [264000, 15024.761904761952],
            c_4: [281000, 10583.945578231302],
            c4: [293000, 10999.002267573727],
            c_5: [305000, 6741.0430839002365],
            c5: [313000, 9118.185941043077],
            c_6: [324000, 5092.426303854911],
            c6: [331000, 5179.501133786864],
            c_7: [338000, 3676.0090702947928],
            c7: [343000, 1841.632653061184],
            c8: [346000, 1673.2879818594083],
            d_1: [349000, 12316.734693877574],
            d1: [363000, 9065.941043083905],
            d_2: [374000, 13312.290249433077],
            d2: [389000, 10113.741496598639],
            d_3: [401000, 10615.873015873018],
            d3: [413000, 10792.925170068047],
            d_4: [425000, 8929.523809523787],
            d4: [435000, 10142.76643990929],
            d_5: [447000, 9057.23356009071],
            d5: [458000, 11054.149659863906],
            d_6: [471000, 5957.369614512485],
            d6: [478000, 6526.258503401361],
            d_7: [486000, 3539.591836734675],
            d7: [491000, 2515.011337868462],
            e1: [495000, 8981.768707483017],
            e2: [505000, 9936.68934240361],
            e3: [516000, 11385.034013605444],
            e4: [529000, 9510.02267573704],
            e5: [540000, 7814.965986394556],
            e6: [549000, 2999.72789115645],
            e7: [553000, 1679.0929705215385],
            f_1: [556000, 12969.795918367337],
            f1: [570000, 9579.682539682486],
            f_2: [581000, 13315.192743764259],
            f2: [596000, 10148.571428571478],
            f_3: [608000, 12888.526077097515],
            f3: [622000, 15648.798185941065],
            f_4: [639000, 8064.580498866271],
            f4: [649000, 8320.0],
            f_5: [659000, 7321.541950113373],
            f5: [668000, 13921.814058956923],
            f_6: [683000, 3948.8435374150285],
            f6: [688000, 3629.569160997751],
            f_7: [693000, 2529.5238095237873],
            f7: [697000, 1641.3605442177504],
            g_1: [700000, 12351.564625850297],
            g1: [714000, 15158.276643990888],
            g_2: [731000, 9814.784580498934],
            g2: [742000, 9257.505668934202],
            g_3: [753000, 10520.090702947811],
            g3: [765000, 13402.267573696095],
            g_4: [780000, 7379.591836734675],
            g4: [789000, 8537.68707482994],
            g_5: [799000, 4790.566893424024],
            g5: [805000, 6714.920634920592],
            g_6: [813000, 4288.435374149703],
            g6: [819000, 3197.0975056688767],
            g_7: [824000, 1705.2154195010662],
            g7: [827000, 2143.492063492071],
        }
    });
}
function load_sample_song() {
    //EEE EEE EGCDE FFF FFEE EEEDDEDG
    //EEE EEE EGCDE FFF FFEE EEGGFDC

    notes_to_play.enqueue(new PlayingNote('e4', 3000, 3600));
    notes_to_play.enqueue(new PlayingNote('e4', 3650, 4350));
    notes_to_play.enqueue(new PlayingNote('e4', 4400, 5100));

    notes_to_play.enqueue(new PlayingNote('e4', 5300, 5900));
    notes_to_play.enqueue(new PlayingNote('e4', 5950, 6550));
    notes_to_play.enqueue(new PlayingNote('e4', 6600, 7200));

    notes_to_play.enqueue(new PlayingNote('e4', 7400, 8000));
    notes_to_play.enqueue(new PlayingNote('g4', 8050, 8650));
    notes_to_play.enqueue(new PlayingNote('c4', 8700, 9300));
    notes_to_play.enqueue(new PlayingNote('d4', 9350, 9950));
    notes_to_play.enqueue(new PlayingNote('e4', 10000, 10600));

    notes_to_play.enqueue(new PlayingNote('f4', 10800, 11400));
    notes_to_play.enqueue(new PlayingNote('f4', 11450, 12050));
    notes_to_play.enqueue(new PlayingNote('f4', 12100, 12700));

    notes_to_play.enqueue(new PlayingNote('f4', 12800, 13100));
    notes_to_play.enqueue(new PlayingNote('f4', 13150, 13450));
    notes_to_play.enqueue(new PlayingNote('e4', 13500, 14100));
    notes_to_play.enqueue(new PlayingNote('e4', 14150, 14750));

    notes_to_play.enqueue(new PlayingNote('e4', 14800, 15100));
    notes_to_play.enqueue(new PlayingNote('e4', 15150, 15450));
    notes_to_play.enqueue(new PlayingNote('e4', 15150, 15450));
    notes_to_play.enqueue(new PlayingNote('d4', 15500, 16100));
    notes_to_play.enqueue(new PlayingNote('d4', 16150, 16750));
    notes_to_play.enqueue(new PlayingNote('e4', 16800, 17400));
    notes_to_play.enqueue(new PlayingNote('d4', 17450, 18050));
    notes_to_play.enqueue(new PlayingNote('g4', 18100, 18700));

    notes_to_play.enqueue(new PlayingNote('e4', 18750, 19350));
    notes_to_play.enqueue(new PlayingNote('e4', 19400, 20000));
    notes_to_play.enqueue(new PlayingNote('e4', 20050, 20650));

    notes_to_play.enqueue(new PlayingNote('e4', 20850, 21450));
    notes_to_play.enqueue(new PlayingNote('e4', 21500, 22100));
    notes_to_play.enqueue(new PlayingNote('e4', 22150, 22750));

    notes_to_play.enqueue(new PlayingNote('e4', 23000, 23600));
    notes_to_play.enqueue(new PlayingNote('g4', 23650, 24250));
    notes_to_play.enqueue(new PlayingNote('c4', 24300, 24900));
    notes_to_play.enqueue(new PlayingNote('d4', 24950, 25550));
    notes_to_play.enqueue(new PlayingNote('e4', 25600, 26200));

    notes_to_play.enqueue(new PlayingNote('f4', 26450, 27050));
    notes_to_play.enqueue(new PlayingNote('f4', 27100, 27700));
    notes_to_play.enqueue(new PlayingNote('f4', 27750, 28350));

    notes_to_play.enqueue(new PlayingNote('f4', 28600, 28900));
    notes_to_play.enqueue(new PlayingNote('f4', 28950, 29250))
    notes_to_play.enqueue(new PlayingNote('e4', 29300, 29900));
    notes_to_play.enqueue(new PlayingNote('e4', 29950, 30550));

    notes_to_play.enqueue(new PlayingNote('e4', 30600, 30900));
    notes_to_play.enqueue(new PlayingNote('e4', 30950, 31250));
    notes_to_play.enqueue(new PlayingNote('g4', 31300, 31900));
    notes_to_play.enqueue(new PlayingNote('g4', 31950, 32550));
    notes_to_play.enqueue(new PlayingNote('f4', 32600, 33200));
    notes_to_play.enqueue(new PlayingNote('d4', 33250, 33850));
    notes_to_play.enqueue(new PlayingNote('c4', 33900, 34500));

    notes_to_play.enqueue(new PlayingNote('g4', 34700, 35300));
    notes_to_play.enqueue(new PlayingNote('e4', 35350, 35950));
    notes_to_play.enqueue(new PlayingNote('d4', 36000, 36600));
    notes_to_play.enqueue(new PlayingNote('c4', 36650, 37250));
    notes_to_play.enqueue(new PlayingNote('g4', 37300, 37900));

    notes_to_play.enqueue(new PlayingNote('g4', 38100, 38700));
    notes_to_play.enqueue(new PlayingNote('g4', 38750, 39350));
    notes_to_play.enqueue(new PlayingNote('g4', 39400, 40000));
    notes_to_play.enqueue(new PlayingNote('e4', 40050, 40650));
    notes_to_play.enqueue(new PlayingNote('d4', 40700, 41300));
    notes_to_play.enqueue(new PlayingNote('c4', 41350, 41950));
    notes_to_play.enqueue(new PlayingNote('a4', 42000, 42600));

    console.log("Done creating the song queue");
}

function init_white_falling_note(note_to_play) {
    let obj_created = document.createElement("div");

    obj_created.classList.add('falling-notes-big');

    obj_created.id = 'fn-' + note_to_play.note;

    let object_height = ((note_to_play.end - note_to_play.start) * pixels_per_millisecond);
    obj_created.style.height = object_height + 'px';
    obj_created.style.position = 'absolute';

    let top_position = (notes_field_height - object_height) - (note_to_play.start * pixels_per_millisecond);
    let left_position = 0;

    if (note_to_play.note === 'a0') {
        left_position = 0;
    } else if (note_to_play.note === 'b0') {
        left_position = white_key_width;
    } else {
        left_position = 2 * white_key_width;
        left_position += (note_to_play.note[1] - 1) * white_key_width * 7;

        if (note_to_play.note[0] === 'a') {
            left_position += ('h'.charCodeAt(0) - 'c'.charCodeAt(0)) * white_key_width;
        } else if (note_to_play.note[0] === 'b') {
            left_position += ('i'.charCodeAt(0) - 'c'.charCodeAt(0)) * white_key_width;
        } else {
            left_position += (note_to_play.note[0].charCodeAt(0) - 'c'.charCodeAt(0)) * white_key_width;
        }
    }
    obj_created.style.top = top_position + 'px';
    obj_created.style.left = left_position + 'vw';
    obj_created.style.backgroundColor = '#' + colors[Math.floor(Math.random() * colors.length)];

    falling_notes_count++;

    return obj_created;
}
function init_black_falling_note(note_to_play) {
    let obj_created = document.createElement("div");
    obj_created.classList.add('falling-notes-small');

    obj_created.id = 'fn-' + note_to_play.note;

    let object_height = ((note_to_play.end - note_to_play.start) * pixels_per_millisecond);
    obj_created.style.height = object_height + 'px';
    obj_created.style.position = 'absolute';

    let top_position = (notes_field_height - object_height) - (note_to_play.start * pixels_per_millisecond);
    let left_position = 0;

    const black_keys_offset = 13.3;
    if (note_to_play.note === 'a_0') {
        left_position = 1.3;
    } else {
        left_position = 3.8;
        left_position += (note_to_play.note[2] - 1) * black_keys_offset;
        offset_table = {'c': 1.3, 'd': 3.2, 'f': 7.0, 'g': 8.9, 'a': 10.8}
        left_position += offset_table[note_to_play.note[0]];

    }
    obj_created.style.top = top_position + 'px';
    obj_created.style.left = left_position + 'vw';
    obj_created.style.backgroundColor = '#' + colors[Math.floor(Math.random() * 4)];

    falling_notes_count++;

    return obj_created;
}

function init_falling_notes() {
    for (let i = 0; i < notes_to_play.length; i++) {
        let obj_created;
        if (notes_to_play[i].note.includes('_')) {
            obj_created = init_black_falling_note(notes_to_play[i]);
        } else {
            obj_created = init_white_falling_note(notes_to_play[i]);
        }
        fallingNotesObject.push(obj_created);
        notes_to_play[i].setColor = obj_created.style.backgroundColor;
        document.getElementById('falling-notes-space').appendChild(obj_created);
    }
}
function play_pause()
{
    if(playing)
    {
        document.getElementById('play-pause').innerText = 'Изпълняване';
        playing = false;
    }
    else
    {
        playing = true;
        window.requestAnimationFrame(loop);
        document.getElementById('play-pause').innerText = 'Пауза';
    }
}

(function () {
    load_sounds();
    load_sample_song();
    init_falling_notes();
    window.requestAnimationFrame(loop);
})();

function update(progress, timestamp) {
    console.log(notes_playing.length);
    // Update the state of the world for the elapsed time since last render
    if (notes_to_play.length !== 0) {
        const current_task = notes_to_play.peek();
        if (current_task.startTime <= timestamp) {
            //current_task.setSound = sound.play(current_task.noteName);
            sounds.get(current_task.noteName).play();
            notes_playing[currentSoundsCount] = current_task;
            currentSoundsCount++;
            notes_to_play.dequeue();
        }
    }
    let indexes_to_be_removed = [];
    for (let i = 0; i < notes_playing.length; i++) {
        if (notes_playing[i].end <= timestamp) {
            sounds.get(notes_playing[i].noteName).stop();
            //sound.stop(notes_playing[i].sound);
            indexes_to_be_removed.push(i);
        }
    }

    for (let index_to_be_removed in indexes_to_be_removed) {
        notes_playing.splice(index_to_be_removed, 1);
        currentSoundsCount--;
    }
}

function draw(progress) {
    for (let i = 0; i < fallingNotesObject.length; i++) {
        let element = fallingNotesObject[i];

        let currentTop = element.getBoundingClientRect().top;
        let offset = progress * pixels_per_millisecond;
        element.style.top = (currentTop + offset).toString() + 'px';

        if (currentTop > notes_field_height) {
            const note_to_clear = element.id.slice(3);
            if (note_to_clear.indexOf('_') === -1) {
                document.getElementById(note_to_clear).style.backgroundColor = "#FFFFFF";
            } else {
                document.getElementById(note_to_clear).style.backgroundColor = "#000000";
            }
            element.parentNode.removeChild(element);
        }
    }
    for (let i = 0; i < notes_playing.length; i++) {
        document.getElementById(notes_playing[i].note).style.backgroundColor = notes_playing[i].getColor;
    }
}

function loop(timestamp) {
    if(playing)
    {
        let progress = timestamp - lastRender;
        real_timestamp += progress;
        update(progress, real_timestamp);
        draw(progress);
    }
    window.requestAnimationFrame(loop);
    lastRender = timestamp;
    console.log(real_timestamp);
}

