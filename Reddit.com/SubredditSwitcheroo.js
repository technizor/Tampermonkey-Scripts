// ==UserScript==
// @name         Subreddit Switcheroo
// @namespace    http://github.com/technizor
// @version      1.0
// @description  Switch the Subreddit style and sidebar info (which usually contains special notice information)
// @author       You
// @match        http://*.reddit.com/r/YuYuYu/*
// @match        http://reddit.com/r/YuYuYu/*
// @match        https://*.reddit.com/r/YuYuYu/*
// @match        https://reddit.com/r/YuYuYu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('[title=applied_subreddit_stylesheet]').attr('href', 'https://www.reddit.com/r/TechnizorCSSStage/stylesheet.css');
    $.ajax({
        url: 'https://www.reddit.com/r/TechnizorCSSStage/',
        type:'GET',
        success: function(data) {
            $('.titlebox .usertext-body .md').html($(data).find('.titlebox .usertext-body .md').html());
        }
    });
})();
