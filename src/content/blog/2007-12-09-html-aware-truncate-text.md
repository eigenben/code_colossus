---
title: "HTML-Aware Truncate Text"
date: 2007-12-09
tags: ["Rails General", "Rails Techniques"]
description: ""
---

When building a large custom PHP CMS system for DigitalPeach, I ran into a very difficult issue: truncating text but maintaining HTML nested tags correctly. Specifically, we were looking to breaking up large articles composed using FCKEditor into separate pages after a certain character threshold. Once can easily see the problem:

    <p>This is a test <strong>with some bold in here</strong>.</p>
    Now imaging having to truncate this text to 30 characters, and you end up with this:

    This is a test <strong>with

While this example isn't quite so severe and at worst would only make the rest of the text within the block-level element bold, clearly if we do a truncation that is blind to HTML some serious problems can arise. Furthermore, even if it doesn't have much practical significance, you are breaking XHTML.

I was lucky to stumble across an excellent article by Mike Burns who describes a Ruby method using REXML's pull parser that can accomplish this. His example extended the String class, so I modified it to work as a Rails helper all in one method:

    def truncate_html(input, len = 30, extension = "...")
      def attrs_to_s(attrs)
        return '' if attrs.empty?
        attrs.to_a.map { |attr| %{#{attr[0]}="#{attr[1]}"} }.join(' ')
      end

      p = REXML::Parsers::PullParser.new(input)
        tags = []
        new_len = len
        results = ''
        while p.has_next? && new_len > 0
          p_e = p.pull
          case p_e.event_type
        when :start_element
          tags.push p_e[0]
          results << "<#{tags.last} #{attrs_to_s(p_e[1])}>"
        when :end_element
          results << "</#{tags.pop}>"
        when :text
          results << p_e[0].first(new_len)
          new_len -= p_e[0].length
        else
          results << "<!-- #{p_e.inspect} -->"
        end
      end

      tags.reverse.each do |tag|
        results << "</#{tag}>"
      end

      results.to_s + (input.length > len ? extension : '')
    end

Note that the nested method above is a completely valid use of Ruby, though not widely used.

And now look at what it can do:

    truncate_html("<p>Test <strong>bold</strong> done.</p>", 30)
    # => "<p>Test <strong>bold</strong></p>..."
