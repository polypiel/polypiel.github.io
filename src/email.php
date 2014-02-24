<?php
$sent = false;

if( isset($_POST) ) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $captcha = $_POST['captcha'];

    if(!empty(message) && captcha == "5") {
	    $from = 'From: angelwebsite';
	    $to = 'hi@angelcalvo.com';
	    $subject = 'Contact request from $name';

	    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

	    // TODO $sent = mail($to, $subject, $body, $from);
        $sent = true;
    }

    //if this is not an ajax request
    if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'){

        if($sent) {
            header('location: /contacted.html');
        } else {
            header('location: ' . $_SERVER['HTTP_REFERER'] . '?e=1');
        }
    }
} else {
    header('location: /contact.html');
}
die();
?>
