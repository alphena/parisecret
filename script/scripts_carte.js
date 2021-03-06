					
			var map;
			
//	Ca c'est la fonction qui definit la carte.
		
			function myMap() {
				initialize() ;
				var myCenter = new google.maps.LatLng(48.857433,2.345564);
				var mapProp = {
					center:myCenter,
					zoom: 12,
					streetViewControl: false,
					draggable : true,
					mapTypeControl: false,	
					mapTypeId: google.maps.MapTypeId.ROADMAP,
						styles: [
							{
								featureType: "all",
								elementType: "labels",
								stylers: [
									{visibility: "off"}
								]
							},{
								featureType: "all",
								elementType: "geometry",
								stylers: [
									{ lightness: -30},
									{ saturation: -50 }
								]
							},{
								featureType: "road",
								elementType: "geometry",
								stylers: [
									{ hue: "#66b5ff" },
									{ visibility: "simplified" }, 
									{ lightness: 100 }, 
									{ saturation: -100 }
								]
							},{
								featureType: "administrative",
								elementType: "labels",
								stylers: [
									{ visibility: "off" }
								]
							},{
								featureType: "administrative.locality",
								elementType: "geometry",
								stylers: [
									{ visibility: "on" }
								]
							},{
								featureType: "road.arterial",
								elementType: "labels",
								stylers: [
									{ visibility: "on" }
								]
							},{
								featureType: "road.local",
								elementType: "labels",
								stylers: [
									{ visibility: "on" }
								]
							},{
								featureType: "road.arterial",
								elementType: "labels.icon",
								stylers: [
									{ visibility: "off" }
								]
							},{
								featureType: "landscape",
								elementType: "geometry",
								stylers: [
									{ color: "#c6c6c6" },
									{ visibility: "on" } 
								]
							},{
								featureType: "poi",
								elementType: "geometry",
								stylers: [
									{visibility: "off"}
								]
							},{
								featureType: "water",
								elementType: "geometry",
								stylers: [
									{ color: "#111111"}
								]
							},{
								featureType: "transit.line",
								elementType: "geometry",
								stylers: [
									{ visibility: "simplified"}
								]
							},{
								featureType: "transit.station.rail",
								elementType: "all",
								stylers: [
									{ visibility: "simplified"}
								]
							}
						]
				};
				
				map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
				var sw = new google.maps.LatLng(48.765546, 2.227725);
				var ne = new google.maps.LatLng(48.909070, 2.393346);
				var bounds = new google.maps.LatLngBounds(sw,ne);
				map.fitBounds(bounds);
				setMarkers(map);
				return map;
			}

// Fonction qui colorie les cases de la barre de navigation au chargement de la page			
			
			function initialize() {
				for (var i = 0; i<types.length; i++) {
					var type = types[i];
					document.getElementById(type[0]).style.backgroundColor = type[1];
				}
			}
			
			
//	Ca c'est le tableau qui va etre rempli avec les marqueurs (qui peuvent etre facilement compris par google maps)
			
			var theMarkers = [];

