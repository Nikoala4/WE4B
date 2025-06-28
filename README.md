# Nooble

Ce document vous permet de pouvoir installer ce projet Angular, ainsi que l'api à laquelle il est lié, et la base de données qui correspond. 

## 1. Dépendances 

### 1.1 Dépendances du site angular
Ce projet nécessite les paquets suivants: 
 - npm
 - @angular/cli (de npm)

Les autres sous-paquets suivants pourront être installés avec la commande `npm install`:
 - @angular/animations
 - @lodash

### 1.2 Dépendances de l'API

L'api nécessite d'avoir : 
 - `python3.11+` installé avec pip à jour
 - une base de données MongoDB active
 - éventuellement, un serveur SMTP configurable. Sans serveur SMTP, il sera impossible d'envoyer des mails, et donc du même coup de recevoir son mot de passe pour la première connexion. 

**Attention : l'api ne fonctionnera pas avec une version de python3 inférieure à python3.11!**

## 2. Installer l'api

### 2.1 Téléchargement

Commencez par install l'API depuis son [lien github](https://github.com/Kaki-In/nooble-apiarist):

Sur Linux, ouvrez un terminal (`CTRL+MAJ+T`) et placez-vous dans le dossier dans lequel vous voulez placer l'API:

```sh
$ cd .../ # lien vers le dossier
$ git clone https://github.com/Kaki-In/nooble-apiarist
```

