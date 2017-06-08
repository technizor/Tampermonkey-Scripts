// ==UserScript==
// @name         Size Adaptive Crunchyroll Player
// @namespace    http://github.com/technizor
// @version      2.0
// @description  Automatically resizes the Crunchyroll Player so that it fills the viewport without being cut-off. Minimizes the Crunchyroll header.
// @author       Technizor
// @icon    http://crunchyroll.com/favicon.ico
// @icon64    http://crunchyroll.com/favicon.ico
// @date         December 17, 2015
// @include         http*://*.crunchyroll.c*/*
// @include         http*://crunchyroll.c*/*
// ==/UserScript==
SizeAdaptiveCrunchyrollPlayer = (function() {
  var newIds = {
    header: 'adaptive_header',
    sidebar: 'sidebar_container',
    style: 'adaptive_style'
  };
  var selectors = {
    messageBox: '#message_box',
    layout: '.new_layout',
    videoPlayer: '#showmedia_video_player',
    videoBox: '#showmedia_video_box',
    videoBoxWide: '#showmedia_video_box_wide',
    videoContainer: '#showmedia_video',
    sidebar: '#sidebar',
    media: '#showmedia',
    videoQuality: '.video-quality.cf',
    videoTitle: '.showmedia-trail',
    siteHeader: '.site-header',
    mainPage: '.main-page',
    adaptiveHeader: '#adaptive_header',
    mainContent: '#main_content',
    templateScroller: '#template_scroller.ad-skin',
    templateContainer: '#template_container.template-container',
    headerContainer: '#header_container',
    collectionCarousel: '.collection-carousel',
    collectionCarouselContents: '.collection-carousel-contents'
  };
  // Utility Functions
  newElement = this.newElement = function(tag, attr) {
    var elem = document.createElement(tag);
    addProperties(elem, attr);
    return elem;
  };
  addProperties = this.addProperties = function(obj, attr) {
    if (attr) {
      var propKeys = Object.keys(attr);
      for (var i = 0; i < propKeys.length; ++i) {
        var pKey = propKeys[i];
        var pVal = attr[pKey];
        if (typeof pVal === 'object' && obj[pKey])
          addProperties(obj[pKey], pVal);
        else
          obj[pKey] = pVal;
      }
    }
    return obj;
  };
  cssBlock = this.cssBlock = function(sel, attr) {
    if (typeof sel === 'undefined' && sel.length > 0)
      return null;
    var block = {
      selector: sel,
      attributes: attr
    };
    block.toString = function() {
      var str = block.selector[0];
      for (var i = 1; i < sel.length; ++i) {
        str += ', ' + block.selector[i];
      }
      str += ' {\n';
      var propKeys = Object.keys(block.attributes);
      for (var i = 0; i < propKeys.length; ++i) {
        var pKey = propKeys[i];
        var pVal = block.attributes[pKey];
        str += ' ' + pKey + ': ' + pVal + ';\n';
      }
      str += '}\n';
      return str;
    };
    return block;
  };
  var playerStyle = [
    cssBlock([selectors.videoPlayer], {
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "left": "0",
      "top": "0"
    }), cssBlock([selectors.videoBox + "::before",
      selectors.videoBoxWide + "::before"
    ], {
      "content": "''",
      "display": "block",
      "padding-top": "calc(56.25% + 32px)"
    }), cssBlock([selectors.templateContainer], {
      "padding": "0",
      "width": "100%"
    }), cssBlock([selectors.videoBox, selectors.videoBoxWide], {
      "width": "100vw",
      "max-height": "calc(100vh - 10px)",
      "position": "relative",
      "background-color": "#000"
    }), cssBlock([selectors.videoBox + " " + selectors.videoPlayer,
      selectors.videoBoxWide + " " + selectors.videoPlayer
    ], {
      "width": "100%",
      "position": "absolute",
      "background-color": "#000",
      "top": "0",
      "bottom": "0",
      "left": "0",
      "right": "0",
      "margin": "0"
    })
  ];
  var headerStyle = [
    cssBlock([selectors.adaptiveHeader], {
      "position": "relative"
    }), cssBlock([selectors.adaptiveHeader + "::after"], {
      "content": "''",
      "display": "block",
      "width": "100%",
      "padding-bottom": "10px"
    }), cssBlock([selectors.adaptiveHeader + " " + selectors.headerContainer], {
      "display": "none",
      "width": "100%"
    }), cssBlock([selectors.adaptiveHeader + ":hover " + selectors.headerContainer], {
      "display": "flex"
    }), cssBlock([selectors.templateScroller], {
      "padding-top": "0"
    }), cssBlock([selectors.videoTitle], {
      "padding-top": "10px"
    }), cssBlock([selectors.siteHeader], {
      "position": "absolute",
      "width": "100%"
    })
  ];
  var pageStyle = [
    cssBlock(["html", "body"], {
      "width": "100%",
      "height": "100%"
    }), cssBlock([selectors.mainContent], {
      "width": "100%"
    }), cssBlock([selectors.collectionCarousel], {
      "width": "500px"
    }), cssBlock([selectors.collectionCarouselContents], {
      "width": "calc(100% - 36px)"
    })
  ];

  this.main = function() {
    var videoContainer = document.querySelector(selectors.videoContainer);
    var videoQuality = document.querySelector(selectors.videoQuality);
    var videoTitle = document.querySelector(selectors.videoTitle);
    videoContainer.insertBefore(videoTitle, videoQuality);

    var sidebarContainer = newElement('div', {
      'id': newIds.sidebar
    });
    var media = document.querySelector(selectors.media);
    var sidebar = document.querySelector(selectors.sidebar);
    media.insertBefore(sidebarContainer, sidebar);
    sidebarContainer.appendChild(sidebar);

    var headerContainer = newElement('div', {
      'id': newIds.header
    });
    var header = document.querySelector(selectors.siteHeader);
    var body = document.querySelector(selectors.mainPage);
    body.insertBefore(headerContainer, header);
    headerContainer.appendChild(header);

    var messageBox = document.querySelector(selectors.messageBox);
    var layoutDiv = document.querySelector(selectors.layout);
    layoutDiv.insertBefore(messageBox, media);


    // Add Required Styles
    var style = newElement('style', {
      'type': 'text/css',
      'id': newIds.style
    });
    for (var i = 0; i < playerStyle.length; i++)
      style.appendChild(document.createTextNode(playerStyle[i]));
    for (var i = 0; i < headerStyle.length; i++)
      style.appendChild(document.createTextNode(headerStyle[i]));
    for (var i = 0; i < pageStyle.length; i++)
      style.appendChild(document.createTextNode(pageStyle[i]));

    document.head.appendChild(style);
  };
  main();
  return this;
})();
