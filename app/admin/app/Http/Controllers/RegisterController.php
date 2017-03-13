<?php

namespace App\Http\Controllers;

use Mail;
use App\Participants;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

class RegisterController extends Controller
{

  function __construct() {

  }

  function index() {

    return view('register');

  }

  function save(Request $request) {

    $participants = new Participants;
    $participants->ParticipantName = $request->ParticipantName;
    $participants->ParticipantGender = $request->ParticipantGender;
    $participants->ParticipantCollege = $request->ParticipantCollege;
    $participants->Year = $request->Year;
    $participants->Department = $request->Department;
    $participants->ParticipantEmail = $request->ParticipantEmail;
    $participants->ParticipantPhone = $request->ParticipantPhone;
    $participants->ParticipantEvents = $request->ParticipantEvents;
    $participants->PresentationTopic = $request->PresentationTopic;
    $participants->CreateDate = '-';
    $participants->ModifiedDate = '-';

    try {
      $registerId = $participants->save();

      if($registerId > 0) {
	      $to = 'mechofest2k17@gmail.com';
	      //$to = 'nagarajueac12@gmail.com';
	      $email = 'admin@mechofest2k17.com';
	      $subject = 'MechoFest Event Registration';
	      $headers = 'From: '.$email. "\r\n" . 'Reply-To: '.$email. "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n" . 'X-Mailer: PHP/' . phpversion();

	      $message = 'Registration Details 	    : ' . $participants->ParticipantCollege;
	      $message .= "<br>Participant Name     : " . $participants->ParticipantName;
	      $message .= "<br>Participant College  : " . $participants->ParticipantCollege;
	      $message .= "<br>Participants Year    : " . $participants->Year;
	      $message .= "<br>Department           : " . $participants->Department;
	      $message .= "<br>Participant Email    : " . $participants->ParticipantEmail;

	      $message .= "<br>Participant Phone    : " . $participants->ParticipantPhone;
	      $message .= "<br>Participant Events   : " . $participants->ParticipantEvents;
	      $message .= "<br>Participant Topic    : " . $participants->PresentationTopic;


	      if($msg = mail($to, $subject,$message,$headers)) {
	      	$message = $msg;
	      }
      }
      return ['Success' => $registerId > 0 ? true : false, 'message' => $msg];

    } catch(Exception $e) {
      return ['Success' => false, 'ErrorMessage' => $e];
    }

  }

}
