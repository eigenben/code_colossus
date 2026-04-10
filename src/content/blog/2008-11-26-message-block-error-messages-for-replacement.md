---
title: "message_block: a error_messages_for replacement for flash message and model error handling"
date: 2008-11-26
tags: ["Rails Plugins", "Rails Techniques"]
description: ""
---

![Message Block Example](/blog/2008/11/26/message-block-error-messages-for-replacement/message_block_example1.png)

One of the most common needs in any application I build is to have some abstract way of handling messages to end users.  Sometimes I'll want to show a confirmation message or a warning.  Other times I'll want to show a confirmation message but also show ActiveRecord validations.  While the error_messages_for helper in Rails works fairly well for showing ActiveRecord validation issues, I wanted a unified approach to handling this and flash messaging with multiple flash types in one package.

I blogged before about an approach I developed to solve this problem; I [rolled my own message_block plugin](http://github.com/railsgarden/message_block). The README file explains things pretty so be sure to check it out for more details, but here is the intro:

## Introduction ##

Implements the common view pattern by which a list of messages are shown at the top, often a combination of flash messages and ActiveRecord validation issues on one or more models. This allows for a nice, stylized block of messages at the top of the page with icons indicating what type of message it is (error, confirmation, warning, etc.)

This view helper acts as a replacement for error_messages_for by taking error messages from your models and combing them with flash messages (multiple types such as error, confirm, etc.) and outputting them to your view. This plugin comes with an example stylesheet and images.

## Usage ##

Once you install this, you should now have a set of images at public/images/message_block and a basic stylesheet installed at public/stylesheets/message_block.css. First you'll want to either reference this in your layout or copy the declarations to your main layout. Then you can use the helper <%= message_block %> as described below:

The first argument specifies a hash options:

    * :on - specifies one or many model names for which to check error messages.
    * :model_error_type - specifies the message type to use for validation errors; defaults to 'error'
    * :flash_types - specifies the keys to check in the flash hash. Messages will be grouped in ul lists according to this type. Defaults to: %w(back confirm error info warn)
    * :html - Specifies HTML options for the containing div
    * :id - Specifies ID of the containing div; defaults to 'message_block'
    * :class - Specifies class name of the containing div; defaults to nothing.

Imagine you have a form for entering a user and a comment:

    <%= message_block :on => [:user, :comment] %>

    Imagine also you set these flash variables in the controller:

        class CommentsController
          def create
            flash.now[:error] = "Error A"
            flash.now[:confirm] = "Confirmation A"  # Note you can use different types
            flash.now[:warn] = ["Warn A", "Warn B"]  # Can set to an array for multiple messages
          end
        end

    And let's say that you want to show these messages but also show the validation issues given that both user and comment fail ActiveRecord validation:

        <div id="message_block">
          <ul class="error">
            <li>Error A</li>
            <li>User first name is required.</li>
            <li>Comment contents is required.</li>
          </ul>
          <ul class="confirm">
            <li>Confirmation A</li>
          </ul>
          <ul class="warn">
            <li>Warn A</li>
            <li>Warn B</li>
          </ul>
        </div>

Which will by default leave you with this look:

![Message Block Example](/blog/2008/11/26/message-block-error-messages-for-replacement/message_block_example.png)

## [message_block on GitHub](http://github.com/rubiety/message_block) ##
