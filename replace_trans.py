import sys

content = open('src/translations.js', 'r', encoding='utf-8').read()

es_target = """      chooseDates: "Elige tus fechas, reserva y activa una confirmacion instantanea.",
      contactHost: "Contactar anfitrión",
      hostBadge: "Superanfitrion","""

es_target = es_target.replace('\r\n', '\n')

es_repl = """      chooseDates: "Elige tus fechas, reserva y activa una confirmacion instantanea.",
      contactHost: "Contactar anfitrión",
      airbnbLink: "Ver en Airbnb",
      hostBadge: "Superanfitrion","""

if es_target in content:
    content = content.replace(es_target, es_repl)
    print("ES replaced!")
elif 'airbnbLink: "Ver en Airbnb",' in content:
    print("ES already has airbnbLink")
else:
    print("ES target not found. Look closer: ")
    print(repr(content[content.find('Elige tus fechas'):content.find('Elige tus fechas')+100]))

en_target = """      chooseDates: "Pick your dates, book, and enable instant confirmation.",
      contactHost: "Contact host",
      hostChat: {"""

en_target = en_target.replace('\r\n', '\n')

en_repl = """      chooseDates: "Pick your dates, book, and enable instant confirmation.",
      contactHost: "Contact host",
      airbnbLink: "Book on Airbnb",
      hostChat: {"""

if en_target in content:
    content = content.replace(en_target, en_repl)
    print("EN replaced!")
elif 'airbnbLink: "Book on Airbnb",' in content:
    print("EN already has airbnbLink")
else:
    print("EN target not found")

open('src/translations.js', 'w', encoding='utf-8').write(content)
