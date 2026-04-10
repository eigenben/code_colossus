---
title: "Take Control of your Field Values with nilify_blanks"
date: 2009-01-07
tags: ["Rails General", "Rails Techniques"]
description: ""
---

If in your data schema most or all of your fields are NULLable (the Rails default in migrations), you may have run into the issue whereby sometimes your fields are blank and sometimes they are NULL, two distinct representations of a "no data" state.  This arises in Rails often because when you submit a form and the user doesn't fill in a value, the value sent to the database is an empty string, even if you may prefer the field to just remain NULL.

Enter nilify_blanks, my solution to handling this problem generically in your models.  With nilify_blanks you can specify the fields you want "nilified" (or default to all content fields) upon save if the field is blank.  This allows you to regain some consistency in how you represent data in the database.   Use of the plugin is best-explained with some examples:

## Basic Examples ##

    # Checks and converts all fields in the model
    class Post < ActiveRecord::Base
      nilify_blanks
    end

    # Checks and converts only the title and author fields
    class Post < ActiveRecord::Base
      nilify_blanks :only => [:author, :title]
    end

    # Checks and converts all fields except for title and author
    class Post < ActiveRecord::Base
      nilify_blanks :except => [:author, :title]
    end

## Specifying a Callback ##

Checking uses an ActiveRecord before_save filter by default, but you can specify a different filter with the :before option. Any filter will work - just first remove the "before_" prefix from the name.

    class Post < ActiveRecord::Base
      nilify_blanks :before => :create
    end

    class Post < ActiveRecord::Before
      nilify_blanks :before => :validation_on_update
    end