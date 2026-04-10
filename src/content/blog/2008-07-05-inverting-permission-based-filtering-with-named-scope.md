---
title: "Inverting Permission-Based Filtering with named_scope"
date: 2008-07-05
description: ""
---

The addition of named_scope in Rails 2.1 has revealed several elegant approaches for modeling complex problem domains in ActiveRecord.  One I came across recently while working on an app with a somewhat complex permissions system was a permission-based filtering mechanism.  In this case I was dealing with permission for a given user to manage an "office", while a user could be at one of three permission "levels", one of which has specific office assignments (or it's assumed all are manageable if user.can_manage_all_offices is true). Lot's of necessary conditional logic there.

Now a normal approach to such a task to "show a list of offices that the user can manage" (for a drop-down for an interface perhaps) might be something like this:

    # In controller:
    if current_user.can_manage_company?
      @offices = Office.find(:all)
    elsif current_user.office_access_level? && current_user.can_manage_all_offices?
      @offices.find(:all)
    elsif current_user.office_access_level?
      @offices.find(:all, :conditions => {:id => current_user.manageable_offices.map(&:id) })
    else
      @offices = []
    end

But this approach starts at the user level and, using a lot of conditional logic baked right into places we don't want, makes different calls to Office, which isn't very DRY, and certainly not consistent with fat models skinny controllers.  So I considered inverting this approach and instead starting with an office, and asking it what "is manageable by" a given user.  Consider this alternative:

    # In office.rb
    named_scope :manageable_by, lambda {|user|
      case
      when user.can_manage_company? then {}
      when user.office_access_level? && user.can_manage_all_offices? then {}
      when user.office_access_level? then {:conditions => {:id => user.manageable_offices.map(&:id)}}
      else {:conditions => "1 = 0"}
      end
    }

    # Then in controller:
    @offices = Office.manageable_by(current_user)

This seems much more elegant to me.  I'm in general finding a lot of opportunities for inverting the way I designed something without named_scope to be more model-centric, so this approach helps further the design principle of "fat models, skinny controllers". Sure you could do this before by defining your own methods and using with_scope, but named_scope just makes it all the more elegant.

Another advantage with using the named scope stuff is that you can chain scopes together. Let's say that in another controller I want to do the same thing but instead restrict results to active offices only. I can create an "active" named scope that scopes :conditions => {:active => true}, then in the controller simply do this instead:

    @offices = Office.manageable_by(current_user).active
