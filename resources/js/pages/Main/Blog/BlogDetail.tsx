import * as React from 'react';
import { useState, useEffect } from 'react';
import { PromoCarousel } from '@/components/global/PromoCarousel';
import { BlogCard } from '@/components/global/BlogCard';
import { Button } from '@/components/ui/button';
import MainProduct from '../Product/MainProduct';
import MainLayout from '../Main';
import { IconBrandWhatsapp, IconBrandFacebook, IconBrandX, IconCopy } from '@tabler/icons-react';

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
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="md:text-5xl text-xl font-bold text-center">{openedBlog.title}</h1>
        <p className="text-gray-500 text-sm mt-2">Di Upload {openedBlog.published_at}</p>
        <div className="flex items-center mt-4">
          <span className="text-gray-500 text-sm">{openedBlog.category?.name}</span>
        </div>
        <img
          src={openedBlog.hero_image}
          alt={openedBlog.title}
          className="md:w-1/2 object-cover mt-4 rounded-lg"
        />
      </div>
      <div className="flex justify-center">
        <h1 className="text-lg font-semibold text-gray-600 mt-7 text-center">Bagikan Artikel Ini</h1>
      </div>
      <div className="flex justify-center mt-4 gap-5">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            const url = `${window.location.href} ayo cek artikel dari Bioway ini!`;
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
          }}
        >
          <IconCopy className="" />
        </Button>
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
              openedBlog.title + ' ' + window.location.href
            )} ayo cek artikel dari Bioway ini!`;
            window.open(url, '_blank');
          }}
        >
          <IconBrandWhatsapp color='#25D366' className="" />
        </Button>
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )} Ayo cek artikel dari Bioway ini!`;
            window.open(url, '_blank');
          }}
        >
          <IconBrandFacebook color="#1877F2" className="" />
        </Button>
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )} ayo cek artikel dari Bioway ini!`;
            window.open(url, '_blank');
          }}
        >
          <IconBrandX className="" />
        </Button>
      </div>


      <div
        className="prose md:w-1/2 mx-auto my-10"
        dangerouslySetInnerHTML={{ __html: openedBlog.content }}
      />


      <div className="mb-20" />
    </>
  );
}

Blog.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Blog;