Dans tous les cas, vous pouvez aussi [télécharger le fichier .zip](https://github.com/Kaki-In/nooble-apiarist/archive/refs/heads/master.zip) et l'
extraire dans le dossier voulu. 

### 2.2 Installation

Pour installer l'api, lancez simplement le fichier `install.py` dans un terminal. 

Si l'installation échoue avec le message d'erreur "`--break-system-package: invalid argument`", assurez-vous d'avoir pip à jour avec la commande suivante : 
```sh
$ python -m pip install --upgrade pip
```

Le module `pyvips` permet d'améliorer les performances de traitement d'images et pourrait ne pas être installé sous Windows. L'absence de ce module n'impactera l'API qu'en termes de performance. Cependant, assurez-vous dans ce cas que le module Pillow a pu être installé avec succès. 


### 2.3 Configuration

Après installation, votre configuration se trouvera dans le dossier suivant : 

Sous windows:
```
C:\\Users\[nom d'utilisateur]\.nooble
```

Sous linux:
```
/home/[nom d'utilisateur]/.nooble
```


Vous y trouverez les fichiers suivants : 
 1. `database.conf`: configuration de la base de données
 2. `endpoint.conf`: configuration de l'api
 3. `mail.conf`: configuration de la connexion au serveur SMP, et de l'envoi de mails
 4. `resources_manager.conf`: configuration du gestionnaire de ressources. 
 5. `templates`: les patrons à appliquer
    1. `templates/mail`: les patrons à appliquer aux mails
 6. `uploaded` (une fois une ressources chargée sur le serveur): les ressources du serveur. 

Si vous disposez d'une archive "uploaded" fourni avec ce devoir, placez son contenu dans le dossier `uploaded` du dossier de configuration. Assurez-vous de ne pas avoir un sous-dossier unique nommé `uploaded` dans ce dossier : les sous-dossiers de `[HOME]/.nooble/uploaded/` doivent correspondre à des dates. 

#### 2.3.1 Configuration de la base de données

Le fichier par défaut de la base de données est celui qui suit:

```json
{
    "host": "localhost",
    "port": 27017,
    "dbname": "nooble-we4b-si40-sy43",
    "rules": {
        "default_users_nooblards": 20
    },
    "tables": {
        "accounts": "accounts",
        "activities": "activities",
        "classes": "classes",
        "decorations": "decorations",
        "files": "files"
    }
}
```
- `host`: l'hôte de la base de données mongodb
- `port`: le port de la base de données mongodb
- `dbname`: le nom de la base de données
- `rules`: les règles à appliquer
    - `default_users_nooblards`: le quota par défaut d'un utilisateur
- `tables`: le nom des collections dans la base de données

#### 2.3.2 Configuration de l'API

Le fichier par défaut de l'API est celui qui suit:

```json
{
    "binding": {
        "host": "0.0.0.0",
        "host_url": "http://localhost:8622",
        "cookies_domain": null,
        "port": 8622,
        "public_key_file": null,
        "private_key_file": null,
        "use_ssl": false
    },
    "registrations": {
        "token_duration_minutes": 1440,
        "tokens_size": 256
    }
}
```

- `binding`: les paramètres d'écoute de l'API
    - `host`: l'hôte d'écoute de l'API (`localhost` pour rester en local)
    - `host_url`: l'url de l'API
    - `cookies_domain`: le [domaine de cookies](https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Cookies#attribut_domain) de l'API. 
    - `port`: le port d'écoute de l'API
    - `public_key_file`: si `use_ssl` vaut `true`, le chemin d'accès vers le fichier de clé publique
    - `private_key_file`: si `use_ssl` vaut `true`, le chemin d'accès vers le fichier de certificat
    - `use_ssl`: vrai s'il faut utiliser SSL. 
- `registrations`: configuration des jetons de connexion
    - `token_duration_minutes`: durée de validité des jetons, en minutes 
    - `tokens_size`: taille des jetons générés. 

#### 2.3.3 Configuration du serveur SMTP

**L'API ne fait pas office de serveur SMTP. Sans cette configuration, il vous sera totalement impossible de recevoir les mails contenant votre mot de passe, lequel est hashé dans la base de données**

Le fichier par défaut du serveur SMTP est celui qui suit:

```json
{
    "identity": {
        "address": "no-reply@nooble.flopcreation.fr",
        "name": "Angular Nooble",
        "website": "https://nooble-angular.flopcreation.fr"
    },
    "smtp": {
        "smtp_host": "gmail.com",
        "smtp_password": "any",
        "smtp_port": 587,
        "smtp_username": "your.email@gmail.com",
        "uses_ssl": true,
        "uses_starttls": false
    }
}
```

- `identity`: identité du serveur, affichée dans l'envoi des mails
    - `address`: l'adresse mail de l'expéditeur
    - `name`: le nom de l'expéditeur
    - `website`: l'url vers le site web Nooble
- `smtp`: paramètres de connexion au serveur SMTP
    - `smtp_host`: l'hôte SMTP 
    - `smtp_password`: le mot de passe pour s'authentifier auprès de l'hôte
    - `smtp_port`: le port de connexion SMTP
    - `smtp_username`: le nom d'utilisateur pour s'authentifier auprès de l'hôte
    - `uses_ssl`: vrai s'il faut utiliser SSL pour la connexion
    - `uses_starttls`: vrai s'il faut utiliser Start TLS pour la connexion. 



#### 2.3.4 Configuration du gestionnaire de ressources

Le fichier de configuration par défaut du gestionnaire de ressources est celui qui suit:

```json
{
    "base_directory": "[HOME]/.nooble/uploaded",
    "random_filenames_length": 5
}
```

- `base_directory`: dossier contenant les élément uploadés vers le serveur et le fichiers d'activité
- `random_filenames_length`: longueur des noms de fichier générés. 

### 2.4 Démarrage de l'API

Une fois la configuration effectuée, il vous suffira de lancer l'API en démarrant le fichier `main.py`. 

## 3. Installer le projet Angular

Pour installer le projet angular, veuillez suivre les étapes suivantes : 
 - installez les dépendances avec `npm install`
 - configurez la connexion avec l'API dans le fichier `src/app/app.config.ts`

 ```javascript
    { 
      provide: API_ENDPOINT,
      useValue: 'http://localhost:8622' // <- entrez le lien vers l'API ici
    },
```

 - démarrez Angular avec `ng serve`

***Il est extrêmement conseillé d'utiliser une version Angular récente (créé sous Angular 19) et une version node paire.***


## 4. Notes finales

Il est à noter que : 
 - très peu de serveurs SMTP sont fonctionnels sans utiliser OAuth2, et la plupart des serveurs tels que GMail, Orange, etc... risquent de bloquer certains des mails envoyés. Si vous n'arrivez pas à créer un compte faute de mails non reçus, il vous suffira d'encoder le mot de passe en sha256 et de l'appliquer directement dans la base de données. 
 - vous pourriez voir ce message en lançant l'API : 
```
Warning: could not use the pyvips package because of the following error: <une erreur>
We will use the PIL library, that could be slow. Sorry for that issue. Please install the libvips module, and the libvips42 package. 
```
   Ce message n'indique pas une défaillance de l'API. 
 - l'api a un timeout de 20 secondes lorsqu'elle se connecte à la base de données. Si elle semble prendre beaucoup de temps à répondre, veuillez vérifier les paramètres de la base de données. 
 - il n'y a pas besoin de relancer l'API après avoir effectué des modifications dans le dossier de configuration 
 - il n'est pas possible de déplacer le dossier de configuration, mais il est possible de déplacer le dossier de ressources. 


Nous espérons que l'installation s'est bien passée et vous souhaitons une agréable journée! 
