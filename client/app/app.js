/*
 * Copyright 2015,2016 Daniel Schlager, Christian Kawalar
 *
 * This file is part of allevios.io
 *
 * allevios.io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * allevios.io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with allevios.io.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

'use strict';

angular.module('alleviosServerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'pascalprecht.translate',
  'lbServices',
  'ngLodash', 'angularWidget', 'uiSwitch', 'rzModule', 'nggaugejs', 'ngtext', 'uuid4', 'ngDragDrop', 'ngDraggable',
]).constant('SETTINGS', {
  url: '/api',
  animationsEnabled: true,
})
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, $locationProvider) {

      // German Language
      $translateProvider.translations('de_DE', {
        DASHBOARD_HEADLINE: 'Übersicht',
        APP_MAIN: 'allevios.io',
        APP_TITLE: 'allevios.io',
        APP_SUBTITLE: 'ADMIN',
        APP_SUBTITLE2: 'Socialized Internet of Things',
        APP_USER_SUBTITLE: 'HOME',
        APP_COPYRIGHT_SUB: 'ALLEVIOS ist eine eingetragene Marke von Daniel Schlager',
        APP_LOVE: 'Mit',
        APP_LOVE2: 'entwickelt in Salzburg/Österreich',
        DASHBOARD: {
          WorldConnected: 'Verbundene Things weltweit',
          SocialInfluence: 'Sozialer Einfluss',
          Chat: 'Mit allevios.io Support chatten',
          TypeMessage: 'Ihre Nachricht...',
          Email: 'Email an allevios.io',
        },
        WELCOME: {
          Register: 'Jetzt kostenlos registrieren',
        },
        WORD: {
          Home: 'Home',
          Hello: 'Hallo',
          Logout: 'Abmelden',
          Login: 'Anmelden',
          Signup: 'Registrieren',
          Things: 'Things',
          Datapoints: 'Datenpunkte',
          Admin: 'Administrator',
          Users: 'Benutzer',
          Client: 'Mandant',
          Clients: 'Mandanten',
          Systeminfo: 'Systeminfo',
          MetricsData: 'Messwerte',
          Dashboard: 'Übersicht',
          WorkflowDesigner: 'Workflow Designer',
          Category: 'Kategorie',
          ThingType: 'Art des Dings',
          EditThing: 'Bearbeiten',
          Model: 'Modell',
          Search: 'Suche',
          ToggleNavigation: 'Navigation umschalten',
          Savechanges: 'Änderungen speichern',
          RememberMe: 'Kennwort merken',
          Password: 'Kennwort',
          PasswordConfirm: 'Kennwort bestätigen',
          ForgotPassword: 'Kennwort vergessen?',
          Email: 'E-Mail',
          Add: 'Hinzufügen',
          Save: 'Speichern',
          Cancel: 'Abbrechen',
          Active: 'Aktiv',
          Project: 'Projekt',
          Projects: 'Projekte',
          Driver: 'Treiber',
          Connection: 'Verbindung',
          Connections: 'Verbindungen',
          Language: 'Sprache',
          German: 'Deutsch',
          English: 'Englisch',
          Spain: 'Spanisch',
          New: 'Neu',
          NewP: 'Neuer',
          Edit: 'Bearbeiten',
          Type: 'Typ',
          IO: 'I/O',
          Adaptor: 'Adapter',
          Port: 'Anschluss',
          Management: 'Verwaltung',
          Workflows: 'Workflows',
          clickhere: 'hier klicken',
          Attachments: 'Anhänge',
          Open: 'Öffnen',
          Shifts: 'Schaltvorgänge',
          EnergyConsumption: 'Energieverbrauch',
          SaveEnergy: 'Energiesparen',
          MoreInfo: 'Mehr Informationen...',
          Subject: 'Betreff',
          Send: 'Senden',
          Message: 'Nachricht',
          CO2kg: 'kg CO2',
          SavedTrees: 'Bäume gepflanzt',
          SavedMoney: 'Geld gespart',
          CO2Footprint: 'CO2 Fußabdruck',
          Sites: 'Standorte',
          Site: 'Standort',
          SiteType: 'Art',
          WorkflowType: 'Art',
          NoClient: 'Kein Client',
          NoProject: 'Kein Projekt',
          of: 'von',
          Name: 'Name',
          Agents: 'Agenten',
          muchmore: 'und viele mehr...',
          Filter: 'Filtern',
          Uuid: 'UUID',
          AccessToken: 'Access Token',
          Mod: 'Modul',
          Host: 'Host',
          Username: 'Benutzername',
          f1: '',
          f2: '',
          f3: '',
          Agent: 'Agent',
          Delete: 'Löschen',
          Designer: 'Designer',
          Automation: 'Automatisierung',
          Timetable: 'Zeitsteuerung',
        },
        ADMIN: {
          NameOfUser: 'Benutzername',
          Role: 'Rolle',
          Groups: 'Gruppen',
          DefaultLanguage: 'Standardsprache',
        },
        LOGIN: {
          Required: 'Bitte geben Sie Email und Kennwort ein.',
          ValidEmail: 'Bitte geben Sie eine gültige Email an.',
          Forgotpassword: 'Kennwort vergessen?',
          ConnectwithFacebook: 'Mit Facebook verbinden',
          ConnectwithGoogle: 'Mit Google+ verbinden',
          ConnectwithTwitter: 'Mit Twitter verbinden',
          Createanaccount: 'Registrieren',
        },
        SIGNUP: {
          NameRequired: 'Bitte Name eingeben.',
          ValidEmail: 'Email Adresse nicht gültig!',
          EnterEmail: 'Wie lautet Ihre Email Adresse?',
          PasswordLength: 'Kennwort muss mindestens 3 Zeichen haben.',
          SignupwithFacebook: 'Mit Facebook registrieren',
          SignupwithGoogle: 'Mit Google+ registrieren',
          SignupwithTwitter: 'Mit Twitter registrieren',
          HaveAccount: 'Sie haben bereits einen Account?',
          Terms: 'Ich akzeptiere die AGB',
        },
        FORGOTPASSWORD: {
          Instruction: 'Geben Sie einfach Ihre E-Mail Adresse ein, und wir senden Ihnen ein neues Kennwort zu.',
        },
        CLIENT: {
          NameofClient: 'Name des Mandanten',
        },
        THING: {
          NameofThing: 'Name des Thing',
        },
        DRIVER: {
          NameofDriver: 'Treibername',
        },
        DATAPOINT: {
          NameofDatapoint: 'Name des Datenpunktes',
        },
        CONNECTION: {
          NameofConnection: 'Name der Verbindung',
          Test: 'Verbindung testen'
        },
        WORKFLOW: {
          NameofWorkflow: 'Name des Workflows',
          PresenceSimulation: 'Anwesenheitssimulation',
          CustomWorkflow: 'Benutzerdefinierter Workflow',
          NodeRed: 'Node-Red Workflow',
        },
        PROJECT: {
          NameofProject: 'Projektname',
        },
        AGENT: {
          NameofAgent: 'Name des Agent',
        },
        SITE: {
          NameofSite: 'Standortname',
          Building: 'Gebäude',
          Floor: 'Stockwerk',
          Room: 'Raum',
          Blueprint: 'Plan',
          BlueprintMarker: 'Markierung im Plan',
          BlueprintX: 'X',
          BlueprintY: 'Y',
          BlueprintZ: 'Z',
          SitesName: 'Standort',
          SitesInfo: 'Standortbeschreibung',
          Geolocation: 'GPS',
          Latitude: 'Latitude',
          Longitude: 'Longitude',
        },
        SETTINGS: {
          ChangePassword: 'Kennwort ändern',
          CurrentPassword: 'Aktuelles Kennwort',
          NewPassword: 'Neues Kennwort',
          ChangeLanguage: 'Anzeigesprache ändern',
        },
        SYSTEMINFO: {
          ActiveModules: 'Aktivierte Module',
        },
        ASSISTANT: {
          NoClients: 'Es sind keine Mandanten angelegt.',
          NoProjects: 'Es sind keine Projekte vorhanden.',
          AddOne: 'Jetzt anlegen.',
          Client: 'Neuer Mandant',
          Project: 'Neues Projekt',
          Site: 'Neuer Standort',
          Thing: 'Neues Thing',
          Datapoint: 'Neuer Datenpunkt',
          Connection: 'Neue Verbindung',
          Workflow: 'Neuer Workflow',
          Agent: 'Neuer Agent',
          AssClient: 'Assistent zur Neuanlage von Mandanten',
          AssProject: 'Assistent zur Neuanlage von Projekten',
          AssSite: 'Assistent zur Neuanlage von Standorten',
          AssThing: 'Assistent zur Neuanlage von Things',
          AddAgain: 'Speichern und neu',
        },
      });

      // English Language
      $translateProvider.translations('en_US', {
        DASHBOARD_HEADLINE: 'Dashboard',
        APP_MAIN: 'allevios.io',
        APP_TITLE: 'allevios.io',
        APP_SUBTITLE: 'ADMIN',
        APP_SUBTITLE2: 'Socialized Internet of Things',
        APP_USER_SUBTITLE: 'HOME',
        APP_COPYRIGHT_SUB: 'ALLEVIOS is a registered trademark of Daniel Schlager',
        APP_LOVE: 'Made with',
        APP_LOVE2: 'in Salzburg/Austria',
        DASHBOARD: {
          WorldConnected: 'Worldwide connected Things',
          SocialInfluence: 'Social Influence',
          Chat: 'Chat with allevios.io Support',
          TypeMessage: 'Type message...',
          Email: 'Email to allevios.io',
        },
        WELCOME: {
          Register: 'Jetzt kostenlos registrieren',
        },
        WORD: {
          Home: 'Home',
          Hello: 'Hello',
          Logout: 'Logout',
          Login: 'Login',
          Signup: 'Sign up',
          Things: 'Things',
          Datapoints: 'Datapoints',
          Admin: 'Admin',
          Users: 'Users',
          Client: 'Client',
          Clients: 'Clients',
          Systeminfo: 'Systeminfo',
          Category: 'Category',
          ThingType: 'Type of Thing',
          SiteType: 'Type',
          WorkflowType: 'Type',
          EditThing: 'Edit Thing',
          Model: 'Model',
          MetricsData: 'Metrics Data',
          Dashboard: 'Dashboard',
          WorkflowDesigner: 'Workflow Designer',
          Search: 'Search',
          ToggleNavigation: 'Toggle navigation',
          Savechanges: 'Save changes',
          RememberMe: 'Remember Me',
          Password: 'Password',
          PasswordConfirm: 'Confirm Password',
          ForgotPassword: 'Forgot password?',
          Email: 'E-Mail address',
          Add: 'Add',
          New: 'New',
          NewP: 'New',
          Edit: 'Edit',
          Save: 'Save',
          Cancel: 'Cancel',
          Active: 'Active',
          Project: 'Project',
          Projects: 'Projects',
          Driver: 'Driver',
          Connection: 'Connection',
          Connections: 'Connections',
          Language: 'Language',
          German: 'German',
          English: 'English',
          Spain: 'Spain',
          Type: 'Type',
          IO: 'I/O',
          Adaptor: 'Adaptor',
          Port: 'Port',
          Management: 'Management',
          Workflows: 'Workflows',
          clickhere: 'click here',
          Attachments: 'Attachments',
          Open: 'Open',
          Shifts: 'Shifts',
          EnergyConsumption: 'Energy Consumption',
          SaveEnergy: 'Save Energy',
          MoreInfo: 'More Info...',
          Subject: 'Subject',
          Send: 'Send',
          Message: 'Message',
          CO2kg: 'kg CO2',
          SavedTrees: 'Planted Trees',
          SavedMoney: 'Saved Money',
          CO2Footprint: 'CO2 Footprint',
          Sites: 'Sites',
          Site: 'Site',
          NoClient: 'No Client',
          NoProject: 'No Project',
          of: 'of',
          Name: 'Name',
          Agents: 'Agents',
          muchmore: 'and a lot more...',
          Filter: 'Filter',
          Uuid: 'UUID',
          AccessToken: 'Access Token',
          Mod: 'Modul',
          Host: 'Host',
          Username: 'Username',
          f1: '',
          f2: '',
          f3: '',
          Agent: 'Agent',
          Delete: 'Remove',
          Designer: 'Designer',
          Automation: 'Automatisation',
          Timetable: 'Timetable',
        },
        ADMIN: {
          NameOfUser: 'Username',
          Role: 'Role',
          Groups: 'Groups',
          DefaultLanguage: 'Default Language',
        },
        LOGIN: {
          Required: 'Please enter your email and password.',
          ValidEmail: 'Please enter a valid email.',
          Forgotpassword: 'Forgot password?',
          ConnectwithFacebook: 'Connect with Facebook',
          ConnectwithGoogle: 'Connect with Google+',
          ConnectwithTwitter: 'Connect with Twitter',
          Createanaccount: 'Create an account',
        },
        SIGNUP: {
          NameRequired: 'A name is required',
          ValidEmail: 'Does not look like a valid email.',
          EnterEmail: 'What is your email address?',
          PasswordLength: 'Password must be at least 3 characters.',
          SignupwithFacebook: 'Sign up with Facebook',
          SignupwithGoogle: 'Sign up with Google+',
          SignupwithTwitter: 'Sign up with Twitter',
          HaveAccount: 'already have an account?',
          Terms: 'i agree with terms',
        },
        FORGOTPASSOWRD: {
          Instruction: 'When you fill in your registered email address, you will be sent instructions on how to reset your password.',
        },
        CLIENT: {
          NameofClient: 'Client\'s Name',
        },
        THING: {
          NameofThing: 'Name of Thing',
        },
        DRIVER: {
          NameofDriver: 'Name of Driver',
        },
        DATAPOINT: {
          NameofDatapoint: 'Name of Datapoint',
        },
        CONNECTION: {
          NameofConnection: 'Name of Connection',
          Test: 'Test Connection'
        },
        WORKFLOW: {
          NameofWorkflow: 'Name of Workflow',
          PresenceSimulation: 'Anwesenheitssimulation',
          CustomWorkflow: 'Benutzerdefinierter Workflow',
          NodeRed: 'Node-Red Workflow',
        },
        PROJECT: {
          NameofProject: 'Name of Project',
        },
        AGENT: {
          NameofAgent: 'Name of Agent',
        },
        SITE: {
          NameofSite: 'Name of Site',
          Building: 'Gebäude',
          Floor: 'Stockwerk',
          Room: 'Raum',
          Blueprint: 'Plan',
          BlueprintMarker: 'Markierung im Plan',
          BlueprintX: 'X',
          BlueprintY: 'Y',
          BlueprintZ: 'Z',
          SitesName: 'Standort',
          SitesInfo: 'Standortbeschreibung',
          Geolocation: 'GPS',
          Latitude: 'Latitude',
          Longitude: 'Longitude',
        },
        SETTINGS: {
          ChangePassword: 'Change Password',
          CurrentPassword: 'Current Password',
          NewPassword: 'New Password',
          ChangeLanguage: 'Change Display Language',
        },
        SYSTEMINFO: {
          ActiveModules: 'Active Modules',
        },
        ASSISTANT: {
          NoClients: 'You\'ve no Clients.',
          NoProjects: 'There are no Projects available.',
          AddOne: 'Let\'s add one.',
          Client: 'New Client',
          Project: 'New Project',
          Site: 'New Site',
          Thing: 'New Thing',
          Datapoint: 'New Datapoint',
          Connection: 'New Connection',
          Workflow: 'New Workflow',
          Agent: 'New Agent',
          AssClient: 'Assistent zur Neuanlage von Mandanten',
          AssProject: 'Assistent zur Neuanlage von Projekten',
          AssSite: 'Assistent zur Neuanlage von Standorten',
          AssThing: 'Assistent zur Neuanlage von Things',
          AddAgain: 'Speichern und neu',
        },
      });

      // Spanish Language
      $translateProvider.translations('es_ES', {
        DASHBOARD_HEADLINE: 'Tablero',
        APP_MAIN: 'allevios.io',
        APP_TITLE: 'allevios.io',
        APP_SUBTITLE: 'ADMIN',
        APP_USER_SUBTITLE: 'HOME',
        APP_COPYRIGHT_SUB: 'ALLEVIOS es una marca comercial registrada de Daniel Schlager.',
        APP_LOVE: 'Hecho con',
        APP_LOVE2: 'en Salzburgo / Austria.',
        DASHBOARD: {
          WorldConnected: 'Los dispositivos conectados en todo el mundo',
          Chat: 'Chatea con Soporte allevios.io',
          TypeMessage: 'Tipo de mensaje ...',
          Email: 'Correo electrónico a allevios.io',
        },
        WORD: {
          Home: 'Hogar',
          Hello: 'Hola',
          Logout: 'Cerrar Sesión',
          Login: 'Iniciar Sesión',
          Signup: 'Sign up',
          Admin: 'Admin',
          Things: 'dispositivos',
          Datapoints: 'Puntos De Datos',
          Users: 'usuario',
          Client: 'cliente',
          Systeminfo: 'Systeminfo',
          Clients: 'clientela',
          MetricsData: 'Lecturas',
          Dashboard: 'Tablero',
          WorkflowDesigner: 'Diseñador de flujo de trabajo',
          Search: 'búsqueda',
          ToggleNavigation: 'Toggle navigation',
          Savechanges: 'Save changes',
          RememberMe: 'Remember Me',
          Password: 'Password',
          PasswordConfirm: 'Confirm Password',
          ForgotPassword: 'Forgot password?',
          Email: 'E-Mail',
          Add: 'añadir',
          New: 'New',
          NewP: 'Neuer',
          Edit: 'editar',
          Save: 'Guardar',
          Cancel: 'Abbrechen',
          Active: 'activo',
          Project: 'proyecto',
          Projects: 'Proyectos',
          Driver: 'conductor',
          Connection: 'enlace',
          Connections: 'compuestos',
          Language: 'Idioma',
          German: 'Alemán',
          English: 'Inglés',
          Spain: 'Español',
          Type: 'tipo',
          IO: 'I/O',
          Adaptor: 'adaptador',
          Port: 'conexión',
          Management: 'Administración',
          Workflows: 'Flujos de trabajo',
          clickhere: 'click here',
          Attachments: 'Adjuntos',
          Open: 'abierto',
          Shifts: 'Cambios',
          EnergyConsumption: 'consumo de energía',
          SaveEnergy: 'Ahorra Energía',
          MoreInfo: 'Más Información ...',
          Subject: 'respecto',
          Send: 'enviar',
          Message: 'mensaje',
          CO2kg: 'kg CO2',
          SavedTrees: 'Árboles',
          SavedMoney: 'dinero ahorrado',
          CO2Footprint: 'huella de CO2',
          Sites: 'Standorte',
          Site: 'Standort',
          NoClient: 'Kein Client',
          NoProject: 'Kein Projekt',
          of: 'von',
          Name: 'Name',
          Agents: 'Agenten',
          muchmore: 'und viele mehr...',
          Filter: 'Filtern',
          Uuid: 'UUID',
          AccessToken: 'Access Token',
          Mod: 'Modul',
          Host: 'Host',
          Username: 'Benutzername',
          f1: '',
          f2: '',
          f3: '',
          Agent: 'Agent',
          Delete: 'Löschen',
          Designer: 'Designer',
          Automation: 'Automatisierung',
          Timetable: 'Zeitsteuerung',
        },
        ADMIN: {
          NameOfUser: 'Benutzername',
          Role: 'Rolle',
          Groups: 'Gruppen',
          DefaultLanguage: 'Standardsprache',
        },
        LOGIN: {
          Required: 'Please enter your email and password.',
          ValidEmail: 'Please enter a valid email.',
          Forgotpassword: 'Forgot password?',
          ConnectwithFacebook: 'Connect with Facebook',
          ConnectwithGoogle: 'Connect with Google+',
          ConnectwithTwitter: 'Connect with Twitter',
          Createanaccount: 'Create an account',
        },
        SIGNUP: {
          NameRequired: 'A name is required',
          ValidEmail: 'Does not look like a valid email.',
          EnterEmail: 'What is your email address?',
          PasswordLength: 'Password must be at least 3 characters.',
          SignupwithFacebook: 'Sign up with Facebook',
          SignupwithGoogle: 'Sign up with Google+',
          SignupwithTwitter: 'Sign up with Twitter',
          HaveAccount: 'already have an account?',
          Terms: 'i agree with terms',
        },
        FORGOTPASSWORD: {
          Instruction: 'When you fill in your registered email address, you will be sent instructions on how to reset your password.',
        },
        CLIENT: {
          NameofClient: 'Client\'s Name',
        },
        THING: {
          NameofThing: 'Name of Thing',
        },
        DRIVER: {
          NameofDriver: 'Name of Driver',
        },
        DATAPOINT: {
          NameofDatapoint: 'Name of Datapoint',
        },
        CONNECTION: {
          NameofConnection: 'Name of Connection',
        },
        WORKFLOW: {
          NameofWorkflow: 'Name of Workflow',
        },
        PROJECT: {
          NameofProject: 'Name of Project',
        },
        AGENT: {
          NameofAgent: 'Name des Agent',
        },
        SITE: {
          NameofSite: 'Name of Site',
          Building: 'Gebäude',
          Floor: 'Stockwerk',
          Room: 'Raum',
          Blueprint: 'Plan',
          BlueprintMarker: 'Markierung im Plan',
          BlueprintX: 'X',
          BlueprintY: 'Y',
          BlueprintZ: 'Z',
          SitesName: 'Standort',
          SitesInfo: 'Standortbeschreibung',
          Geolocation: 'GPS',
          Latitude: 'Latitude',
          Longitude: 'Longitude',
        },
        SETTINGS: {
          ChangePassword: 'Change Password',
          CurrentPassword: 'Current Password',
          NewPassword: 'New Password',
          ChangeLanguage: 'Change Display Language',
        },
        SYSTEMINFO: {
          ActiveModules: 'Aktivierte Module',
        },
        ASSISTANT: {
          NoClients: 'Es sind keine Mandanten angelegt.',
          NoProjects: 'Es sind keine Projekte vorhanden.',
          AddOne: 'Jetzt einen anlegen.',
          Client: 'Neuer Mandant',
          Project: 'Neues Projekt',
          Site: 'Neuer Standort',
          Thing: 'Neues Gerät',
          Datapoint: 'Neuer Datenpunkt',
          Connection: 'Neue Verbindung',
          Workflow: 'Neuer Workflow',
          Agent: 'Neuer Agent',
          AssClient: 'Assistent zur Neuanlage von Mandanten',
          AssProject: 'Assistent zur Neuanlage von Projekten',
          AssSite: 'Assistent zur Neuanlage von Standorten',
          AssThing: 'Assistent zur Neuanlage von Geräten',
          AddAgain: 'Speichern und neu',
        },
      });

      $translateProvider.useSanitizeValueStrategy('escape');

      $translateProvider.determinePreferredLanguage();
      $translateProvider.fallbackLanguage('en_US');
      //$translateProvider.preferredLanguage('en_US');

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode({
        enabled: false,
        requireBase: false,
      });

      //$httpProvider.interceptors.push('authInterceptor');
      $httpProvider.interceptors.push('modalInterceptor');
      $httpProvider.interceptors.push('errInterceptor');

    }).config(function($stateProvider) {

      $stateProvider
          .state('welcome', {
            url: '/',
            templateUrl: 'app/welcome/welcome.html',
            controller: 'WelcomeCtrl',
            data: {
              requireLogin: false,
            },
          })
            .state('login', {
              url: '/login',
              templateUrl: 'app/account/login/login.html',
              controller: 'LoginCtrl',
              data: {
                requireLogin: false,
              },
            })
            .state('signup', {
              url: '/signup',
              templateUrl: 'app/account/signup/signup.html',
              controller: 'SignupCtrl',
              data: {
                requireLogin: false,
              },
            }).state('forgotpassword', {
              url: '/forgotpassword',
              templateUrl: 'app/account/forgotpassword/forgotpassword.html',
              controller: 'ForgotPasswordCtrl',
              data: {
                requireLogin: false,
              },
            })
            .state('main', {
              url: '/main',
              templateUrl: 'app/main/main.html',
              controller: 'MainCtrl',
              authenticate: true,
              data: {
                requireLogin: true,
              },
            }).state('main.dashboard', {
              url: 'dashboard',
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'DashboardCtrl',
              authenticate: true,
              data: {
                requireLogin: true,
              },
            })
            .state('main.settings', {
              url: '/settings',
              templateUrl: 'app/account/settings/settings.html',
              controller: 'SettingsCtrl',
              authenticate: true,
              data: {
                requireLogin: true,
              },
            })
            .state('main.agent', {
              url: '/admin/agent',
              templateUrl: 'app/admin/agent/agent.html',
              controller: 'AgentCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.assistantproject', {
              url: '/admin/assistant/project',
              templateUrl: 'app/admin/assistant/assistant.html',
              controller: 'AssistantCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.client', {
              url: '/admin/client',
              templateUrl: 'app/admin/client/client.html',
              controller: 'ClientCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.connection', {
              url: '/admin/connection',
              templateUrl: 'app/admin/connection/connection.html',
              controller: 'ConnectionCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.datapoint', {
              url: '/admin/datapoint',
              templateUrl: 'app/admin/datapoint/datapoint.html',
              controller: 'DatapointCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.thing', {
              url: '/admin/thing',
              templateUrl: 'app/admin/thing/thing.html',
              controller: 'ThingCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.driver', {
              url: '/admin/driver',
              templateUrl: 'app/admin/driver/driver.html',
              controller: 'DriverCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.project', {
              url: '/admin/project',
              templateUrl: 'app/admin/project/project.html',
              controller: 'ProjectCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.site', {
              url: '/admin/site',
              templateUrl: 'app/admin/site/site.html',
              controller: 'SiteCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.systeminfo', {
              url: '/admin/systeminfo',
              templateUrl: 'app/admin/systeminfo/systeminfo.html',
              controller: 'SysteminfoCtrl',
              data: {
                requireLogin: true,
              },
            }).state('main.workflow', {
              url: '/admin/workflow',
              templateUrl: 'app/admin/workflow/workflow.html',
              controller: 'WorkflowCtrl',
              data: {
                requireLogin: true,
              },
            })
            .state('main.workflowdesigner', {
              url: '/admin/workflowdesigner',
              templateUrl: 'app/admin/workflowdesigner/workflowdesigner.html',
              controller: 'WorkflowdesignerCtrl',
              data: {
                requireLogin: true,
              },
            });
    })

.factory('errInterceptor', function($q, $injector) {
  return {
    responseError: function(response) {
      if (response.status === 401) {

      } else {
        $injector.get('$uibModal').open({
          template: '<h4>$http error!</h4>',
        });
        // return $q.reject(response);
      }

    },
  };
})
    .factory('authInterceptor', function($rootScope, $q, $cookieStore, $injector) {
      // var $state = $injector.get('$state');
      return {
        // Add authorization token to headers
        request: function(config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = '' + $cookieStore.get('token');
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
          if (response.status === 401) {
            var $state = $injector.get('$state');
            $state.go('login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          } else {
            return $q.reject(response);
          }
        },
      };
    })
    .factory('modalInterceptor', function($timeout, $q, $cookieStore, $injector) {
      var loginModal, $http, $state;

      $timeout(function() {
        loginModal = $injector.get('loginModal');
        $http = $injector.get('$http');
        $state = $injector.get('$state');
      });

      return {
        // Add authorization token to headers
        request: function(config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = '' + $cookieStore.get('token');
          }
          return config;
        },

        responseError: function(rejection) {
          if (rejection.status !== 401) {
            return rejection;
          }

          var deferred = $q.defer();

          loginModal().then(function() {
            deferred.resolve($http(rejection.config));
          })
                    .catch(function() {
                      $state.go('welcome');
                      deferred.reject(rejection);
                    });

          return deferred.promise;

        },
      };

    })
    .run(function($rootScope, Auth, $state, loginModal) {

      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        /* Auth.isLoggedInAsync(function(loggedIn) {
          if (toState.authenticate && !loggedIn) {
            event.preventDefault();
            $state.go('login');
          }
        }); */

        var requireLogin = toState.data.requireLogin;

        if (requireLogin && typeof Auth.getCurrentUser() === 'undefined') {
          event.preventDefault();

          loginModal().then(function() {
            return $state.go(toState.name, toParams);
          })
                    .catch(function() {
                      return $state.go('welcome');
                    });

        }

      });
    });

//Function for unsubscribing..
var unSubscribeAll = function(PubSub) {
  //Unsubscribe all listeners..
  PubSub.unSubscribeAll();
};
