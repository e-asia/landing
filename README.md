# Informations générales

Ce projet a démarré sur **Drupal 8.5.3**.

La base de projet provient du zip de drupal.org et n'utilise donc pas le template composer de drupal-project. Ce choix technique vient du fait que nous souhaitons avoir un dossier vendor classique, à la racine du site, et non pas en dehors.

Pour atteindre un niveau semblable de fonctionnalités que le template drupal-project, notamment sur le bon placement des dépendances (modules, bibliothèques), des bibliothèques ont été ajoutées :
* `cweagans/composer-patches`: ajoute la fonctionnalité de patch via composer.json (extra patches),
* `oomphinc/composer-installers-extender`: ajoute des fonctionnalités sur le placement des paquets et bibliothèques non drupal. On peut ainsi avoir des paquets de packagist placées dans le dossier **/libraries**,

## Définitions

Le **backup sql** est un dump de base de données.

Le **zip de files** est une archive zip contenant les fichiers inscriptibles tels que les images et documents.

Le **backup sql** et le **zip de filtes** vont généralement de pair ; ils sont normalement créés en même temps afin de garantir au maximum un état consistant du site.

# Initialisation d'une instance déployée sur serveur

## Information préalable

* Les instructions sont susceptibles de changer au cours du développement. Par exemple, les branches changeront en fonction de l'avancée du travail pour passer de **preprod** à **master**.
* Les sorties (output) de console indiqués dans ce tutoriel sont en anglais, mais si le serveur est en français, les sorties peuvent être traduites. Cela n'a pas d'incidence sur le fonctionnement.

## Requis

1. Git.

## Ressources

* **Backups sql** et **zip de files** disponibles sur demande à émérya.

## Pas à pas

1. Dans le dossier racine du site (il doit être vide), cloner le projet :
    ```
    git clone -b preprod https://gitlab.com/Emerya/lnemetrology.git .

    ```
1. Lancer la commande `git status`. Voici ce que la console devrait indiquer (pour une branche preprod) :
    ```
    λ git status
    On branch preprod
    Your branch is up to date with 'origin/preprod'.
    
    nothing to commit, working tree clean
    ```
1. Récupérer un **zip de files**.
1. Extraire le contenu de ce **zip de files** dans l'emplacement suivant : **RACINE/src/htdocs/sites/default/files**. Le dossier files doit contenir des dossiers **css**, **js**, **media**, etc. et un fichier **.htaccess**. La commande `unzip` peut être utilisée à cette fin sur la plupart des serveurs linux :
    ```
    unzip NOM_DU_FICHIER.zip
    ```
1. Vérifier les permissions sur tout le contenu de ce dossier **RACINE/src/htdocs/sites/default/files**. L'utilisateur serveur (par exemple **www-data** sur une configuration par défaut d'apache2) doit posséder et avoir les droits `rwx` sur tous les dossiers et fichiers. Vous pouvez par exemple exécuter la commande suivante dans ce dossier files :
    ```
    chown -R GROUPE:UTILISATEUR .
    chmod u+rwx -R .
    ```
1. Créer la base de données ainsi que l'utilisateur que le site utilisera.
1. Récupérer le **backup sql** correspondant au zip (même date idéalement) dans le dossier **RACINE/src**.
1. Utilisez n'importe quelle méthode pour importer le **backup sql** dans la base de données qui sera utilisée (via phpMyAdmin ou en ligne de commande). En ligne de commande, on peut en général utiliser la commande suivante :
    ```
    mysql -u UTILISATEUR -p NOM_BASE_DE_DONNEES < NOM_DU_FICHIER.sql
    ```
1. Aller dans le dossier **RACINE/src/htdocs**.
1. Lancer la commande suivante afin d'installer la base de code :
    ```
    ../bin/composer install
    ```
    > Des messages type *is not autoloadable, can not call post-package-install script* peuvent apparaître après chaque dépendance. Ce message disparaît après l'installation du paquet `drupal/core`. Cette commande utilise un composer embarqué avec le projet
1. Aller dans le dossier **RACINE/src/htdocs/sites/default**.
1. Créer le fichier **settings.local.php**.
1. Dans ce fichier, insérer le script suivant en remplaçant autant que nécessaire :
    ```php
    <?php

    // @codingStandardsIgnoreFile

    $settings['lnemetrology__current_environment'] = ENVIRONMENT_PREPROD;

    $databases['default']['default'] = [
      'database' => 'NOM_BASE_DE_DONNEES',
      'username' => 'NOM_UTILISATEUR_MYSQL',
      'password' => 'MOT_DE_PASSE',
      'prefix' => '',
      'host' => 'mysql',
      'port' => '3306',
      'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
      'driver' => 'mysql',
    ];
    ```
    > Se référer à la section sur le settings local plus bas pour des informations à propos de ce fichier.
1. Aller dans le dossier **RACINE/src/htdocs**.
1. Tester les commandes `drush` :
    ```
    ./vendor/bin/drush
    ./vendor/bin/drush cr
    ./vendor/bin/drush cim
    ./vendor/bin/drush updb
    ```
    > Si vous avez des erreurs d'interprétation de type `PHP Parse error: syntax error`, `drush` appelle vraisemblablement PHP 5 au lieu de PHP 7. L'essentiel de la manipulation pour corriger ce problème est de définir PHP 7 comme php par défaut via `update-alternatives`, et si ce n'est pas possible, on peut créer un lien symbolique nommé *php* et menant vers l'exécutable php7.x puis insérer au début de la variable d'environnement `$PATH` le chemin absolu vers ce lien symbolique.
