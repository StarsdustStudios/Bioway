import { Link } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { IconBriefcase2, IconArmchair } from "@tabler/icons-react";

interface BlogCardProps {
  title: string;
  hero_image: string;
  categoryName: string;
  slug: string;
  published_at: string;
}

export function BlogCard({
  title,
  hero_image,
  categoryName,
  slug,
  published_at,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block hover:opacity-90 transition">
      <Card className="flex p-4 gap-4 rounded-2xl shadow-md hover:scale-105 border-blue-300">
        <div className="flex items-center gap-4 py-0">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1">
                {categoryName}
              </span>
              <span className="flex items-center gap-1">
                {published_at}
              </span>
            </div>
            <h2 className="md:text-md text-sm font-semibold">{title}</h2>
          </div>
          <div className="aspect-video max-w-56">
            <img
              src={hero_image}
              alt={title}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
