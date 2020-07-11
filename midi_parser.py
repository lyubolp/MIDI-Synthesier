#!/bin/python3

notes = {}

note_number_to_string = {}
counter = 0
with open('notes.txt', 'r') as f:
    for line in f:
        note_number_to_string[counter] = line.strip()
        counter += 1

with open('jojo.txt', 'r') as f:
    for line in f:
        stripped_line = line.strip()
        data = stripped_line.split()

        time = data[0]
        note = data[3]
        volume = data[4]

        if note in notes:
            if volume == 'v=0':
                start_time = notes[note]
                end_time = time
                print("notes_to_play.enqueue(new PlayingNote("+ note_number_to_string[int(note[2:])] + ", " + start_time + ", " + end_time + "));")
                del notes[note]
        else:
            notes[note] = time

