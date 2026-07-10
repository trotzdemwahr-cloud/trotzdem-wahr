const workbookData = {

    title: "Zurück zu dir",

    subtitle:
        "Ein kostenloses Workbook über Selbstreflexion, psychologische Zusammenhänge und neue Perspektiven.",

    version: "2.0",

    author: "trotzdem.wahr",

    steps: [

    {

        id: 1,

        slug: "ankommen",

        title: "Ankommen",

        intro: {

            heading: "Schön, dass du da bist.",

            text:
                "Vielleicht bist du neugierig auf Psychologie. Vielleicht möchtest du dich selbst besser verstehen oder bist durch die Themen auf trotzdem.wahr hier gelandet. Ganz gleich, warum du heute hier bist – dieses Workbook ist ein Ort, an dem du dir Zeit für dich nehmen darfst. Es gibt keine richtigen oder falschen Antworten und keinen Druck, alles sofort verstehen zu müssen."

        },

        impulse: {

            title: "Psychologischer Impuls",

            text:
                "Unser Gehirn lernt und verarbeitet Informationen besonders gut, wenn wir uns sicher fühlen. Deshalb entstehen viele wichtige Erkenntnisse nicht unter Druck, sondern in ruhigen Momenten. Genau diese Zeit darfst du dir heute nehmen."

        },

        questions: [

        ],

        takeaway: {

            title: "Für dich mitgenommen",

            text:
                "Du musst heute nichts leisten. Es reicht, neugierig auf dich selbst zu sein. Jeder Weg beginnt mit einem ersten Schritt – und genau den gehst du gerade."

        }
,
{
    id: 2,

    slug: "wahrnehmen",

    title: "Wahrnehmen",

    intro: {

        heading: "Wie geht es dir gerade?",

        text:
            "Im Alltag funktionieren wir oft einfach weiter. Zwischen Terminen, Verpflichtungen und Gedanken bleibt wenig Raum, bewusst wahrzunehmen, wie es uns eigentlich geht. Dabei sind Gefühle, Gedanken und körperliche Reaktionen wichtige Hinweise darauf, was wir gerade brauchen."

    },

    impulse: {

        title: "Ein Blick in die Psychologie",

        text:
            "Unser Gehirn verarbeitet jeden Tag unzählige Eindrücke. Gefühle entstehen dabei nicht zufällig – sie helfen uns, Situationen einzuordnen und auf unsere Bedürfnisse aufmerksam zu machen. Auch unangenehme Gefühle haben deshalb eine wichtige Aufgabe."

    },

    questions: [

        {
            id: "feelings",

            type: "checkbox",

            title: "Welche Gefühle begleiten dich im Moment besonders häufig?",

            options: [

                "ruhig",
                "zufrieden",
                "hoffnungsvoll",
                "dankbar",
                "unsicher",
                "überfordert",
                "traurig",
                "erschöpft",
                "ängstlich",
                "wütend"

            ]

        },

        {
            id: "thoughts",

            type: "checkbox",

            title: "Welche Gedanken kennst du von dir?",

            options: [

                "Ich mache mir viele Sorgen.",
                "Ich denke oft zu viel nach.",
                "Ich zweifle häufig an mir.",
                "Ich möchte allem gerecht werden.",
                "Ich bin oft sehr streng mit mir.",
                "Ich wünsche mir mehr Ruhe."

            ]

        },

        {
            id: "energy",

            type: "textarea",

            title: "Was kostet dich im Moment am meisten Kraft?"

        }

    ],

    takeaway: {

        title: "Für dich mitgenommen",

        text:
            "Gefühle sind weder richtig noch falsch. Sie möchten dir etwas zeigen. Oft beginnt Veränderung nicht mit einer Lösung, sondern damit, ehrlich wahrzunehmen, was gerade da ist."

    }

}
        ,
{

    id: 3,

    slug: "verstehen",

    title: "Verstehen",

    intro: {

        heading: "Warum reagiere ich manchmal so?",

        text:
            "Jeder Mensch entwickelt im Laufe seines Lebens Erfahrungen, Gewohnheiten und Strategien. Viele davon laufen automatisch ab. Oft reagieren wir deshalb schneller, als wir überhaupt darüber nachdenken können. Das ist kein Zeichen von Schwäche, sondern eine normale Aufgabe unseres Gehirns."

    },

    impulse: {

        title: "Ein Blick in die Psychologie",

        text:
            "Unser Gehirn versucht ständig vorherzusagen, was als Nächstes passieren könnte. Dafür vergleicht es neue Situationen mit früheren Erfahrungen. Das spart Energie und kann uns schützen – führt aber manchmal auch dazu, dass wir stärker reagieren, als eine Situation es eigentlich erfordern würde."

    },

    questions: [

        {

            id: "stress",

            type: "radio",

            title: "Wie reagierst du meistens, wenn dich etwas belastet?",

            options: [

                "Ich ziehe mich eher zurück.",
                "Ich denke lange darüber nach.",
                "Ich spreche mit anderen darüber.",
                "Ich versuche, mich abzulenken.",
                "Das ist ganz unterschiedlich."

            ]

        },

        {

            id: "patterns",

            type: "checkbox",

            title: "Welche Reaktionen kennst du von dir?",

            options: [

                "Ich entschuldige mich oft, obwohl ich nichts falsch gemacht habe.",
                "Ich denke lange über Gespräche nach.",
                "Ich möchte Konflikte möglichst vermeiden.",
                "Ich stelle meine eigenen Bedürfnisse oft hinten an.",
                "Ich übernehme schnell Verantwortung für andere.",
                "Ich erkenne mich in keiner dieser Aussagen wieder."

            ]

        },

        {

            id: "reflection",

            type: "textarea",

            title: "Gab es eine Situation, in der du dich im Nachhinein selbst überrascht hast? Was ist passiert?"

        }

    ],

    takeaway: {

        title: "Für dich mitgenommen",

        text:
            "Verstehen bedeutet nicht, alles sofort verändern zu müssen. Oft beginnt Entwicklung bereits in dem Moment, in dem wir erkennen, dass unser Verhalten einen Ursprung hat – und nicht einfach 'falsch' ist."

    }

}
        ,
{

    id: 4,

    slug: "erkennen",

    title: "Erkennen",

    intro: {

        heading: "Manche Muster tragen einen Namen.",

        text:
            "Beziehungen prägen uns. Die meisten geben uns Sicherheit, Vertrauen und Unterstützung. Manche können uns aber auch verunsichern, klein machen oder unsere eigenen Grenzen verschwimmen lassen. Solche Dynamiken entstehen oft schleichend und bleiben deshalb lange unbemerkt."

    },

    impulse: {

        title: "Ein Blick in die Psychologie",

        text:
            "Psychische Gewalt beginnt selten plötzlich. Häufig entwickelt sie sich Schritt für Schritt – durch Kontrolle, Abwertung, Schuldzuweisungen, Manipulation oder das wiederholte Überschreiten persönlicher Grenzen. Gerade weil diese Verhaltensweisen oft unauffällig beginnen, werden sie nicht immer sofort erkannt."

    },

    questions: [

        {

            id: "boundaries",

            type: "checkbox",

            title: "Welche Aussagen kennst du aus Beziehungen – egal ob Familie, Freundschaften oder Partnerschaften?",

            options: [

                "Meine Gefühle wurden heruntergespielt.",
                "Ich hatte das Gefühl, ständig etwas falsch zu machen.",
                "Ich habe mich oft entschuldigt, obwohl ich den Grund nicht verstanden habe.",
                "Meine Grenzen wurden nicht ernst genommen.",
                "Ich habe an meiner eigenen Wahrnehmung gezweifelt.",
                "Ich erkenne mich in keiner dieser Aussagen wieder."

            ]

        },

        {

            id: "warning",

            type: "checkbox",

            title: "Welche Verhaltensweisen empfindest du grundsätzlich als Warnsignale?",

            options: [

                "Ständige Kontrolle",
                "Abwertende Bemerkungen",
                "Eifersucht als Liebesbeweis",
                "Schuldzuweisungen",
                "Drohungen",
                "Grenzüberschreitungen"

            ]

        },

        {

            id: "realisation",

            type: "textarea",

            title: "Gab es beim Lesen einen Gedanken oder eine Erkenntnis, die dich besonders beschäftigt?"

        }

    ],

    takeaway: {

        title: "Für dich mitgenommen",

        text:
            "Nicht jede schwierige Situation ist Gewalt. Gleichzeitig verdienen Grenzüberschreitungen, Manipulation oder Abwertungen Aufmerksamkeit. Wissen hilft dabei, Erfahrungen besser einzuordnen – ohne vorschnelle Urteile über sich selbst oder andere zu treffen."

    }

}
        ,
{

    id: 5,

    slug: "staerken",

    title: "Stärken",

    intro: {

        heading: "In dir steckt mehr, als du manchmal glaubst.",

        text:
            "Unser Blick richtet sich oft automatisch auf das, was schwierig ist. Dabei verlieren wir leicht aus den Augen, welche Fähigkeiten, Erfahrungen und Menschen uns bereits tragen. Stärke bedeutet nicht, niemals zu zweifeln. Stärke bedeutet, trotz dieser Zweifel weiterzugehen."

    },

    impulse: {

        title: "Ein Blick in die Psychologie",

        text:
            "Die Psychologie spricht von Resilienz – der Fähigkeit, sich trotz schwieriger Erfahrungen immer wieder zu stabilisieren. Resilienz ist keine angeborene Eigenschaft. Sie entwickelt sich durch Beziehungen, Erfahrungen und kleine Schritte, die wir immer wieder gehen."

    },

    questions: [

        {

            id: "resources",

            type: "checkbox",

            title: "Was gibt dir im Alltag Kraft?",

            options: [

                "Zeit in der Natur",
                "Gespräche mit vertrauten Menschen",
                "Musik",
                "Sport oder Bewegung",
                "Ruhe und Zeit für mich",
                "Kreative Hobbys",
                "Humor",
                "Etwas ganz anderes"

            ]

        },

        {

            id: "strengths",

            type: "checkbox",

            title: "Welche Eigenschaften beschreiben dich?",

            options: [

                "einfühlsam",
                "zuverlässig",
                "hilfsbereit",
                "geduldig",
                "kreativ",
                "mutig",
                "neugierig",
                "ich entdecke meine Stärken noch"

            ]

        },

        {

            id: "gratitude",

            type: "textarea",

            title: "Worauf bist du heute stolz – auch wenn es nur eine kleine Sache ist?"

        }

    ],

    takeaway: {

        title: "Für dich mitgenommen",

        text:
            "Selbstwert entsteht selten durch einen einzigen großen Erfolg. Oft wächst er in den kleinen Momenten, in denen wir freundlich mit uns selbst umgehen, unsere Grenzen ernst nehmen und erkennen, dass wir bereits vieles in uns tragen."

    }

}
        ,
{

    id: 6,

    slug: "weitergehen",

    title: "Weitergehen",

    intro: {

        heading: "Jede Erkenntnis ist ein Anfang.",

        text:
            "Vielleicht hast du in diesem Workbook neue Gedanken entdeckt. Vielleicht hast du manches bestätigt gefunden oder Fragen mitgenommen, auf die es heute noch keine Antwort gibt. All das ist in Ordnung. Selbstreflexion endet nicht mit einer letzten Seite – sie begleitet uns Schritt für Schritt weiter."

    },

    impulse: {

        title: "Ein Blick in die Psychologie",

        text:
            "Nachhaltige Veränderungen entstehen selten durch einen einzigen großen Moment. Viel häufiger entwickeln sie sich aus vielen kleinen Entscheidungen, die wir immer wieder treffen. Schon ein neuer Gedanke oder eine bewusstere Entscheidung kann langfristig einen Unterschied machen."

    },

    questions: [

        {

            id: "insight",

            type: "textarea",

            title: "Welche Erkenntnis aus diesem Workbook möchtest du mitnehmen?"

        },

        {

            id: "nextstep",

            type: "textarea",

            title: "Welchen kleinen Schritt möchtest du in den nächsten Tagen für dich gehen?"

        },

        {

            id: "message",

            type: "textarea",

            title: "Wenn dein zukünftiges Ich diese Seite in einem Jahr lesen würde – was möchtest du ihm heute mitgeben?"

        }

    ],

    takeaway: {

        title: "Für dich mitgenommen",

        text:
            "Du musst nicht alle Antworten kennen. Es reicht, wenn du bereit bist, weiter neugierig auf dich selbst zu bleiben. Jeder kleine Schritt zählt – und manchmal beginnt Veränderung genau dort, wo wir uns erlauben, ehrlich hinzusehen."

    },

    outro: {

        heading: "Danke, dass du dir Zeit für dich genommen hast.",

        text:
            "Dieses Workbook ist nur ein erster Schritt. Auf trotzdem.wahr findest du weitere wissenschaftlich fundierte Inhalte rund um psychische Gewalt, Beziehungen, Selbstwert, Grenzen und persönliche Entwicklung. Vielleicht begleitet dich genau eines dieser Themen auf deinem weiteren Weg."

    }

}
    }

]

};
