<?php
$keyword=$category=$distance=$from=$geoloc=$latGeo=$lonGeo=$latGeocode=$lonGeocode=$photo_details=$photos_length=$resp=$response="";
    if(isset($_GET["place_id"])){
        $place_id=$_GET["place_id"];
    $googleplacedetails='https://maps.googleapis.com/maps/api/place/details/json?placeid='.$place_id.'&key=AIzaSyCJ_a0yryjfQWiGqdCVn6uBtrKRFypRmKk';
    $response = file_get_contents($googleplacedetails);
    $resp=$response;
    echo $response;      
    die();
    }

    if(isset($_GET["id"])){
        $place_id=$_GET["id"];
        $googleplacedetails='https://maps.googleapis.com/maps/api/place/details/json?placeid='.$place_id.'&key=AIzaSyCW1hTc6a6N_6b0TciYAF8PYmMJdinro_g';
        $resp = file_get_contents($googleplacedetails);
        $photo_details = json_decode($resp,true);
        $photos_length=$photo_details['result'];
        $photos_length=$photos_length['photos'];
        for($i=0;$i<5;$i++){
            $place_reference_id=$photos_length[$i]['photo_reference'];
            $googlephotodetails='https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference='.$place_reference_id.'&key=AIzaSyDH6tWdOurKuFOWHDqWd8zT9ot3P05vYZk';
            $photo_response = file_get_contents($googlephotodetails);
            file_put_contents('/home/scf-10/shanuman/apache2/htdocs/image'.$i.'.png', $photo_response);
    }
    die();
    }
    
if(isset($_POST["submit"])){
    if(isset($_POST["keyword"]) && isset($_POST["category"]) && isset($_POST["radiobutton"])){
        $keyword=$_POST["keyword"];
        $category=$_POST["category"];
        $category1=str_replace(" ","+",$category);
        if(empty($_POST["distance"])){
        $distance="10";
        }
        else{
        $distance=$_POST["distance"];
        }
        $from=$_POST["radiobutton"];
        if($from!="Here"){
        $location=$_POST["locationtext"];
        }
    }
    if($from!="Here"){
    $location=str_replace(" ","+",$location);
    $googlegeocode='https://maps.googleapis.com/maps/api/geocode/json?address='.$location.'&key=AIzaSyB22HPP86IKK-YgS0Ya8S4WShaSKNoMk5o';
    $resp_json = file_get_contents($googlegeocode);
    $geoloc = json_decode($resp_json, true);
    $result=$geoloc["results"];
    for($i=0;$i<sizeof($result);$i++){
       $temp=$result[0]; //check this
       $temp=$temp["geometry"]["location"];
       $latGeo=$temp["lat"];
       $lonGeo=$temp["lng"];
    }
        $latGeocode=$latGeo;
        $lonGeocode=$lonGeo;
        }
    else{
        $latGeo=$_POST["iplat"];
        $lonGeo=$_POST["iplon"];
    }
    
    $distanceInMeters=$distance/(0.00062137);
    if(!empty($latGeo) && !empty($lonGeo)){
    $googlenearbyplaces='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$latGeo.','.$lonGeo.'&radius='.$distanceInMeters.'&type='.$category1.'&keyword='.$keyword.'&key=AIzaSyC9XG4fgwhBipSisH646Uod0cW8DHZq5QI';
    $json_nearby = file_get_contents($googlenearbyplaces);
    $places_list_array = json_decode($json_nearby,true);
    }
    else{
    
    }
    
}

?>
<!DOCTYPE html>
<html>
<head>
<title>Travel and Entertainment Search</title>
<style>
    td{
        text-align: center;
        width: 300px;
        height: auto;
    }
    a {
        text-decoration: none;
        color: black;
    }
    #map {
        height: 300px;
        width: 300px;
        #margin-left: 860px;
        #margin-top: -47%;
        visibility:hidden;
       }
    
    #floating-panel {
        position: absolute;
        top: 10px;
        left: 25%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: 'Roboto','sans-serif';
        line-height: 30px;
        padding-left: 10px;
        visibility:hidden;
      }

    .accordion {
    background-color: white;
    color: #444;
    cursor: pointer;
    #padding: 18px;
    width: 200px;
    height: 50px;
    border: none;
    text-align: center;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
}
    .active, .accordion:hover {
    background-color: white; 
}
</style>
    
