<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->search;

        $emailTemplatesPaginated = EmailTemplate::query()->when(
            $search,
            fn(Builder $query) =>
            $query
                ->where('title', 'like', "%$search%")
                ->orWhere('id', '=', $search)
        )->paginate()->appends(compact('search'));

        return Inertia::render('email-template/index', [
            'search' => $search,
            'emailTemplatesPaginated' => $emailTemplatesPaginated
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('email-template/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required']
        ]);

        EmailTemplate::query()->create($validated);

        return to_route('email-template.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(EmailTemplate $emailTemplate)
    {
        return Inertia::render('email-template/show', compact('emailTemplate'));
    }

    public function get(EmailTemplate $emailTemplate)
    {
        return response()->json($emailTemplate, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmailTemplate $emailTemplate)
    {
        return Inertia::render('email-template/edit', compact('emailTemplate'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmailTemplate $emailTemplate)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required']
        ]);

        $emailTemplate->fill($validated)->save();

        return to_route('email-template.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmailTemplate $emailTemplate)
    {
        $emailTemplate->delete();
        return back();
    }
}
