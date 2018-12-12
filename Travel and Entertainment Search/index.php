<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: ['GET', 'POST', 'OPTIONS']");

$keyword=$category=$distance=$from=$geoloc=$latGeo=$lonGeo=$latGeocode=$lonGeocode=$photo_details=$photos_length=$resp=$response=$ipapilat=$ipapilon="";
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
if(isset($_GET["keyword"])){
    $ipapilat = $_GET["ipapilat"];
    $ipapilon = $_GET["ipapilon"];
    $keyword = $_GET["keyword"];
    $distance = $_GET["distance"];
    $category = $_GET["category"];
    $radio = $_GET["radio"];
    $locationfield = $_GET["locationfield"];
        $keyword=str_replace(" ","+",$keyword);
        $category1=str_replace(" ","+",$category);
        if($distance=="empty"){
            $distance="10";
        }
    
    if($radio!="Here"){
    $location=str_replace(" ","+",$locationfield);
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
        $latGeo=$ipapilat;
        $lonGeo=$ipapilon;
    }
    
    $distanceInMeters=$distance/(0.00062137);
    if(!empty($latGeo) && !empty($lonGeo)){
    $googlenearbyplaces='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$latGeo.','.$lonGeo.'&radius='.$distanceInMeters.'&type='.$category1.'&keyword='.$keyword.'&key=AIzaSyC9XG4fgwhBipSisH646Uod0cW8DHZq5QI';
    $json_nearby = file_get_contents($googlenearbyplaces);
    $places_list_array = json_decode($json_nearby,true);
    echo $json_nearby;
    die();
    }
    else{
    
    }
}

if(isset($_GET["name"])){
       $name=$_GET["name"];
       $name=str_replace(" ","+",$name);
       $city=$_GET["city"];
       $city=str_replace(" ","+",$city);
       $state=$_GET["state"];
       $country=$_GET["country"];
       $address1=$_GET["address1"];
       $opts = array(
               'http'=>array(
               'method'=>'GET',
               'header'=>'Authorization: Bearer g54FRzAMm2oHK_1lXIWZt_-7u1shDADoCIchfxXOMgo6lPypwxso_7iHpfXSm5xQDLPlaDgRWJcn0WqZ6PzXnyRpy7nGJqtGs_8u7b00pDoRxhg6PKByY6tHt2jBWnYx'
                            )
                );

      $context = stream_context_create($opts);
      $yelp_best_match='https://api.yelp.com/v3/businesses/matches/best?name='.$name.'&city='.$city.'&state='.$state.'&country='.$country.'&address1='.$address1.'';
      /*$yelp_best_match='https://api.yelp.com/v3/businesses/matches/best?name=Pitfire+Pizza&city=Los+Angeles&state=CA&country=US&address1=5211+Lankershim+Blvd,+No+Ho';*/
      $json_yelp = file_get_contents($yelp_best_match,false, $context);
      $yelp_response_array = json_decode($json_yelp,true);
      //file_put_contents('C:\xampp\htdocs\file1.txt', $json_yelp);
      $business_id=$yelp_response_array['businesses'][0]['id'];
        
      $yelp_business_reviews='https://api.yelp.com/v3/businesses/'.$business_id.'/reviews';
      $json_yelp_reviews=file_get_contents($yelp_business_reviews,false, $context);
      //file_put_contents('C:\xampp\htdocs\file2.txt', $json_yelp_reviews);
      echo $json_yelp_reviews;
      die();
}

if(isset($_GET["nextpagetoken"])){
    $nextpagetoken=$_GET["nextpagetoken"];
    $googlenearbyplaces='https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken='.$nextpagetoken.'&key=AIzaSyC9XG4fgwhBipSisH646Uod0cW8DHZq5QI';
    $json_nearby = file_get_contents($googlenearbyplaces);
    $places_list_array = json_decode($json_nearby,true);
    echo $json_nearby;
    die();
}

?>
