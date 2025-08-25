<?php

namespace App\Jobs;

use App\Mail\EmailCampaign;
use App\Models\Campaign;
use App\Models\CampaignMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailsCampaign implements ShouldQueue
{
    use Queueable;
    use SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Campaign $campaign
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $subscribers = $this->campaign->emailList->subscribers;

        foreach ($subscribers as $subscriber) {
            SendEmailCampaign::dispatch($this->campaign, $subscriber);
        }
    }
}
