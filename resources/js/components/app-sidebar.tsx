import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
  } from "@/components/ui/sidebar"
  
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavGroup } from './layout/nav-group';
import { NavUser } from './nav-user';
import { sidebarData } from '@/components/data/sidebar-data';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
      <Sidebar collapsible='icon' variant='floating' {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarData.teams} />
        </SidebarHeader>
        <SidebarRail />
        <ScrollArea className="flex-1 overflow-y-auto px-4">
        <SidebarContent>
          {sidebarData.navGroups.map((props) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </SidebarContent>
        </ScrollArea>
        <SidebarFooter>
          <NavUser user={sidebarData.user} />
        </SidebarFooter>
      </Sidebar>
    )
  }