// 	Ca c'est le tableau qu'on remplira (avec une ligne par marqueur) Pour le moment, c'est des marqueurs de test. 
//	Y'a 2 'categories' de lieux pour tester, c'est 'lieu' et 'random'
			
			var endroits = [
				['Les potelets CyKlop',48.883631,2.338412,'art','Les premiers potelets apparaissent à Paris au XVème siècle et leur fonction était alors de familiariser les élèves des écoles équines avec la monte. Sous Napoléon Bonaparte la forme particulière du potelet permettait aux agents de police d\'y menotter un prévenu en attendant le passage du fourgon. Aujourd\'hui, rebaptisés poétiquement « bornes anti-stationnement » ils ont pour fonction d\'empêcher les véhicules d\'occuper les trottoirs. Mais depuis 2007, peut-être parce qu\'il trouvait ces mobiliers urbains très laids l\'artiste graffeur français Le CyKlop a commencé à leur donner un chacun … un œil de cyclope ! Ces cyclopes, joyeux et colorés, sont parfois des monstres, parfois des figures importantes de la pop culture ou simplement des personnages sortis de l\'imagination débordante du CyKlop. Rue piémontési, les cyclopes incarnent les artistes de monmartre et vous pourrez vous amuser à reconnaître Picasso, Modigliani, parmi tant d\'autres','images/cyclop.jpg','Rue Piémontési – 18e arr.','Abbesses - ligne 12'],
				['Monsieur BMX',48.857622,2.360742,'art','Monsieur BMX est un artiste urbain qui découpe des vélos en deux pour les fixer en haut des murs de nos villes. Ne soyez donc pas surpris si au détour d\'une rue vous apercevez un vélo qui semble figé dans une course folle à travers Paris. Drôles et décalées ces œuvres ont été apperçues pour la première fois à Montpellier, ville d\'origine de l\'artiste. Il n\'aura pas fallu longtemps pour qu\'elles envahissent la capitale alors pensez à lever la tête lors de vos balades. Dernièrement, l\'artiste a repris ce principe de détournement d\'objets et a imaginé une œuvre sociale. En effet c\'est à présent des moitiés de caddie qui sont incrustées à Montpellier et remplies de denrées alimentaires « pour ceux qui en ont besoin ». On aura peut-être l\'occasion d\'en découvrir bientôt dans les ruelles parisiennes...','images/bmx.jpg','Au croisement de la rue Elzévir et de la rue des Franc-bourgeois – 4e arr.','Saint-Paul - ligne 1'],
				['Le mètre étalon',48.849325,2.335380,'histoire','C\'est le 26 mars 1791 que l\'Académie des Sciences définit une unité de longueur commune à tous les territoires français, le mètre. Dans un esprit d\'universalisme les révolutionnaires le fixent comme étant la dix-millionième partie d\'un quart de méridien terrestre, soit un quart de cerlcle reliant un des deux pôles à l\'équateur. La Convention adopte définitivement le mètre comme unité de longueur officielle le 7 avril 1795. Entre février 1796 et décembre 1797 on plaça dans les lieux les plus fréquentés de Paris 16 mètres étalons gravés dans le marbre afin de familiariser les parisiens à cette nouvelle unité. Il n\'en reste aujourd\'hui que deux, celui du 36 rue Vaugirard resté à sa place originelle, le deuxième se trouvant au 13 de la Place Vendôme.','images/metre.jpg','36 rue Vaugirad - 6e arr.','Rennes - ligne 12 <br>Odéon - ligne 10'],
				['Le cinéma des Cinéastes',48.884341,2.32693,'cinema','Ce bâtiment a toujours fait partie de la vie sociale nocturne parisiennes. Dès 1765, le Père Lathuile y ouvre un cabaret qui aurait été immortalisé dans l\'une des toiles de Manet. Puis en 1906, il est transformé en café-concert où de nombreux artistes se produiront. Le cinéma s\'en empare ensuite dans les années 30. Aujourd\'hui c\'est une façade rénovée, rouge et très moderne qui vous accueille. Avant le début du film, ne manquez pas de visiter le hall où des objets liés au monde du cinéma sont exposés. Il faut également penser à admirer la gracieuse structure métallique de la salle 1 qui date de l\'époque d\'Eiffel.','images/cineastes.jpg','7 avenue de Clichy - 17e arr.','Place de Clichy - lignes 2 et 16'],
				['Le très particulier',48.888392,2.335414,'bar','Après avoir trouvé le portail et sonné à l\'hôtel du même nom, on entre dans un lieu très paisible. Le bar se situe au sous-sol et sert à la fois des cocktails et des tapas. Pour les déguster, vous pourrez soit choisir l\'ambiance intimiste de la salle décorée comme un boudoir exotique, soit opter pour la sérénité de la véranda entourée de la végétation luxuriante du jardin. ','images/presqueparfait.jpg','23 avenue Junot - 18e arr.','Lamarck - Caulaincourt - ligne 12   Blanche - ligne 2    <br>La Fourche - ligne 13'],
				['Le comptoir général',48.872451,2.365643,'bar','Depuis le canal Saint Martin, l\'entrée du Comptoir Général est cachée au fond d\'une cour. Vous pénétrez ensuite dans un lieu qui semble tout droit sorti de l\'époque coloniale et qui se définit comme un "caravansérail". Ici, vous pourrez à la fois vous restaurer de petits plats exotiques, tenter de dénicher une perle rare dans la boutique locale (friperie et objets liés au voyage) ou simplement vous laisser transporter par les saveurs d\'un cocktail. Un vrai dépaysement en plein Paris ! Entrée libre ou sur donation.','images/comptoir.jpg','80 quai de Jemmapes - 10e arr.','République - ligne 3 5 8 9 11 <br>Goncourt - ligne 11'],
				['Nos ancêtres les gaulois',48.851975,2.356132,'bar','Vous entrerez dans une caverne moyenageuse où vous serez assis à de grandes tablées. La convivialité est de mise en ce lieu, animé en soirée par le barde local. Une formule unique et "rustique" est proposée. Pour l\'entrée, charcuterie et crudités sont à volonté. Un plat copieux vous est ensuite proposé, composé d\'une viande grillée au feu de bois accompagnée d\'une belle patate au four. Enfin, vous pourrez choisir votre dessert maison ou piocher dans une corbeille de fruits de saison. Vous pourrez également aller tirer votre pichet de vin au tonneau pour terminer cette soirée gauloise. Une ambiance originale à découvrir, en particulier le soir de la Saint-Valentin ! ','images/gaulois.jpg','39 rue Saint-Louis en l\’Ile - 4e arr.','Saint-Paul - ligne 1 <br>Pont-Marie - ligne 7'],
				['Rue de Chanoinesse - Histoire de Sweeney Todd',48.854244,2.350179,'cinema','Il paraîtrait que l\'histoire qui a inspiré le film Sweeney Todd ne viendrait pas de Londres mais de Paris. Entre 1384 et 1387, le boucher de la rue des Marmousets (actuelle rue de Chanoinesse) était très réputé pour ses pâtés. Il se trouve que sa boutique jouxtait celle d\'un barbier. Leur organisation aurait été découverte lorsqu\'une femme dont le mari avait disparu a alerté la police : en effet, son chien refusait de quitter la rue des Marmousets où son maître avait été tué. La police aurait alors découvert de nombreux ossements humains dans la cave partagée par les deux artisans qui ont ensuite été brûlés vifs pour "exorciser le mal". Même si la configuration de la ville est aujourd\'hui différente dans ce quartier, une ancienne pierre du bâtiment abritant les deux boutique existerait encore aujourd\'hui dans le garage souterrain de la Police Parisienne. Et même si ces histoires sordides vous donnent la chair de poule, le charme du quartier vaut tout de même le détour !','images/chanoinesse.jpg','Rue de Chanoinesse - 4e arr.','Cité - ligne 4  Hôtel de Ville - lignes 1 et 11  <br>Saint-Michel – Notre-Dame - lignes B et C'],
				['Galerie Véro Dodat',48.862633,2.340777,'promenade','Élégante et lumineuse galerie néo-classique, à côté d\'un café d\'époque. Agréable raccourci pour passer de la rue Rousseau à la Bouloi, tout en voyageant dans le temps ! On y passe pour flâner dans les commerces, galerie d\'art et restaurants. Cette galerie est très photogénique : son carrelage noir et blanc crée une illusion de profondeur, et les boutiques sont en parfait alignement. On pourra admirer les entrées couronnées de balcon et de deux statues côté rue du Bouloi, qui représente Hermès, dieu des commerçants, portant son casque ailé et un Satyre au repos. À l\'intérieur, les plafonds sont ornés de peintures de paysages là où il n\'y a pas de verrière.','images/verododat.jpg','19 rue Jean-Jacques Rousseau - 1er arr.','Palais Royal - Musée du Louvre - ligne 1 7'],
				['Galerie Vivienne',48.866169,2.339477,'promenade','C\'est peut être la plus célèbre des Galeries parisiennes, mais elle demeure calme et digne d\'intérêt autant pour sa décoration que son ambiance ! On admirera les mosaïques au sol, les verrières ornementés et les nombreuses sculptures de style pompéien néo-classique. La galerie Vivienne en cache d\'ailleurs une autre : la galerie Colbert, construite en 1826 pour la concurrencer. La galerie Colbert abrite une magnifique rotonde surmontée d\'une coupole vitrée. Ces deux galeries abritent des commerces chics, des salons de thés et brasserie (Le Grand Colbert et son décor Art nouveau mérite le détour) et de nombreuses institutions liées à l\'art et au patrimoine dont des galeries d’arts très réputées !','images/vivienne.jpg','4 rue des Petits-Champs - 2ème arr.','Pyramide - ligne 7 14'],
				['Le Café des deux moulins',48.884849, 2.333763,'cinema','Le café des deux moulins figure parmi les endroits mythiques du quartier Montmartre. Il s\’agit du fameux café dans lequel travaille Amélie Poulain, jouée par l\’actrice Audrey Tautou, dans le film Le Fabuleux Destin d\'Amélie Poulain, de Jean Pierre Jeunet. On y trouve d\’ailleurs des affiches du film encadrées en guise de décoration. Il s\’agit d\’un café – brasserie. On peut tout aussi bien s\’y arrêter au petit déjeuner qu\’au repas, au goûter, au diner, ou bien juste pour une petite pause-café.','images/2moulins.jpg','15 Rue Lepic - 18e arr.','Blanche - ligne 2'],
				['Lavomatique',48.868469, 2.361788,'bar','Quoi de plus original ! Ce café est situé derrière la porte d\’une laverie. En effet, pour accéder à la pièce principale, il faut entrer dans la laverie de la rue René Boulanger, dans le 10ème arrondissement, chercher le bouton permettant d\’ouvrir la porte avant de pouvoir enfin découvrir ce mystérieux café. La décoration est plutôt originale avec des couleurs très fraiches et des meubles fantaisistes. Ce café propose un certain nombre de boissons uniques, des vins, des cocktails mais aussi des plats réalisés sur place à partir d\’ingrédients de qualité, et de saison.','images/lavomatique.jpg','30 rue René Boulanger - 10e arr.','République - ligne 3 5 8 9 11'],
				['Le Procope',48.853021, 2.338790,'bar','Le Procope est le plus vieux café de Paris, ouvert en 1686, c’est un café chargé d\’histoire… Ce café a accueilli parmi les philosophes et écrivains les plus illustres. Il a d\’abord été un lieu particulièrement apprécié des philosophes des Lumières comme Rousseau, Voltaire ou Montesquieu qui l\’a même mentionné dans les Lettres Persanes. Ce fut également le lieu de réunions de grandes figures de la révolution Française. C’est ensuite de grands écrivains romantiques comme Musset ou encore George Sand qui occupèrent ses sièges. La décoration intérieure, chaleureuse, garde des traces ce cette histoire. On trouve par exemple une reproduction de La Déclaration des Droits de l\’Homme et du Citoyen de 1789 sur les murs de l\’une de salles. Le Procope propose une cuisine de tradition, bourgeoise. Leurs spécialités étant le Coq au vin et la Tête de veau, la Joue de Boeuf braisée, le Mille-feuille maison ou encore le traditionnel Tiramisù façon Procopio.','images/procope.jpg','13 rue de l\'Ancienne Comédie - 6e arr.','Odéon - ligne 4 et 10'],
				['L\'entre-potes',48.852592,2.374496,'bar','Voilà une autre sympathique petite adresse !  Situé dans le 11ème   arrondissement, le bar l\’entre-potes nous transporte dans un univers à part, hors du temps. Que ce soit au rez-de-chaussée ou au sous-sol, ce petit coin de Paris renferme de belles surprises. Au fond du bar se trouve une pièce, éclairée d’une lumière tamisée, où l\’on peut discuter et savourer un verre sur de vieux canapés, dans une ambiance chaleureuse. Mais l\’originalité du lieu se trouve au sous-sol. En effet, cette pièce est aménagée dans une ancienne station de métro. Les murs sont à nu par endroits et recouverts d\’anciennes mosaïques typiques des gares de l\’époque partout ailleurs. Au fond de la salle, d\’anciennes affiches publicitaires sont affichées et on peut même y trouver d\’anciens panneaux de signalisation. ','images/entrepote.jpg','14 rue de Charonne - 11 arr.','Ledru-Rollin - ligne 8'],
				['Passage des Panoramas',48.871681,2.341885,'promenade','Qualifié par Télérama d\’\"Eldorado de la gastronomie\", ce passage, inscrit aux monuments historiques depuis 1974, mérite sa renommée. Ce passage couvert, considéré comme le premier de Paris, possède des décors d’époque remarquables (graveur Stern, chocolaterie Marquis) et abrite un théâtre, ouvert en 1807 et proposant toujours des spectacles ! Ce passage est également un repère pour les collectionneurs de timbres, monnaies ou cartes postales… Situé en face du musée Grévin, ce passage se prolonge par le passage Jouffroy au nord et par d\'autres galeries (des Variétés, Feydeau, Montmartre, Saint-Marc) dans l\'ilôt qu\'il parcourt. De quoi passer un peu plus de temps à flâner dans ces galeries \"hors du temps\"','images/panorama.jpg','11 Boulevard Monmartre - 2ème arr.','Richelieu Drouot - ligne 8 9'],
				['Passage Jouffroy',48.873058, 2.342238,'promenade','Abrite la sortie du musée Grévin, beau passage construit en 1845, en métal, verre et bois','images/jauffroy.jpg','12 Boulevard Monmartre - 2ème arr.','Richelieu Drouot - ligne 8 9'],
				['Point zéro des routes de France',48.853409,2.348773,'histoire','Tous les chemins mènent à Rome... Mais toutes les routes mènent à Paris ! Elles aboutissent (ou commencent selon le point de vue) toutes sur le parvis de Notre-Dame. A l\'origine se dressait à cet endroit un poteau, l\'Echelle de Justice. Les condamnés venaient s\'y agenouiller, tête et pied nus, un cierge entre les mains pour se repentir de leur crime à la vue de tous. L\'échelle fut remplacée par un carcan (un collier de fer) en 1767 qui fut officiellement adopté comme point zéro par lettres patentes de Louis XV le 22 avril 1769. La plaque actuelle fut posée le 10 octobre 1924 par le Conseil Municipal de Paris et la Commission du Vieux Paris après douze ans de délibérations sur la manière de matérialiser ce fameux point zéro.','images/zero.jpg','Parvis de Notre-Dame, Place Jean-Paul II - 4ème arr.','Saint-Michel Notre-Dame - ligne 4 B C'],
				['Louxor, Palais du Cinéma',48.883534, 2.349708,'cinema','Une salle de cinéma digne d\'un temple égyptien ? Le Paris des années folles ne se refusait rien, agrémenté de décors luxeux qui rapellent les univers exotiques des films qui fascinent le public, le Louxor est réalisé dans un style Art déco inspiré de l\'Egypte Antique. Pourtant cette perle du XXe siècle a bien failli ne pas survivre à la crise qui frappa l\'ensemble du monde du cinéma dès la fin des années 50 et l\'apparition du petit écran. Malgré une baisse du prix des places et l\'amélioration de l\'ensemble de l\'appareil technique, le grand rideau rouge se ferme le 29 novembre 1983 et le groupe Tati devient propriétaire des lieux. En 1986, le Louxor devient une boite de nuit, La Dérobade puis le Mégatown. Enfin dans les années 2000 les habitants du quartier se mobilisent pour sauver le Louxor qui se détériore peu à peu sous les tags et les affiches. En 2007 la Mairie fait le choix de redonner au Louxor sa fonction initiale et le 17 avril 2013 le Palais du Cinéma s\'expose à nouveau fièrement au regard des passants et propose aujourd\'hui une programmation classée Art et Essai avec une attention particulière portée sur le cinéma du Sud et destiné aux enfants. ','images/louxor.jpg','170 Boulevard Magenta - 10ème arr.','Barbès-Rochechouart - ligne 2 4'],
				['Première salle de basket d\'Europe, au foyer de Trévise',48.873458, 2.345572,'histoire','Ce foyer pour jeunes gens, construit en 1893, abrite au sous-sol le gymnase où a été disputé le tout premier match de basket-ball en France et en Europe. Ce sport avait été inventé deux ans auparavant par James Naismith, professeur au collège de Springfield dans le Massachusetts. Le gymnase est monté de façon identique à celui du collège de Springfield où un an plus tôt s\'était joué le premier match de basket-ball en public. Grâce à des fond américains tout le nécessaire fut acheminé par bateau à travers l\'Atlantique. À l\'occasion des 150 ans des YMCA une plaque commémorative à été installée. L\'immeuble, dessiné par l\'architecte Bernard, disciple de Gustave Eiffel, abritait également la première piscine privée de Paris, une salle de spectacle et même un bowling. Ces derniers ont été fermés en 1965 car leur entretien et les nouvelles normes restrictives nécessitaient des dépenses trop importantes.','images/basket.jpg','14 rue de Trévise - 9e arr.','Grands Boulevards - ligne 8 et 9'],
				['Le mur des "Je t\'aime"',48.884824,2.338538,'art','Quel meilleur endroit que le jardin romantique du square Jehan Rictus à Montmartre pourrait accueillir un monument à l\'amour ? À l\'heure où de trop nombreux murs sont érigés pour nous éloigner les uns des autres, le mur des « je t\'aime », œuvre de Frédéric Baron et Claire Kito est devenus un lieu de rendez-vous pour les amoureux du monde entier. Venez flâner dans un des lieux les plus romantiques de Paris et apprendre à dire "je t\'aime" dans toutes les langues...','images/mur.jpg','square Jehan Rictus, Place des Abbesses - 18e arr.','Abbesses - ligne 12'],
				['Cité Véron',48.884148,2.331855,'promenade','La Cité Véron est l\'une des rues les plus pittoresques du 18ème arrondissement mais elle est surtout fameuse car plusieurs poètes et écrivains du XXe siècle y habitèrent. En 1953, Boris Vian s\'installa au 3ème étage du n°6 bis avec Ursula Kubler, une danseuse de ballet. En 1954, Jacques Prévert emménage lui aussi au n°6 bis et le théâtre ouvert, très dynamique est installé au n°4. Alors si votre chemin vous mène au pied de Montmartre, ne manquez pas cette merveilleuse impasse !','images/veron.jpg','96 Boulevard de Clichy - 18e arr.','Blanche - ligne 2'],
				['La Recyclerie',48.897675,2.344151,'bar','La recyclerie est un restaurant-café. Il est situé dans l\’ancienne Gare Ornano, du réseau ferroviaire de la petite ceinture. Il a ouvert ses portes le 14 juin 2014. On y retrouve l\’atmosphère de l\’ancienne gare. Ce petit coin de Paris est parfait pour une pause repas dépaysante ! L\’idée du projet était de s\’inscrire dans une logique de développement durable ; il s\’agit de Réduire – Réutiliser – Recycler. C’est pourquoi le restaurant la Recyclerie, propose chaque jour une cuisine responsable. Tous les plats sont « faits maison » à partir de produits frais et de qualité. La cuisine est globalement moins riche en viande tout en restant gourmande et le menu comporte au moins trois plats végétariens dont au moins un plat végétalien. De plus, les prix sont abordables (entre 8 et 15€). On peut y prendre son déjeuner, ou bien y savourer un brunch, un repas, un diner, voire tout simplement un café.','images/recyclerie.jpg','83 boulevard Ornano - 18e arr.','Porte de Clignancourt - ligne 4 <br>Porte de la Chapelle - tram T3'],
				['Le visage de Gregos',48.857192,2.336398,'art','L\'artiste Gregos a pris l\'habitude de coller une réplique exacte de son visage, souriant, tirant la langue ou mimant un baiser un peu partout dans Paris. Noirs ou multicolores ils sont souvent accompagnés d\'une phrase écrite comme un message adressé aux passants. On retrouve ces visages figés dans les rues de Lille ou Marseille, et sans cesse de nouveaux dans les quartiers de Montmartre, Saint Michel, des Abbesses, Saint-Germain, Bastille, les Halles...','images/gregos.jpg','6 rue de Seine - 6e arr.','Saint Germain des Prés ou Mabillon - ligne 4 10'],
				['Affiche de mobilisation générale d\'août 1914',48.867195,2.322200,'histoire','Le 1er août 1914, l\’ordre de mobilisation générale est décrété en France. Tous les français soumis aux obligations militaires sont appelés à revêtir l\’uniforme. Une annonce relayée à Paris par les maires, qui affichent sur les murs de la ville la déclaration de Mobilisation Générale. L\’affiche que l\’on peut encore découvrir aujourd\’hui rue Royale – la dernière à Paris – n\’est plus l\’ordre original, découvert peu de temps après la fin de la guerre à ce même emplacement. Devenu trop vieux et illisible, il a été remplacé par une copie protégée d\’un cadre bleu… du même bleu que l\’uniforme des soldats français pendant la Grande Guerre.','images/mobilisation.jpg','1er rue Royal - 8e arr.','Concorde - ligne 1 8 12'],
				['Les boites à sable',48.865143,2.303061,'histoire','Les boîtes à sable sont un vestige de l\'époque où on se déplaçait encore en voiture tirée par des chevaux (hippomobiles) à Paris. En effet le sable était stocké dans ces boites à disposition des agents d\'entretien qui l\'utilisaient pour recouvrir les déjections équestres. L\'hiver le sable servait également contre la neige et le verglas. Cependant dans les années 1880 on abandonne doucement cette pratique au profit du salage. En effet le sable laissait la chaussée sale et engorgeait les égouts. Et finalement les automobiles remplacèrent les hippomobiles et les boîtes à sable perdirent toute utilité. Les boites servent aujourd\'hui de cheminée de ventilation aux \"lieux d\'appel\" de la Propreté de Paris. Indice révélateur, à proximité de chacune de nos trois boîtes, existe un escalier de descente vers un de ces locaux souterrains servant de vestiaires aux cantonniers de la Ville de Paris.','images/sable.jpg','Place george guillaumin. Face au 2 place de la Reine Astrid - 8e arr.','Alma-Marceau - ligne 9'],
				['Le Panthéon Bouddhique',48.866345,2.294654,'promenade','Lors d\'une balade venez vous ressourcer au Panthéon Bouddhique, probablement un des endroits les plus zens de la capitale. D\'une superficie de 450m² il a été aménagé lors de la rénovation du musée Guimet en 1991. Vous pourrez y admirer gratuitement un jardin d\'inspiration japonaise et un pavillon réalisé par des artistes japonais où le musée organise des cérémonie du thé, moment privilégié pour goûter aux plaisirs de l\'art de vivre Nippon.','images/bouddhique.jpg','19 avenue d\'Iéna - 16e arr.','Iéna - ligne 9'],
				['La tour Horloge',48.859407,2.300503,'histoire','La tour horloge est un des endroits les plus secrets et les plus sublimes de la capitale. Dominant le quartier, elle abrite un quadriplexe de 20 mètres de hauteur où réside l\'architecte Monica Donati. En  1860 les propriétaires des magasins du Louvre, un des premiers grands magasins de Paris avaient fait construire dans ce quartier leur siège et érigé cette horloge qui faisait leur fierté. Puis dans l\'entre-deux guerres l\'immeuble avait été revendu et divisé en grands appartements bourgeois et dans la tour on avait aménagé deux réservoirs d\'eau en acier. Lorsque Monica Donati a redécouvert ce beffroi alors à l\'abandon dans les années 80 tout n\'était que poussière et entrelacs de tuyaux.  Ouverte au quatre vents la tour était occupée par des pigeons mais rien ne découragea l\'architecte à réaliser son rêve et accomplir le projet de transformer cette tour en sublime appartement...','images/horloge.jpg','20 avenue Rapp - 7e arr.','Ecole militaire ou Pont de l\'Alma - ligne 8 9'],
				['La Pagode',48.851675,2.316273,'cinema','La Pagode était une salle de cinéma parisienne, probablement l\’une des plus insolites. Construite en 1896 par l\'architecte Alexandre Marcel, son style s\’inspire de l\’architecture japonaise, en vogue à cette époque. Ce cinéma comportait deux salles de cinémas ainsi qu\’une salle et un jardin japonais.  La salle est malheureusement fermée depuis le 10 novembre 2015 au soir. Cependant sa façade est digne d\’un petit détour…','images/pagode.jpg','57 bis rue de Babylone - 7e arr.','Saint-François-Xavier - ligne 13'],
				['Les panneaux détournés de Clet Abraham',48.858771,2.351950,'art','Clet Abraham est un artiste d\'origine bretonne qui détourne les panneaux signalétiques en leur ajoutant un peu de folie douce et de poésie pure. Il n\'est pas à proprement parler un street-artist mais à depuis peu ressenti le besoin d\'une expression artistique au sein de la vie quotidienne. Ses interventions suscitent de nombreuses questions pour leur contenu parfois provocateur tout en respectant la lisibilité des panneaux. Partout ou il passe Clet a pris l\'habitude de silloner les rues des villes à vélo et de coller de petits bonhommes noirs. Dès que la vue lui plait, il pose son vélo, regarde à droite et à gauche s\'il n\'y a pas une patrouille et en escaladant le cadre du deux roues, se hisse jusqu\'au panneau, applique l\'autocollant puis remonte sur son vélo et pédale vers la prochaine cible.','images/clet.jpg','Rue du Cloître Saint-Merri - 4e arr.','Hôtel de Ville - ligne 1 11'],
				['Bibliothèque Forney',48.853375,2.359196,'histoire','L\'hôtel de Sens abritant la bibliothèque Forney est un des rares vestiges de l\'architecture médiévale civile à Paris mais ce n\'est pas pour cette raison qu\'il nous intéresse aujourd\'hui ! Malgré les nombreuses révoltes, insurrections, révolutions et autres guerres, Paris porte peu de cicatrice à bien y regarder, de son passé belliqueux qui aura fatalement laissé des marques sur les façades...C\'est le cas de cet ancien hôtel particulier où l\'on peut admirer un boulet de canon encore enchâssé dans la façade depuis le 28 juillet 1830. Il est un des derniers témoins de la capitale de la révolution de Juillet qui entraîna la chute de Charles X et de la monarchie absolue et instaura « la Monarchie de Juillet », une monarchie constitutionnelle, de Louis-Philippe 1er d\'Orléans. Il ne fut donc pas « roi de France » mais « roi des Français », nuance capitale qui valait bien une révolution, immortalisée par le célèbre tableau de Delacroix « La Liberté guidant le Peuple ».','images/boulet.jpg','1er rue du Figuier - 4e arr.','Saint-Paul ou Sully Morland - ligne 1 7'],
				['La rue la plus colorée de Paris',48.846400,2.370112,'promenade','À quelques pas de la Gare de Lyon, Paris nous réserve une autre surprise. La rue crémieux, pittoresque rue piétonne aux façades colorées, doit son charme buccolique à l\'initiative des heureux habitants qui ont repeint les murs et entretiennent savamment jardinières et arbustes pour le plus grand bonheur des promeneurs. Tracée à l\'emplacement des anciennes Arènes Impériales, lieu de divertissement du Second Empire, la rue est ouverte en 1865. Construite sur le modèle des cités ouvrières, elle fut pavée en 1993 ce qui la rendit encore d\'avantage singulière dans ce Paris Hausmannien. Une vraie bouffée d\'air frais !','images/cremieux.jpg','Rue Crémieux - 12e arr.','Gare de Lyon ou Quai de la Rapée - ligne 1 5 14 A D'],
				['Passage de l\'Ancre',48.864416, 2.352367,'promenade','Voici un passage fleuri, surprenant et caché en plein coeur du vieux Paris. Cette petite voie privée, aux environs de Beaubourg et du Musée des Arts et Métiers, n\'est pas une ruelle commerçante comme la plupart des passages couverts traditionnels. On passe au passage de l\'Ancre pour être à l’air libre, caché dans cet esprit de campagne qui nous dépayse tant. Les belles vitrines colorées accueillent aujourd’hui des bureaux pour la plupart, à l\'exception de la boutique Pep\'s qui n’est autre que le dernier réparateur de parapluies de Paris !','images/passagedelancre.jpg','223 rue Saint-Martin ou 30 rue Turbigo','Réaumur-Sébastopol, Arts et Métier, Etienne Marcel'],
				['Jardin Albert Kahn',48.841862, 2.227725,'promenade','Ce jardin de 4 hectares, aux portes de Paris, est la réalisation du monde rêvé par Albert Kahn : un monde sans frontières, où les civilisations vivent en harmonie. Ici se succèdent des jardins japonais, anglais, des vergers français ou encore une forêt vosgienne. Un bel endroit pour déconnecter et profiter des beaux jours dans un lieu frais et agréable. (NB: Consulter les horaires avant votre venue. Prix d’entrée : 3,30 euros','images/albertkahn.jpg','14, rue du Port 92100 Boulogne-Billancourt','Pont de Saint-Cloud - Ligne 10'],
				['Les Cerisiers du Parc de Sceaux',48.765546, 2.297787,'promenade','Bien connu de la communauté japonaise habitant à Paris, cet endroit est le paradis des cerisiers. C’est en effet une tradition, le \"hanami\", au japon que de se retrouver, sous les cerisiers, au moment de leur floraison, pour boire et manger ensemble. Dans le parc de Sceaux, un bosquet nord rassemble 150 arbres roses, et au sud une centaine d\'arbres à fleur blanches. Un bel endroit dont il faut profiter dès maintenant et durant tout l\'été ! Le Hanami de 2017 aura lieu le 23 avril au parc de Sceaux, avec au programme : un spectacle de Taikos (grand tambours japonais) à 15h30. ','images/cerisiers.jpg','8 Avenue Claude Perrault, 92330 Sceaux','Parc de Sceaux - Rer B'],
				['Square Saint-Lambert',48.842186, 2.297309,'promenade','Ce square est en réalité un vaste jardin art déco des années 30. Il est très agréable et peu connu des parisiens, on ira donc y passer du temps aux jours chauds, pour se reposer autour du grand bassin, et à l\'ombre d\'arbres remarquables (peupliers, acacias, ptérocaryas, cerisiers à grappes…). On échappe à la foule, aux terrasses surpeuplées et aux parcs bondés en venant ici, sans pour autant oublier que nous sommes à Paris, grâce à une jolie vue sur la Tour Eiffel. Ce square, idéal pour les plus jeunes, dispose de deux aires de jeux, et de tables de ping-pong. Horaires d’été (du 30 avril au 31 août): du lundi au vendredi de 8h00 à 21h30, le samedi et dimanche, de 9h00 à 21h30 ','images/squaresaintl.jpg','2 rue Jean-Formigné','Commerce - Ligne 8’'],
				['Mouzaïa',48.880394, 2.393346,'promenade','Cet endroit est surprenant et unique en son genre à Paris. Ce quartier, aux airs de campagne, est formé d\'allées piétonnes menant à de charmantes maisons fleuries, habitées par des ouvriers à la fin du XIXe siècle. Un endroit très photogénique et calme, qui nous fait oublier que l\'on est à Paris !','images/mouzaia.jpg','adresse','Pré-Saint-Gervais ou Danube - Ligne 7B'],
				['Jardins des Archives',48.859880, 2.357156,'promenade','Ouvert au public depuis 2011, ce jardin intimiste est parfait pour trouver du calme et de la fraîcheur en plein coeur du Marais. L\'accès est gratuit, il vous suffit de passer la porte au 87 rue Vieille du Temple et de traverser la cour en demi-lune de l\'Hôtel de Soubise. L\'entrée du jardin se trouve au fond à droite. On accède au jardin par la ruelle de la roche, l\'une des plus anciennes rues de Paris. Ce lieu verdoyant et romantique rassemble en réalité les jardins appartenant autrefois aux différents hôtels particuliers (Rohan, D\'Assy, Breteuil, Fontenoy et Jaucourt). L\'espace du jardin d\'Assy et Breteuil sont peut être les plus remarquables : ils sont agrémentés d’une rivière et d’arbres remarquables dont un marronnier d\'Inde (pièce unique à Paris). Horaires : 8h00 - 19h00 en printemps-été, et 8h00 - 17h00 en automne-hiver','images/jardinarchives.jpg','87 rue Vieille du Temple ou 59 rue des Francs Bourgeois','Rambuteau - Ligne 11 / Saint-Paul - Ligne 1']
			];

