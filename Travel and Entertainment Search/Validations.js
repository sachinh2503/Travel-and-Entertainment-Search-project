    $(function () {
        $('#radio1').click(function () {
            $('.enableOnSelect').prop('disabled', true);
        });
        
        $('#radio2').click(function () {
            $('.enableOnSelect').prop('disabled', false);
        });
    });

    $(document).ready(function() {
       document.getElementById("detailsmainbutton").setAttribute("disabled",true);
        var ipapi_result;
        document.getElementById("categoryfield").selectedIndex=0;
        document.getElementsByName("radiobutton")[0].checked=true;
        document.getElementById("search").disabled=true;
        
        $.ajax({
        type: 'GET',
        url: "http://ip-api.com/json",
        success: function (resp) {
            console.log(resp);
            //ipapi_result=JSON.parse(resp);
            var jlat=resp.lat;
            var jlon=resp.lon;
            //alert("Lat: "+jlat+" Lon: "+jlon);
            if(jlat!="" && jlon!=""){
            document.getElementById("ipapilat").value=jlat;
            document.getElementById("ipapilon").value=jlon;
            //document.getElementById("search").disabled=false;   
        }
        },
        error: function (req, status, err) {
        //console.log('Something went wrong', status, err);
        document.getElementById("ipapilat").value="34.0266";
        document.getElementById("ipapilon").value="-118.2831";
        }
        });
    });


/*window.onload=function(){
    alert("OK");
var ipapi_result;
//document.getElementById("search").disabled=true;
var url = "http://ip-api.com/json/";
var http = new XMLHttpRequest();
http.open("GET", url, true);// "synchronous"
http.onreadystatechange = function() {
if(http.readyState == 4 && http.status == 200) {
ipapi_result=JSON.parse(http.responseText);
}
else {  
console.log("Error", http.statusText);  
    } 
}
http.send(null);
var jlat=ipapi_result.lat;
var jlon=ipapi_result.lon;
if(jlat!="" && jlon!=""){
document.getElementById("search").disabled=false;
document.getElementById("ipapilat").value=jlat;
document.getElementById("ipapilon").value=jlon;
}
}*/
    var gmarkers = [],initial_marker_lat="",initial_marker_lon="",panorama,panaroma_lat_lon,t=0;
    /*jQuery(function($) {
    $(document).ready(function() {
        
        var latlng = new google.maps.LatLng(document.getElementById("ipapilat").value, document.getElementById("ipapilon").value);
        //var latlng = new google.maps.LatLng(initial_marker_lat, initial_marker_lon);
        alert(latlng);
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var myOptions = {
            zoom: 13,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        //console.dir(map);
        google.maps.event.trigger(map, 'resize');
        
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Hello World!'
        });
        gmarkers.push(marker);
        
        $('a[href="#mapstab"]').on('shown', function(e) {
            google.maps.event.trigger(map, 'resize');
        });
        $("#mapstab").css("height", 400);
        
        //new AutocompleteDirectionsHandler(map);
        
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        
        document.getElementById('mode-selector').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
        document.getElementById('getdirectionsbutton').addEventListener('click', function() {
          getDirections();
          setTimeout(function(){
          calculateAndDisplayRoute(directionsService, directionsDisplay);
          }, 1000);
          
        });
    });
});*/

function showMap() {
        var latlng = new google.maps.LatLng(user_center_lat, user_center_lon);
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var myOptions = {
            zoom: 13,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        //console.dir(map);
        google.maps.event.trigger(map, 'resize');
        
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Hello World!'
        });
        gmarkers.push(marker);
        
        $('a[href="#mapstab"]').on('shown', function(e) {
            google.maps.event.trigger(map, 'resize');
        });
        $("#mapstab").css("height", 400);
        
        //new AutocompleteDirectionsHandler(map);
        
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        
        /*document.getElementById('mode-selector').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });*/
        document.getElementById('getdirectionsbutton').addEventListener('click', function() {
          getDirections();
          setTimeout(function(){
          calculateAndDisplayRoute(directionsService, directionsDisplay);
          }, 1000);
          
        });
    }

function toggleStreetView() {
        var latlng = new google.maps.LatLng(document.getElementById("ipapilat").value, document.getElementById("ipapilon").value);
        var myOptions = {
            zoom: 13,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        panaroma_lat_lon = {lat: dest_lat, lng: dest_lon};
        if(t==0){
        google.maps.event.trigger(map, 'resize');
        }
        panorama = map.getStreetView();
        panorama.setPosition(panaroma_lat_lon);
        panorama.setPov(/** @type {google.maps.StreetViewPov} */({
          heading: 265,
          pitch: 0
        }));
        var toggle = panorama.getVisible();
        if (toggle == false) {
          panorama.setVisible(true);
            t=1;
        document.getElementById("pegman").setAttribute("src","http://cs-server.usc.edu:45678/hw/hw8/images/Map.png");
        } else {
          panorama.setVisible(false);
            t=0;
        document.getElementById("pegman").setAttribute("src","http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png");
        }
      }

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        gmarkers[0].setMap(null);
        var selectedMode = document.getElementById('mode-selector').value;
        var latlng1 = new google.maps.LatLng(source_lat, source_lon);
        var latlng2 = new google.maps.LatLng(dest_lat, dest_lon);
        //alert(selectedMode+" "+latlng1+" "+latlng2);
        
        directionsService.route({
          origin: latlng1,  // Haight.
          destination: latlng2,  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode],
           provideRouteAlternatives: true
        }, function(response, status) {
          if (status == 'OK') {
            /*for (var i = 0, len = response.routes.length; i < len; i++) {
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    routeIndex: i
                });
            }*/
            directionsDisplay.setDirections(response);
            //directionsDisplay.setMap(map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

    function sac(){
        
    }

    function initMap() {
        var latlng = new google.maps.LatLng(document.getElementById("ipapilat").value, document.getElementById("ipapilon").value);
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var myOptions = {
            zoom: 13,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        //console.dir(map);
        google.maps.event.trigger(map, 'resize');
        
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Hello World!'
        });

        $('a[href="#mapstab"]').on('shown', function(e) {
            google.maps.event.trigger(map, 'resize');
        });
        $("#mapstab").css("height", 400);
        new AutocompleteDirectionsHandler(map);
        
        directionsDisplay.setMap(map);
        //calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode-selector').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      }

       /**
        * @constructor
       */
      /*function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});
        autocomplete = new google.maps.places.Autocomplete(
            * @type {!HTMLInputElement} (document.getElementById('locationtext')),
            {types: ['geocode']});
        this.setupClickListener('driving', 'Driving');
        this.setupClickListener('bicycling', 'Bicycling');
        this.setupClickListener('transit', 'Transit');
        this.setupClickListener('walking', 'Walking');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };*/

      // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var placeSearch, autocomplete1,autocomplete2,autocomplete3;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete1 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('locationtext')),
            {types: ['geocode']});
        autocomplete2 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('origin-input')),
            {types: ['geocode']});
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete1.addListener('place_changed', fillInAddress);
        autocomplete2.addListener('place_changed', fillInAddress);
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place1 = autocomplete1.getPlace();
        var place2 = autocomplete2.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place1.address_components.length; i++) {
          var addressType1 = place1.address_components[i].types[0];
          if (componentForm[addressType1]) {
            var val = place1.address_components[i][componentForm[addressType1]];
            document.getElementById(addressType1).value = val;
          }
        }
        for (var i = 0; i < place2.address_components.length; i++) {
          var addressType2 = place2.address_components[i].types[0];
          if (componentForm[addressType2]) {
            var val = place2.address_components[i][componentForm[addressType2]];
            document.getElementById(addressType2).value = val;
          }
        }
      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete1.setBounds(circle.getBounds());
            autocomplete2.setBounds(circle.getBounds());
          });
        }
      }

