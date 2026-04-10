---
title: "named_scope with acts_as_tree"
date: 2008-06-25
description: ""
---

I fairly often use the acts_as_tree plugin in my applications.  While acts_as_nested_set (and superior variants..) is more powerful, often times a simple two-level deep hierarchy is all I need and acts_as_tree is simple.  I've found the new named_scope functionality in Rails 2.1 to be very helpful when dealing with tree data structures.

Firstly, it's somewhat rare that I have one single root node in the tree structure (which is apparently how it's meant to be used).  Instead I'll have multiple "parent" nodes designated with a NULL parent_id and children beneath.  In the past I've always done something like: find(:all, :conditions => {:parent_id => nil}) to grab the top entries.  Instead with nested set you can do this:

    named_scope :top, :conditions => {:parent_id => nil}

    # Then:
    Category.top
  
Another common task when dealing with hierarchical categories is to query on the base object (products for example) for members that are "part of" that category. Specifically, part of in a 2-level heirarchy simply means "where id = ? or parent_id = ?" on the joined categories table. Because this involves a join it was somewhat clunky to do before. Now with nested set, on the product model I can declare this:

    named_scope :in_category, lambda {|c| {:include => [:category], :conditions => ["categories.id = ? OR categories.parent_id = ?", c, c]} }

    # Then:
    Product.in_category(3)

I would also highly encourage you all to check out RailsCasts Episode 112 "Anonymous Scopes" by Ryan Bates where he outlines a pattern for handling conditions elegantly with searches using named_scopes in Rails 2.1, something I've always found to be lacking from Rails core and always resorted to using plugins like criteria_query.