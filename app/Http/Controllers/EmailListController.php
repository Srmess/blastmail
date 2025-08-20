<?php

namespace App\Http\Controllers;

use App\Models\EmailList;
use Error;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmailListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $search = request()->search;

        $emailListsPaginated = EmailList::query()
            ->when(
                $search,
                fn(Builder $query) =>
                $query
                    ->where('title', 'like', "%$search%")
                    ->orWhere('id', '=', $search)
            )->withCount('subscribers')
            ->paginate()->appends(compact('search'));

        return Inertia::render('email-list/index', [
            'emailListsPaginated' => $emailListsPaginated,
            'search' => $search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('email-list/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'subscribersFile' => ['required', 'file', 'mimes:csv']
        ]);

        $subscribers = $this->getSubscribersFromCsvFile($request->file('subscribersFile'));

        DB::transaction(function () use ($request, $subscribers) {
            $emailList =  EmailList::query()->create([
                'title' => $request->title,
            ]);
            $emailList->subscribers()->createMany($subscribers);
        });



        return to_route('email-list.index');
    }

    private function getSubscribersFromCsvFile(UploadedFile $file): array
    {
        $fileHandler = fopen($file->getRealPath(), 'r');
        $items = [];

        while (($row = fgetcsv($fileHandler, null, ',')) !== false) {
            if ($row[0] === 'name' && $row[1] === 'email') {
                continue;
            }
            $items[] = ['name' => $row[0], 'email' => $row[1]];
        }

        fclose($fileHandler);

        return $items;
    }

    /**
     * Display the specified resource.
     */
    public function show(EmailList $emailList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmailList $emailList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmailList $emailList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmailList $emailList)
    {
        $emailList->delete();
        return back();
    }
}
