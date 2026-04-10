---
title: "Create Structured Data in Migrations"
date: 2008-02-21
description: ""
---

Occasionally I'll decide to create some structured data in a migration by issuing create statements against my model classes. In a project I'm currently working on, I had to do this several levels deep. Rather than using temporary variables to create the sub items and so-on, all in a lexically flat structure, I came up with this simple one-liner:

    def self.with(o); yield o; end

Doing this now allows me to issue those creates with nested data as a series of nested blocks, which is looks much better. For example:

    with ChordQuality.create(:name => 'Major', :code => 'MAJ') do |q|
      with q.chords.create(:name => 'Major Triad') do |c|
        c.chord_symbols.create(:name => 'maj')
        c.chord_symbols.create(:name => 'M', :case_sensitive => true)
      end
      with q.chords.create(:name => 'Major 7') do |c|
        c.chord_symbols.create(:name => 'maj7')
        c.chord_symbols.create(:name => 'M7', :case_sensitive => true)
        with c.children.create(:name => 'Major 7 #11') do |cc|
          cc.chord_symbols.create(:name => 'maj7#11')
          cc.chord_symbols.create(:name => 'M7#11')
          cc.chord_symbols.create(:name => 'lyd')
          cc.chord_symbols.create(:name => 'lydian')
        end
      end

      with q.chords.create(:name => 'Major 6') do |c|
        c.chord_symbols.create(:name => 'maj6')
        c.chord_symbols.create(:name => 'M6', :case_sensitive => true)
      end
    end

Oh, the beauty of Ruby code blocks!
