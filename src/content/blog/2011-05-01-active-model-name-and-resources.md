---
title: "Using ActiveModel::Name to simplify URL generation"
date: 2011-05-01
tags: ["Rails Techniques"]
description: ""
---

Most Rails developers are familiar with generating RESTful URLs polymorphically by simply passing an object to one of many helper methods that expects a URL, such as link_to and form_for:

    # In Routes
    resources :articles

    # In View:
    form_for @article do |f|
    This capability extends beyond just single objects, supporting nested routes and specific action targeting; for example:

    # In Routes:
    namespace :admin do
      resources :categories do
        resources :articles
      end
    end

    # In View
    form_for [:admin, @category, @article] do |f|
    end

## Problem ##

One problem I've run into with some frequency, however, is using this polymorphic path approach when the class name of the ActiveRecord model does not quite correspond directly with the resource name. This occurs most frequently when you want a little more context in your model naming which may not be necessary in routes. For example, lets look a domain model with customers having many customer locations:

    # Models:
    class Customer < ActiveRecord::Base
      has_many :locations, :class_name => "CustomerLocation"
    end

    class CustomerLocation < ActiveRecord::Base
      belongs_to :customer
    end

    # Routes:
    resources :customers do
      resources :locations
    end

In the above example, the model name is "CustomerLocation", but the resource name as specified in the routes is just "locations", since the context of customers is already well-established from the nesting. The problem with this is when we try to use our regular polymorphic path solution:

    form_for [@customer, @location]
    # Tries to generate: customer_customer_location_path(@customer, @location)

Many people when running into this will just do away with using the clean polymorphic path solution entirely and instead provide the URL explicitly:

    form_for @location, :url => customer_location_path(@customer, @location)

This of course works but isn't exactly ideal.

## Solution ##

While it might look like it's using the class name to construct the url helper method name, it's in fact using "model_name" instead (which defaults to the class name). But, this can be overridden!

    class CustomerLocation < ActiveRecord::Base
      def self.model_name
        ActiveModel::Name.new("Location")
      end
    end

After this, the polymorphic path [@customer, @location] works as we would expect.

Another common situation where this technique becomes useful is if you are working extensively with namespaced models. This is tricky because the namespace ends up becoming part of the model name, which almost surely does not map to your resource hierarchy:

    # Model:
    class Core::Customer < Core::Base
    end

    # View:
    form_for @customer
    # Tries to generate: core_customer_path(@customer)
  
Overriding model_name will allow you to explicitly define "Customer" as the model name, despite it being namespaced within "Core". But we can do better than that - if you have a base model for your namespace (as I believe is always a good practice), just put this in the base model:

    class Core::Base < ActiveRecord::Base
      def self.model_name
        ActiveModel::Name.new(name.split("::").last)
      end
    end

Although this technique has served me well in many apps, do be aware that the model name is used in some other instances throughout Rails such as error_messages_for, so do use this with care.

Though all of the above examples are for ActiveModel/ActiveRecord 3.0 or higher, the same technique will work in Rails 2.3 by simply using "ActiveSupport::ModelName" in place of "ActiveModel::Name".

## Update ##

For Rails 3.1 and higher it seems the solution is now:

    class CustomerLocation < ActiveRecord::Base
      def self.model_name
        ActiveModel::Name.new(self, nil, "Location")
      end
    end

    