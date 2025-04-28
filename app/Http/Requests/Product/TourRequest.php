<?php
namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class TourRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start' => ['required', 'integer', 'exists:locations,id'],  // Ensure 'start' is a valid location ID
            'title' => ['required', 'string', 'max:255'],
            'desc' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'tour_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'passenger' => ['required', 'integer', 'min:1'],
            'luggage' => ['required', 'integer', 'min:0'],
            'location_id' => ['nullable', 'array'],  // Ensure it's an array of location IDs
          
        ];
    }
}