var validation_flag=false,locationFieldFlag=false;
function validateKeyword(event){
    var k = document.getElementById("keywordfield").value;
    if (!k.replace(/\s/g, '').length) {
            $('#keyworderror').show();
            document.getElementById("keywordfield").style.border="2px solid red";
            document.getElementById("keyworderror").innerHTML="Please enter a keyword.";
            document.getElementById("keyworderror").style.color="red";
            document.getElementById("keyworderror").style.fontWeight="bold";
            document.getElementById("search").disabled=true;

        }
        else{
            validation_flag=true;
            $('#keyworderror').hide();
            document.getElementById("keywordfield").style.border="";
            if(document.getElementsByName("radiobutton")[0].checked==true){
                document.getElementById("search").disabled=false;
            }
            if(locationFieldFlag){
                document.getElementById("search").disabled=false;
            }
        }
}
function validateKeywordFocusOut(){
    var k = document.getElementById("keywordfield").value;
    if (!k.replace(/\s/g, '').length) {
            $('#keyworderror').show();
            document.getElementById("keywordfield").style.border="2px solid red";
            document.getElementById("keyworderror").innerHTML="Please enter a keyword.";
            document.getElementById("keyworderror").style.color="red";
            document.getElementById("keyworderror").style.fontWeight="bold";
            document.getElementById("search").disabled=true;

        }
        else{
            validation_flag=true;
            $('#keyworderror').hide();
            document.getElementById("keywordfield").style.border="";
            if(document.getElementsByName("radiobutton")[0].checked==true){
                document.getElementById("search").disabled=false;
            }
            if(locationFieldFlag){
                document.getElementById("search").disabled=false;
            }
        }
}
function validateLocationField(event){
    document.getElementById("search").disabled=true;
    var l = document.getElementById("locationtext").value;
    if(!l.replace(/\s/g, '').length) {
            document.getElementById("search").disabled=true;
            $('#locationtexterror').show();
            document.getElementById("locationtext").style.border="2px solid red";
            document.getElementById("locationtexterror").innerHTML="Please enter a location.";
            document.getElementById("locationtexterror").style.color="red";
            document.getElementById("locationtexterror").style.fontWeight="bold";
        }
        else{
            locationFieldFlag=true;
            $('#locationtexterror').hide();
            document.getElementById("locationtext").style.border="";
            if(validation_flag){
                if(document.getElementById("ipapilat").value){
                document.getElementById("search").disabled=false;
                }
            }
        }
}
function validateLocationFieldFocusOut(){
    document.getElementById("search").disabled=true;
    var l = document.getElementById("locationtext").value;
    if(!l.replace(/\s/g, '').length) {
            document.getElementById("search").disabled=true;
            $('#locationtexterror').show();
            document.getElementById("locationtext").style.border="2px solid red";
            document.getElementById("locationtexterror").innerHTML="Please enter a location.";
            document.getElementById("locationtexterror").style.color="red";
            document.getElementById("locationtexterror").style.fontWeight="bold";
        }
        else{
            locationFieldFlag=true;
            $('#locationtexterror').hide();
            document.getElementById("locationtext").style.border="";
            if(validation_flag){
                if(document.getElementById("ipapilat").value){
                document.getElementById("search").disabled=false;
                }
            }
        }
}
function disableSearchButton(){
    if(document.getElementsByName("radiobutton")[1].checked==true){
        document.getElementById("search").disabled=true;
    }
    else{
        document.getElementById("search").disabled=false;
    }
}
function toggleDirectionsButton(event){
    var l = document.getElementById("origin-input").value;
    if(!l.replace(/\s/g, '').length) {
        document.getElementById("getdirectionsbutton").disabled=true;
    }
    else{
        document.getElementById("getdirectionsbutton").disabled=false;
    }
}

function sac1(){
        
    }

var keyword="",distance="",category="",radio="",locationfield="",nearby_results=[],ipapilat="",ipapilon="",nearby_results1=[],stored_results0=[],stored_results1=[],stored_results2=[],num_clicks=0,page_tokens=[],formatted_address="",phone="",price_level="",rating="",google_page="",website="",hours="",yelp_reviews_data=[],dest_lat="",dest_lon="",source_lat="",source_lon="",place_names=[],place_names_index=0,user_center_lat="",user_center_lon="";
var results_table_flag=false;

