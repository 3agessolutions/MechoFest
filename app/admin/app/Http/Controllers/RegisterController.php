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

	      	if($request->PresentationDocumentPath) {
	      	   $participants->PresentationDocumentPath = $request->PresentationDocumentPath;
	      	}
          
      		Mail::send('emails.register', ['participants' => $participants], function ($m) use ($participants) {
      			$m->from('admin@mechofest2k17.com', 'MechoFest');
      			$m->to('mechofest2k17@gmail.com')->subject('Mechofest Registration');
      			if($participants->PresentationDocumentPath) {
      				$m->attach($participants->PresentationDocumentPath);
      			}

      		});

      }
      return ['Success' => $registerId > 0 ? true : false];

    } catch(Exception $e) {
      return ['Success' => false, 'ErrorMessage' => $e];
    }

  }

}
