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

class UploadController extends Controller
{

  function __construct() {

  }

  function index(Request $request) {

    $file = $request->file('file');
    $fileName = $file->getClientOriginalName();
    $respons = null;

    if($file) {
      $moveFile = $request->file('file')->move(base_path() . '/public/', $fileName);
      $respons = [
        'Success' => !$moveFile ? false : true,
        'ImageName' => $fileName,
        'FilePath' => base_path() . '/public/' . $fileName
      ];


    } else {
      $respons = [
        'Success' => false
      ];
    }

    return $respons;

  }


}
