<?php

namespace App\Http\Controllers;

use App\Models\CampaignMail;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function opening(CampaignMail $mail)
    {
        if ($mail->campaign->track_open) {
            $mail->openings++;
            $mail->save();
        }
    }

    public function click(CampaignMail $mail)
    {
        if ($mail->campaign->track_click) {
            $mail->clicks++;
            $mail->save();
        }

        return redirect()->away(request()->get('foward'));
    }
}
