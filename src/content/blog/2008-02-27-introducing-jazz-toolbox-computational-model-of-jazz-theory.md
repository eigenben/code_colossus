---
title: "Introducing JazzToolbox: A computer model of Jazz Theory"
date: 2008-02-27
description: ""
---

As a (wanna-be) Jazz pianist, I've always had a strong interest in Jazz theory not only from a practical you-need-this-to-play standpoint but also a theoretical standpoint. At it's core, music theory is all about a 0 - 11 number system where each number represents a pitch, with the added complication of letters (which makes Eb theoretically different from D#). Everything in music is based on this basic number system: scales and chords are simply sequences of these numbers. Changing key in a scale or chord mathematically is adding some integer to all of the index values and doing modulo 12. Changing modes within a scale simple involves a position shift of the sequence.

Last week I began exploring the idea of developing some sort of computerized object model to capture these musical theory concepts. As a pianist, knowing theory is extremely important and voicing chords can become quite complex, yet there is sanity in the complexity - a harmony of mathematical precision. Today I introduce "Jazz Toolbox", the future front-end for which will be located at JazzToolbox.com. Right now I have only developed the back-end object model and calculation engine, which is definitely the foundation of the project. I've also written up extensive documentation. Here's an introduction to the project straight out of my README file:

## Jazz Toolbox

Jazz Toolbox is an online Jazz utility driven by a full object-relational and REST model of
concepts in Jazz theory, establishing relationships between chords and scales, and much more.
The web interface is a fully Ajaxified Web 2.0 interface towards exploring these relationships and
answering questions about the jazz science. The REST interface exposes the underlying data model
and relationships to other developers wishing to use Jazz Toolbox as a source for their own web
applications.

## Architecture Overview

The core of Jazz Toolbox is a full Ruby object model representing concepts of Jazz theory,
distilled to their most basic concepts and architected in a very abstract manner. The system
is data-centric and all "rules" (for example, the tones in a C7 chord) in theory are
self-contained in the database.

All chord/scale/mode/etc. definitions are stored as a mathematical system (sequences of numbers)
which are then used to perform calculations. For example, putting some chord in a different key
is a matter of adding a semitone delta and doing modulo 12.

While there are currently many chord calculators in existence, to my knowledge this project is the
first one that attempts to fully represent the entirety of Jazz theory as a mathematical/computational
system exposed through an elegant object model.

## Full Documentation

I've published the full RDocs which are available here and are very complete.

## Examples

Any musician/programmer will appreciate these examples; far more are available in the rdocs:

    Chord['Ebmaj7'].notes
    # => ['Eb', 'G', 'Bb', 'D']
    # Or specify key context with chained methods like this...
    Chord['maj7'].in_key_of('Eb').notes

    Chord['Bmaj7#11'].notes
    # => ['B', 'D#', 'F#', 'A#', 'E#']
    # Note E# - Correct theoretic value for this chord, not F

    Chord['Falt'].notes
    Chord['F7b9#9'].notes
    # => ['F', 'A', 'Eb', 'Gb', 'G#', 'C#']

    Scale['Major'].in_key_of('Eb').modes['Dorian'].notes
    # => ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb']

    Scale['Melodic Minor']['Lydian Dominant'].notes
    # => ['F', 'G', 'A', 'B', 'C', 'D', 'Eb']

    Scale['Major']['Dorian'].chords.symbols
    # => ['min7', 'min6']

    Chord['Amin7'].modes.names
    # => ['A Dorian']

    Scale['Major'][4].chords.symbols
    # => ['maj7#11']
 
This is definitely still a work in progress though it has the potential to become very powerful. I have high ambitions for the front-end web interface for this as well as it could become a valuable tool for Jazz musicians and others trying to navigate the complex roads of jazz...
