// ==UserScript==
// @name         Size Adaptive Crunchyroll Player
// @namespace    http://github.com/technizor
// @version      1.0
// @description  Automatically resizes the Crunchyroll Player so that it fits to width, but can fit to height if the view height is too short.
// @author       Technizor
// @icon    http://crunchyroll.com/favicon.ico
// @icon64    http://crunchyroll.com/favicon.ico
// @date         September 27, 2015
// @include         http*://*.crunchyroll.c*/*
// @include         http*://crunchyroll.c*/*
// ==/UserScript==
SizeAdaptiveCrunchyrollPlayer = (function() {
    // Constants
    var containerName = 'playerContainer';
    var reqStyle = "#showmedia_video_player { width: 100%; height: 100%; }" +
        "." + containerName + ":before {content:''; display:block; padding-top:54.25%;}" +
        "." + containerName + ":after {content:''; display:block; padding-top:0px;}";
    var optStyle = "html, body { width: 100%, height: 100%; }" +
        "." + containerName + " { width: 100%; max-height: 100%; position: relative; backgroundColor: #000; }" +
        "." + containerName + " #showmedia_video_box, ." + containerName + " #showmedia_video_box_wide" +
        "{ width: 100%; position: absolute; backgroundColor: #000; top: 0; bottom: 0; left: 0 right: 0; }";
    var useInline = false;

    // Utility Functions
    this.newElement = function(tag, attr) {
        var elem = document.createElement(tag);
        addProperties(elem, attr);
        return elem;
    };
    this.addProperties = function (obj, attr) {
        if(attr)
        {
            var propKeys = Object.keys(attr);
            for(var i = 0; i < propKeys.length; ++i)
            {
                var pKey = propKeys[i];
                var pVal = attr[pKey];
                if(typeof pVal === 'object' && obj[pKey])
                    addProperties(obj[pKey], pVal);
                else
                    obj[pKey] = pVal;
            }
        }
        return obj;
    };

    // Getter for UseInline option
    this.useInline = function() {
        return useInline;
    };

    // Grab Video Player
    var videoBox = document.getElementById('showmedia_video_box') || document.getElementById('showmedia_video_box_wide');
    if(videoBox)
    {
        // Create Holding Container to Control Player Size
        var container = newElement('div', {
            id: containerName,
            className: containerName
        });
        var tempSpan = newElement('span');
        container.appendChild(tempSpan);
        container.insertBefore(videoBox, tempSpan);
        container.removeChild(tempSpan);

        // Place container at top of page
        document.body.insertBefore(container, document.body.firstChild);

        // Add Required Styles
        var style = style = newElement('style', {
            type: 'text/css',
            id: 'styles_adaptive'
        });
        style.appendChild(document.createTextNode(reqStyle));

        // Inline Styles not Recommended
        if(!useInline) {
            style.appendChild(document.createTextNode(optStyle));
        } else {
            addProperties(document, {
                style: {
                    width: '100%',
                    height: '100%'
                }
            });
            addProperties(document.body, {
                style: {
                    width: '100%',
                    height: '100%'
                }
            });
            addProperties(container, {
                style: {
                    width: '100%',
                    'max-height': '100%',
                    position: 'relative',
                    backgroundColor: '#000'
                }
            });
            addProperties(videoBox, {
                style: {
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: '#000',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            });
        }
        document.head.appendChild(style);
    }
    return this;
})()
