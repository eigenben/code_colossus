---
title: "Wrapping Conditional Access with with_scope"
date: 2008-02-02
description: ""
---

ActiveRecord::Base exposes a great way of keeping access control DRY. A very common paradigm in web application development is showing "all" of something to administrators but only only "active" of something to regular users/visitors. In non-ORM PHP you might do something like like this in each SQL statement:

    $sql  = "SELECT * FROM entries WHERE type = 1 ";
    $sql .= (!$is_admin ? "AND active = 1" : "");

This isn't a very well-architected approach since this type of tacking onto the SQL string would have to be done in any statement that involved this table, for all of your "actions" like show, edit, and index. It tightly couples this particularly piece of add-on logic to your base code. In Rails we can scope out this functionality to a "scope_access" method in our controller like so:

    class EntriesController < ApplicationController
      around_filter :scope_access

      # (Action Methods)

      protected

      def scope_access
        unless current_user && current_user.is_admin?
          Entry.send(:with_scope, :find => {:conditions => 'active = 1'}) do
            yield
          end
        else
          yield
        end
      end
    end

We are declaring an around_filter which uses with_scope if the current user is an admin, otherwise it will do so without scope. This is an excellent example of how Rails allows you to architect your code to be very elegant. Note that with_method is now a protected method on ActiveRecord::Base hence our need to use ClassName.send.

The with_scope method is actually useful for many other purposes including running many but similar find statements. Aside from finders, this can actually scope attributes on create and more. I'd highly recommend you check it out in the Rails documentation and start making extensive use of it.