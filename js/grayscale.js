//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    myIP();
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

function setupIPInfo() {
    $(".ipinfo #address").html(ipInfo.ip);
    $(".ipinfo #location").html(ipInfo.address);

    map.setCenter(new google.maps.LatLng(ipInfo.latitude, ipInfo.longitude));
    /*
    var geo = new google.maps.Geocoder();
    geo.geocode(
        { 
            address: ipInfo.city + ", " + ipInfo.country
        },
        function(data, status) {
            
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(data[0].geometry.location);
            }            
        }  
    );
    */
}

//Google Map Skin - Get more at http://snazzymaps.com/
var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(53.385873, -1.471471),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 18
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 21
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#000000"
        }, {
            "lightness": 16
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#000000"
        }, {
            "lightness": 40
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }]
};

var map = new google.maps.Map(document.getElementById('map'), myOptions);

var ipInfo;

function myIP() {

    $.getJSON("http://www.telize.com/geoip?callback=?",
        function(json) {
            console.log(json);
            var info = new Object();
            info = json;

            info.address = info.city + ", " + info.region_code + ", " + info.country;
            if (info.isp) {
                info.address = info.isp + ", " + info.address;
            }            
       
            ipInfo = info;
            setupIPInfo();
            
        }
    );

    /*
    $.get("http://api.hostip.info/get_json.php?position=true", function(data) {

        /*
        var hostipInfo = data.split("\n");

        var info = new Object();

        for (i=0; i < hostipInfo.length; i++) {
            ipAddress = hostipInfo[i].split(":");
            switch (ipAddress[0]) {
                case "Country" :
                    info.country = ipAddress[1];
                    break;
                case "IP" :
                    info.ip = ipAddress[1];
                    break;
                case "City" :
                    info.city = ipAddress[1];
                    break;
            }
        }

        ipInfo = info;
        
       console.log(data);
       var info = new Object();
       info = data;
       info.address = info.city + ", " + info.country_name;
       
       ipInfo = data;
        setupIPInfo();
    });
*/

    return false;
}

