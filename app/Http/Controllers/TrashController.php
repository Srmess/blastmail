<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\EmailList;
use App\Models\EmailTemplate;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrashController extends Controller
{
    public function indexCampaigns()
    {
        $search = request()->search;
        $deletedCampaignsPaginated = Campaign::query()
            ->when(
                $search,
                fn(Builder $query) =>
                $query
                    ->where('name', 'like', "%$search%")
                    ->orWhere('id', '=', $search)
            )->onlyTrashed()->paginate();


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
        $deletedEmailListsPaginated = EmailList::query()
            ->when(
                $search,
                fn(Builder $query) =>
                $query
                    ->where('title', 'like', "%$search%")
                    ->orWhere('id', '=', $search)
            )->withCount('subscribers')->onlyTrashed()->paginate()->appends(compact('search'));


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

    public function indexEmailTemplates()
    {
        $search = request()->search;
        $deletedEmailTemplatesPaginated = EmailTemplate::query()
            ->when(
                $search,
                fn(Builder $query) =>
                $query
                    ->where('title', 'like', "%$search%")
                    ->orWhere('id', '=', $search)
            )->onlyTrashed()->paginate()->appends(compact('search'));


        return Inertia::render('trash/email-templates', compact(['deletedEmailTemplatesPaginated', 'search']));
    }

    public function restoreEmailTemplate(EmailTemplate $emailTemplate)
    {
        $emailTemplate->restore();

        return to_route('trash.email-templates');
    }

    public function hardDeleteEmailTemplate(EmailTemplate $emailTemplate)
    {
        $emailTemplate->forceDelete();

        return to_route('trash.email-templates');
    }
}
