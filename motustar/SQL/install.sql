CREATE DATABASE IF NOT EXISTS dbz_motus;
USE dbz_motus;

CREATE TABLE IF NOT EXISTS mots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mot VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(50) NOT NULL,
    points INT NOT NULL,
    date_partie DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT IGNORE INTO mots (mot) VALUES 
('GOKU'), ('VEGETA'), ('GOHAN'), ('PICCOLO'), ('KRILIN'), ('TRUNKS'), ('BULMA'), ('YAMCHA'), 
('TENSHINHAN'), ('CHAOZU'), ('GOTEN'), ('GOTENKS'), ('VEGETTO'), ('GOGETA'), ('CYBORG'), 
('ANDROIDE'), ('FREEZER'), ('CELL'), ('BROLY'), ('RADITZ'), ('NAPPA'), ('DABRA'), ('BABIDI'), 
('ZAMASU'), ('JIREN'), ('MORO'), ('GRANOLAH'), ('BABY'), ('LISHENRON'), ('JANEMBA'), ('COOLA'), 
('BOJACK'), ('BEERUS'), ('WHIS'), ('ZENO'), ('CHAMPA'), ('VADOS'), ('KAIOSHIN'), ('KIBITO'), 
('DENDE'), ('KARIN'), ('YAJIROBE'), ('BABA'), ('SHENRON'), ('PORUNGA'), ('CHICHI'), ('VIDEL'), 
('OOLONG'), ('PUAR'), ('LUNCH'), ('MARRON'), ('BARDOCK'), ('GINE'), ('PARAGUS'), ('JACO'), 
('MONAKA'), ('PAIKUHAN'), ('TAPION'), ('HIT'), ('CABBA'), ('CAULIFLA'), ('KALE'), ('KEFLA'), 
('FROST'), ('TOPPO'), ('DYSPO'), ('RIBRIANNE'), ('GINUE'), ('JEESE'), ('BUTTA'), ('RECOM'), 
('GULDO'), ('ZARBON'), ('DODORIA'), ('CUI'), ('SAIBAIMAN'), ('PUIPUI'), ('YAKON'), ('SPOPOVICH'), 
('YAMU'), ('SORBET'), ('TAGOMA'), ('GAMMA'), ('MAGENTA'), ('PILAF'), ('TAOPAIPAI'), ('TAMBOURINE'), 
('CYMBAL'), ('DRUM'), ('GIRU'), ('RILDO'), ('NAIL'), ('MOORI'), ('TARBLE'), ('CHEELAI'), 
('LEMO'), ('ZUNO'), ('HILDEGARN'), ('KAMEHAMEHA'), ('GENKIDAMA'), ('KIENZAN'), ('TAIYOKEN'), 
('MAFUBA'), ('MASENKO'), ('DODONPA'), ('FINALFLASH'), ('BIGBANG'), ('GALICK'), ('MAKANKOSAPPO'), 
('KIKOHO'), ('KAIOKEN'), ('SOKIDAN'), ('TELEPORTATION'), ('FUSION'), ('METAMOL'), ('POTARA'), 
('SAIYAN'), ('OOZARU'), ('NAMEK'), ('TERRE'), ('ENMA'), ('KAIO'), ('HAKAISHIN'), ('ANGE'), 
('MAJIN'), ('SENZU'), ('RADAR'), ('SCOUTER'), ('CAPSULE'), ('NUAGE'), ('BATON'), ('KATCHIN'), 
('DRAGONBALL'), ('VAISSEAU'), ('TENKAICHI'), ('BUDOKAI'), ('RUBANROUGE'), ('CELLMAX'), ('DRGERO'), 
('GARLIC'), ('DAISHINKAN'), ('GOWASU'), ('BLACK'), ('MAGETTA'), ('BOTAMO'), ('MERUS'), ('SAGANBO'), 
('MONAITO'), ('ELEC'), ('OIL'), ('MAKI'), ('GAS'), ('UPA'), ('BORA'), ('NAM'), ('GIRAN'), 
('BACTERIAN'), ('RANFAN'), ('GUILAN'), ('MURASAKI'), ('BLUE'), ('METALLIC'), ('MOMIE'), 
('AKKUMAN'), ('GYUMAO'), ('KAMESENNIN'), ('MUTAITO'), ('TSURUSENNIN'), ('SHEN'), ('ANNIN'), 
('BUBBLES'), ('GREGORY'), ('ROUKAIOSHIN'), ('MINOTIA'), ('HATCHIYACK'), ('OZOTTO'), ('KURIZA'), 
('CHILLED'), ('BERRYBLUE'), ('KIKONO'), ('CRANBERRY'), ('APPULE'), ('PLANETE'), ('UNIVERS'), 
('TOURNOI'), ('ENERGIE'), ('AURA'), ('VOEU'), ('DRAGON'), ('ETOILE'), ('TSUFRU'), ('HERA'), 
('METAL'), ('MECHA'), ('MYSTIC'), ('BEAST'), ('ULTRA'), ('INSTINCT'), ('EGO'), ('ORANGE'), 
('ROSE'), ('GOLD'), ('GOLDEN'), ('SATAN'), ('HERCULE'), ('BEE'), ('BUU'), ('OOB'), 
('PAPOI'), ('PIROZHKI'), ('CARONI'), ('PIZZA'), ('ICARUS'), ('HAIYA'), ('FANFAN'), ('SUNO'), 
('OCTO'), ('VIOLET'), ('SILVER'), ('DRACULA'), ('TULLECE'), ('SAUZER'), ('DORE'), ('CACAO'), 
('AMOND'), ('DAIZ'), ('RAKABEI'), ('REZUN'), ('LAKASEI'), ('BIDO'), ('BUJIN'), ('GOKUA'), 
('ZANGYA'), ('BIOMAN'), ('BIOBROLY'), ('IWAN'), ('HELES'), ('MOSCO'), ('QUITELA'), ('ARAK'), 
('LIQUIR'), ('SIDRA'), ('RUMSSHI'), ('BELMOD'), ('GEENE'), ('ANAT'), ('PELL'), ('CAMPARI'), 
('COGNAC'), ('CUKATAIL'), ('KORN'), ('AWAMO'), ('SOUR'), ('MOJITO'), ('KUSU'), ('MARCARITA'), 
('MARTINU'), ('ZUNAMA'), ('POTAUFEU'), ('WATAGASH'), ('BARRY'), ('KHAN'), ('COCOA'), ('YURIN'), 
('OBNI'), ('RUBALT'), ('ZIRLOIN'), ('RABANRA'), ('ZARBUTO'), ('COMFREY'), ('DIUM'), ('NAPAPA'), 
('METHIOP'), ('MURICHIM'), ('JIRASEN'), ('NIGRISSI'), ('NARIRAMA'), ('MAJI'), ('KAYO'), 
('CATOPESRA'), ('GAMISALAS'), ('DAMOM'), ('VUON'), ('KETTOL'), ('BIKAL'), ('ZIRCOL'), ('SARBTO'), 
('HYSSOP'), ('OREGANO'), ('BASIL'), ('LAVENDER'), ('BERGAMO'), ('ROH'), ('KURU'), ('OGMA'), 
('SHIN'), ('KHAI'), ('IRU'), ('PERU'), ('ROU'), ('UGG'), ('AGU'), ('CAE'), ('FWA'), 
('JEREZ'), ('VERMOUD'), ('ZENI'), ('VAMPA'), ('SADALA'), ('ZOON'), ('PITAL'), ('MAKYO'), 
('KAIOSHINKAI'), ('PAOZU'), ('BRIEF'), ('TUFFLE'), ('YAMOSHI'), ('KANASSA'), ('SHUGESH'), 
('FASHA'), ('BORGOS'), ('TORA'), ('BEELZEBUB'), ('LUCIFER'), ('LEGENDAIRE');