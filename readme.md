<h1 align="center">
    NapicuFyzika
</h1>

- **NapicuFyzika** je interaktivní aplikace navržená pro zkoušení a učení fyzikálních veličin. Aplikace je dostupná na mobilních platformách (iOS a Android) a také jako webová aplikace, což umožňuje uživatelům snadný přístup k obsahu odkudkoli.
- **Interaktivní testy**: Uživatelé mohou testovat své znalosti fyzikálních veličin prostřednictvím vybárání správných odpovědí.

---
<img src="./screen.png" alt="App image">

---
### DŮLEŽITÉ UPOZORNĚNÍ
- Pro vývoj aplikací na iOS je zapotřebí aplikace Xcode, která je dostupná na MacOS.
- Pokud nehodláte vyvíjet aplikace pro iOS, upravte scripty v `package.json`.
- Apliace byla testována na **iPhone 16 Pro - iOS 18.0 a Android 15.0**.
---
### Co potřebuji ?
- [Git](https://git-scm.com/)
- [Node - LTS](https://nodejs.org/en/)
- [Android Studio](https://developer.android.com/studio) (Pro vývoj Android)
- [Xcode](https://developer.apple.com/xcode/) (Pro vývoj iOS)
- [Visual Studio Code](https://code.visualstudio.com/)
---
### Naklonujte repozitář
   ```sh
   git clone https://github.com/Numax-cz/NapicuPhysics
   ```
---
### SPUŠTĚNÍ WEBOVÉ APLIKACE 
1. Nainstalujeme veškeré prostředky.
2. Nainstalujeme veškeré balíčky pomocí příkazu `npm install`.
3. Pomocí příkazu `npm run start` spustíme webovou aplikaci na localhostu na portu 4200.

---
### BUILDNUTÍ APLIKACE PRO MOBILNÍ ZAŘÍZENÍ
1. Pomocí příkazu `npm run build` buildneme celý projekt pro Android i iOS. Následně se vygeneruje složka `android` a `ios`.
2. Pomocí příkazu `npm run open-android` otevřeme Android Studio (pokud je nainstalované).
3. Pomocí příkazu `npm run open-ios` otevřeme Xcode (pokud je nainstalované).
4. Pomocí příkazu `npm run gen-icon-android` vygenerujeme aplikační ikonu pro android. Ikona pro
   vygenerování se musí nacházet ve složce `src/assets` Pod jménem`icon`
5. Pomocí příkazu `npm run gen-icon-ios` vygenerujeme aplikační ikonu pro iOS. Ikona pro
      vygenerování se musí nacházet ve složce `src/assets` Pod jménem`icon`
---


## Použité vývojové prostředí
- https://www.jetbrains.com/idea - Intellij IDEA 2024 Ultimate
- https://developer.apple.com/xcode - Xcode 16
- https://developer.android.com/studio - Android Studio

