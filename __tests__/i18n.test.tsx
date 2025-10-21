/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nProvider, useI18n } from '../src/lib/i18n';

// Test component that uses i18n
function TestComponent() {
  const { locale, setLocale, t } = useI18n();
  
  return (
    <div>
      <div data-testid="current-locale">{locale}</div>
      <div data-testid="nav-home">{t.nav.home}</div>
      <div data-testid="nav-music">{t.nav.music}</div>
      <button onClick={() => setLocale('cs')} data-testid="set-cs">Set CS</button>
      <button onClick={() => setLocale('en')} data-testid="set-en">Set EN</button>
    </div>
  );
}

describe('i18n System', () => {
  it('should default to Czech locale', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    
    expect(screen.getByTestId('current-locale')).toHaveTextContent('cs');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Domů');
  });

  it('should translate navigation items correctly in Czech', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Domů');
    expect(screen.getByTestId('nav-music')).toHaveTextContent('Hudba');
  });

  it('should translate navigation items correctly in English', () => {
    render(
      <I18nProvider initialLocale="en">
        <TestComponent />
      </I18nProvider>
    );
    
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
    expect(screen.getByTestId('nav-music')).toHaveTextContent('Music');
  });

  it('should switch locale when setLocale is called', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    
    // Start with Czech
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Domů');
    
    // Switch to English
    screen.getByTestId('set-en').click();
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
    
    // Switch back to Czech
    screen.getByTestId('set-cs').click();
    expect(screen.getByTestId('current-locale')).toHaveTextContent('cs');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Domů');
  });
});
