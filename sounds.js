const sound = new Howl({
    src: ['piano.ogg'],
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
class PlayingNote{
    constructor(note, startTime, endTime) {
        this.note = note;
        this.start = startTime;
        this.end = endTime;
        this.soundObj = null;
        this.noteObj = null;
    }

    get noteName(){
        return this.note;
    }

    get startTime(){
        return this.start;
    }

    get endTime() {
        return this.end;
    }

    get sound(){
        return this.soundObj;
    }
    set setSound(x){
        this.soundObj = x;
    }
}

const notes_to_play = new Queue();
let currentSoundsCount = 0;
let playing = [];
let fallingNotesObject = new Queue();
const screen_height = window.innerHeight;
const notes_field_height = 0.75 * screen_height;
const seconds_on_notes_field = 10;
const pixels_per_second = notes_field_height / seconds_on_notes_field;
let lastRender = 0;
function load_sample_song() {
    // CC GG AA G FF EE DD C GG FF EE D GG FF EE D
    notes_to_play.enqueue(new PlayingNote('c4', 2000, 3500));
    notes_to_play.enqueue(new PlayingNote('c4', 3500, 4000));

    notes_to_play.enqueue(new PlayingNote('g4', 4000, 4500));
    notes_to_play.enqueue(new PlayingNote('g4', 4500, 5000));

    notes_to_play.enqueue(new PlayingNote('a4', 5000, 5500));
    notes_to_play.enqueue(new PlayingNote('a4', 5500, 6000));

    notes_to_play.enqueue(new PlayingNote('g4', 6000, 6500));

    notes_to_play.enqueue(new PlayingNote('f4', 7000, 7500));
    notes_to_play.enqueue(new PlayingNote('f4', 7500, 8000));

    notes_to_play.enqueue(new PlayingNote('e4', 8000, 8500));
    notes_to_play.enqueue(new PlayingNote('e4', 8500, 9000));

    notes_to_play.enqueue(new PlayingNote('d4', 9000, 9500));
    notes_to_play.enqueue(new PlayingNote('d4', 9500, 10000));

    notes_to_play.enqueue(new PlayingNote('c4', 10000, 10500));

    notes_to_play.enqueue(new PlayingNote('g4', 11000, 11500));
    notes_to_play.enqueue(new PlayingNote('g4', 11500, 12000));

    notes_to_play.enqueue(new PlayingNote('f4', 12000, 12500));
    notes_to_play.enqueue(new PlayingNote('f4', 12500, 13000));

    notes_to_play.enqueue(new PlayingNote('e4', 13000, 13500));
    notes_to_play.enqueue(new PlayingNote('e4', 13500, 14000));

    notes_to_play.enqueue(new PlayingNote('d4', 14000, 14500));

    notes_to_play.enqueue(new PlayingNote('g4', 15000, 15500));
    notes_to_play.enqueue(new PlayingNote('g4', 15500, 16000));

    notes_to_play.enqueue(new PlayingNote('f4', 16000, 16500));
    notes_to_play.enqueue(new PlayingNote('f4', 16500, 17000));

    notes_to_play.enqueue(new PlayingNote('e4', 17000, 17500));
    notes_to_play.enqueue(new PlayingNote('e4', 17500, 18000));

    notes_to_play.enqueue(new PlayingNote('d4', 18000, 18500));
}

(function () {
    load_sample_song();
    window.requestAnimationFrame(loop);

})();

function update(progress, timestamp) {
    // Update the state of the world for the elapsed time since last render
    create_falling_notes(timestamp);
    console.log(timestamp);
    if(notes_to_play.length !== 0)
    {
        const current_task = notes_to_play.peek();
        if(current_task.startTime <= timestamp)
        {
            //current_task.setSound = sound.play(current_task.noteName);
            playing[currentSoundsCount] = current_task;
            currentSoundsCount++;
            notes_to_play.dequeue();
        }
    }
    for(let i = 0; i < playing.length; i++){
        if(playing[i].end <= timestamp)
        {
            //sound.stop(playing[i].sound);
        }
    }
}


function create_falling_notes(timestamp) {
    for(let i = 0; i < notes_to_play.length; i++)
    {
        if(notes_to_play[i].start + (seconds_on_notes_field * 1000) < timestamp)
        {

        }
    }
    let obj_created = document.createElement("div");
    obj_created.classList.add('falling-notes-big');
    obj_created.id = 'fn-1';
    obj_created.style.height = (((3500 - 2000) / 1000) * pixels_per_second) + 'px';
    obj_created.style.position = 'absolute';
    obj_created.style.top = '10px';
    obj_created.style.left = '10px';

    fallingNotesObject.enqueue(obj_created);
    document.getElementById('falling-notes-space').appendChild(obj_created);
}
function draw(progress) {

    for(let i = 0; i < fallingNotesObject.length; i++)
    {
        let element = fallingNotesObject[i];

        let currentTop = element.getBoundingClientRect().top;
        let offset = (progress / 1000) * pixels_per_second;
        element.style.top = (currentTop + offset).toString() + 'px';

        if (currentTop > notes_field_height)
        {
            element.visibility = 'hidden';
        }
    }

}

function loop(timestamp) {
    let progress = timestamp - lastRender

    update(progress, timestamp)
    draw(progress)

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
