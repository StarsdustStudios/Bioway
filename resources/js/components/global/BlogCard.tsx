

export function BlogCard({ title, description, imageUrl, link }: { title: string; description: string; imageUrl: string; link: string }) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-4">
        <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full w-max">News Article</span>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 pr-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies.
          </p>
          <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center text-gray-700 font-semibold">
            Img
          </div>
        </div>
      </div>
    )
}