var app=angular.module('myApp',['ngAnimate']);
app.controller('MyFormCtrl',function ($scope,$http,$timeout,$rootScope) {
    $scope.myVal=true;
    $scope.myVal1=false;
    //$scope.fadein = true;
    $scope.abc = function() {
        ipapilat=document.getElementById("ipapilat").value;
        ipapilon=document.getElementById("ipapilon").value;
        keyword=$scope.keyword;
        
        if(typeof keyword == "undefined") {
            $('#keyworderror').show();
            document.getElementById("keywordfield").style.border="2px solid red";
            document.getElementById("keyworderror").innerHTML="Please enter a keyword.";
            document.getElementById("keyworderror").style.color="red";
            document.getElementById("keyworderror").style.fontWeight="bold";
        }
        else{
            $('#keyworderror').hide();
            document.getElementById("keywordfield").style.border="";
        }
        
        distance=$scope.distance;
        if(typeof distance == "undefined") {
           distance="empty" 
        }
        category=$scope.category;
        if(typeof category=="undefined"){
            category="default";
        }
        radio=$scope.radio;
        if(typeof radio == "undefined") {
            radio="Here";
        }
        if(radio=="location"){
        locationfield=document.getElementById("locationtext").value;
        if(typeof locationfield == "undefined") {
            $('#locationtexterror').show();
            document.getElementById("locationtext").style.border="2px solid red";
            document.getElementById("locationtexterror").innerHTML="Please enter a location.";
            document.getElementById("locationtexterror").style.color="red";
            document.getElementById("locationtexterror").style.fontWeight="bold";
        }
        else{
            $('#locationtexterror').hide();
            document.getElementById("locationtext").style.border="";
        }
        }
        //console.log(autocomplete1.gm_accessors_.place.gd.formattedPrediction);
        
        //alert(keyword+" "+distance+" "+category+" "+radio+" "+locationfield);
        $('#resultstable').hide();
        $('#resultstable_norecords').hide();
        try{
        $http({
        method: "GET",
        url: "http://sachinh2503.us-east-2.elasticbeanstalk.com/index.php?keyword="+keyword+"&category="+category+"&distance="+distance+"&radio="+radio+"&locationfield="+locationfield+"&ipapilat="+ipapilat+"&ipapilon="+ipapilon,
        data: {
            keyword:keyword,category:category,distance:distance,radio:radio,locationfield:locationfield,ipapilat:ipapilat,ipapilon:ipapilon
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {// on success
            console.log(response);
            nearby_results=JSON.parse(JSON.stringify(response));
            //console.log(nearby_results);
            nearby_results1=nearby_results;
            stored_results0=nearby_results;
            $scope.status=nearby_results.data.status;
            
            temp=nearby_results.data.results;
            $scope.resultsdata=temp;
            //console.log(temp);
            for(i=0;i<temp.length;i++){
                place_names[place_names_index]=temp[i].id;
                place_names_index++;
            }
            
            $('#progressbar').show();
            $timeout(function () {
            $('#progressbar').hide();
            if(temp.length==0){
                $('#resultstable_norecords').show();
                results_table_flag=false;
            }
            else{
                $('#resultstable').show(); 
                results_table_flag=true;
            }
            
            if(nearby_results1.data.hasOwnProperty("next_page_token")){
                //document.getElementById("next").style.marginLeft="718px";
                $('#nextprevdiv').show();
                $('#next').show();
                $('#previous').hide();
            }
            }, 2000);
            getGeocodeForUserCenter();
          }, function (response) {
            console.log(response.data,response.status);
          });
        }
         catch(e){
               $('#resultstable_error').show(); 
            }
    };
    
    function sac2(){
        
    }
    
    $scope.nextpage=function(){
        num_clicks++;
        if (typeof page_tokens[num_clicks-1] !== 'undefined' && page_tokens[num_clicks-1] !== null) {
            nextpagetoken=page_tokens[num_clicks-1];
        }
        else{
        nextpagetoken=nearby_results1.data.next_page_token;
        if(num_clicks==1){
            page_tokens[0]=nextpagetoken;
        }
        else if(num_clicks==2){
            page_tokens[1]=nextpagetoken;
        }
        }
        $http({
        method: "GET",
        url: "http://sachinh2503.us-east-2.elasticbeanstalk.com/index.php?nextpagetoken="+nextpagetoken,
        data: {
        nextpagetoken:nextpagetoken
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {// on success
            nearby_results=JSON.parse(JSON.stringify(response));
            nearby_results1=nearby_results;
            if(num_clicks==1){
                stored_results1=nearby_results1;
            }
            else if(num_clicks==2){
                stored_results2=nearby_results1;
            }
            temp=nearby_results.data.results;
            $scope.resultsdata=temp;
            
            for(i=0;i<temp.length;i++){
                place_names[place_names_index]=temp[i].id;
                place_names_index++;
            }
            
            $('#resultstable').hide();
            $('#resultstable').show();
            if(nearby_results1.data.hasOwnProperty("next_page_token")){
                //document.getElementById("next").style.marginLeft="776px";
                $('#next').show();
                //document.getElementById("previous").style.marginLeft="670px";
                $('#previous').show();
            }
            else{
                $('#next').hide();
                //document.getElementById("previous").style.marginLeft="718px";
                $('#previous').show();
            }
          }, function (response) {
            console.log(response.data,response.status);    
          });
    };
    
    $scope.previouspage=function(){
        if(num_clicks==2){
            num_clicks--;
            $scope.resultsdata=stored_results1.data.results;
            $('#resultstable').hide();
            $('#resultstable').show();
            //document.getElementById("next").style.marginLeft="776px";
            $('#next').show();
            //document.getElementById("previous").style.marginLeft="670px";
            $('#previous').show();
        }
        else if(num_clicks==1){
            num_clicks--;
            $scope.resultsdata=stored_results0.data.results;
            $('#resultstable').hide();
            $('#resultstable').show();
            //document.getElementById("next").style.marginLeft="718px";
            $('#next').show();
            $('#previous').hide();
        }
    };
    
    function sac3(){
        
    }
    
    var highlighted_index=-1,google_reviews_check=[],yelp_reviews_check=[],google_reviews_flag=true,yelp_reviews_flag=true,google_highestRating=[],google_lowestRating=[],google_mostRecent=[],google_leastRecent=[],yelp_highestRating=[],yelp_lowestRating=[],yelp_mostRecent=[],yelp_leastRecent=[],user_ratings=[],google_highestRating_Ids=[10,20,30,40,50],google_lowestRatings_Ids=[60,70,80,90,100],yelp_highestRating_Ids=[110,120,130,140,150],yelp_lowestRating_Ids=[160,170,180,190,200],yelp_mostRecent_Ids=[210,220,230,240,250],yelp_leastRecent_Ids=[260,270,280,290,300],google_mostRecent_Ids=[310,320,330,340,350],google_leastRecent_Ids=[360,370,380,390,400];
    $scope.showDetails=function(index){
        google_reviews_flag=true,yelp_reviews_flag=true;
        $scope.google_highestRating_Ids=google_highestRating_Ids;
        $scope.google_lowestRatings_Ids=google_lowestRatings_Ids;
        $scope.yelp_highestRating_Ids=yelp_highestRating_Ids;
        $scope.yelp_lowestRating_Ids=yelp_lowestRating_Ids;
        //alert($scope.myVal);
        $scope.myVal=false;
        $scope.myVal1=true;
        try{
        showMap();
        highlighted_index=index;
        //$("#resultstable tbody tr").click(function(){
        $("#resultstable tbody tr:eq("+(index+2)+")").addClass('bg-warning').siblings().removeClass('bg-warning');
        //});
            
        document.getElementById("detailsmainbutton").removeAttribute("disabled");
        $('#favoritestable').hide();
        $('#favoritestable_norecords').hide();
        $('#detailsmainbutton').hide();
        $('#listbutton').show();
        $('#tweetfavouritediv').show();
        $('#twitterbtn').show();
        $('#place_name').show();
        //$('#info').show();
            
        var days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        var curr_time=moment().format();
        var curr_day=moment(moment().format()).utcOffset("dddd").toString();
        curr_day=curr_day.split(" ", 1);
        var day_index=0,i=0;
        while(days[i]!=curr_day && i<days.length){
              i++;
              }
        var day_index=i;
            
        if(num_clicks==0){
            temp=stored_results0;
        }
        else if(num_clicks==1){
            temp=stored_results1;
        }
        else if(num_clicks==2){
            temp=stored_results2;
        }
            
            //console.log(temp);
        placeid=temp.data.results[index].place_id;

        var request = {
        placeId: placeid
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

        function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            $scope.place_details=place;
            console.log($scope.place_details);
            
            /*setTimeout(function(){
            if(!($scope.place_details.hasOwnProperty("formatted_address"))){
                    document.getElementById("info_table").deleteRow(1);
                }
            if(!($scope.place_details.hasOwnProperty("international_phone_number"))){
                    document.getElementById("info_table").deleteRow(2);
                }
            if(!($scope.place_details.hasOwnProperty("rating"))){
                    document.getElementById("info_table").deleteRow(4);
                }
            if(!($scope.place_details.hasOwnProperty("url"))){
                    document.getElementById("info_table").deleteRow(5);
                }
            if(!($scope.place_details.hasOwnProperty("website"))){
                    document.getElementById("info_table").deleteRow(6);
                }
            },500);*/
            
            setTimeout(function(){
                $scope.reviewStars($scope.place_details.rating,$scope.place_details.id);
            },500);
            
        if($scope.place_details.hasOwnProperty("reviews")){
            for(i=0;i<$scope.place_details.reviews.length;i++){
                user_ratings[i]=$scope.place_details.reviews[i].rating;
            }
        google_highestRating=user_ratings;
        google_highestRating=google_highestRating.sort();
        google_highestRating=google_highestRating.reverse();
        $scope.google_highRatings=google_highestRating;
        setTimeout(function(){
           for(i=0;i<google_highestRating.length;i++){
            ratingsHigh(google_highestRating[i],google_highestRating_Ids[i]);
            } 
        },500);
        
        setTimeout(function(){
        google_ratings=[];
        google_ratings=$scope.place_details.reviews;
        for(i=0;i<google_ratings.length;i++){
            $scope.reviewStars(google_ratings[i].rating,google_ratings[i].time);
        }
        },500);
        
        setTimeout(function(){
        google_lowestRating=google_highestRating.sort(); 
           for(i=0;i<google_lowestRating.length;i++){
            ratingsHigh(google_lowestRating[i],google_lowestRatings_Ids[i]);
        } 
        },500);
            
        }
            
            $scope.twitter_name=encodeURIComponent($scope.place_details.name);
            $scope.twitter_address=encodeURIComponent($scope.place_details.formatted_address);
            $scope.twitter_website=encodeURI($scope.place_details.website);
            
            if(ids.includes(place.id)){
                document.getElementById("tabs_favorite").setAttribute("class","glyphicon glyphicon-star");
                document.getElementById("tabs_favorite").style.color="#FFD700";
            }
            else{
                document.getElementById("tabs_favorite").setAttribute("class","glyphicon glyphicon-star-empty");
                document.getElementById("tabs_favorite").style.color="black";
            }
            
            dest_lon=(($scope.place_details.geometry.viewport.b.b)+($scope.place_details.geometry.viewport.b.f))/2.0;
            dest_lat=(($scope.place_details.geometry.viewport.f.b)+($scope.place_details.geometry.viewport.f.f))/2.0;
            //alert(dest_lat+" "+dest_lon);
            //------------------------------------------YELP Section-----------------------------------------------------------//          
        var name=$scope.place_details.name;
        var city="",state="",country="",street_num="",route="",neighborhood="",address1="",yelp_response="";
        for(i=0;i<$scope.place_details.address_components.length;i++){
            if($scope.place_details.address_components[i].types[0]=="locality"){
                city=$scope.place_details.address_components[i].short_name;
            }
            if($scope.place_details.address_components[i].types[0]=="administrative_area_level_1"){
                state=$scope.place_details.address_components[i].short_name;
            }
            if($scope.place_details.address_components[i].types[0]=="country"){
                country=$scope.place_details.address_components[i].short_name;
            }
            if($scope.place_details.address_components[i].types[0]=="street_number"){
                street_num=$scope.place_details.address_components[i].short_name;
            }
            if($scope.place_details.address_components[i].types[0]=="route"){
                route=$scope.place_details.address_components[i].short_name;
            }
            if($scope.place_details.address_components[i].types[0]=="neighborhood"){
                neighborhood=$scope.place_details.address_components[i].short_name;
            }
        }
        street_num=street_num.split(' ').join('+');
        route=route.split(' ').join('+');
        neighborhood=neighborhood.split(' ').join('+');
        address1=street_num+"+"+route+"+"+neighborhood;
        //alert(address1);
        $http({
        method: "GET",
        url: "http://sachinh2503.us-east-2.elasticbeanstalk.com/index.php?name="+name+"&city="+city+"&state="+state+"&country="+country+"&address1="+address1,
        data: {
            name:name,city:city,state:state,country:country,address1:address1
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {// on success
            document.getElementById("reviewstype").selectedIndex=0;
            document.getElementById("reviewsfilter").selectedIndex=0;
            yelp_reviews_data=JSON.parse(JSON.stringify(response));
            console.log(yelp_reviews_data);
            $scope.yelp_reviews_data=yelp_reviews_data;
            if(yelp_reviews_data.data.hasOwnProperty("reviews")){
            $scope.yelp_reviews=$scope.yelp_reviews_data.data.reviews;
            yelp_reviews_check=yelp_reviews_data.data.reviews;
//================================================================Google/Yelp ratings=====================================================                    
        setTimeout(function(){
        yelp_ratings=[];
        yelp_ratings=$scope.yelp_reviews;
        for(i=0;i<yelp_ratings.length;i++){
            $scope.reviewStars(yelp_ratings[i].rating,yelp_ratings[i].id);
        }
        },500);
        
        if(yelp_reviews_check.length>0){
            for(i=0;i<yelp_reviews_check.length;i++){
                yelp_highestRating[i]=yelp_reviews_check[i].rating;
            }
            yelp_highestRating=yelp_highestRating.sort();
            yelp_highestRating=yelp_highestRating.reverse();
            $scope.yelp_highRatings=yelp_highestRating;
            setTimeout(function(){
                for(i=0;i<yelp_highestRating.length;i++){
                    ratingsHigh(yelp_highestRating[i],yelp_highestRating_Ids[i]);
                } 
            },1000);
            
            
            setTimeout(function(){
            yelp_lowestRating=yelp_highestRating.sort(); 
                for(i=0;i<yelp_lowestRating.length;i++){
                    ratingsHigh(yelp_lowestRating[i],yelp_lowestRating_Ids[i]);
                } 
            },1000);
            
            
        }    
  //========================================================================================================================================              
            var myDate="",temp_array=[],temp=[],myEpoch="",yelp_asc=[],yelp_desc=[];
            temp_array=$scope.yelp_reviews;
            for(i=0;i<temp_array.length;i++){
             myDate = new Date(temp_array[i]["time_created"]); // Your timezone!
             myEpoch = myDate.getTime()/1000.0;
             temp[i]=myEpoch;
            }
            temp=temp.sort();
            for(i=0;i<temp.length;i++){
            var timestamp = temp[i];
            var date = new Date(timestamp*1000);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var hours = ("0" + date.getHours()).slice(-2);
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);

            yelp_asc[i]=year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            }    
            //console.log(yelp_asc);
            $scope.yelp_asc=yelp_asc;
            temp=temp.reverse();
            for(i=0;i<temp.length;i++){
            var timestamp = temp[i];
            var date = new Date(timestamp*1000);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var hours = ("0" + date.getHours()).slice(-2);
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);

            yelp_desc[i]=year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            }
            //console.log(yelp_desc);
            $scope.yelp_desc=yelp_desc;
               
            console.log(yelp_reviews_check);
            $scope.yelp_MostRecentIds=yelp_mostRecent_Ids;
            setTimeout(function(){
            yelp_mostRecent=yelp_desc; 
                for(i=0;i<yelp_mostRecent.length;i++){
                    for(j=0;j<yelp_reviews_check.length;j++){
                        if(yelp_mostRecent[i]==yelp_reviews_check[j].time_created){
                            //alert("matched- "+yelp_reviews_check[j].rating+"  "+yelp_mostRecent[i]);
                            ratingsHigh(yelp_reviews_check[j].rating,yelp_mostRecent_Ids[i]);
                        }
                    }
                } 
            },1000);
            
            $scope.yelp_LeastRecentIds=yelp_leastRecent_Ids;
            setTimeout(function(){
            yelp_leastRecent=yelp_asc; 
                for(i=0;i<yelp_leastRecent.length;i++){
                    for(j=0;j<yelp_reviews_check.length;j++){
                        if(yelp_leastRecent[i]==yelp_reviews_check[j].time_created){
                            //alert("matched- "+yelp_reviews_check[j].rating+"  "+yelp_mostRecent[i]);
                            ratingsHigh(yelp_reviews_check[j].rating,yelp_leastRecent_Ids[i]);
                        }
                    }
                } 
            },1000);
                
            }
            else{
                //alert("no yelp");
                yelp_reviews_flag=false;
            }
          }, function (response) {
            console.log(response.data,response.status);
               
          });    
 //------------------------------------------------------------------------------------------------------------------------------------           
        if($scope.place_details.hasOwnProperty("opening_hours")){
        if($scope.place_details.opening_hours.open_now){
            $scope.openorclose=true;
        }
        else{
             $scope.openorclose=false;   
        }
        $scope.currday_open_hours=$scope.place_details.opening_hours.weekday_text[day_index].toString();
        $scope.currday_open_hours=$scope.currday_open_hours.split(":")[1]+":"+$scope.currday_open_hours.split(":")[2]+":"+$scope.currday_open_hours.split(":")[3];
        $scope.monday_hours=$scope.place_details.opening_hours.weekday_text[0].toString();
        $scope.monday_hours=$scope.monday_hours.split(":")[1]+":"+$scope.monday_hours.split(":")[2]+":"+$scope.monday_hours.split(":")[3];
        $scope.tuesday_hours=$scope.place_details.opening_hours.weekday_text[1].toString();
        $scope.tuesday_hours=$scope.tuesday_hours.split(":")[1]+":"+$scope.tuesday_hours.split(":")[2]+":"+$scope.tuesday_hours.split(":")[3];
        $scope.wednesday_hours=$scope.place_details.opening_hours.weekday_text[2].toString();
        $scope.wednesday_hours=$scope.wednesday_hours.split(":")[1]+":"+$scope.wednesday_hours.split(":")[2]+":"+$scope.wednesday_hours.split(":")[3];
        $scope.thursday_hours=$scope.place_details.opening_hours.weekday_text[3].toString();
        $scope.thursday_hours=$scope.thursday_hours.split(":")[1]+":"+$scope.thursday_hours.split(":")[2]+":"+$scope.thursday_hours.split(":")[3];
        $scope.friday_hours=$scope.place_details.opening_hours.weekday_text[4].toString();
        $scope.friday_hours=$scope.friday_hours.split(":")[1]+":"+$scope.friday_hours.split(":")[2]+":"+$scope.friday_hours.split(":")[3];
        $scope.saturday_hours=$scope.place_details.opening_hours.weekday_text[5].toString();
        $scope.saturday_hours=$scope.saturday_hours.split(":")[1]+":"+$scope.saturday_hours.split(":")[2]+":"+$scope.saturday_hours.split(":")[3];
        $scope.sunday_hours=$scope.place_details.opening_hours.weekday_text[6].toString();
        $scope.sunday_hours=$scope.sunday_hours.split(":")[1]+":"+$scope.sunday_hours.split(":")[2]+":"+$scope.sunday_hours.split(":")[3];
        $scope.day_index=day_index;
        if($scope.day_index=="0"){
            $scope.monday_flag=true;
        }
        else if($scope.day_index=="1"){
            $scope.tuesday_flag=true;
        }
        else if($scope.day_index=="2"){
            $scope.wednesday_flag=true;
        }
        else if($scope.day_index=="3"){
            $scope.thursday_flag=true;
        }
        else if($scope.day_index=="4"){
            $scope.friday_flag=true;
        }
        else if($scope.day_index=="5"){
            $scope.saturday_flag=true;
        }
        else if($scope.day_index=="6"){
            $scope.sunday_flag=true;
        }
            
        }
        
        if(!$scope.place_details.hasOwnProperty("price_level")){
           $scope.price_level="$";
        }
        else{
           $scope.price_level=$scope.place_details.price_level;
        }
        
        
        photos_array=[];
        if($scope.place_details.hasOwnProperty("photos")){
        photos_array=$scope.place_details.photos;
        for(i=1;i<=photos_array.length;i++){
            photos_array[i-1]=photos_array[i-1].getUrl({'maxWidth': 2000, 'maxHeight': 2000});
        }
        $scope.photos_array=photos_array;
        $scope.photo1=photos_array[0];
        $scope.photo2=photos_array[1];
        $scope.photo3=photos_array[2];
        $scope.photo4=photos_array[3];
        $scope.photo5=photos_array[4];
        $scope.photo6=photos_array[5];
        $scope.photo7=photos_array[6];
        $scope.photo8=photos_array[7];
        $scope.photo9=photos_array[8];
        $scope.photo10=photos_array[9];
          
        $scope.photo_flag1=true;
        if(photos_array[0]=="" || photos_array[0]==null){
                $scope.photo_flag1=false;
        }
        $scope.photo_flag2=true;
        if(photos_array[1]=="" || photos_array[1]==null){
                $scope.photo_flag2=false;
        }
        $scope.photo_flag3=true;
        if(photos_array[2]=="" || photos_array[2]==null){
                $scope.photo_flag3=false;
        }
        $scope.photo_flag4=true;
        if(photos_array[3]=="" || photos_array[3]==null){
                $scope.photo_flag4=false;
        }
        $scope.photo_flag5=true;
        if(photos_array[4]=="" || photos_array[4]==null){
                $scope.photo_flag5=false;
        }
        $scope.photo_flag6=true;
        if(photos_array[5]=="" || photos_array[5]==null){
                $scope.photo_flag6=false;
        }
        $scope.photo_flag7=true;
        if(photos_array[6]=="" || photos_array[6]==null){
                $scope.photo_flag7=false;
        }
        $scope.photo_flag8=true;
        if(photos_array[7]=="" || photos_array[7]==null){
                $scope.photo_flag8=false;
        }
        $scope.photo_flag9=true;
        if(photos_array[8]=="" || photos_array[8]==null){
                $scope.photo_flag8=false;
        }
        $scope.photo_flag10=true;
        if(photos_array[9]=="" || photos_array[9]==null){
                $scope.photo_flag10=false;
        }
        }
        else{
            $('#photos_norecords').show();
        }
        
        review_time=[],asc_review_time=[],desc_review_time=[],temp=[];
        if($scope.place_details.hasOwnProperty("reviews")){
        $scope.userreviews=$scope.place_details.reviews;
        google_reviews_check=$scope.userreviews;
        for(i=0;i<$scope.userreviews.length;i++){
            var timestamp = $scope.userreviews[i].time;
            var date = new Date(timestamp*1000);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var hours = ("0" + date.getHours()).slice(-2);
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);

            review_time[i]=year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
        $scope.review_time=review_time;
        
        for(i=0;i<$scope.userreviews.length;i++){
            temp[i]=$scope.userreviews[i].time;
        }    
        temp=temp.sort();
        arrAsc=[],arrDesc=[];
        arrAsc=temp;    
        $scope.yelp_asc_epoch=temp;
        for(i=0;i<temp.length;i++){
            var timestamp = temp[i];
            var date = new Date(timestamp*1000);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var hours = ("0" + date.getHours()).slice(-2);
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);

            asc_review_time[i]=year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }    
        console.log(asc_review_time);
        $scope.asc_review_time=asc_review_time;
        temp=temp.reverse();
        arrDesc=temp;
        $scope.yelp_desc_epoch=temp;
        for(i=0;i<temp.length;i++){
            var timestamp = temp[i];
            var date = new Date(timestamp*1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            desc_review_time[i]=year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
        console.log(desc_review_time);
        $scope.desc_review_time=desc_review_time;
          
        $scope.google_LeastRecentIds=google_leastRecent_Ids;
            setTimeout(function(){
            google_leastRecent=arrAsc; 
                for(i=0;i<google_leastRecent.length;i++){
                    for(j=0;j<$scope.userreviews.length;j++){
                        if(google_leastRecent[i]==$scope.userreviews[j].time){
                            //alert("matched- "+yelp_reviews_check[j].rating+"  "+yelp_mostRecent[i]);
                            ratingsHigh($scope.userreviews[j].rating,google_leastRecent_Ids[i]);
                        }
                    }
                } 
            },1000);
            
            $scope.google_MostRecentIds=google_mostRecent_Ids;
            setTimeout(function(){
            google_mostRecent=arrDesc; 
                for(i=0;i<google_mostRecent.length;i++){
                    for(j=0;j<$scope.userreviews.length;j++){
                        if(google_mostRecent[i]==$scope.userreviews[j].time){
                            //alert("matched- "+yelp_reviews_check[j].rating+"  "+yelp_mostRecent[i]);
                            ratingsHigh($scope.userreviews[j].rating,google_mostRecent_Ids[i]);
                        }
                    }
                } 
            },1000);    
        
        }
        else{
            //alert("else");
            google_reviews_flag=false;
            $('#'+$scope.place_details.id).hide();
            $('#google_reviews_norecords').show();
        }
 //=========================================================================================================================           
      
        }
        $('#resultstable').hide();
        $('#resultstable_norecords').hide();
        $('#nextprevdiv').hide();
        /*//alert($scope.myValue);
        if($scope.myValue==true){
            $scope.myValue=false;*/
            $('#place_details_tabs').css('display','block');
        /*}
        else{
            $scope.myValue=true;
        }*/
        
        
        var radios=document.getElementsByName("radiobutton");
        if(radios[0].checked==true){
            document.getElementById("origin-input").value="Your location";
        }
        else{
            document.getElementById("origin-input").value=document.getElementById("locationtext").value;    
        }
        document.getElementById("destination-input").value=$scope.place_details.formatted_address;
        document.getElementById("destination-input").style.backgroundColor="#808080";
        }
        
    }
    catch(e){
        $('#placedetails_error').show();
    }
    };
    
    
    $.fn.stars = function(ratings) {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat(ratings);
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
    }
    
    $scope.backToList=function(){
        $scope.myVal=true;
        $scope.myVal1=false;
        $('#listbutton').hide();
        $('#tweetfavouritediv').hide();
        $('#place_name').hide();
        $('#place_details_tabs').hide();
        $('#detailsmainbutton').show();
        
        if(results_favorite_tab_flag){
          $('#nextprevdiv').show();
          $('#resultstable').show();
          $('#favoritestable').hide();
        }
        else{
          $('#resultstable').hide();
          $('#favoritestable').show(); 
        }
        
        /*if(nearby_results1.data.hasOwnProperty("next_page_token")){
                //document.getElementById("next").style.marginLeft="718px";
                $('#nextprevdiv').show();
                $('#next').show();
        }*/
        
        if(num_clicks==0){
            $('#next').show();
            $('#previous').hide();
        }
        else if(num_clicks==1){
            $('#next').show();
            $('#previous').show();
        }
        else if(num_clicks==2){
            $('#next').hide();
            $('#previous').show();
        }
    };
    
    $scope.calc_ratings=function(){
        google_ratings=[];
        if(google_reviews_flag){
        google_ratings=$scope.userreviews;
        for(i=0;i<google_ratings.length;i++){
            $scope.reviewStars(google_ratings[i].rating,google_ratings[i].time);
        }
        }
        yelp_ratings=[];
        if(yelp_reviews_flag){
        yelp_ratings=$scope.yelp_reviews;
        //setTimeout(function(){
        for(i=0;i<yelp_ratings.length;i++){
            $scope.reviewStars(yelp_ratings[i].rating,yelp_ratings[i].id);
        }
        }
    };
    
    $scope.reviewStars=function(user_ratings,id){
        //alert(user_ratings+"  "+id);
            $('#'+id).rateYo({
            rating: user_ratings,
            precision: 1,
            readOnly: true,
            starWidth: "20px"
            });
        $('#'+id).rateYo("rating", user_ratings);
            /*$('#'+id).rateYo({
            rating: user_ratings,
            precision: 1,
            readOnly: true,
            starWidth: "20px"
            });
        $('#'+id).rateYo("option","rating", user_ratings);*/
        
    };
    
    $scope.selectReviewType=function(){
        //alert($scope.fadein);
        //$scope.fadein = !$scope.fadein;
        if(document.getElementById("reviewstype").selectedIndex==0){
        if(google_reviews_flag){
         $('#google_reviews_norecords').hide();
         $('#yelp_reviews_norecords').hide();
         if(document.getElementById("reviewsfilter").selectedIndex==0){
            $("#google_reviews_default").fadeIn("slow"); 
            $('#google_reviews_default').show();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
            }
         if(document.getElementById("reviewsfilter").selectedIndex==1){
            $('#google_reviews_default').hide();
            $("#google_reviews_highest_rating").fadeIn("slow"); 
            $('#google_reviews_highest_rating').show();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
            }
        if(document.getElementById("reviewsfilter").selectedIndex==2){
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $("#google_reviews_lowest_rating").fadeIn("slow");
            $('#google_reviews_lowest_rating').show();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
            }
        if(document.getElementById("reviewsfilter").selectedIndex==3){
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $("#google_reviews_most_recent").fadeIn("slow");
            $('#google_reviews_most_recent').show();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
            }
        if(document.getElementById("reviewsfilter").selectedIndex==4){
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $("#google_reviews_least_recent").fadeIn("slow");
            $('#google_reviews_least_recent').show();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
            }
        }
        else{
            $('#google_reviews_norecords').show();
            $('#yelp_reviews_norecords').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
        }
        }
        else{
            //alert(yelp_reviews_flag);
          if(yelp_reviews_flag){
          $('#yelp_reviews_norecords').hide();
          $('#google_reviews_norecords').hide();
          if(document.getElementById("reviewsfilter").selectedIndex==0){  
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $("#yelp_reviews_default").fadeIn("slow");
            $('#yelp_reviews_default').show();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
          }
         if(document.getElementById("reviewsfilter").selectedIndex==1){  
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $("#yelp_reviews_highest_rating").fadeIn("slow"); 
            $('#yelp_reviews_highest_rating').show();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
          }
        if(document.getElementById("reviewsfilter").selectedIndex==2){  
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $("#yelp_reviews_lowest_rating").fadeIn("slow");
            $('#yelp_reviews_lowest_rating').show();
            $('#yelp_reviews_most_recent').hide();
            $('#yelp_reviews_least_recent').hide();
          }
        if(document.getElementById("reviewsfilter").selectedIndex==3){  
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $("#yelp_reviews_most_recent").fadeIn("slow");
            $('#yelp_reviews_most_recent').show();
            $('#yelp_reviews_least_recent').hide();
          }
        if(document.getElementById("reviewsfilter").selectedIndex==4){  
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_default').hide();
            $('#yelp_reviews_highest_rating').hide();
            $('#yelp_reviews_lowest_rating').hide();
            $('#yelp_reviews_most_recent').hide();
            $("#yelp_reviews_least_recent").fadeIn("slow");
            $('#yelp_reviews_least_recent').show();
          }
        }
        else{
            $('#google_reviews_norecords').hide();
            $('#google_reviews_default').hide();
            $('#google_reviews_highest_rating').hide();
            $('#google_reviews_lowest_rating').hide();
            $('#google_reviews_most_recent').hide();
            $('#google_reviews_least_recent').hide();
            $('#yelp_reviews_norecords').show();    
        }
        }
    };
    
    $scope.sortFunctionHighestRating=function(reviewsdata){
            return -reviewsdata.rating;
    };
    $scope.sortFunctionLowestRating=function(reviewsdata){
            return reviewsdata.rating;
    };
    $scope.sortFunctionMostRecent=function(reviewsdata){
        if(document.getElementById("reviewstype").selectedIndex==0){
            return -reviewsdata.time;
        }
        else{
            return -reviewsdata.time_created; 
        }
    };
    $scope.sortFunctionLeastRecent=function(reviewsdata){
         if(document.getElementById("reviewstype").selectedIndex==0){
            return reviewsdata.time;
        }
        else{
            return reviewsdata.time_created;
        }
    };
    
    $scope.sortReviews=function(){
        //$scope.calc_ratings();
            if(document.getElementById("reviewsfilter").selectedIndex==0){
               if(document.getElementById("reviewstype").selectedIndex==0){
                   $('#google_reviews_default').show();
                   $('#yelp_reviews_default').hide();
               }
                else{
                   $('#google_reviews_default').hide();
                   $('#yelp_reviews_default').show(); 
                }
               
               $('#google_reviews_highest_rating').hide();
               $('#google_reviews_lowest_rating').hide();
               $('#google_reviews_most_recent').hide();
               $('#google_reviews_least_recent').hide();
               
               $('#yelp_reviews_highest_rating').hide();
               $('#yelp_reviews_lowest_rating').hide();
               $('#yelp_reviews_most_recent').hide();
               $('#yelp_reviews_least_recent').hide();
            }
        
            if(document.getElementById("reviewsfilter").selectedIndex==1){
               if(document.getElementById("reviewstype").selectedIndex==0){
                   $('#google_reviews_highest_rating').show();
                   $('#yelp_reviews_highest_rating').hide();
               }
                else{
                   $('#google_reviews_highest_rating').hide();
                   $('#yelp_reviews_highest_rating').show(); 
                }
               $('#google_reviews_default').hide();
               
               $('#google_reviews_lowest_rating').hide();
               $('#google_reviews_most_recent').hide();
               $('#google_reviews_least_recent').hide();
               $('#yelp_reviews_default').hide();
               
               $('#yelp_reviews_lowest_rating').hide();
               $('#yelp_reviews_most_recent').hide();
               $('#yelp_reviews_least_recent').hide();
            }
          
            if(document.getElementById("reviewsfilter").selectedIndex==2){
               if(document.getElementById("reviewstype").selectedIndex==0){
                   $('#google_reviews_lowest_rating').show();
                   $('#yelp_reviews_lowest_rating').hide();
               }
                else{
                   $('#google_reviews_lowest_rating').hide();
                   $('#yelp_reviews_lowest_rating').show(); 
                }
               $('#google_reviews_default').hide();
               $('#google_reviews_highest_rating').hide();
               
               $('#google_reviews_most_recent').hide();
               $('#google_reviews_least_recent').hide();
               $('#yelp_reviews_default').hide();
               $('#yelp_reviews_highest_rating').hide();
               
               $('#yelp_reviews_most_recent').hide();
               $('#yelp_reviews_least_recent').hide();
            }
            if(document.getElementById("reviewsfilter").selectedIndex==3){
               if(document.getElementById("reviewstype").selectedIndex==0){
                   $('#google_reviews_most_recent').show();
                   $('#yelp_reviews_most_recent').hide();
               }
                else{
                   $('#google_reviews_most_recent').hide();
                   $('#yelp_reviews_most_recent').show(); 
                }
               $('#google_reviews_default').hide();
               $('#google_reviews_highest_rating').hide();
               $('#google_reviews_lowest_rating').hide();
               
               $('#google_reviews_least_recent').hide();
               $('#yelp_reviews_default').hide();
               $('#yelp_reviews_highest_rating').hide();
               $('#yelp_reviews_lowest_rating').hide();
               
               $('#yelp_reviews_least_recent').hide(); 
            }
            if(document.getElementById("reviewsfilter").selectedIndex==4){
                if(document.getElementById("reviewstype").selectedIndex==0){
                   $('#google_reviews_least_recent').show();;
                   $('#yelp_reviews_least_recent').hide();
               }
                else{
                   $('#google_reviews_least_recent').hide();
                   $('#yelp_reviews_least_recent').show(); 
                }
               $('#google_reviews_default').hide();
               $('#google_reviews_highest_rating').hide();
               $('#google_reviews_lowest_rating').hide();
               $('#google_reviews_most_recent').hide();
               
               $('#yelp_reviews_default').hide();
               $('#yelp_reviews_highest_rating').hide();
               $('#yelp_reviews_lowest_rating').hide();
               $('#yelp_reviews_most_recent').hide();
                
            }
        
        /*alert("sac");
        if(google_reviews_flag){
        google_ratings=$scope.userreviews;
        setTimeout(function(){
        for(i=0;i<google_ratings.length;i++){
            $scope.reviewStars(google_ratings[i].rating,google_ratings[i].time);
        }
        },1000);
        }*/
    };
    
    $scope.showPrevDetails=function(){
        $scope.myVal=false;
        $scope.myVal1=true;
        $('#detailsmainbutton').hide();
        $('#listbutton').show();
        $('#tweetfavouritediv').show();
        $('#place_name').show();
        $('#favoritestable').hide();
        $('#favoritestable_norecords').hide();
        $('#resultstable').hide();
        $('#nextprevdiv').hide();
        $('#place_details_tabs').css('display','block');
    };
    
    /*var favorites_data = {
            icon: [],
            name: [],
            address: []
            };*/
    var icon=[],name=[],address=[],ids=[];
    $scope.saveFavorites=function(){
        if(document.getElementById("tabs_favorite").getAttribute("class")=="glyphicon glyphicon-star-empty"){
            document.getElementById("tabs_favorite").setAttribute("class","glyphicon glyphicon-star");
            document.getElementById("tabs_favorite").style.color="#FFD700";
            
            icon.push($scope.place_details.icon);
            name.push($scope.place_details.name);
            address.push($scope.place_details.vicinity);
            ids.push($scope.place_details.id);
            
            localStorage.setItem("icon", JSON.stringify(icon));
            localStorage.setItem("name", JSON.stringify(name));
            localStorage.setItem("address", JSON.stringify(address));
            localStorage.setItem("id", JSON.stringify(ids));
            
            $scope.favoritedata_icon=JSON.parse(localStorage.getItem("icon"));
            $scope.favoritedata_name=JSON.parse(localStorage.getItem("name"));
            $scope.favoritedata_address=JSON.parse(localStorage.getItem("address"));
            $scope.favoritedata_id=JSON.parse(localStorage.getItem("id"));
            
            elem=document.getElementsByName("glyphicon glyphicon-star-empty");
            for(i=0;i<place_names.length;i++){
            if($scope.place_details.id==place_names[i]){
                if(num_clicks==0){
                    elem[i].setAttribute("class","glyphicon glyphicon-star");
                    elem[i].style.color="#FFD700";
                    break;
                }
                else if(num_clicks==1){
                    elem[i-20].setAttribute("class","glyphicon glyphicon-star");
                    elem[i-20].style.color="#FFD700";
                    break;
                }
                else if(num_clicks==2){
                    elem[i-40].setAttribute("class","glyphicon glyphicon-star");
                    elem[i-40].style.color="#FFD700";
                    break;
                }
                }
            }
        }
        else{
            document.getElementById("tabs_favorite").setAttribute("class","glyphicon glyphicon-star-empty");
            document.getElementById("tabs_favorite").style.color="black";
            elem=document.getElementsByName("glyphicon glyphicon-star-empty");
            for(i=0;i<place_names.length;i++){
            if($scope.place_details.id==place_names[i]){
                if(num_clicks==0){
                    elem[i].setAttribute("class","glyphicon glyphicon-star-empty");
                    elem[i].style.color="black";
                    break;
                }
                else if(num_clicks==1){
                    elem[i-20].setAttribute("class","glyphicon glyphicon-star-empty");
                    elem[i-20].style.color="black";
                    break;
                }
                else if(num_clicks==2){
                    elem[i-40].setAttribute("class","glyphicon glyphicon-star-empty");
                    elem[i-40].style.color="black";
                    break;
                }
                }
            }
            $scope.deleteFavorite($scope.place_details.id);
        }
    };
    
    var elem=[],res=[];
    $scope.saveFavoritesInMainPage=function(index){
        res=$scope.resultsdata;
        elem=document.getElementsByName("glyphicon glyphicon-star-empty");
        if(elem[index].getAttribute("class")=="glyphicon glyphicon-star-empty"){
            elem[index].setAttribute("class","glyphicon glyphicon-star");
            elem[index].style.color="#FFD700";
            
            //res=$scope.resultsdata;
            icon.push(res[index].icon);
            name.push(res[index].name);
            address.push(res[index].vicinity);
            ids.push(res[index].id);
            
            localStorage.setItem("icon", JSON.stringify(icon));
            localStorage.setItem("name", JSON.stringify(name));
            localStorage.setItem("address", JSON.stringify(address));
            localStorage.setItem("id", JSON.stringify(ids));
            
            $scope.favoritedata_icon=JSON.parse(localStorage.getItem("icon"));
            $scope.favoritedata_name=JSON.parse(localStorage.getItem("name"));
            $scope.favoritedata_address=JSON.parse(localStorage.getItem("address"));
            $scope.favoritedata_id=JSON.parse(localStorage.getItem("id"));
            
        }
        else{
            elem[index].setAttribute("class","glyphicon glyphicon-star-empty");
            elem[index].style.color="black";
            $scope.deleteFavorite(res[index].id);
            /*document.getElementById("tabs_favorite").setAttribute("class","glyphicon glyphicon-star-empty");
            document.getElementById("tabs_favorite").style.color="black";*/
        }
    };
    
    var results_favorite_tab_flag=true;
    $scope.showFavorites=function(){
        results_favorite_tab_flag=false;
        
        $('#resultstable').hide();
        $('#resultstable_norecords').hide();
        $('#nextprevdiv').hide();
        $('#place_details_tabs').hide();
        $('#listbutton').hide();
        $('#tweetfavouritediv').hide();
        $('#place_name').hide();
        if(icon.length==0){
            $('#favoritestable_norecords').show();
            $('#favoritestable').hide();
        }
        else{
            $('#favoritestable').show();
            $('#favoritestable_norecords').hide();
        }
        
        $('#detailsmainbutton').show();
        
        $('#favouritesbutton').css('background','#2196F3');
        $('#favouritesbutton').css('color','white');
        $('#favouritesbutton').css('border','1px solid grey');
        $('#favouritesbutton').css('border-left','none');
        $('#favouritesbutton').css('cursor','pointer');
        $('#favouritesbutton').css('border-radius','6px');
        
        $('#resultsbutton').css('background-color','white');
        $('#resultsbutton').css('color','royalblue');
        $('#resultsbutton').css('border','none');
        
        for(i=0;i<ids.length;i++){
            if(place_names[highlighted_index]==ids[i]){
                $("#favoritestable tbody tr:eq("+(i+2)+")").addClass('bg-warning').siblings().removeClass('bg-warning');
            }
        }
    };
    
    $scope.showResults=function(){
        results_favorite_tab_flag=true;
        
        if(results_table_flag){
        $('#resultstable').show();
        $('#nextprevdiv').show();
        }
        else{
         $('#resultstable_norecords').show();
         $('#nextprevdiv').hide();
        }
        $('#favoritestable').hide();
        $('#favoritestable_norecords').hide();
        $('#listbutton').hide();
        $('#tweetfavouritediv').hide();
        $('#place_name').hide();
        $('#place_details_tabs').css('display','none');
    
        if(num_clicks==0){
            $('#next').show();
            $('#previous').hide();
        }
        else if(num_clicks==1){
            $('#next').show();
            $('#previous').show();
        }
        else if(num_clicks==2){
            $('#next').hide();
            $('#previous').show();
        }
        
        $('#resultsbutton').css('background','#2196F3');
        $('#resultsbutton').css('color','white');
        $('#resultsbutton').css('border','1px solid grey');
        $('#resultsbutton').css('border-left','none');
        $('#resultsbutton').css('cursor','pointer');
        $('#resultsbutton').css('border-radius','6px');
        
        $('#favouritesbutton').css('background-color','white');
        $('#favouritesbutton').css('color','royalblue');
        $('#favouritesbutton').css('border','none');
    };
    
    $scope.getPlaceIndex=function(place_name_to_be_indexed){
        $scope.myVal=true;
        $scope.myVal1=true;
        for(i=0;i<place_names.length;i++){
            if(place_name_to_be_indexed==place_names[i]){
                if(num_clicks==0){
                    $scope.showDetails(i);
                    break;
                }
                else if(num_clicks==1){
                    $scope.showDetails(i-20);
                    break;
                }
                else if(num_clicks==2){
                    $scope.showDetails(i-40);
                    break;
                }
            }
        }
    };
    
    var place_id_to_be_deleted=[],place_icon_to_be_deleted=[],place_name_to_be_deleted=[],place_address_to_be_deleted=[],index_to_be_deleted=-1;
    $scope.deleteFavorite=function(temp){
        place_id_to_be_deleted=JSON.parse(localStorage.getItem("id"));
        place_icon_to_be_deleted=JSON.parse(localStorage.getItem("icon"));
        place_name_to_be_deleted=JSON.parse(localStorage.getItem("name"));
        place_address_to_be_deleted=JSON.parse(localStorage.getItem("address"));
        
        /*console.log(place_id_to_be_deleted);
        console.log(place_name_to_be_deleted);*/
        
        for(i=0;i<place_id_to_be_deleted.length;i++){
            if(place_id_to_be_deleted[i]==temp){
                index_to_be_deleted=i;
                break;
            }
        }
        if (index_to_be_deleted > -1) {
            place_id_to_be_deleted.splice(index_to_be_deleted, 1);
            place_icon_to_be_deleted.splice(index_to_be_deleted, 1);
            place_name_to_be_deleted.splice(index_to_be_deleted, 1);
            place_address_to_be_deleted.splice(index_to_be_deleted, 1);
        }
        icon=place_icon_to_be_deleted;
        name=place_name_to_be_deleted;
        address=place_address_to_be_deleted;
        ids=place_id_to_be_deleted;
        
        localStorage.setItem("icon", JSON.stringify(place_icon_to_be_deleted));
        localStorage.setItem("name", JSON.stringify(place_name_to_be_deleted));
        localStorage.setItem("address", JSON.stringify(place_address_to_be_deleted));
        localStorage.setItem("id", JSON.stringify(place_id_to_be_deleted));
            
        $scope.favoritedata_icon=JSON.parse(localStorage.getItem("icon"));
        $scope.favoritedata_name=JSON.parse(localStorage.getItem("name"));
        $scope.favoritedata_address=JSON.parse(localStorage.getItem("address"));
        $scope.favoritedata_id=JSON.parse(localStorage.getItem("id"));
        
        /*$('#favoritestable').hide();
        $('#favoritestable').show();*/
        
        /*console.log(place_id_to_be_deleted);
        console.log(place_name_to_be_deleted);*/
        
        elem=document.getElementsByName("glyphicon glyphicon-star-empty");
            for(i=0;i<place_names.length;i++){
            if(temp==place_names[i]){
                if(num_clicks==0){
                    elem[i].setAttribute("class","glyphicon glyphicon-star-empty");
                    elem[i].style.color="black";
                    break;
                }
                else if(num_clicks==1){
                    elem[i-20].setAttribute("class","glyphicon glyphicon-star-empty");
                    elem[i-20].style.color="black";
                    break;
                }
                else if(num_clicks==2){
                    elem[i-40].setAttribute("class","glyphicon glyphicon-star-empty");
                    elem[i-40].style.color="black";
                    break;
                }
                }
            }
        
        if($scope.favoritedata_name.length==0){
            if(!results_favorite_tab_flag){
            $('#favoritestable_norecords').show();
            $('#favoritestable').hide();
            }
        }
    };
    
    /*$scope.displayMap=function(){
        $('#reviews').hide();
        $('#photos').show();
        $('#photos_norecords').hide();
        $('#info').hide();
        $('#mapstab').show();
    }
    $scope.showPhotos=function(){
        $('#reviews').hide();
        $('#mapstab').hide();
        $('#info').hide();
        if(photos_array>0){
            $('#photos').show();
            $('#photos_norecords').hide();
        }
        else{
            $('#photos').hide();
            $('#photos_norecords').css('display','block');
        }
    }
    $scope.showInfo=function(){
        $('#reviews').hide();
        $('#mapstab').hide();
        $('#photos').show();
        $('#photos_norecords').hide();
        $('#info').show();
    }*/
    
    $scope.cleardata=function(){
        $('#place_details_tabs').hide();
        $('#place_name').hide();
        $('#resultstable').hide();
        $('#resultstable_norecords').hide();
        document.getElementById("keywordfield").value="";
        document.getElementById("distancefield").value="";
        document.getElementById("locationtext").value="";
        document.getElementById("categoryfield").selectedIndex=0;
        var radiobuttons=document.getElementsByName("radiobutton");
        radiobuttons[0].checked=true;
        document.getElementById("locationtext").disabled=true;
        document.getElementById("search").disabled=true;
    };
    
});

function getDirections(){
        var temp=document.getElementById("origin-input").value;
        //temp=temp.split(' ').join('+');
        $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+temp+"&key=AIzaSyB22HPP86IKK-YgS0Ya8S4WShaSKNoMk5o",
        dataType: 'json',
        success: function (resp) {
        if(temp=="Your location" || temp=="My location"){
            source_lat=document.getElementById("ipapilat").value;
            source_lon=document.getElementById("ipapilon").value;
        }
        else{
            source_lat=resp.results[0].geometry.location.lat;
            source_lon=resp.results[0].geometry.location.lng;    
        }
        },
        error: function (req, status, err) {
        console.log('Something went wrong', status, err);
        }
        });

    }

function getGeocodeForUserCenter(){
    var radios=document.getElementsByName("radiobutton");
    if(radios[0].checked==true){
        user_center_lat=document.getElementById("ipapilat").value;
        user_center_lon=document.getElementById("ipapilon").value;
    }
    else{
        var temp=document.getElementById("locationtext").value;
        $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+temp+"&key=AIzaSyB22HPP86IKK-YgS0Ya8S4WShaSKNoMk5o",
        dataType: 'json',
        success: function (resp) {
            user_center_lat=resp.results[0].geometry.location.lat;
            user_center_lon=resp.results[0].geometry.location.lng;    
        },
        error: function (req, status, err) {
        console.log('Something went wrong', status, err);
        }
        });    
    }
    }

function ratingsHigh(user_ratings,id){
        //alert(user_ratings+"  "+id);
            $('#'+id).rateYo({
            rating: user_ratings,
            precision: 1,
            readOnly: true,
            starWidth: "20px"
            });
        $('#'+id).rateYo("rating", user_ratings);
    }
