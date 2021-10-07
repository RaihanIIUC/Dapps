<?php
namespace App\Http\Controllers;
use App\Models\Post;
 use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
 use Validator;
use F9Web\ApiResponseHelpers;


class PostController extends Controller
{
    use ApiResponseHelpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function Addpost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string',
            'title' => 'required|string',
            'image' => '',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }
        $data = [
            "user_id" => $request->user_id,
            "title" => $request->title,
            "image" => $request->image
        ];
        $post = Post::create($data);
        $responseMessage = "Post Successful inserted";
        // $data = Auth::guard("api")->user();
        return response()->json([
            'success' => true,
            'message' => $responseMessage,
            'data'=> $data
         ], 200);
    }
    public function show()
    {
          $post = Post::all();
           return   $this->respondWithSuccess($post);
         
        //  return response()->json([
        //     'success' => true,
        //      'data' => $post
        // ], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
