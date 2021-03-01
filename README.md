# FishEye - Jan 2021

Code source du **Projet 6** - **_Créez un site accessible pour une plateforme de photographes_** du parcours **Développeur Front-end** d'_OpenClassrooms_.

## Page de démonstration

Le rendu de ce code est accessible sur cette [GitHub Page dédiée](https://logic-fabric.github.io/LoicMangin_6_29012021/).

## Structure du projet

Ce projet a été conçu selon une **approche Orientée Objet**, approche caractérisée par un découpage en classes.

### Données JSON

- Pour **manipuler les données**, celles-ci sont représentées par des objets `Photographer`et `Medium`, regroupés ensuite dans des `PhotographersList`et `MediaList`.
- Le projet dispose ainsi, en quelque sorte, d'instances d'`Object`et de `Array` "spécialisées", auxquelles associer les **méthodes concernant ces données** : 
	- pour les ordonner par nom, date, ...
	- pour les filtrer (en fonction d'un `id`, d'un `tag`, ...)
	- pour ajouter une propriété `title` à chaque `Medium` (à partir du fichier lui étant associé)
	- etc.

![Diagramme de classes (données)](./doc/data-classes-diagram.png)

### Architecture

- Une classe `DataFetcher`permet de **récupérer, de manière asynchrone, les données**.
- Une classe `Router` **initie et "orchestre" l'éxécution du code** :
	- traite en asynchrone ces données (récupérée avec un `DataFetcher`), pour en faire des instances de `Photographer` et `Medium` et les regrouper dans une `PhotographerList` et une `MediaList` ;
	- demande la construction de la page d'accueil "dans la foulée" ;
	- "écoute" ensuite la route actuelle, définie par le *hash* de l'URL, et "actionne" la reconstruction de la page à chaque changement de ce *hash*.
- La demande de (re)construction est envoyée à une classe `Pagefactory`qui **détermine s'il s'agit de construire une "page accueil" ou une "page photographe"**.
- Deux "classes atelier" `HomePageBuilder`et`PhotographerPageBuilder`se chargent de **construire le HTML** de chaque type de page, de **l'injecter dans `ìndex.html`** et d'y **ajouter les `EventListeners`nécessaires**.
- Ces deux classes ateliers utilisent de leur côté des "classes composants" (`Button`, `PhotographerCard, `...)  chargées chacune de construire le **HTML des composants UI** nécessaires.
- **TO DO: _Factory construisant le composant photo ou vidéo à inclure dans la modale media, avec les deux "classes atelier" associées_**
- **TO DO: _classe gérant la modale du formulaire de contact_**


![Diagramme de classes (architecture)](./doc/architectural-classes-diagram.png)