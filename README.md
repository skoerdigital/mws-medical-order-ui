# OCMS Registration UI

Projekt składa się z dwóch głównych części:
- **Backend API (`nass-insurances-api`)**: API NestJS dostarczające dane słownikowe
- **Frontend (`mws-medical-order-ui`)**: Aplikacja Angular do obsługi rejestracji

> Modified on branch: fix/shared-data-consent-type-adjustment-new

## Wymagania wstępne

- Node.js (zalecana wersja 20.x)
- npm (zalecana wersja 10.x)
- Lokalne środowisko deweloperskie z obsługą SSL dla domen lokalnych

## Struktura projektu

- `apps/nass-insurances-api`: Usługa Backend API dostarczająca dane słownikowe
- `apps/mws-medical-order-ui`: Aplikacja frontendowa Angular
- `libs/`: Współdzielone biblioteki i moduły

## Rozpoczęcie pracy

### 1. Instalacja zależności

```bash
npm install
```

### 2. Uruchomienie API Backend

API musi zostać uruchomione jako pierwsze, ponieważ frontend zależy od niego w kwestii danych słownikowych:

```bash
npm run dev:api
```

To spowoduje:
- Zasilenie bazy danych SQLite danymi początkowymi
- Uruchomienie serwera API na http://localhost:3000
- Udostępnienie endpointów API na http://localhost:3000/api/

### 3. Uruchomienie aplikacji Frontend

W nowym oknie terminala uruchom:

```bash
npm run dev:ui
```

To spowoduje:
- Uruchomienie serwera deweloperskiego Angular z włączonym SSL
- Skonfigurowanie go do używania hosta: zglos-local.app.pzu.pl

## Dostęp do aplikacji

Aplikacja musi być dostępna z określonymi parametrami URL z zewnętrznej aplikacji SPA:

```
http://localhost:4200/registration/zdarzenie?externalOccurrenceNumber=[numer sprawy w SPA]&companyScope=[PZU/TUW]
```

Gdzie:
- `externalOccurrenceNumber`: Numer sprawy z aplikacji SPA
- `companyScope`: Zakres firmy, "PZU" lub "TUW"

## Baza danych

Aplikacja używa SQLite do lokalnego rozwoju, plik bazy danych znajduje się w:
- `data.db` w głównym katalogu projektu

## Konfiguracja SSL

Serwer deweloperski frontendu jest skonfigurowany do używania SSL z określonym hostem:
- Host: `zglos-local.app.pzu.pl`
- Może być konieczne dodanie tego do pliku hosts wskazującego na 127.0.0.1

## Konfiguracja Proxy

Żądania API z frontendu są przekazywane do backendu przez skonfigurowane ustawienia proxy:
- Wszystkie żądania `/api` są przekierowywane do `http://localhost:3000`

## Rozwiązywanie problemów

### Typowe problemy:

1. **Problemy z połączeniem API**: 
   - Upewnij się, że API jest uruchomione przed uruchomieniem frontendu
   - Sprawdź, czy baza danych została poprawnie zasilona danymi

2. **Problemy z parametrami URL**: 
   - Oba parametry URL (`externalOccurrenceNumber` i `companyScope`) są wymagane
   - Sprawdź, czy są poprawnie sformatowane w URL

3. **Problemy z SSL/Hostem**:
   - Upewnij się, że `zglos-local.app.pzu.pl` wskazuje na 127.0.0.1 w pliku hosts
   - Sprawdź, czy w przeglądarce nie ma ostrzeżeń dotyczących certyfikatu SSL

## Dodatkowe informacje

Projekt jest zbudowany z użyciem:
- Angular 18
- NestJS 10
- PrimeNG 18
- TypeORM z SQLite
- Nx 20 jako narzędzie monorepo
