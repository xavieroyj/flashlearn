import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppSidebar } from '../app-sidebar'

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/dashboard'),
}))

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

// Mock the CreateQuizDialog component
vi.mock('@/app/dashboard/collection/components/CreateQuizDialog', () => ({
  default: () => <div data-testid="create-quiz-dialog">Create Quiz</div>,
}))

// Mock the NavUser component
vi.mock('../nav-user', () => ({
  default: ({ user }: { user: any }) => (
    <div data-testid="nav-user">
      {user?.name || 'User'}
    </div>
  ),
}))

// Mock the sidebar component
vi.mock('../ui/sidebar', () => {
  return {
    Sidebar: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar">{children}</div>,
    SidebarContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-content">{children}</div>,
    SidebarFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-footer">{children}</div>,
    SidebarGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group">{children}</div>,
    SidebarGroupContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group-content">{children}</div>,
    SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group-label">{children}</div>,
    SidebarHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-header">{children}</div>,
    SidebarMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu">{children}</div>,
    SidebarMenuButton: ({ children, isActive }: { children: React.ReactNode, isActive?: boolean }) => 
      <div data-testid="sidebar-menu-button" data-active={isActive}>{children}</div>,
    SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu-item">{children}</div>,
    useSidebar: () => ({
      state: 'expanded',
      open: true,
      setOpen: vi.fn(),
      openMobile: false,
      setOpenMobile: vi.fn(),
      isMobile: false,
      toggleSidebar: vi.fn(),
    }),
  }
})

describe('AppSidebar', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  }

  it('renders the sidebar with app name', () => {
    render(<AppSidebar user={mockUser} />)
    
    expect(screen.getByText('FlashLearn')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<AppSidebar user={mockUser} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Collection')).toBeInTheDocument()
    expect(screen.getByText('Explore')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  it('renders the create quiz dialog', () => {
    render(<AppSidebar user={mockUser} />)
    
    expect(screen.getByTestId('create-quiz-dialog')).toBeInTheDocument()
  })

  it('renders the user navigation component', () => {
    render(<AppSidebar user={mockUser} />)
    
    expect(screen.getByTestId('nav-user')).toBeInTheDocument()
  })
})
