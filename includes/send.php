<?php
//Required Headers
header("Access-Control-Allow-Origin: *");  //gives the ability to send back and forth
header("Content-Type: application/json; charset=UTF-8");

if($_POST){  //main if-else

    $receipent = "mamathavaidehi@gmail.com";
    $subject = "Email from my portfolio site";
    $visitor_name= "";
    $visitor_email="";
    $message="";
    $fail = array();



   //cleans and stores first name in the $visitor_name variable 

    if(isset($_POST['firstname']) && !empty($_POST['firstname'])) {    //make sure its set and not empty
        $visitor_name = filter_var($_POST['firstname'],FILTER_SANITIZE_STRING);

    }else{
 
        array_push($fail, "firstname");
    }


    

    if(isset($_POST['lastname'])&& !empty($_POST['lastname'])){

        $visitor_name .= filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);                         //.= append 
    }
    else{
        array_push($fail, "lastname");
    }



    //Cleans and stores email in the $visitor_email variable
    if(isset($_POST['email']) && !empty($_POST['email'])){
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), "", $_POST['email']);    //replace all of these with empty space
        $visitor_email = filter_var($email, FILTER_VALIDATE_EMAIL);   //only checks the email form only
    }else{
        array_push($fail, "email");
    }



    //Cleans message and stores in $message variable
    if(isset($_POST['message']) && !empty($_POST['message'])){
        $clean = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message = htmlspecialchars($clean);
    }else{
        array_push($fail, "message");
    }



    $headers = 'From: '.$visitor_email."\r\n" .'Reply-to: '.$visitor_email."\r\n" .'X-Mailer: PHP/' .phpversion();

    if(count($fail)==0){
        mail($receipent, $subject, $message, $headers);
        $results['message'] = sprintf("Thank you for contacting us, %s . We will respond within 24 hours.", $visitor_name);    //%s => tells php thats its refering to a variable at the end
    }else{
        header("HTTP/1.1 488 You DID NOT fill out the form correctly");
        die(json_encode(['message'=> $fail]));  //after this dont run anything more in the page => die
    }


}else{   // main if else
    $results['message'] = "Stop being so damn lazy and fill pout the form.";
}

echo json_encode($results);


//super-global only gets inittiated when submit button is clicked
?>

