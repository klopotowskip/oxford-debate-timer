# oxford-debate-timer
## [PL] (English version below)

Zaawansowany czasomierz przeznaczony do [debat oksfordzkich](https://pl.wikipedia.org/wiki/Debata_oksfordzka).
Czasomierz wyświetla obecnego mówcę, obsługuje krótkie odpowiedzi (tzw. ad vocem), wyświetla tezę debaty oraz posiada miejsce na logo (więcej w sekcji 'Personalizacja'). Dodatkowo można zatrzymywać i wznawiać upływ czasu klikając **Spację**.

*[Działająca wersja demonstracyjna jest dostępna tutaj](https://oxford-debate-timer.herokuapp.com/)* (możesz jej używać, jeśli nie przeszkadza Ci domyślne logo)

### Uruchamianie aplikacji na komputerze (lokalnie)
Aby uruchomić czasomierz na własnym komputerze należy pobrać najnowszą wersję projektu [z tej zakładki](https://github.com/pietrek777/oxford-debate-timer/releases), rozpakować ją, a następnie uruchomić plik _index.html_ w oknie przeglądarki.

### Uruchamianie aplikacji na serwerze
Aby uruchomić swoją własną wersję aplikacji na serwerze należy umieścić zawartość archiwum z projektem w odpowiedniej lokalizacji na serwerze (albo możesz skorzystać z *[wersji demonstracyjnej](https://oxford-debate-timer.herokuapp.com/)*)

### Sposób użycia
Na początku w formularzu należy wpisać tezę debaty, wybrać czas przeznaczony na mówcę w mowie długiej, ilość mów ad vocem oraz ich długość, a następnie kliknąć w żółty przycisk 'Start'.
Kiedy pojawi się widok czasomierza, aby rozpocząć mowę pierwszego mówcy należy klinkąć **Spację**. Kiedy mówca zakończy swoją mowę należy ponownie klinkąć **Spację** a następnie kilkąć **Enter** aby przejść do mowy następnego mówcy.
Aby zakolejkować mowę w trybie ad vocem należy kliknąć przycisk znajdujący się w dolnej części lewego i prawego panela. Mowa ad vocem rozpocznie się po zakończeniu mowy obecnego mówcy i kliknięciu "Enter".

### Personalizacja
Czasomierz można dowolnie personalizować. Aby domyślne logo (plik _logo.png_), ikonę strony (_favicon.png_) lub tło strony (_qblks.png_) należy zastąpić ich pliki w katalogu _images_ własnymi plikami (**WAŻNE!** Nowy plik musi mieć tą samą nazwę i roszerzenie, inaczej nie będzie działać). Należy dobrać logo o odpowiednich proporcjach rozmiarów (domyślne logo ma proporcje 3:2), aby nie psuło ono układu czasomierza (trzeba po prostu sprawdzić jak prezentuje się nowe logo i ewentualnie przeskalować je lub dociąć używając jednej z wielu dostępnych aplikacji do obróbki grafiki).<br>
Aby zmienić domyślne dźwięki należy zastąpić pliki _hit.ogg_ (dźwięk krótki) oraz _end.ogg_ własnymi analogicznie, jak powyżej (wciąż należy pamiętać, aby nowe pliki miały tą samą nazwę oraz rozszerzenie)

Aby zmienić kolorystykę czasomierza należy zmienić wartości zmiennych w plikach w katalogach _src/styles_. Wymaga to jednak ponownego zbudowania projektu (patrz w sekcji 'Importowanie projektu' i 'Budowanie projektu'), i jest bardziej zaawansowaną operacją wymagającą podstawowej wiedzy o kaskadowych arkuszach stylów CSS.

### Importowanie projektu
Aby edytować ten projekt należy go najpierw poprawnie zainstalować. Wymaga to zainstalowanego na komputerze [GITa](https://git-scm.com/), [Yarna](https://yarnpkg.com/en/) oraz [Node.js](https://nodejs.org/en/) (wymagany do działania Yarna). Następnie w oknie terminala należy wpisać poniższą sekwencję komend

```bash
$ git clone https://github.com/pietrek777/oxford-debate-timer.git
$ cd oxford-debate-timer
$ yarn install
$ yarn upgrade
```
Po wykonaniu tych komend projekt zostanie pobrany wraz ze wszystkimi zależnościami i będzie możliwa jego edycja

### Testowanie
Aby testować, czyli sprawdzać na bieżąco działanie programu w fazie developmentu należy uruchomić projekt na serwerze testowym.
```bash
$ yarn run dev-server
```

### Budowanie projektu
Aby zbudować projekt ze źródła należy uruchomić poniższą komendę
```bash
$ yarn run build:prod
```
Jeżeli nie chcesz niczego zmieniać w kodzie źródłowym timera (albo zmienić wyłącznie zasoby statyczne, jak opisano w sekcji 'Personalizacja'), dużo łatwiejsze będzie skorzystanie ze wcześniej zbudowanych paczek dostępnych [w zakładce 'releases'](https://github.com/pietrek777/oxford-debate-timer/releases)

### Najczęściej zadawane pytania
**Czasomierz wyświetla się w języku angielskim. Jak ustawić język czasomierza na Polski?**
W tym celu należy zmienić preferowany język stron w przeglądarce na polski.

Licencja: MIT License ([tekst orginalny](https://github.com/pietrek777/debate-timer/blob/master/LICENSE) | [polskie tłumaczenie](http://blaszyk-jarosinski.pl/wp-content/uploads/2008/05/licencja-mit-tlumaczenie.pdf))<br>
Autor oprogramowania: Piotr Kłopotowski <[pietrek777@gmail.com](mailto:pietrek777@gmail.com)>

## [EN]

An advanced timer for debates that can handle short speeches and display current speaker
This timer is adjusted for Polish 'Oxford debates'. Despite the fact it has full English language support, I don't know whether it will be suitable for any other style of debates (even for 'Oxford debates' taking place in other countries, from what I know these rules are very often diffrent in diffrent places), however if you want to use it for diffrent type of debates I strongly encourage you to fork this project and modify it as you want :)

*[Working demo here](https://oxford-debate-timer.herokuapp.com/)* (feel free to use it unless default logo affects you)


### Launching app on your computer (locally)
In order to launch timer on your computer download latest build [from here](https://github.com/pietrek777/oxford-debate-timer/releases), extract it, and launch _index.html_ in your browser.

### Launching app on a server
If you want to launch your own version of timer on a server, just place archive content in a appropriate server directory (however you can still use *[demo version](https://oxford-debate-timer.herokuapp.com/)* if you want)

### How to use it?
Firstly, in the setup form set the topic of debate, choose time per speaker, short speeches quantity per team and it's duration, then click yellow "Begin" button.
When the timer layout appears click **Space** to start the speech of first speaker. When speech of first speaker will end, stop the time hitting **Space** again (if time elapsed before you stopped, you don't have to click Space) and click **Enter** to move to next speaker.
If you want to queue a short speech, click a button in the bottom of left and right pane. It will appear after a speech of current speaker.

### Personalisation
Feel free to personalise this app. You can change all of the static resources (_audio_ and _images_ directories). To do so, just replace appropriate files (*IMPORTANT!* it have to have the same filename and extension as the original file). However, bear in mind, that if you want to make changes in project sourcecode you have to rebuild it first (instructions below)

### Importing project
In order to edit this project you have to import it first. It requires [GIT](https://git-scm.com/), [Yarn](https://yarnpkg.com/en/) and [Node.js](https://nodejs.org/en/) (required by Yarn) installed on your computer. Then you have to enter comments from below into your bash

```bash
$ git clone https://github.com/pietrek777/oxford-debate-timer.git
$ cd oxford-debate-timer
$ yarn install
$ yarn upgrade
```
After executing this commands project will be installed with all of it's dependencies.

### Testing
If you want to test the project while developing it, you have to run development server
```bash
$ yarn run dev-server
```

### Building
In order to build project from sources, run this command
```bash
$ yarn run build:prod
```
If you don't want to change timer sourcecode, or you just want to change it's static resources (see 'Personalisation'), it will be much easier to use [builds available here](https://github.com/pietrek777/oxford-debate-timer/releases)

### FAQ
**How can I change timer language to English?**
Timer is choosing language based on your browser language preferences. If you want to change the language, change it in your browser settings.

[License: MIT License](https://github.com/pietrek777/debate-timer/blob/master/LICENSE)<br>
Created by: Piotr Kłopotowski
