<?php

namespace App\Http\Controllers;

use App\Models\EmailList;
use App\Models\Subscriber;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(EmailList $emailList)
    {
        $search = request()->search;

        $subscribersPaginated = $emailList->subscribers()
            ->when($search, function (Builder $query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('id', $search);
                });
            })->paginate()->appends(compact('search'));


        return Inertia::render(
            'subscribers/index',
            ['emailList' => $emailList, 'search' => $search, 'subscribersPaginated' => $subscribersPaginated]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(EmailList $emailList)
    {
        return Inertia::render('subscribers/create', compact('emailList'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmailList $emailList)
    {
        $payload = request()->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email', Rule::unique('subscribers')->where('email_list_id', $emailList->id)]
        ]);


        $emailList->subscribers()->create($payload);

        return to_route('subscribers.index', $emailList->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscriber $subscriber)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscriber $subscriber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscriber $subscriber)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(mixed $emailList, Subscriber $subscriber)
    {
        $subscriber->delete();
        return back();
    }
}