1. Configurer le vhost du serveur (ou toute autre méthode utilisée sur le serveur) sur la racine accessible : **RACINE/src/htdocs**.
1. Dans le navigateur, aller sur l'adresse du site.
    > Le site devrait apparaître sans encombre.

# Initialisation d'une instance de développement

## Requis

1. Git.
1. Docker.

## Ressources

* Fichier **.env** disponible sur le cloud émérya sous le nom de **docker.env**.
* **Backups sql** et **zip de files** disponibles sur le cloud émérya.

## Pas à pas

1. Cloner le projet en local.
1. Aller dans le dossier **RACINE/docker-devbox**.
1. Coller le fichier **.env** dans ce dossier.
1. Extraire le contenu d'un **zip de files** dans l'emplacement suivant : **RACINE/src/htdocs/sites/default/files**.
1. Coller le **backup sql** correspondant au zip (même date) dans le dossier **RACINE/src**.
1. Dans un terminal, lancer la commande suivante :
    ```
    docker-compose up -d

    ```
1. Entrer dans une session bash dans le container lnemetrology_web_1 grâce à la commande suivante :
    ```
    docker exec -it lnemetrology_web_1 /bin/bash

    ```
1. Lancer la commande suivante pour éditer le fichier **~/.bashrc** :
    ```
    nano ~/.bashrc

    ```
1. Dans ce fichier, éditer la ligne contenant l'alias de drush comme suit afin de ne pas utiliser le drush global :
    ```
    alias drush='sudo -u www-data /var/www/html/htdocs/vendor/bin/drush'

    ```
1. Fermer la session bash :
    ```
    exit

    ```
1. Relancer la session bash :
    ```
    docker exec -it lnemetrology_web_1 /bin/bash

    ```
1. Lancer la commande suivante afin d'importer la base de données (remplacer *NOM_DU_FICHIER* par le nom du fichier sql que vous avez sélectionné précédemment) :
    ```
    mysql -u lnemetrology_user -pmysqlpwd -hdatabase lnemetrology < NOM_DU_FICHIER.sql

    ```
1. Aller dans le dossier **/var/www/html/htdocs**.
1. Lancer la commande suivante afin d'installer la base de code :
    ```
    composer install
    
    ```
    > Des messages type *is not autoloadable, can not call post-package-install script* peuvent apparaître après chaque dépendance. Ce message disparaît après l'installation du paquet `drupal/core`.
1. Dans le navigateur, aller sur http://localhost.
    > Le site devrait apparaître sans encombre.

# Configurations supplémentaires

## Settings local

Il est possible d'utiliser un fichier **settings.local.php** qui n'est pas versionné à placer dans **sites/default**.

Ce fichier permet de spécifier l'environnement de l'instance.

Par exemple, dans le fichier **settings.local.php** présent sur le cloud émérya :

```php
<?php

// @codingStandardsIgnoreFile

$settings['lnemetrology__current_environment'] = ENVIRONMENT_DEV;
```

Les constantes `ENVIRONMENT_DEV`, `ENVIRONMENT_PREPROD` et `ENVIRONMENT_PROD` sont présentes dans le fichier **settings.php** principal.

Cela permet ensuite au fichier **settings.php** de charger des fichiers de settings spécifiques à un environnement. Par exemple, **settings.dev.php** ou **settings.preprod.php** selon la valeur de `$settings['lnemetrology__current_environment']`.

Par défaut, l'environnement est défini à `ENVIRONMENT_DEV`.

On a ce système afin d'avoir des settings d'environnement qui sont versionnés en plus d'avoir la possibilité d'un settings local non versionné, qui pourrait contenir par exemple les identifiants de BDD de prod (qui ne sont pas à versionner, évidemment) ou bien pour avoir des paramétrages de SMTP et d'envoi de mail différents selon les installations.

# Mise à jour d'une instance

Il existe plusieurs scénarios de mise à jour. Ci-dessous, voici un scénario possible :

1. Mettre le site en maintenance / le rendre inaccessible (redirection temporaire sur page de maintenance par exemple).
1. Reconstruire le cache avec `./vendor/bin/drush cr`. Le faire ici permet d'avoir des backups plus légers.
1. Faire un backup du site : base de données + fichiers.
1. Mettre à jour la base du site avec `git pull`.
1. Installer / synchroniser les dépendances de code avec `../bin/composer install`.
1. Rafraîchir la base de données en fonction de la nouvelle base de code avec `./vendor/bin/drush updb`.
1. Importer les nouvelles configurations `./vendor/bin/drush cim`.
1. Sortir le site de la maintenance / le rendre accessible à nouveau.

Le processus peut être automatisé via un script et en ajoutant le flag `-y` aux commandes `drush`, mais dans des cas très précis, il faut tout de même porter une attention sur les sorties de console qui peuvent bloquer un déploiement.

Comme cas particulier de mise à jour, on a par exemple la situation où une configuration est censée désinstaller un module. Ce cas implique que le module doit d'abord être désinstallé avant que `composer` ne retire la base de code de ce module. Sinon, le module ne pourra pas être désinstallé car la désinstallation nécessite la présence de la base de code du module.

# Outils

## PHPStorm

Configurer PHPStorm pour utiliser PHP Code Sniffer avec le sniff Drupal. Ne pas envoyer de code mal formaté.

## Backups

Sur Linux, le script est à créer / adapter si nécessaire.

Depuis Windows, on peut faire des backups BDD + files facilement grâce à un script sh placé dans **RACINE/src**. Par exemple, en utilisant cmder sur Windows :
```
bash createbackup.sh
```

Ce script générera les fichiers sql et zip dans le dossier **RACINE/src/backup**.
