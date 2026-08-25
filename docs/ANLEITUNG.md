# Kunden- & Setup-Anleitung – Wilhelm Lippl Handwerk
*V3.1 – MotionSites Edition*

Diese Dokumentation erklärt Schritt für Schritt, wie die Webpräsenz nach dem Erstaufbau angepasst, betrieben und in Produktion überführt wird.

---

## 1. Formspree Kontaktformular aktivieren

Das 3-stufige Anfrageformular in `index.html` ist für den Dienst Formspree vorbereitet:

1. Kostenlosen Account auf [formspree.io](https://formspree.io) anlegen.
2. Ein neues Formular erstellen (z.B. „Wilhelm Lippl Website-Anfragen“).
3. Die Ziel-E-Mail-Adresse eintragen, an welche Kundenanfragen gesendet werden sollen.
4. In `index.html` in Zeile `action="https://formspree.io/f/YOUR_FORM_ID"` den Platzhalter `YOUR_FORM_ID` durch Ihre echte Formspree-ID ersetzen.

---

## 2. Beispielbilder austauschen

Alle generierten Beispielbilder liegen im Ordner `assets/`:

- `assets/hero_lippl_craft.jpg` → Großes Hero-Hauptbild (1280x720 empfohlen)
- `assets/service_montage.jpg` → Montage- & Küchenaufbau
- `assets/service_renovierung.jpg` → Renovierung & Bodenbeläge
- `assets/service_instandhaltung.jpg` → Reparatur & Instandhaltung
- `assets/about_handwerker.jpg` → Porträt von Herrn Lippl

> **Tipp:** Wenn echte Fotos von Herrn Lippl oder realen Baustellen vorliegen, einfach die Dateien im Ordner `assets/` mit denselben Dateinamen überschreiben und die `<span class="img-badge">Beispielbild</span>` Tags in `index.html` entfernen.

---

## 3. Online-Terminbuchung (Cal.com / Calendly) einbinden

In `index.html` ist in Sektion 9 ein vorbereiteter UI-Dummy enthalten:

- **Option A (Cal.com – empfohlen & DSGVO-freundlich):**
  1. Account auf [cal.com](https://cal.com) erstellen.
  2. Ereignis anlegen (z.B. „Vor-Ort-Besichtigung 30 Min“).
  3. Den Iframe-Embed-Code im Buchungsbereich von `index.html` einsetzen.
- **Option B (Calendly):**
  1. Account auf [calendly.com](https://calendly.com) anlegen.
  2. Embed-Code über *Freigeben → Zu Website hinzufügen* kopieren und einfügen.

---

## 4. CRM & E-Mail-Workflows verbinden

- **Zapier / Make.com Webhook:** Formspree unterstützt direkte Webhooks (z.B. bei Eingang neuer Anfragen Weiterleitung in CRM-Systeme wie HubSpot, Pipedrive oder Erstellung einer Trello/Notion-Karte).
- **Slack- / SMS-Benachrichtigung:** Über Make.com oder Zapier kann bei jeder Formularabsendung eine Sofort-Benachrichtigung auf das Smartphone gesendet werden.

---

## 5. Live-Gang & Hosting (Vercel / Netlify / Strato)

### Bereitstellung über Vercel (Empfohlen & kostenlos):
1. Kostenlosen Account auf [vercel.com](https://vercel.com) anlegen.
2. *Add New Project* → GitHub Repository auswählen.
3. Direkt auf *Deploy* klicken – die Seite ist in unter 60 Sekunden weltweit mit HTTPS und CDN erreichbar.

### Bereitstellung über klassischen Webspace (FTP):
- Alle Dateien (`index.html`, `style.css`, `app.js`, `assets/`) in das `public_html` bzw. `htdocs`-Verzeichnis des Webservers hochladen.

---

## 6. Rechtliche Angaben finalisieren

- **Impressum:** Prüfen, ob eine Umsatzsteuer-Identifikationsnummer (USt-IdNr.) vorliegt und diese im `#impressumModal` in `index.html` ergänzen.
- **Datenschutz:** Bei Nutzung zusätzlicher Tools (wie z.B. Google Analytics oder Hotjar) müssen diese im `#datenschutzModal` ergänzt werden.
