# Alexander Yerga Busquet - Currículum Vitae & Portfolio Personal

Benvingut al repositori del meu lloc web personal. Aquest projecte és un currículum vitae online interactiu i modern, dissenyat per mostrar la meva experiència, habilitats i projectes com a Tècnic Informàtic.

🌐 **Visita el lloc web:** [https://aalexybb.github.io/](https://aalexybb.github.io/)

---

## 📋 Taula de Continguts
- [Característiques](#-característiques)
- [Tecnologies Utilitzades](#-tecnologies-utilitzades)
- [Instal·lació i Ús Local](#-installació-i-ús-local)
- [Gestió del Blog](#-gestió-del-blog)
- [Desplegament](#-desplegament)
- [Crèdits](#-crèdits)
- [Autor](#-autor)

---

## ✨ Característiques

Aquest lloc web inclou diverses funcionalitats avançades per oferir una experiència d'usuari professional:

*   **Disseny Responsive**: Adaptat perfectament a mòbils, tablets i escriptori gràcies a **Bootstrap 5**.
*   **Multi-idioma**: Sistema de traducció complet en **Català, Castellà i Anglès**, amb detecció automàtica i persistència de preferències.
*   **Mode Fosc**: Tema fosc integrat per a una millor llegibilitat en entorns amb poca llum.
*   **Blog Dinàmic**: Sistema de blog lleuger que carrega articles des d'un fitxer JSON, sense necessitat de base de dades.
*   **Animacions**: Efectes de desplaçament suaus i animacions d'entrada per als elements.
*   **Formulari de Contacte**: Integració funcional amb **Formspree** per rebre missatges directament al correu.
*   **Generació de PDF**: Opció per descarregar el CV en format PDF.

---

## � Tecnologies Utilitzades

*   **HTML5** - Estructura semàntica.
*   **CSS3** - Estils personalitzats i animacions.
*   **JavaScript (ES6+)** - Lògica del lloc, traduccions i gestió del blog.
*   **Bootstrap 5** - Framework CSS per al disseny responsive i components UI.
*   **FontAwesome** - Iconografia vectorial.
*   **Google Fonts** - Tipografies *Saira Extra Condensed* i *Muli*.

---

## 💻 Instal·lació i Ús Local

Per executar aquest projecte al teu ordinador local:

1.  **Clona el repositori:**
    ```bash
    git clone https://github.com/aalexybb/aalexybb.github.io.git
    cd aalexybb.github.io
    ```

2.  **Executa un servidor local:**
    Aquest projecte utilitza `fetch` per carregar les traduccions i els posts del blog, per la qual cosa necessita un servidor HTTP local per evitar errors de CORS.

    *   **Amb Python 3:**
        ```bash
        python -m http.server 8080
        ```
    *   **Amb VS Code:**
        Instal·la l'extensió "Live Server" i fes clic a "Go Live".

3.  **Obre al navegador:**
    Visita `http://localhost:8080` (o el port que indiqui el teu servidor).

---

## � Gestió del Blog

El blog està dissenyat per ser fàcil de mantenir sense tocar el codi HTML. Tot el contingut es gestiona a través del fitxer `data/blog_posts.json`.

### Afegir una nova entrada

1.  Obre el fitxer `data/blog_posts.json`.
2.  Afegeix un nou objecte al principi de l'array seguint aquest format:

```json
{
    "id": 3,
    "date": "2025-11-27",
    "image": "assets/img/blog/nova-imatge.jpg",
    "title": {
        "ca": "Títol en Català",
        "es": "Título en Español",
        "en": "Title in English"
    },
    "summary": {
        "ca": "Resum curt per a la targeta...",
        "es": "Resumen corto para la tarjeta...",
        "en": "Short summary for the card..."
    },
    "content": {
        "ca": "<p>Contingut complet del post en HTML. Pots fer servir <b>negretes</b>, llistes, etc.</p>",
        "es": "<p>Contenido completo...</p>",
        "en": "<p>Full content...</p>"
    },
    "tags": ["Tecnologia", "Novetats"]
}
```

---

## 🚀 Desplegament

Aquest lloc està allotjat a **GitHub Pages**. Per actualitzar la versió en viu:

1.  Fes els canvis en local.
2.  Puja els canvis a la branca `main`:
    ```bash
    git add .
    git commit -m "Descripció dels canvis"
    git push origin main
    ```
3.  GitHub Pages detectarà automàticament els canvis i actualitzarà el lloc web en uns minuts.

---

## � Crèdits

Aquest lloc web es basa en la plantilla open source **Resume** creada per **Start Bootstrap**.

*   **Plantilla Original:** [Resume by Start Bootstrap](https://startbootstrap.com/theme/resume)
*   **Llicència del projecte:** GNU License
*   **Copyright:** Start Bootstrap (Plantilla base)

S'han realitzat modificacions significatives per afegir funcionalitats personalitzades com el sistema multi-idioma, el blog dinàmic, el mode fosc i millores d'accessibilitat.

---

## 👤 Autor

**Alexander Yerga Busquet**

*   📧 Email: [alexanderyergabusquet@gmail.com](mailto:alexanderyergabusquet@gmail.com)
*   🔗 LinkedIn: [Alexander Yerga Busquet](https://www.linkedin.com/in/alexander-yerga-busquet-79b100399)
*   🐙 GitHub: [@aalexybb](https://github.com/aalexybb)

---
&copy; 2025 Alexander Yerga Busquet. Llicenciat sota GNU License.