//	Ca c'est le tableau qui contient les differents types de marqueurs, la couleur qui correspond et leur icone sur la carte.
			
			var types =[
				['histoire','#60727e','images/icon_histoire.png'],
				['art','#7e99b4','images/icon_art_urbain.png'],
				['cinema','#c06f52','images/icon_cinema.png'],
				['bar','#eaca7d','images/icon_bars-resto.png'],
				['promenade','#f7b662','images/icon_promenade.png'],
				['tout','#424e63','']
			];
					
			
//	Ca c'est la fonction qui cree les marqueurs sur la carte (et qui les ajoute dans les tableau theMarkers)
			
			function setMarkers(map) {
				
				var infoWindow = new google.maps.InfoWindow();

				
				for (var i = 0; i < endroits.length; i++) {
					var endroit = endroits[i];
					var image = {
						url: choisirIcone(endroit[3]),
						scaledSize: new google.maps.Size(40,53),
						origin: new google.maps.Point(0,0),
						anchor: new google.maps.Point(40,53)					
					};
					var marker = new google.maps.Marker({
						position: {lat: endroit[1], lng: endroit[2]},
						map: map,
						icon: image,						
						title: endroit[0],
						type: endroit[3],
						texte: endroit[4],
						urlphoto: endroit[5],
						adresse: endroit[6],
						metro: endroit[7]
					});
				
					var boxText = document.createElement("div");
					boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
				
				
					(function (marker,endroit) {
						google.maps.event.addListener(marker,"click",function () {
							popup(marker.title,marker.texte,marker.urlphoto,marker.adresse,marker.metro);
						});
					
						marker.addListener('mouseover', function() {
							infoWindow.setContent(marker.title);
							infoWindow.open(map,marker);
						});
					
						marker.addListener('mouseout', function() {
							infoWindow.close(map,marker);
						});
									
					})(marker,endroit);
					theMarkers.push(marker);
				}

			}

