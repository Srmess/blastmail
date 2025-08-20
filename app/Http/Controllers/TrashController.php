<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\EmailList;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrashController extends Controller
{
    public function indexCampaigns()
    {
        $search = request()->search;
        $deletedCampaignsPaginated = Campaign::query()->onlyTrashed()->when(
            $search,
            fn(Builder $query) =>
            $query
                ->where('name', 'like', "%$search%")
                ->orWhere('id', '=', $search)
        )->paginate();


        return Inertia::render('trash/campaigns', compact(['deletedCampaignsPaginated', 'search']));
    }

    public function restoreCampaign(Campaign $campaign)
    {
        $campaign->restore();

        return to_route('trash.campaigns');
    }

    public function hardDeleteCampaign(Campaign $campaign)
    {
        $campaign->forceDelete();

        return to_route('trash.campaigns');
    }

    public function indexEmailLists()
    {
        $search = request()->search;
        $deletedEmailListsPaginated = EmailList::query()->onlyTrashed()
            ->when(
                $search,
                fn(Builder $query) =>
                $query
                    ->where('title', 'like', "%$search%")
                    ->orWhere('id', '=', $search)
            )->withCount('subscribers')->paginate()->appends(compact('search'));


        return Inertia::render('trash/email-list', compact(['deletedEmailListsPaginated', 'search']));
    }

    public function restoreEmailList(EmailList $emailList)
    {
        $emailList->restore();

        return to_route('trash.email-lists');
    }

    public function hardDeleteEmailList(EmailList $emailList)
    {
        $emailList->forceDelete();

        return to_route('trash.email-lists');
    }
}
