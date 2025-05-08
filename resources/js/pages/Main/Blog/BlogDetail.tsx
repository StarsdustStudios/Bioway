import * as React from 'react';
import { useState, useEffect } from 'react';
import { PromoCarousel } from '@/components/global/PromoCarousel';
import { BlogCard } from '@/components/global/BlogCard';
import { Button } from '@/components/ui/button';
import MainProduct from '../Product/MainProduct';

export interface Event {
  id: number;
  name: string;
  poster_img: string;
}

export interface Blogs {
  id: number;
  category_id: number;
  title: string;
  hero_image: string;
  slug: string;
  published_at: string;
  category: {
    id: number;
    name: string;
  };
}

export interface OpenedBlog {
  id: number;
  category_id: number;
  title: string;
  hero_image: string;
  slug: string;
  content: string;
  published_at: string;
  category: {
    id: number;
    name: string;
  };
}

interface BlogProps {
  events: Event[];
  posts: Blogs[]; // NOTE: adjust to your JSON structure
  openedBlog: OpenedBlog;
}

function Blog({ events, posts, openedBlog }: BlogProps) {
  const blogs = posts; // remap to match internal usage

  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const firstCategoryId = blogs[0]?.category.id ?? 'all';
  const [selectedCategory, setSelectedCategory] = useState<'all' | number>(firstCategoryId);

  const itemsPerPage = 9;

  const categorys = Array.from(new Set(blogs.map((r) => r.category.id)))
    .map((id) => {
      const match = blogs.find((r) => r.category.id === id);
      return match?.category;
    })
    .filter(Boolean);

  const filteredBlogs =
    selectedCategory === 'all'
      ? blogs
      : blogs.filter((r) => r.category.id === selectedCategory);

  const sortedBlogs = [...filteredBlogs].sort((a, b) =>
    sortDirection === 'asc' ? a.id - b.id : b.id - a.id
  );

  const totalItems = sortedBlogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleBlogs = sortedBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sortDirection]);

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <div>
        <PromoCarousel events={events} />
      </div>
      
      <h1 className="text-4xl font-bold my-7 mt-20 text-center">Blog</h1>

      <div className="md:flex grid grid-cols-2 justify-between md:w-4/5 items-center gap-4 mb-12">
        <Button className='bg-blue-500 hover:bg-blue-400' onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          Sort by ID ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
        </Button>

        <select
          className="border rounded ml-auto px-3 py-1"
          value={selectedCategory.toString()}
          onChange={(e) =>
            setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
          }
        >
          <option value="all">All</option>
          {categorys.map((categ) => (
            <option key={categ!.id} value={categ!.id}>
              {categ!.name}
            </option>
          ))}
        </select>
      </div>

      <div
  className="prose max-w-none mx-auto my-10"
  dangerouslySetInnerHTML={{ __html: openedBlog.content }}
/>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </Button>
        <span className="flex items-center font-medium">
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      <div className="mb-20" />
    </>
  );
}

Blog.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Blog;
