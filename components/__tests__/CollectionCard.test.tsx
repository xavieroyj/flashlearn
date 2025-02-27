import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CollectionCard from '../CollectionCard'
import { toast } from 'sonner'

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

// Mock the sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock the collection actions
vi.mock('@/app/actions/collection', () => ({
  toggleCollectionPin: vi.fn().mockResolvedValue({}),
  deleteCollection: vi.fn().mockResolvedValue({}),
}))

describe('CollectionCard', () => {
  const mockCollection = {
    id: 1,
    name: 'Test Collection',
    description: 'Test Description',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-02'),
    isPinned: false,
    Quiz: [{ id: 1 }, { id: 2 }],
  }

  const defaultProps = {
    collection: mockCollection,
    isOwner: true,
    onAction: vi.fn(),
    inDashboard: true,
  }

  it('renders collection information correctly', () => {
    render(<CollectionCard {...defaultProps} />)
    
    expect(screen.getByText('Test Collection')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Number of Quizzes: 2')).toBeInTheDocument()
  })

  it('shows pin and delete buttons when isOwner is true', () => {
    render(<CollectionCard {...defaultProps} />)
    
    // Find buttons by their SVG icons
    const pinIcon = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'svg' && 
             element?.classList.contains('h-4') && 
             element?.classList.contains('w-4');
    });
    
    const trashIcon = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'svg' && 
             element?.classList.contains('size-4') && 
             element?.classList.contains('text-destructive');
    });
    
    expect(pinIcon).toBeInTheDocument();
    expect(trashIcon).toBeInTheDocument();
  })

  it('hides pin and delete buttons when isOwner is false', () => {
    render(<CollectionCard {...defaultProps} isOwner={false} />)
    
    // These should not be found
    const pinIcons = screen.queryAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'svg' && 
             element?.classList.contains('h-4') && 
             element?.classList.contains('w-4');
    });
    
    const trashIcons = screen.queryAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'svg' && 
             element?.classList.contains('size-4') && 
             element?.classList.contains('text-destructive');
    });
    
    expect(pinIcons.length).toBe(0);
    expect(trashIcons.length).toBe(0);
  })

  it('navigates to collection page when clicked', () => {
    const { container } = render(<CollectionCard {...defaultProps} />)
    
    // Click on the card (not on buttons)
    fireEvent.click(container.firstChild as Element)
    
    // Router.push should have been called with the correct path
    expect(defaultProps.onAction).not.toHaveBeenCalled()
  })

  it('shows user info when not owner and user info is provided', () => {
    const collectionWithUser = {
      ...mockCollection,
      user: {
        name: 'Test User',
        image: null,
      },
    }
    
    render(
      <CollectionCard 
        {...defaultProps} 
        collection={collectionWithUser} 
        isOwner={false} 
      />
    )
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('calls onAction when pin is toggled', async () => {
    const { container } = render(<CollectionCard {...defaultProps} />)
    
    // Find the pin button by its position in the DOM
    const pinButton = container.querySelector('.absolute.top-2.right-2 button:last-child');
    expect(pinButton).not.toBeNull();
    
    // Click the pin button
    if (pinButton) {
      fireEvent.click(pinButton);
    }
    
    // Wait for the async action to complete
    await vi.waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Collection pinned')
      expect(defaultProps.onAction).toHaveBeenCalledWith(mockCollection.id)
    })
  })
})
