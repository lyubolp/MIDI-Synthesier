<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MIDI-Synthesiser</title>
    <link rel="stylesheet" href="../styles/app.css"/>
    <script src="../howler.js"></script>
    <script defer src="../JS/sounds.js"></script>
</head>
<body>
    <header>
        <input type="file" id="import" value="Отваряне"/>
        <button id="play-pause" onclick="play_pause()">Пауза</button>
    </header>
    <div id="falling-notes-space">

    </div>
    <div class="piano-block-white">
        <div id="a0" class="piano-key-white" onclick="foo()"></div>
        <div id="b0" class="piano-key-white"></div>
        <div id="c1" class="piano-key-white"></div>
        <div id="d1" class="piano-key-white"></div>
        <div id="e1" class="piano-key-white"></div>
        <div id="f1" class="piano-key-white"></div>
        <div id="g1" class="piano-key-white"></div>
        <div id="a1" class="piano-key-white"></div>
        <div id="b1" class="piano-key-white"></div>

        <div id="c2" class="piano-key-white"></div>
        <div id="d2" class="piano-key-white"></div>
        <div id="e2" class="piano-key-white"></div>
        <div id="f2" class="piano-key-white"></div>
        <div id="g2" class="piano-key-white"></div>
        <div id="a2" class="piano-key-white"></div>
        <div id="b2" class="piano-key-white"></div>

        <div id="c3" class="piano-key-white"></div>
        <div id="d3" class="piano-key-white"></div>
        <div id="e3" class="piano-key-white"></div>
        <div id="f3" class="piano-key-white"></div>
        <div id="g3" class="piano-key-white"></div>
        <div id="a3" class="piano-key-white"></div>
        <div id="b3" class="piano-key-white"></div>

        <div id="c4" class="piano-key-white"></div>
        <div id="d4" class="piano-key-white"></div>
        <div id="e4" class="piano-key-white"></div>
        <div id="f4" class="piano-key-white"></div>
        <div id="g4" class="piano-key-white"></div>
        <div id="a4" class="piano-key-white"></div>
        <div id="b4" class="piano-key-white"></div>

        <div id="c5" class="piano-key-white"></div>
        <div id="d5" class="piano-key-white"></div>
        <div id="e5" class="piano-key-white"></div>
        <div id="f5" class="piano-key-white"></div>
        <div id="g5" class="piano-key-white"></div>
        <div id="a5" class="piano-key-white"></div>
        <div id="b5" class="piano-key-white"></div>

        <div id="c6" class="piano-key-white"></div>
        <div id="d6" class="piano-key-white"></div>
        <div id="e6" class="piano-key-white"></div>
        <div id="f6" class="piano-key-white"></div>
        <div id="g6" class="piano-key-white"></div>
        <div id="a6" class="piano-key-white"></div>
        <div id="b6" class="piano-key-white"></div>

        <div id="c7" class="piano-key-white"></div>
        <div id="d7" class="piano-key-white"></div>
        <div id="e7" class="piano-key-white"></div>
        <div id="f7" class="piano-key-white"></div>
        <div id="g7" class="piano-key-white"></div>
        <div id="a7" class="piano-key-white"></div>
        <div id="b7" class="piano-key-white"></div>

        <div id="c8" class="piano-key-white"></div>
    </div>
    <div class="piano-block-black">
        <!--<div class="piano-key-invisible-1"></div> 0
        <div id="a-0" class="piano-key-black"></div> 1.3vw
        <div class="piano-key-invisible-1"></div>  2.5vw
        <div class="piano-key-invisible-1"></div> 3.8vw -> 0vw
        <div id="c-1" class="piano-key-black"></div> 5.1vw -> 1.3vw
        <div class="piano-key-invisible-2"></div> 6.3vw -> 2.5vw
        <div id="d-1" class="piano-key-black"></div> 7.0vw -> 3.2vw
        <div class="piano-key-invisible-1"></div> 8.2vw -> 4.4vw
        <div class="piano-key-invisible-1"></div> 9.5vw -> 5.7vw
        <div id="f-1" class="piano-key-black"></div> 10.8vw -> 7.0vw
        <div class="piano-key-invisible-2"></div> 12.0vw -> 8.2vw
        <div id="g-1" class="piano-key-black"></div> 12.7vw -> 8.9vw
        <div class="piano-key-invisible-2"></div> 13.9vw -> 10.1vw
        <div id="a-1" class="piano-key-black"></div> 14.6vw -> 10.8vw
        <div class="piano-key-invisible-1"></div> 15.8vw -> 12.0vw

        <div class="piano-key-invisible-1"></div> 17.1vw -> 13.3vw -> 0.0vw
        <div id="c-2" class="piano-key-black"></div> 18.4vw -> 14.6vw -> 1.3vw-->

        <div class="piano-key-invisible-1"></div>
        <div id="a_0" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="c_1" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_1" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_1" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_1" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_1" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>

        <div class="piano-key-invisible-1"></div>
        <div id="c_2" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_2" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_2" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_2" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_2" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>

        <div class="piano-key-invisible-1"></div>
        <div id="c_3" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_3" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_3" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_3" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_3" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>

        <div class="piano-key-invisible-1"></div>
        <div id="c_4" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_4" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_4" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_4" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_4" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>

        <div class="piano-key-invisible-1"></div>
        <div id="c_5" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_5" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_5" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_5" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_5" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>

        <div class="piano-key-invisible-1"></div>
        <div id="c_6" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_6" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_6" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_6" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_6" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>

        <div class="piano-key-invisible-1"></div>
        <div id="c_7" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="d_7" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
        <div class="piano-key-invisible-1"></div>
        <div id="f_7" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="g_7" class="piano-key-black"></div>
        <div class="piano-key-invisible-2"></div>
        <div id="a_7" class="piano-key-black"></div>
        <div class="piano-key-invisible-1"></div>
    </div>
</body>
</html>
