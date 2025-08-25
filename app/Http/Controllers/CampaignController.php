<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignStoreRequest;
use App\Jobs\SendEmailCampaign;
use App\Models\Campaign;
use App\Models\EmailList;
use App\Models\EmailTemplate;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->search;

        $campaignsPaginated = Campaign::query()->when(
            $search,
            fn(Builder $query) =>
            $query
                ->where('name', 'like', "%$search%")
                ->orWhere('id', '=', $search)
        )->paginate()->appends(compact('search'));

        return Inertia::render('campaigns/index', compact(['search', 'campaignsPaginated']));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $emailLists = EmailList::query()->select(['id', 'title'])->orderBy('title')->get();
        $emailTemplates = EmailTemplate::query()->select(['id', 'title'])->orderBy('title')->get();


        return Inertia::render('campaigns/create', compact(['emailLists', 'emailTemplates']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CampaignStoreRequest $request)
    {
        $validated = $request->validated();

        $campaign = Campaign::create($validated);

        SendEmailCampaign::dispatchAfterResponse($campaign);

        return redirect()->route('campaigns.index')->with('success', 'Campaign created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {

        return Inertia::render('campaigns/show', compact('campaign'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campaign $campaign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();
        return back();
    }
}