<script type="text/javascript">
var temp,temp2,errorFlag="false";
var reviews_table,photos_table,photos_length,reviews_results;
function showPhotos(t){
    var nameList=[];
    nameList=res;
    var searchbox=document.getElementById("searchbox");
    document.getElementById("tabulardata").style.display='none';
    
    var divelem=document.createElement("div");
    divelem.setAttribute("id","maindiv");
    divelem.style.width="200px";
    divelem.style.height="200px";
    divelem.style.marginLeft="600px";
    divelem.style.marginTop="-20%";
    divelem.style.textAlign="center";
    
    var nameDisplayed=document.createElement("h3");
    nameDisplayed.innerHTML=nameList[t]["name"];
    nameDisplayed.style.textAlign="center";
    
    var x = document.createElement('p');
    x.innerHTML="click to show reviews";
    var y = document.createElement('p');
    y.innerHTML="click to show photos";
    
    var arrowReviews=document.createElement('img');
    arrowReviews.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_down.png");
    arrowReviews.style.width="40px";
    arrowReviews.style.height="20px";
    arrowReviews.style.marginTop="2%";
    
    var arrowPhotos=document.createElement('img');
    arrowPhotos.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_down.png");
    arrowPhotos.style.width="40px";
    arrowPhotos.style.height="20px";
    arrowPhotos.style.marginTop="3%";
    
    var tableReviews=document.createElement('p');
    tableReviews.style.marginLeft="250px";//
    tableReviews.style.marginTop="-4%";
    tableReviews.innerHTML="hi";
    
    temp=document.createElement('div');
    temp.setAttribute("type","reviewsdiv");
    temp.setAttribute("id","temp");
    temp.style.width="100%";
    temp.style.marginLeft="-10px";
    temp.style.marginTop="1%";
    temp.innerHTML="";
    
    temp2=document.createElement('div');
    temp2.setAttribute("type","hidden");
    temp2.setAttribute("id","photosdiv");
    temp2.style.width="100%";
    temp2.style.marginLeft="-10px";
    temp2.style.marginTop="3%";
    temp2.innerHTML="";
    
    var hidden_ele=document.createElement("input");
    hidden_ele.setAttribute("name","hidval");
    hidden_ele.setAttribute("type","hidden");
    hidden_ele.setAttribute("value",nameList[t]["place_id"]);
    
    divelem.appendChild(nameDisplayed);
    divelem.appendChild(x);
    divelem.appendChild(arrowReviews);
    divelem.appendChild(hidden_ele);
    divelem.appendChild(temp);
    divelem.appendChild(y);
    divelem.appendChild(arrowPhotos);
    divelem.appendChild(temp2);
    document.body.appendChild(divelem);
    
    var url = "Place.php";
    var params = "place_id="+nameList[t]["place_id"];
    var http = new XMLHttpRequest();
    http.open("GET", url+"?"+params, false);
    
    http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
        reviews_results=JSON.parse(http.responseText);
        console.log(reviews_results);
        reviews_results=reviews_results.result;
    photos_length=reviews_results;
    if(reviews_results.hasOwnProperty("reviews")){
    reviews_results=reviews_results.reviews;
    reviews_table = "<html>";
    reviews_table += "<body><table border=5px;border-collapse: collapse;style=\"margin-top:100px;width:100%;\">";
    for(var i=0;i<5;i++){
        reviews_table+="<tr style=\"width:1000px;\">";
         reviews_table+="<th style=\"text-align:center;width:1000px;height:auto\"><img height=\"25px\" width=\"25px\" src=\""+reviews_results[i]["profile_photo_url"]+"\">"+reviews_results[i]["author_name"]+"</th>";
        reviews_table+="</tr>";
        reviews_table+="<tr>";
        if(reviews_results[i]["text"]!=""){
        reviews_table+="<td style=\"text-align:center;width:1000px;height:auto\">"+reviews_results[i]["text"]+"</td>";
        }
        else{
           reviews_table+="<td style=\"text-align:center;width:1000px;height:auto\">No Review</td>"; 
        }
        reviews_table+="</tr>";
    }
        reviews_table+= "</table></body></html>";
    }
    else{
        reviews_table="<html><body><table border=5px><tr style=\"background-color:#d3d3d3;margin-top:100px;margin-left:60%;width:500px;\"><td style=\"width:500px\"><b>No Reviews Found</b></td></tr></table></body></html>";
        errorFlag="true";
    }
    
	}
    }
    http.send();
    
    var str=nameList[t]["place_id"];
    var url2 = "Place.php";
    var http2 = new XMLHttpRequest();
    var params2 = "id="+str;
    http2.open("GET", url2+"?"+params2, false);// "synchronous"
    http2.onreadystatechange = function() {
	if(http2.readyState == 4 && http2.status == 200) {
        if(photos_length.hasOwnProperty("photos")){
        photos_length=photos_length.photos;
        if(photos_length.length==0){
        photos_table="<html><body><table border=5px><tr style=\"background-color:#d3d3d3;margin-top:100px;margin-left:60%;width:500px;\"><td><b>No Photos Found</b></td></tr></table></body></html>";
    }
    else{
    var len = photos_length.length;
    if(len>5){
        len = 5;
    }
    else if(len<=5){
        len=len;
    }
    photos_table = "<html>";
    photos_table += "<body><table border=5px;border-collapse: collapse;style=\"margin-top:100px;width:100%;\">";
    for(var j=0;j<len;j++){
        var file_name="image"+j+".png";
        photos_table+="<tr>";
        photos_table+="<td><a href=\""+file_name+"\" target=\"_blank\"><img height=\"400px\" width=\"400px\" src=\""+file_name+"\"></a></td>";
        photos_table+="</tr>";
    }
    photos_table+="</table></body></html>";
    }
    }
    else{
       photos_table="<html><body><table border=5px><tr style=\"background-color:#d3d3d3;margin-top:100px;margin-left:60%;width:500px;\"><td style=\"width:500px\"><b>No Photos Found</b></td></tr></table></body></html>";
        errorFlag="true";
    }
    }
    }
    http2.send();   
    //try{
    
    
    //}
    /*catch(e){
        reviews_table="<html><body><table border=5px><tr style=\"background-color:#d3d3d3;margin-top:100px;padding-left:1000px;width:500px;\"><td style=\"width:500px\"><b>No Reviews Found</b></td></tr></table></body></html>";
        photos_table="<html><body><table border=5px><tr style=\"background-color:#d3d3d3;margin-top:100px;margin-left:100%;width:500px;\"><td style=\"width:500px\"><b>No Photos Found</b></td></tr></table></body></html>";
        errorFlag=true;
    }*/
    
    arrowReviews.addEventListener("click", function(){
        if(x.innerHTML=="click to show reviews"){
            temp2.style.display="none";
            if(y.innerHTML="click to hide photos"){
                y.innerHTML="click to show photos"
                arrowPhotos.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_down.png");
            }
            x.innerHTML="click to hide reviews";
            arrowReviews.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_up.png");
        }
        else{
            x.innerHTML="click to show reviews";
            arrowReviews.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_down.png");
        }
        this.classList.toggle("active");
        temp.style.visibility='visible';
        temp.style.width="1000px";
        if(errorFlag=="false"){
            temp.style.marginLeft="-410px";
        }
        else{
            temp.style.marginLeft="-161px";
        }
        temp.innerHTML=reviews_table;
        if (temp.style.display == "block") {
            temp.style.display = "none";
        } else {
            temp.style.display = "block";
        }
    });
    
    arrowPhotos.addEventListener("click", function(){
        if(y.innerHTML=="click to show photos"){
            temp.style.display = "none";
            if(x.innerHTML="click to hide reviews"){
                x.innerHTML="click to show reviews"
                arrowReviews.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_down.png");
            }
            y.innerHTML="click to hide photos";
            arrowPhotos.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_up.png");
            }
        else{
            y.innerHTML="click to show photos";
            arrowPhotos.setAttribute("src","http://cs-server.usc.edu:45678/hw/hw6/images/arrow_down.png");
        }
        this.classList.toggle("active");
        temp2.style.visibility='visible';
        temp2.style.width="1000px";
        if(errorFlag=="false"){
            temp2.style.marginLeft="-118px";
        }
        else{
            temp2.style.marginLeft="-140px";
        }
        temp2.innerHTML=photos_table;
        if (temp2.style.display == "block") {
            temp2.style.display = "none";
        } else {
            temp2.style.display = "block";
        }
    });
}
    
