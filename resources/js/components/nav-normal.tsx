import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";

interface NavNormalProps {
  title: string;
  icon: React.ElementType;
  href: string;
}

export function NavNormal({ title, icon: Icon, href }: NavNormalProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={href} className="flex items-center">
          <Icon className="mr-2 h-5 w-5" /> {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
