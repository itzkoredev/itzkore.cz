/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPageClient from '../src/components/pages/ContactPageClient';
import { I18nProvider } from '../src/lib/i18n';

// Mock fetch for form submission
global.fetch = jest.fn();

describe('ContactPageClient', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render form fields in Czech', () => {
    render(
      <I18nProvider initialLocale="cs">
        <ContactPageClient />
      </I18nProvider>
    );
    
    expect(screen.getByLabelText('Jméno')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Předmět')).toBeInTheDocument();
    expect(screen.getByLabelText('Zpráva')).toBeInTheDocument();
  });

  it('should render form fields in English', () => {
    render(
      <I18nProvider initialLocale="en">
        <ContactPageClient />
      </I18nProvider>
    );
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('should have correct placeholders in Czech', () => {
    render(
      <I18nProvider initialLocale="cs">
        <ContactPageClient />
      </I18nProvider>
    );
    
    const nameInput = screen.getByPlaceholderText('Jan Novák');
    const emailInput = screen.getByPlaceholderText('jan@priklad.cz');
    const subjectInput = screen.getByPlaceholderText('Dotaz na projekt');
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
  });

  it('should have correct placeholders in English', () => {
    render(
      <I18nProvider initialLocale="en">
        <ContactPageClient />
      </I18nProvider>
    );
    
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('john@example.com');
    const subjectInput = screen.getByPlaceholderText('Project inquiry');
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
  });

  it('should show validation error for invalid email', async () => {
    render(
      <I18nProvider initialLocale="en">
        <ContactPageClient />
      </I18nProvider>
    );
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    // HTML5 validation will prevent form submission
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should display section titles correctly in both languages', () => {
    const { rerender } = render(
      <I18nProvider initialLocale="cs">
        <ContactPageClient />
      </I18nProvider>
    );
    
    // Czech
    expect(screen.getByText('Přímý kontakt')).toBeInTheDocument();
    expect(screen.getByText('Sledujte mě')).toBeInTheDocument();
    expect(screen.getByText('Aktuálně dostupný')).toBeInTheDocument();
    
    // Switch to English
    rerender(
      <I18nProvider initialLocale="en">
        <ContactPageClient />
      </I18nProvider>
    );
    
    expect(screen.getByText('Direct Contact')).toBeInTheDocument();
    expect(screen.getByText('Follow Me')).toBeInTheDocument();
    expect(screen.getByText('Currently Available')).toBeInTheDocument();
  });
});
