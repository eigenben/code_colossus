---
title: "Object-Oriented Approach to Blank Checking/Defaulting"
date: 2008-03-11
description: ""
---

Something I constantly find myself doing is checking to see if a value is blank, and returning something else if it is, otherwise the object itself:

    birthday.blank? ? '0000-00-00' : birthday

I started thinking about how I could possibly eliminate the need for all these ternary operators, and came up with this:

    class Object
      def or_if_blank(value)
        self.respond_to?(:blank) && self.blank? ? value : self
      end
    end

Now we can do something like this:

    birthday.or_if_blank('0000-00-00')

You could do something similar for nil, though a more general Ruby idiom is to just use the || operator, which does not work for blank.

On another note, if any of you are used to appending a "if object.respond_to?(:method)" predicate, check out this technique using try.
