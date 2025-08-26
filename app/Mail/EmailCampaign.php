<?php

namespace App\Mail;

use App\Models\Campaign;
use App\Models\CampaignMail;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailCampaign extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Campaign $campaign,
        public CampaignMail $mail
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->campaign->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.email-campaign',
            with: ['campaign' => $this->campaign, 'body' => $this->formatBody()]
        );
    }

    private function formatBody()
    {
        $campaign = $this->campaign;
        $mail = $this->mail;

        preg_match_all('/href="([^"]*)"/', $campaign->body, $matches);

        foreach ($matches[1] as $index =>  $oldValue) {
            $newValue = route('track.click', ['mail' => $mail, 'foward' => $oldValue]);

            $campaign->body = str_replace($matches[0][$index], "href='" . $newValue . "'", $campaign->body);
        }

        return $campaign->body;
    }
}
