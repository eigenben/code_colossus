---
title: "User Alert Management with flash and ActiveRecord::Errors"
date: 2007-12-11
tags: ["Rails General", "Rails Techniques"]
description: ""
---

A very common paradigm in web application development is presenting the user with some sort of alert or flash message at the top of a page. These alerts are often styled with a background and some sort of icon to the left to indicate what type of error it is. Typically there are a few different types of messages such as "error", "warning", "confirmation", etc., perhaps each type styled differently. Furthermore, such a block typically should support showing a set of messages within one type; not just one string. In Rails the two sources of these messages are usually either the flash object (such as flash[:error]) or ActiveRecord validations errors.

Here is an example of what I mean:

I've created a helper method that makes working with these types of messages a breeze.

Essentially it allows you to use the flash object with any of the following keys to specify messages: error, confirm, back, info, and warn (though you can modify it to suit any group of message types). You can either assign a string directly to this which is common, or create it as an array with multiple string messages. The helper will then read these flash objects and display it as a message block that can be styled with CSS, supporting multiple messages per type, separated by type, as well as dynamically grabbing ActiveRecord validation errors off of model object(s) of your choosing and showing those also. The usage of the helper method in your views is as follows

    # In Controller:
    flash[:confirm] = "Thank you for your input."
    flash[:error] = []
    flash[:error] << "Wrong Address"
    flash[:error] << "Wrong Name"

    # In View:
    <%= message_block %>

    # Or if you want to display errors on @customer
    # as well as the flash messages,
    <%= message_block :on => :customer %>

    # You can even have it watch multiple model
    # objects for errors:
    <%= message_block :on => [:customer, :order] %>
    Here is the helper method that makes this happen:

    # Outputs the error messages block.
    # The first argument specifies a hash options:
    # * :on => :products   Also includes AR validation errors for @products
    # * :clear => true     Clears messages after displaying
    # * :keep => true      Keeps around messages for next response cycle
    #
    def message_block(options = {})
      out = ""

      [:back, :confirm, :error, :info, :warn].each do |type|
        next if flash[type].nil? or flash[type].empty?
        flash[type] = [flash[type]] unless flash[type].is_a?(Array)

        out << "<div class=\"container #{type}\"><ul>\n"
        flash[type].each {|msg| out << "<li>#{h(msg.to_s)}</li>\n"}
        out << "</ul></div>\n"

        flash[type] = nil if options[:clear]
        flash.keep[type] if options[:keep]
      end

      if options[:on]
        options[:on] = [options[:on]] unless options[:on].kind_of?(Array)
        models = options[:on].map {|m| instance_variable_get("@" + m.to_s)}.select {|m| !m.nil?}
        errors = models.inject([]) {|b,m| b += m.errors.full_messages}

        if errors.size > 0
          out << "<div class=\"container error\"><ul>\n"
          errors.each {|msg| out << "<li>#{h(msg.to_s)}</li>\n"}
          out << "</ul></div>\n"
        end
      end

      content_tag(:div, out, :id => 'message_block', :class => 'flash')
    end

And the CSS code that works with it:

    /*** Flash Messages ***/
    .flash {

    }

    .flash ul {
        padding-left: 0pt;
        margin-bottom: 0pt;
        list-style-type: none;
        margin-left: 0pt;
    }

    .flash ul li {
        background: transparent url(../images/icons/bullets/gt.gif) no-repeat scroll left center;
        margin-bottom: 0.6em;
        padding-left: 1em;
        vertical-align: top;
    }

    .flash .container {
        padding: 1em;
        padding-left: 5em;
        margin-bottom: 1.5em;
    }

    .flash .error {
        background: #fcf6d0 url(../images/icons/flashes/error.gif) 1.5em 1em no-repeat;
        border-top: 1px solid #ecd757;
        border-bottom: 1px solid #ecd757;
    }
    .flash .back {
        background: #e9f3dc url(../images/icons/flashes/back.gif) 1.5em 1em no-repeat;
        border-top: 1px solid #bfcbb0;
        border-bottom: 1px solid #bfcbb0;
    }

    .flash .confirm {
        background: #e9f3dc url(../images/icons/flashes/confirm.gif) 1.5em 1em no-repeat;
        border-top: 1px solid #bfcbb0;
        border-bottom: 1px solid #bfcbb0;
    }

    .flash .info {
        background: #dee9f4 url(../images/icons/flashes/info.gif) 1.5em 1em no-repeat;
        border-top: 1px solid #b4c5d5;
        border-bottom: 1px solid #b4c5d5;
    }

    .flash .warn {
        background: #fcf6d0 url(../images/icons/flashes/warn.gif) 1.5em 1em no-repeat;
        border-top: 1px solid #ecd757;
        border-bottom: 1px solid #ecd757;
    }

You may even want to consider writing a before_filter in your application controller that sets the flash types to arrays so you can just add messages to them with the << operator:

    class ApplicationController < ActionController::Base
      before_filter :initialize_flash_types

      def initialize_flash_types
        [:back, :confirm, :error, :info, :warn].each {|type| flash[type] = []}
      end
    end