// 	Fonction qui fait apparaitre la popup 'de base' (vide) et qui met le texte dedans			
			
			function popup(titre,texte,photo,adresse,metro) {
				document.getElementById("fondblanc").classList.toggle("show2");
				document.getElementById("myPopup").classList.toggle("show");
				document.getElementById("titrePopup").innerHTML = titre;
				document.getElementById("textePopup").innerHTML = texte;
				document.getElementById("adressePopup").innerHTML = adresse;
				document.getElementById("imagePopup").innerHTML = "<img src=" + photo + " alt=" + titre + " style='width: 100%'" +" />";
				document.getElementById("metroPopup").innerHTML = metro;
				document.getElementById("popupbutton").classList.toggle("show");
			}
			
//Et dans le même style, la fonction qui fait apparaître une popup avec des infos sur nous
			function popupInfos() {
				document.getElementById("infos").classList.toggle("show");
				document.getElementById("popupbutton2").classList.toggle("show");
			}
			
//	Et ca c'est la fonction qui doit faire disparaitre ou reapparaitre les marqueurs. 
			
			function afficherMarkers(div) {
				var className=div.getAttribute("class");
				var typeChoisi = div.getAttribute("id");
				if (className != "active"){
					div.setAttribute("class","active");
					div.style.backgroundColor = choisirCouleur(typeChoisi);
					div.style.color = "#ffffff";
				}
				else{
					div.setAttribute("class","normal");
					div.style.backgroundColor = "#000000";
					div.style.color = "#888888";
				} 
				for (var i = 0; i<theMarkers.length; i++) {
					if (theMarkers[i].type == typeChoisi) {
						if (theMarkers[i].getVisible() == false) {
							theMarkers[i].setVisible(true);
						} else {
							theMarkers[i].setVisible(false);
						}
					}		
				}
				document.getElementById('tout').style.backgroundColor = "#000000";
				document.getElementById('tout').style.color = "#888888";
				document.getElementById('tout').setAttribute("class","normal");
			}		

			function afficherTout(div) {
				var className=div.getAttribute("class");
				if (className != "active"){
					div.className = "active";
					div.style.backgroundColor = choisirCouleur('tout');
					div.style.color = "#ffffff";
					for (var i = 0; i<theMarkers.length; i++) {
						if (theMarkers[i].getVisible() == false) {
							theMarkers[i].setVisible(true);
						} 
					}
					for (var i = 0; i<types.length; i++) {
						var type = types[i];
						var categorie = document.getElementById(type[0]);
						if (categorie.getAttribute("class") == "normal") {
							categorie.style.backgroundColor = type[1];
							categorie.style.color = "#ffffff";
							categorie.setAttribute("class","active");
						}
					}
				}
				else{
					div.className = "normal";
					div.style.backgroundColor = "#000000";
				}				
			}


