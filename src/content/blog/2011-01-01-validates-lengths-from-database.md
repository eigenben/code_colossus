---
title: "Why you should always validate maximum lengths in models, and how to do so easily"
date: 2011-01-01
tags: ["Rails Plugins", "Rails Techniques"]
description: ""
---

Developers seem to rarely use validates_lengths_of with their models, despite there being an inherent maximum length on every string and text field - the one enforced by the database. Since table migrations in Rails set a fairly high maximum length for string attributes, most people don't think twice about the possibly of that limit being exhausted. Even beyond this, there may be other reasons why the field limit is set fairly low, or perhaps you're working with a legacy database.

Without validating maximum field lengths at the model level, ActiveRecord will still ship off the full field value as entered in an INSERT query. From there two things might happen, and this depends on the database itself.

1. It might fail the query with an ActiveRecord::StatementInvalid exception. Since this is an exception most developers don't routinely handle, this could cause the entire request to fail. This occurs with SQL Server for sure, and possibly other databases.
2. It might accept the query and simply truncate the result to the field limit. This might sound better than #1, but IMO it's actually worse: now you have an instance where the everything appeared to go along fine, but you might end up with missing data. This is the default behavior with MySQL.

There's another reason why you should always validate field lengths, and that's to limit the possibilities for a Denial of Service attack. If an attacker knows you aren't validating field length and that whatever they're providing is going straight into an SQL query and being sent to the database, they can craft extremely large requests that might fill up the pipe to the database. Even if the data doesn't actually end up being inserted in full, they've tied up a database connection and - since the regular old "mysql" gem will block for the query result - a Rails process.

Unfortunately in order to do this properly you essentially have to write validates_length_of lines (or the equivalent ActiveRecord 3 form) for each attribute, with it's maximum database length. To make this easy, I wrote a gem called validates_lengths_from_database that will introspect your database string field maximum lengths and automatically defines length validations for you.

To install, just include the gem in your Gemfile (works with Rails 2.3 and Rails 3.0):

    gem "validates_lengths_from_database"

Then in your model you can activate validations:

    class Post < ActiveRecord::Base
      validates_lengths_from_database
    end
  
It also supports filter-style :only and :except options:

    class Post < ActiveRecord::Base     validates_lengths_from_database :only => [:title, :contents]
    end

    class Post < ActiveRecord::Base     validates_lengths_from_database :except => [:other_field]
    end

Note that this cannot be done at a global level directly against ActiveRecord::Base, since the validates_length_from_database method requires the class to have a table name (with the ability to load the schema).

For more information or to view the source, check out the project on GitHub: [validates_lengths_from_database](http://github.com/rubiety/validates_lengths_from_database).
