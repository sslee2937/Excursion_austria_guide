import json

with open('/Users/songseop/.gemini/antigravity/scratch/austria-guide-excursions/data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Course-level German updates
course_de_updates = {
    "ex01": {
        "summary_de": "Erste reguläre Fachexkursion des Lehrgangs: Von der traditionsreichen Lipizzanerzucht im Bundesgestüt Piber über die visionäre Kunst der Hundertwasserkirche in Bärnbach und die sanften Weinberge der Schilcherweinstraße bis hin zum Schloss Stainz (Universalmuseum Joanneum) und dem nostalgischen Stainzer Flascherlzug.",
        "homework_de": "Nach der EX ist ein ca. 2-seitiges Handout über den Tag zu erstellen (Stichworte über wichtigste Inhalte, Zahlen, Fakten) sowie Absolvierung des Weststeiermark-Quiz auf wifionline (2 LE im Bildungspass).",
        "category_de_map": {
            "departure": "Abfahrt / Ankunft",
            "culture": "Kultur & Geschichte",
            "church": "Architektur & Sakralbau",
            "route": "Panoramastrecke",
            "gastronomy": "Kulinarik & Einkehr",
            "castle": "Schlösser & Museen",
            "arrival": "Abfahrt / Ankunft"
        },
        "guide_points_de": [
            "Mikrofontechnik im Reisebus, Teilnehmer-Check, geografischer Überblick über die Weststeiermark und die Bezirke Voitsberg und Deutschlandsberg.",
            "Geschichte der Lipizzaner (1580 Erzherzog Karl II., Lipica), biologische Besonderheiten (Fohlenfärbung, Schimmelbildung), Verbindung zur Spanischen Hofreitschule in Wien.",
            "Architekturphilosophie von Friedensreich Hundertwasser (Ablehnung der geraden Linie, Fensterrecht, Naturverbundenheit), Bergbautradition in Bärnbach, Symbolik der 12 Tore der Weltreligionen.",
            "DAC-Herkunftssystem für den Schilcher (Blauer Wildbacher), geologische Besonderheiten (Gneis- und Schieferböden), Entstehung der Buschenschank-Kultur unter Kaiser Joseph II.",
            "Präsentation regionaler Leitprodukte (Steirisches Kürbiskernöl g.g.A., Käferbohnen, Kren) und Slow-Food-Gastronomie in der Steiermark.",
            "Erzherzog Johann als Modernisierer der Steiermark und seine Verbindung zu Stainz, landwirtschaftliche Reformen, Universalmuseum Joanneum sowie barocke Schlosskirche.",
            "Geschichte der steirischen Schmalspurbahnen (760 mm Spurweite), Anekdoten rund um den Wunderdoktor 'Höllerhansl', Brauchtum um Sturm und Kastanien im steirischen Herbst.",
            "Tagesresümee im Bus, professionelles Feedback zur Moderation und organisatorischer Abschluss."
        ]
    },
    "ex02": {
        "summary_de": "Lehr- und Übungsexkursion in die Bundeshauptstadt: Auf der 180 km langen Autobahnstrecke Graz-Wien absolvierten die Teilnehmer/innen 13 moderierte Streckenabschnitte. Vor Ort folgten geführte Stadtrundfahrten (Ringstraße, UNO-City, Schönbrunn), Stadtrundgänge im 1. Bezirk, eine offizielle Innenführung im Stephansdom sowie der traditionelle Ausklang beim Heurigen in Perchtoldsdorf.",
        "homework_de": "Busmoderation auf der Autobahnstrecke Graz-Wien (jeweils ca. 10 Min. Redezeit, 2 LE) sowie Erstellung eines Skriptums zu den Wiener Sehenswürdigkeiten.",
        "category_de_map": {
            "departure": "Abfahrt / Moderation",
            "rest": "Raststation",
            "route": "Stadtrundfahrt Bus",
            "walk": "Stadtrundgang geführt",
            "gastronomy": "Individuelle Pause",
            "church": "Sakralbau / Domführung",
            "arrival": "Rückfahrt / Feedback"
        },
        "guide_points_de": [
            "Präzises Timing bei Autobahn-Führungen, Korrelation von Fahrgeschwindigkeit und Sichtachsen, Geografie des Murtals und der Semmering-Passage.",
            "Geografischer Übergang vom Semmering ins Wiener Becken, Randzone des Wienerwaldes.",
            "Prinz Eugen von Savoyen und die barocke Achse Belvedere-Schwarzenbergplatz; Baugeschichte der Ringstraße unter Kaiser Franz Joseph I. (Historismus).",
            "Mittelalterliches Wien, Babenberger-Epoche, Geschichte der griechischen Kaufmannsgemeinde am Fleischmarkt, Scheinkuppel-Fresko von Andrea Pozzo in der Jesuitenkirche.",
            "Wiener Kaffeehauskultur, kulinarische Empfehlungen und Gästebetreuung im 1. Bezirk.",
            "Riesentor (Romanik), gotischer Hallenchor, spätgotische Kanzel von Anton Pilgram (Fenstergucker), Marmorgrabmal Kaiser Friedrichs III., Wiederaufbau nach dem Brand von 1945.",
            "Ikonografie der barocken Pestsäule von Kaiser Leopold I., Hofburg als 600-jährige Residenz der Habsburger, Heldenplatz als historischer Schauplatz der Republik Österreich.",
            "Otto Wagners Jugendstil-Stationen und Wienzeilenhäuser (Majolikahaus), Karlskirche als barocker Höhepunkt, barocke Schlossanlage Schönbrunn.",
            "Josephinische Heurigenverordnung von 1784 (Buschenschankrecht), Kennzeichnung durch den Föhrenbusch, Besonderheiten des Wiener Gemischten Satzes DAC.",
            "Individuelles Feedback für alle 13 Streckenreferenten, Auswertung der Sprechtechnik und fachlichen Schwerpunkte."
        ]
    },
    "ex03": {
        "summary_de": "Lehr- und Übungsexkursion in die Region Graz-Nord: Besuch der historischen Murstadt Frohnleiten, vertiefende Führung im Stift Rein – dem ältesten durchgehend bestehenden Zisterzienserkloster der Welt –, Erkundung von über 100 historischen Bauernbauten im Österreichischen Freilichtmuseum Stübing sowie der hochgotischen Wallfahrtskirche Maria Straßengel.",
        "homework_de": "Handout über Stift Rein und Freilichtmuseum Stübing (2 Seiten) und Online-Quiz auf der Lernplattform (2 LE im Bildungspass).",
        "category_de_map": {
            "departure": "Abfahrt / Busführung",
            "walk": "Stadtrundgang",
            "church": "Stifts- & Kirchenführung",
            "gastronomy": "Mittagsrast & Einkehr",
            "museum": "Freilichtmuseum",
            "arrival": "Rückfahrt"
        },
        "guide_points_de": [
            "Industriegeschichte des mittleren Murtals (Sappi Papierindustrie Gratkorn), Höhlen- und Karstlandschaft Peggau-Lurgrotte.",
            "Frohnleitens Marktrechtsgeschichte, Wehranlage Tabor, Pfarrkirche Mariä Himmelfahrt und Europäische Blumenstadt 'Entente Florale'.",
            "Gründung 1129 durch Markgraf Leopold den Starken, Zisterzienserregel 'Ora et labora', Grablege der steirischen Landesfürsten (Traungauer), Deckenfresken von Joseph Adam Mölk, historische Bibliothek.",
            "Tradition klösterlicher Gastfreundschaft und regionale steirische Wirtshauskultur.",
            "Regionale Holzbautechniken aus allen 9 Bundesländern (Blockbau, Ständerbau, Strohdach), Rauchstubenkultur und agrarhistorische Entwicklung Österreichs.",
            "Hochgotische Architektur (1346–1355), Stiftung durch Herzog Albrecht II., filigraner Steinturm ('Kleiner Steffl'), Wurzelkreuz-Legende und gotische Glasmalereien.",
            "Konzeption von Halbtages- und Ganztagesprogrammen für den Großraum Graz.",
            "Tagesresümee und Besprechung der Exkursionsaufgaben."
        ]
    },
    "ex04": {
        "summary_de": "Lehr-Exkursion 'Schlösser & Burgen' in die Oststeiermark und das Vulkanland: Landschaftsführung entlang der Steirischen Apfelstraße und der Stubenbergklamm, Führung im Gartenschloss und Tierwelt Herberstein sowie Besteigung der uneinnehmbaren Veste Burg Riegersburg inklusive Hexenmuseum und historischem Abstieg über die 7 Burgtore.",
        "homework_de": "Erstellung eines 2-seitigen Handouts über Herberstein und Riegersburg (historische Daten, Wehranlagen, Hexenprozesse) bis 03. Oktober (2 LE).",
        "category_de_map": {
            "departure": "Abfahrt / Stadtausfahrt",
            "route": "Panoramastrecke",
            "castle": "Schloss- & Burgführung",
            "gastronomy": "Mittagsrast & Einkehr",
            "walk": "Historischer Abstieg",
            "arrival": "Rückfahrt"
        },
        "guide_points_de": [
            "Topografie des Grazer Ostrandes (Riesstraße B65), Solarstadt Gleisdorf, Wirtschaftsbedeutung des oststeirischen Obst- und Ackerbaus.",
            "Sortenvielfalt des steirischen Apfels, Obstbaumblüte und Erntezyklen, Ab-Hof-Vermarktung und Landschaftsbild der Apfelstraße.",
            "Sigismund von Herberstein und seine Gesandtschaftsreisen nach Moskau, Renaissance-Arkadenhof, historischer Schlosspark, Bruno-Gironcoli-Museum.",
            "Vulkanischer Ursprung des Oststeirischen Hügellandes, Basaltformationen und Mikroklima.",
            "Elisabeth Katharina von Galler ('Die Gallerin') und der Ausbau zur stärksten Festung des Abendlandes gegen die Osmanen, Feldbacher Hexenprozesse (1673-1675), Waffensaal und Prunkräume.",
            "Militärarchitektur: Zugbrücken, Wehrmauern, Pechnasen und die taktische Staffelung der 7 Festungstore.",
            "Veredelung regionaler Spitzenprodukte (Vulkanland-Schinken) und moderne steirische Buschenschankkultur.",
            "Rückfahrt nach Graz und Auswertung der Führungsbeiträge."
        ]
    },
    "ex05": {
        "summary_de": "Feierliche Abschluss-Exkursion in das Steirische Weinland zum Ende der zweijährigen Ausbildung zum staatlich geprüften Austria Guide: Besichtigung der Kernölmühle Hartlieb in Heimschuh, Führung und Fachverkostung in der Landes-Weinbauschule Silberberg, Schloss Seggau mit dem 300-jährigen bischöflichen Weinkeller, Fahrt über die Südsteirische Weinstraße zum Grenztisch bis zur Abschlussjause im Buschenschank Hack-Gebell.",
        "homework_de": "Abschließendes Handout über das Steirische Weinland (2 Seiten) zur Eintragung von 2 LE in den WIFI-Bildungspass.",
        "category_de_map": {
            "departure": "Abfahrt / Stadtausfahrt",
            "culture": "Handwerk & Verkostung",
            "castle": "Schloss- & Weinkellerführung",
            "route": "Grenz- & Weinstraße",
            "gastronomy": "Feierlicher Lehrgangsabschluss",
            "arrival": "Rückfahrt / Abschluss"
        },
        "guide_points_de": [
            "Wirtschafts- und Verkehrsgeschichte des Grazer Südens (Puntigamer Brauerei, Triesterstraße), Geografie des Sausaler Schieferhügellandes.",
            "Steirischer Ölkürbis (Cucurbita pepo var. styriaca) mit schalenlosen Kernen, g.g.A.-Schutzstatus, traditionelles Rösten und hydraulisches Pressverfahren.",
            "Steirisches DAC-Herkunftssystem (Gebietswein, Ortswein, Riedenwein), Rebsortenprofil (Sauvignon Blanc, Morillon, Muskateller), Bewirtschaftung extremer Steillagen.",
            "Römerzeitliche Relief- und Grabsteine (Lapidarium aus Flavia Solva), 300 Jahre alter bischöflicher Weinkeller, Fürstenzimmer, Schlosskapelle und die 5-Tonnen-Glocke 'Seggauer Liesl'.",
            "Regionale Vermarktungsstrategien und Schaufenster steirischer Spezialitäten in Vogau.",
            "Grenzziehung von St. Germain 1919, der Grenztisch als Symbol europäischer Völkerverständigung (Schengen), Klapotetz als akustisches Wahrzeichen der Weinberge.",
            "Klassische steirische Brettljause (Geselchtes, Verhackertes, Käferbohnen, Kren) und offizielle Verabschiedung des WIFI-Lehrgangs 2025/2026.",
            "Feierlicher Abschluss aller praktischen Lehr- und Busübungsführungen der Ausbildung."
        ]
    }
}

for course in data["courses"]:
    cid = course["id"]
    if cid in course_de_updates:
        u = course_de_updates[cid]
        course["summary_de"] = u["summary_de"]
        course["homework_de"] = u["homework_de"]
        
        for idx, stop in enumerate(course["stops"]):
            cat = stop["category"]
            stop["category_de"] = u["category_de_map"].get(cat, "Standort")
            if idx < len(u["guide_points_de"]):
                stop["guide_points_de"] = u["guide_points_de"][idx]

with open('/Users/songseop/.gemini/antigravity/scratch/austria-guide-excursions/data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open('/Users/songseop/.gemini/antigravity/scratch/austria-guide-excursions/data.js', 'w', encoding='utf-8') as f:
    f.write('const EXCURSION_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')

print('Successfully updated German fields in data.json and data.js!')