//	Fonction qui colorie le texte lorsqu'on passe la souris dessus, et qui change la taille de la police		
			
			var couleurChoisie ;
		
			function colorier(div) {
				var className = div.getAttribute("class");
				if (className != "active"){
					var typeChoisi = div.getAttribute("id");
//					choisirCouleur(typeChoisi);
					div.style.color = choisirCouleur(typeChoisi);
				} else {
					div.style.color = "#ffffff";
				}
				div.style.fontSize = "18px";
				div.style.cursor = "pointer";
			}
	
			function backtonormal(div) {
				var className = div.getAttribute("class");
				if (className != "active"){
					div.style.color="#888888";
				} else {
					div.style.color = "#ffffff";
				}
				div.style.fontSize = "16px";
				div.style.cursor = "initial";
			}
			
//	Fonction qui choisit la couleur correspondant a chaque type
			
			function choisirCouleur(typeChoisi) {
				for (var i = 0; i<types.length; i++) {
					var type = types[i];
					if (typeChoisi == type[0]) {
						return couleurChoisie = type[1];
					}
				}				
			}

//	Fonction qui choisit le marker correspondant a chaque type		

			function choisirIcone(typeChoisi) {
				for (var i = 0; i<types.length; i++) {
					var type = types[i];
					if (typeChoisi == type[0]) {
						return type[2];
					}
				}
			}
	
			function anglais() {
				document.getElementById("construction").classList.toggle("show2");
			}


	
			
			