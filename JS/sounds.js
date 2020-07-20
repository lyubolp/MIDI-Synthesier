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
let playing = false;
let real_timestamp = 0;

function load_sounds() {
    sounds = new Map();
    sounds.set('a0', new Howl({
        src: ['../sounds/a0.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_0', new Howl({
        src: ['../sounds/a-0.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b0', new Howl({
        src: ['../sounds/b0.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c1', new Howl({
        src: ['../sounds/c1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_1', new Howl({
        src: ['../sounds/c-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d1', new Howl({
        src: ['../sounds/d1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_1', new Howl({
        src: ['../sounds/d-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e1', new Howl({
        src: ['../sounds/e1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f1', new Howl({
        src: ['../sounds/f1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_1', new Howl({
        src: ['../sounds/f-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g1', new Howl({
        src: ['../sounds/g1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_1', new Howl({
        src: ['../sounds/g-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a1', new Howl({
        src: ['../sounds/a1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_1', new Howl({
        src: ['../sounds/a-1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b1', new Howl({
        src: ['../sounds/b1.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c2', new Howl({
        src: ['../sounds/c2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_2', new Howl({
        src: ['../sounds/c-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d2', new Howl({
        src: ['../sounds/d2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_2', new Howl({
        src: ['../sounds/d-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e2', new Howl({
        src: ['../sounds/e2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f2', new Howl({
        src: ['../sounds/f2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_2', new Howl({
        src: ['../sounds/f-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g2', new Howl({
        src: ['../sounds/g2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_2', new Howl({
        src: ['../sounds/g-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a2', new Howl({
        src: ['../sounds/a2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_2', new Howl({
        src: ['../sounds/a-2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b2', new Howl({
        src: ['../sounds/b2.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c3', new Howl({
        src: ['../sounds/c3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_3', new Howl({
        src: ['../sounds/c-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d3', new Howl({
        src: ['../sounds/d3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_3', new Howl({
        src: ['../sounds/d-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e3', new Howl({
        src: ['../sounds/e3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f3', new Howl({
        src: ['../sounds/f3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_3', new Howl({
        src: ['../sounds/f-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g3', new Howl({
        src: ['../sounds/g3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_3', new Howl({
        src: ['../sounds/g-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a3', new Howl({
        src: ['../sounds/a3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_3', new Howl({
        src: ['../sounds/a-3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b3', new Howl({
        src: ['../sounds/b3.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c4', new Howl({
        src: ['../sounds/c4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_4', new Howl({
        src: ['../sounds/c-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d4', new Howl({
        src: ['../sounds/d4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_4', new Howl({
        src: ['../sounds/d-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e4', new Howl({
        src: ['../sounds/e4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f4', new Howl({
        src: ['../sounds/f4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_4', new Howl({
        src: ['../sounds/f-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g4', new Howl({
        src: ['../sounds/g4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_4', new Howl({
        src: ['../sounds/g-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a4', new Howl({
        src: ['../sounds/a4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_4', new Howl({
        src: ['../sounds/a-4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b4', new Howl({
        src: ['../sounds/b4.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c5', new Howl({
        src: ['../sounds/c5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_5', new Howl({
        src: ['../sounds/c-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d5', new Howl({
        src: ['../sounds/d5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_5', new Howl({
        src: ['../sounds/d-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e5', new Howl({
        src: ['../sounds/e5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f5', new Howl({
        src: ['../sounds/f5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_5', new Howl({
        src: ['../sounds/f-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g5', new Howl({
        src: ['../sounds/g5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_5', new Howl({
        src: ['../sounds/g-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a5', new Howl({
        src: ['../sounds/a5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_5', new Howl({
        src: ['../sounds/a-5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b5', new Howl({
        src: ['../sounds/b5.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c6', new Howl({
        src: ['../sounds/c6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_6', new Howl({
        src: ['../sounds/c-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d6', new Howl({
        src: ['../sounds/d6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_6', new Howl({
        src: ['../sounds/d-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e6', new Howl({
        src: ['../sounds/e6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f6', new Howl({
        src: ['../sounds/f6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_6', new Howl({
        src: ['../sounds/f-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g6', new Howl({
        src: ['../sounds/g6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_6', new Howl({
        src: ['../sounds/g-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a6', new Howl({
        src: ['../sounds/a6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_6', new Howl({
        src: ['../sounds/a-6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b6', new Howl({
        src: ['../sounds/b6.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c7', new Howl({
        src: ['../sounds/c7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c_7', new Howl({
        src: ['../sounds/c-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d7', new Howl({
        src: ['../sounds/d7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('d_7', new Howl({
        src: ['../sounds/d-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('e7', new Howl({
        src: ['../sounds/e7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f7', new Howl({
        src: ['../sounds/f7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('f_7', new Howl({
        src: ['../sounds/f-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g7', new Howl({
        src: ['../sounds/g7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('g_7', new Howl({
        src: ['../sounds/g-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a7', new Howl({
        src: ['../sounds/a7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('a_7', new Howl({
        src: ['../sounds/a-7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('b7', new Howl({
        src: ['../sounds/b7.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));
    sounds.set('c8', new Howl({
        src: ['../sounds/c8.ogg'],
        buffer: true,
        preload: true,
        html5: true,
        volume: 0.3,
        html5PoolSize: 88,
    }));

}

async function fetch_data(url, dataToSend) {
    try {
        let response = await fetch(url, {
            method: "post",
            body: dataToSend
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

async function import_file() {

    const files = document.querySelector('[type=file]').files;
    let file = files[0];

    let url = "http://localhost/MIDI-Editor/midi-parser.php";
    const dataToSend = new FormData();
    dataToSend.append('file', file);
    const song = await fetch_data(url, dataToSend);
    start_playing(song);
}

function load_song_from_object(song_object)
{
    let data = song_object.track1;
    for(let i = 0; i < data.length; i++){
        notes_to_play.enqueue(new PlayingNote(data[i].note, parseInt(data[i].start), parseInt(data[i].end)));
    }
}

function load_song(song_name) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText).track1;
            for(let i = 0; i < data.length; i++){
                notes_to_play.enqueue(new PlayingNote(data[i].note, parseInt(data[i].start), parseInt(data[i].end)));
            }
            console.log("Done creating the song queue");
        }
    };

    xmlhttp.open("GET", "../songs/" + song_name + ".json", false);
    xmlhttp.send();
}

function start_playing(song_data)
{
    load_song_from_object(song_data);
    init_falling_notes();
    playing = true;
}

function init_falling_note(note_to_play, calculated_left_position)
{
    let obj_created = document.createElement("div");
    obj_created.id = 'fn-' + note_to_play.note;

    let object_height = ((note_to_play.end - note_to_play.start) * pixels_per_millisecond);
    obj_created.style.height = object_height + 'px';

    obj_created.style.position = 'absolute';

    let top_position = (notes_field_height - object_height) - (note_to_play.start * pixels_per_millisecond);
    obj_created.style.top = top_position + 'px';

    obj_created.style.left = calculated_left_position + 'vw';

        obj_created.style.backgroundColor = '#' + colors[Math.floor(Math.random() * colors.length)];

    falling_notes_count++;
    return obj_created;
}
function init_white_falling_note(note_to_play) {
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

    let obj_created = init_falling_note(note_to_play, left_position);
    obj_created.classList.add('falling-notes-big');
    return obj_created;
}
function init_black_falling_note(note_to_play) {
    let left_position = 0;
    const black_keys_offset = 13.3;
    if (note_to_play.note === 'a_0') {
        left_position = 1.3;
    } else {
        left_position = 3.8;
        left_position += (note_to_play.note[2] - 1) * black_keys_offset;
        let offset_table = {'c': 1.3, 'd': 3.2, 'f': 7.0, 'g': 8.9, 'a': 10.8}
        left_position += offset_table[note_to_play.note[0]];
    }

    let obj_created = init_falling_note(note_to_play, left_position);
    obj_created.classList.add('falling-notes-small');
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

function play_pause() {
    if (playing) {
        document.getElementById('play-pause').innerText = 'Изпълняване';
        playing = false;
    } else {
        playing = true;
        window.requestAnimationFrame(loop);
        document.getElementById('play-pause').innerText = 'Пауза';
    }
}

(function () {
    load_sounds();
    document.getElementById("import").addEventListener("change", import_file);
    window.requestAnimationFrame(loop);
})();

function update(progress, timestamp) {
    // Update the state of the world for the elapsed time since last render
    if (notes_to_play.length !== 0) {
        const current_task = notes_to_play.peek();
        if (current_task.startTime <= timestamp) {
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
    if (playing) {
        let progress = timestamp - lastRender;
        real_timestamp += progress;
        update(progress, real_timestamp);
        draw(progress);
    }
    window.requestAnimationFrame(loop);
    lastRender = timestamp;
}

