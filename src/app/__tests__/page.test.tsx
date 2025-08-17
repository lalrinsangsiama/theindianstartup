import { render, screen } from '@testing-library/react';
import HomePage from '../page';

// Mock the StructuredData component
jest.mock('../../components/seo/StructuredData', () => ({
  StructuredData: ({ type }: { type: string }) => <div data-testid={`structured-data-${type}`} />,
}));

describe('HomePage', () => {
  it('renders the main navigation', () => {
    render(<HomePage />);
    
    // Check for navigation elements - use getAllByText since logo appears multiple times
    expect(screen.getAllByText('THE INDIAN STARTUP')[0]).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('What\'s Included')).toBeInTheDocument();
    expect(screen.getByText('Start Your Journey')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(<HomePage />);
    
    // Check for hero content (adjust based on actual content)
    expect(screen.getByText(/From Idea to Incorporated/i)).toBeInTheDocument();
    expect(screen.getByText(/Startup in 30 Days/i)).toBeInTheDocument();
  });

  it('renders footer section', () => {
    render(<HomePage />);
    
    // Check for footer elements
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('support@theindianstartup.in')).toBeInTheDocument();
  });

  it('includes structured data for SEO', () => {
    render(<HomePage />);
    
    // Check for structured data components
    expect(screen.getByTestId('structured-data-organization')).toBeInTheDocument();
    expect(screen.getByTestId('structured-data-website')).toBeInTheDocument();
    expect(screen.getByTestId('structured-data-course')).toBeInTheDocument();
    expect(screen.getByTestId('structured-data-product')).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    render(<HomePage />);
    
    // Check for semantic elements
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('contains links to key pages', () => {
    render(<HomePage />);
    
    // Check for important links
    const pricingLinks = screen.getAllByRole('link', { name: /pricing|start your journey/i });
    expect(pricingLinks.length).toBeGreaterThan(0);
  });
});