var x1,y1;
function placeDiv(x_pos,y_pos){
  y_pos=parseInt(y_pos,10);
  x_pos=parseInt(x_pos,10);
  y_pos+=450;
  x_pos+=250;
  x1=x_pos;
  y1=y_pos;
  var d = document.getElementById('map');
  d.style.position = "absolute";
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';
    return d;
}
    
var gIndex;
function toggleMap(index){
    gIndex=index;
    var ele=res[index]["vicinity"].replace(/ /g,'');
    ele=document.getElementById(ele);
    var mapDiv=document.getElementById("map");
    var travel_modes=document.getElementById("floating-panel");
    var x,y;
    x=ele.offsetLeft - ele.scrollLeft + ele.clientLeft;
    y=ele.offsetTop - ele.scrollTop + ele.clientTop;
    mapDiv=placeDiv(x,y);
    
    var x_t,y_t;
    x_t=travel_modes.offsetLeft - travel_modes.scrollLeft + travel_modes.clientLeft;
    y_t=travel_modes.offsetTop - travel_modes.scrollTop + travel_modes.clientTop;
    travel_modes.style.left = x1+'px';
    travel_modes.style.top = y1+'px';
    
    if(mapDiv.style.visibility=="hidden"){
    mapDiv.style.visibility="visible";
    travel_modes.style.visibility="visible";
    }
    else{
       mapDiv.style.visibility="hidden";
       travel_modes.style.visibility="hidden";
    }
    initMap();
}
    
