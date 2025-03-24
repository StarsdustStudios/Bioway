// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
// import { Link } from '@inertiajs/react';
// import { NavCollapsible, NavItem } from "./layout/types";
// import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";
// import { ChevronRight } from "lucide-react";

// interface NavCollapsibleProps {
//     title: string;
//     icon: React.ElementType;
//     href: string;
//     isOpenByDefault?: boolean;
//     items: NavCollapsible
// }


// export function CustomNavCollapsible({ title, icon: Icon, href, isOpenByDefault = false, items }: NavCollapsibleProps) {
//     return (
//         <Collapsible
//         asChild
//         defaultOpen={checkIsActive(href, items, isOpenByDefault)}
//         className='group/collapsible'>
//         <SidebarMenuItem>
//           <CollapsibleTrigger asChild>
//             <SidebarMenuButton tooltip={title}>
//               {Icon && <Icon />}
//               <span>{title}</span>
//               <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
//             </SidebarMenuButton>
//           </CollapsibleTrigger>
//           <CollapsibleContent className='CollapsibleContent'>
//             <SidebarMenuSub>
//                 <SidebarMenuSubItem key={items.title}>
//                   <SidebarMenuSubButton
//                     asChild
//                     isActive={checkIsActive(href, items)}>
//                     <Link to={"/w"} onClick={() => setOpenMobile(false)}>
//                       {items.icon && < items.icon />}
//                       <span>{items.title}</span>
//                     </Link>
//                   </SidebarMenuSubButton>
//                 </SidebarMenuSubItem>
//             </SidebarMenuSub>
//           </CollapsibleContent>
//         </SidebarMenuItem>
//       </Collapsible>
//     )
// }


// function checkIsActive(href: string, item: NavItem, mainNav = false) {
//     return (
//       href === item.url || // /endpint?search=param
//       href.split('?')[0] === item.url || // endpoint
//       !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
//       (mainNav &&
//         href.split('/')[1] !== '' &&
//         href.split('/')[1] === item?.url?.split('/')[1])
//     )
//   }
  