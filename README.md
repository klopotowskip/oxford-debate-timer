# oxford-debate-timer
## [PL] (English version below)

Zaawansowany czasomierz przeznaczony do [debat oksfordzkich](https://pl.wikipedia.org/wiki/Debata_oksfordzka).
Czasomierz wyświetla obecnego mówcę, obsługuje krótkie odpowiedzi (tzw. ad vocem), wyświetla tezę debaty oraz posiada miejsce na logo (więcej w sekcji 'Personalizacja'). Dodatkowo można zatrzymywać i wznawiać upływ czasu klikając **Spację**.

### Sposób użycia
Na początku w formularzu należy wpisać tezę debaty, wybrać czas przeznaczony na mówcę w mowie długiej, ilość mów ad vocem oraz ich długość, a następnie kliknąć w żółty przycisk 'Start'.
Kiedy pojawi się widok czasomierza, aby rozpocząć mowę pierwszego mówcy należy klinkąć **Spację**. Kiedy mówca zakończy swoją mowę należy ponownie klinkąć **Spację** a następnie kilkąć **Enter** aby przejść do mowy następnego mówcy.
Aby zakolejkować mowę w trybie ad vocem należy kliknąć przycisk znajdujący się w dolnej części lewego i prawego panela. Mowa ad vocem rozpocznie się po zakończeniu mowy obecnego mówcy i kliknięciu "Enter".

### Personalizacja
Czasomierz można dowolnie personalizować. Aby domyślne logo zmienić na własne należy usunąć plik _logo.png_ z katalogu _images_ i zastąpić go plikiem własnego loga (**WAŻNE!** Nowy plik też musi mieć nazwę _logo.png_ inaczej nie będzie działać). Należy dobrać logo o odpowiednich proporcjach rozmiarów (domyślne logo ma proporcje 3:2), aby nie psuło ono układu czasomierza (trzeba po prostu sprawdzić jak prezentuje się nowe logo i ewentualnie przeskalować je lub dociąć używając jednej z wielu dostępnych aplikacji do obróbki grafiki).

Aby zmienić kolorystykę czasomierza należy zmienić wartości zmiennych w plikach w katalogach _src/styles_. Wymaga to jednak ponownego zbudowania projektu (patrz w sekcji 'Budowanie projektu'), i jest bardziej zaawansowaną operacją wymagającą podstawowej wiedzy o kaskadowych arkuszach stylów CSS.

### Najczęściej zadawane pytania
**Czasomierz wyświetla się w języku angielskim. Jak ustawić język czasomierza na Polski?**
W tym celu należy zmienić preferowany język stron w przeglądarce na polski.

Licencja: MIT License ([tekst orginalny](https://github.com/pietrek777/debate-timer/blob/master/LICENSE) | [polskie tłumaczenie](http://blaszyk-jarosinski.pl/wp-content/uploads/2008/05/licencja-mit-tlumaczenie.pdf))

## [EN]

An advanced timer for debates that can handle short speeches and display current speaker
This timer is adjusted for Polish 'Oxford debates'. Despite the fact it has full English language support, I don't know whether it will be suitable for any other style of debates (even for 'Oxford debates' taking place in other countries, from what I know these rules are very often diffrent in diffrent places), however if you want to use it for diffrent type of debates I strongly encourage you to fork this project and modify it as you want :)

### How to use it?
Firstly, in the setup form set the topic of debate, choose time per speaker, short speeches quantity per team and it's duration, then click yellow "Begin" button.
When the timer layout appears click **Space** to start the speech of first speaker. When speech of first speaker will end, stop the time hitting **Space** again (if time elapsed before you stopped, you don't have to click Space) and click **Enter** to move to next speaker.
If you want to queue a short speech, click a button in the bottom of left and right pane. It will appear after a speech of current speaker.

[License: MIT License](https://github.com/pietrek777/debate-timer/blob/master/LICENSE)

Created by: Piotr Kłopotowski