function initMap() {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var Jlat=<?php if(isset($_POST["radiobutton"]))
                            {
                            if($_POST["radiobutton"]!="Here"){
                            echo $latGeocode;
                            }
                       else{
                           echo $latGeo;
                            }
                            }
                 ?>;
        var Jlon=<?php if(isset($_POST["radiobutton"]))
                            {
                            if($_POST["radiobutton"]!="Here"){
                            echo $lonGeocode;
                            }
                       else{
                           echo $lonGeo;
                            }
                            }
                 ?>;
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: Jlat, lng: Jlon}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });

      }
    
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = document.getElementById('mode').value;
        var destinationLat=res[gIndex]["geometry"];
              destinationLat=destinationLat["location"]["lat"];
        
          var destinationLon=res[gIndex]["geometry"];
              destinationLon=destinationLon["location"]["lng"];   
        
        var Jlat=<?php if(isset($_POST["radiobutton"]))
                            {
                            if($_POST["radiobutton"]!="Here"){
                            echo $latGeocode;
                            }
                       else{
                           echo $latGeo;
                            }
                            }
                 ?>;
        var Jlon=<?php if(isset($_POST["radiobutton"]))
                            {
                            if($_POST["radiobutton"]!="Here"){
                            echo $lonGeocode;
                            }
                       else{
                           echo $lonGeo;
                            }
                            }
                 ?>;
        directionsService.route({
          origin: {lat: Jlat, lng: Jlon},  // Haight.
          destination: {lat: destinationLat, lng: destinationLon},  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
            //directionsDisplay.setMap(map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATim_T-I6ycGAh4wFKQX1yOG_fx7P20-4&callback=initMap">
</script>
    
</head>
    
<body onload="getGeoLocation();"> 
<script type="text/javascript">
var keywordValue="",distanceValue="",locationFieldValue="",categoryValue="",radioValue="";
    
function getGeoLocation(){
var ipapi_result;
document.getElementById("search").disabled=true;
var url = "http://ip-api.com/json";
var http = new XMLHttpRequest();
http.open("GET", url, false);// "synchronous"
http.onreadystatechange = function() {
if(http.readyState == 4 && http.status == 200) {
ipapi_result=JSON.parse(http.responseText);
}
}
http.send();
var jlat=ipapi_result.lat;
var jlon=ipapi_result.lon;
if(jlat!="" && jlon!=""){
document.getElementById("search").disabled=false;
document.getElementById("ipapilat").value=jlat;
document.getElementById("ipapilon").value=jlon;
}
    
keywordValue=localStorage.getItem("keywordValue");
document.getElementById("keywordfield").value=keywordValue;
distanceValue=localStorage.getItem("distanceValue");
document.getElementById("distancefield").value=distanceValue;
locationFieldValue=localStorage.getItem("locationFieldValue");
document.getElementById("locationtext").value=locationFieldValue;
if(localStorage.getItem("radioValue")=="here"){
   document.getElementsByName("radiobutton")[0].checked=true; 
}
else if(localStorage.getItem("radioValue")=="location"){
    document.getElementsByName("radiobutton")[1].checked=true;
}
categoryValue=localStorage.getItem("categoryValue");
document.getElementById("categoryfield").selectedIndex=categoryValue;
localStorage.clear();
var radiobuttons=document.getElementsByName("radiobutton");
if(radiobuttons[1].checked==true){
document.getElementById("locationtext").disabled=false;
}
}

function toggleLocationField(flag){
if(flag){
    document.getElementById("locationtext").disabled=false;
    document.getElementById("locationtext").setAttribute("required",true);
    localStorage.setItem("radioValue", "location");
}
else{
    document.getElementById("locationtext").disabled=true;
    localStorage.setItem("radioValue", "here");
}
}
    
function validateFields(){
    var radios=document.getElementsByName("radiobutton");
    if(radios[0].checked==true){
        str="here";
    }
    else{
        str="location";
    }
    if(str=="here"){
        document.getElementById("locationtext").removeAttribute("required");
    }
    keywordValue=document.getElementById("keywordfield").value;
    localStorage.setItem("keywordValue",keywordValue);
    distanceValue=document.getElementById("distancefield").value;
    localStorage.setItem("distanceValue",distanceValue);
    locationFieldValue=document.getElementById("locationtext").value;
    localStorage.setItem("locationFieldValue",locationFieldValue);
    categoryValue=document.getElementById("categoryfield").selectedIndex;
    localStorage.setItem("categoryValue",categoryValue);
}
    
function cleardata(){
document.getElementById("keywordfield").value="";
document.getElementById("distancefield").value="";
document.getElementById("locationtext").value="";
document.getElementById("categoryfield").selectedIndex=0;
var radiobuttons=document.getElementsByName("radiobutton");
radiobuttons[0].checked=true;
document.getElementById("locationtext").disabled=true;
document.getElementById("tabulardata").remove();
document.getElementById("map").remove();
document.getElementById("floating-panel").remove();
document.getElementById("maindiv").remove();
localStorage.clear();
}
    
</script>
    
<form action="" method="post" id="searchform" onsubmit="false">
<input type="hidden" id="ipapilat" name="iplat" value="">
<input type="hidden" id="ipapilon" name="iplon" value="">
<div id="searchbox" style="width:700px;height: 300px;background-color: #F5F5F5;margin-left: 25%;margin-top: 2%;border: 5px solid;border-style: outset">
<h1 style="text-align: center"><i>Travel and Entertainment Search</i></h1>
<hr style="margin-top: -2%"><br>
    
<b>Keyword </b><input type="text" id="keywordfield" name="keyword" required autofocus=true>
<br><br>
    
<b>Category </b>
<select name="category" id="categoryfield">
<option value="default">default</option>
<option value="cafe">cafe</option>
<option value="bakery">bakery</option>
<option value="restaurant">restaurant</option>
<option value="beauty salon">beauty salon</option>
<option value="casino">casino</option>
<option value="movie theatre">movie theatre</option>
<option value="lodging">lodging</option>
<option value="airport">airport</option>
<option value="train station">train station</option>
<option value="subway station">subway station</option>
<option value="bus station">bus station</option>
</select><br><br>
    
<b>Distance (miles) </b><input type="text" id="distancefield" name="distance" placeholder="10">
    
<b>from </b>
<input type="radio" name="radiobutton" onclick="toggleLocationField(false)" value="Here" checked> Here<br>
<div style="padding-left: 43%">
<input type="radio" name="radiobutton" onclick="toggleLocationField(true)" value="location">
<input type="text" name="locationtext" id="locationtext" formnovalidate="" placeholder="location" required disabled>
</div><br>
    
<div style="padding-left: 10%">    
<input type="submit" name="submit" value="Search" style="border-radius: 12px" id="search" disabled onclick="validateFields();">
<input type="button" name="reset" value="Clear" style="border-radius: 12px" id="clear" onclick="cleardata()">
</div>
</div><br>
</form>
<script type="text/javascript">
var jsonObj=<?php echo(json_encode($places_list_array))?>;  
res=[];
res=jsonObj.results;
var flag=true;
if (jsonObj.status=="ZERO_RESULTS") {
    flag=false;
}
var table;
if(!flag){
    table="<html><body><table border=5px><tr style=\"background-color:#d3d3d3\"><td><b>No Records have been found</b></td></tr></table></body></html>";
}
else{
table = "<html>";
table += "<body><table border=5px;border-collapse: collapse;stlye=\"margin-top:300px;margin-left:30%\"><tr>";
table +="<th>Category</th><th>Name</th><th>Address</th></tr>";
for(var i=0;i<res.length;i++){
    table +="<tr>";
    table +="<td><img src=\""+res[i]["icon"]+"\"></img></td>";
    table +="<td><a href=\"JavaScript:showPhotos("+i+");\">"+res[i]["name"]+"</a></td>";
    var temp_id=res[i]["vicinity"].replace(/ /g,'');
    table +="<td id="+temp_id+"><a href=\"JavaScript:toggleMap("+i+")\">"+res[i]["vicinity"]+"</a></td>";
    table +="</tr>";
}
table +="</table></body></html>";
}
if(!flag){
document.write('<div style="width:200%;height:800px;margin-left:40%;margin-top:2%">'+table+'</div>');
}
else{
document.write('<div id="tabulardata" style="width:200%;height:800px;margin-left:16%;margin-top:2%">'+table+'</div>');
}
</script>
<div id="map">
</div>
<div id="floating-panel">
<select id="mode" size="1">
  <option value="DRIVING">Walk there</option>
  <option value="WALKING">Bike there</option>
  <option value="BICYCLING">Drive there</option>
</select>
</div>
</body>
</html>