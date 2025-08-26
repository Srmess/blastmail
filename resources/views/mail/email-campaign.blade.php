<x-mail::message>
{!! $campaign->body !!}

<img src="{{ route('track.opening', $mail) }}" style="display:none;" />
</x-mail::message>
