import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Menu, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    niveau_diplome: '',
    diplome_reconnu: false,
    experience_travail: '',
    connaissance_canada: false,
    deja_venu_canada: false,
    langue_parlee: '',
    id_paiement: '',
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;

      setFormStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès!'
      });

      // Reset form
      setFormData({
        email: '',
        niveau_diplome: '',
        diplome_reconnu: false,
        experience_travail: '',
        connaissance_canada: false,
        deja_venu_canada: false,
        langue_parlee: '',
        id_paiement: '',
      });

    } catch (error) {
      console.error('Error:', error);
      setFormStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer.'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle boolean values for select elements
    const finalValue = type === 'select-one' && (value === 'true' || value === 'false') 
      ? value === 'true'
      : value;

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const navigationItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'procedures', label: 'Procédures' },
    { id: 'eligibilite', label: 'Éligibilité' },
    { id: 'conseils', label: 'Conseils' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
    { id: 'ressources', label: 'Ressources' }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContactForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formStatus.type && (
        <div className={`p-4 rounded-md ${
          formStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <div className="flex items-center">
            {formStatus.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <p>{formStatus.message}</p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label htmlFor="niveau_diplome" className="block text-sm font-medium text-gray-700 mb-1">
          Niveau du dernier diplôme obtenu
        </label>
        <select
          id="niveau_diplome"
          name="niveau_diplome"
          value={formData.niveau_diplome}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Sélectionnez un niveau</option>
          <option value="bac">Baccalauréat</option>
          <option value="licence">Licence</option>
          <option value="master">Master</option>
          <option value="doctorat">Doctorat</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="diplome_reconnu" className="block text-sm font-medium text-gray-700 mb-1">
          Est-ce que votre diplôme a été émis ou est reconnu par le gouvernement ?
        </label>
        <select
          id="diplome_reconnu"
          name="diplome_reconnu"
          value={formData.diplome_reconnu.toString()}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Sélectionnez une option</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience_travail" className="block text-sm font-medium text-gray-700 mb-1">
          Expérience de travail à temps plein durant les 6 dernières années
        </label>
        <select
          id="experience_travail"
          name="experience_travail"
          value={formData.experience_travail}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Sélectionnez une durée</option>
          <option value="0">Aucune expérience</option>
          <option value="1-2">1-2 ans</option>
          <option value="3-4">3-4 ans</option>
          <option value="5-6">5-6 ans</option>
          <option value="6+">Plus de 6 ans</option>
        </select>
      </div>

      <div>
        <label htmlFor="connaissance_canada" className="block text-sm font-medium text-gray-700 mb-1">
          Connaissez-vous quelqu'un qui habite au Canada ?
        </label>
        <select
          id="connaissance_canada"
          name="connaissance_canada"
          value={formData.connaissance_canada.toString()}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Sélectionnez une option</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>

      <div>
        <label htmlFor="deja_venu_canada" className="block text-sm font-medium text-gray-700 mb-1">
          Êtes-vous déjà venu au Canada ?
        </label>
        <select
          id="deja_venu_canada"
          name="deja_venu_canada"
          value={formData.deja_venu_canada.toString()}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Sélectionnez une option</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>

      <div>
        <label htmlFor="langue_parlee" className="block text-sm font-medium text-gray-700 mb-1">
          Langue parlée
        </label>
        <input
          type="text"
          id="langue_parlee"
          name="langue_parlee"
          value={formData.langue_parlee}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label htmlFor="id_paiement" className="block text-sm font-medium text-gray-700 mb-1">
          ID de paiement
        </label>
        <input
          type="text"
          id="id_paiement"
          name="id_paiement"
          value={formData.id_paiement}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
      >
        Envoyer
      </button>
    </form>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'contact':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Nos Coordonnées</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3" />
                    Montréal, QC, Canada
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    +2250586682267
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    contact@visaguide.ca
                  </p>
                </div>
              </div>
              <div>
                {renderContactForm()}
              </div>
            </div>
          </div>
        );

      case 'procedures':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Procédures de Demande de Visa</h2>
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Choisir le type de visa",
                  description: "Détermine quel type de visa convient à ta situation (visa de travail, d'études, de visite, etc.). Chaque type a des exigences et des processus différents.",
                  items: []
                },
                {
                  step: 2,
                  title: "Vérifier l'éligibilité",
                  description: "Consulte les critères d'éligibilité pour le visa choisi. Cela peut inclure des exigences de formation, d'expérience professionnelle, ou de fonds disponibles.",
                  items: []
                },
                {
                  step: 3,
                  title: "Rassembler les documents nécessaires",
                  description: "Prépare tous les documents requis pour ta demande.",
                  items: [
                    "Passeport valide",
                    "Photos d'identité conformes aux spécifications",
                    "Preuves de fonds (relevés bancaires, lettres de soutien)",
                    "Certificats de travail ou diplômes",
                    "Lettre d'invitation (si applicable)"
                  ]
                },
                {
                  step: 4,
                  title: "Remplir le formulaire de demande",
                  description: "Télécharge le formulaire de demande correspondant à ton type de visa depuis le site officiel de l'immigration canadienne. Remplis-le soigneusement, en suivant les instructions.",
                  items: []
                },
                {
                  step: 5,
                  title: "Payer les frais de demande",
                  description: "Vérifie le montant des frais associés à ta demande et effectue le paiement. Conserve la preuve de paiement, car elle sera nécessaire pour la soumission.",
                  items: []
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md transform hover:scale-102 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  {step.items.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'eligibilite':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Critères d'Éligibilité</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Visa de Travail</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Offre d'emploi valide d'un employeur canadien</li>
                  <li>EIMT positive</li>
                  <li>Qualifications requises pour le poste</li>
                  <li>Fonds suffisants pour l'installation</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Visa d'Études</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Lettre d'acceptation d'une institution canadienne</li>
                  <li>Preuve de capacité financière</li>
                  <li>Compétences linguistiques</li>
                  <li>Casier judiciaire vierge</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'conseils':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Conseils et Astuces</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Préparation</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Commencez tôt la préparation</li>
                  <li>Organisez vos documents</li>
                  <li>Vérifiez les délais de traitement</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Documents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Utilisez des traductions certifiées</li>
                  <li>Conservez des copies</li>
                  <li>Respectez les formats demandés</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Entrevue</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Préparez vos réponses</li>
                  <li>Soyez ponctuel</li>
                  <li>Apportez tous les documents</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div 
              className="relative bg-cover bg-center py-32" 
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
              }}
            >
              <div className="container mx-auto px-4 text-center text-white">
                <h1 className="text-5xl font-bold mb-6">Votre Voyage au Canada Commence Ici</h1>
                <p className="text-xl mb-8">
                  Simplifiez votre processus d'immigration avec notre guide expert des visas canadiens. 
                  Nous vous accompagnons à chaque étape.
                </p>
                <button 
                  onClick={() => handleTabClick('procedures')}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
                >
                  Commencer Maintenant
                </button>
              </div>
            </div>

            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Types de Visa</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Visa de Travail',
                      description: 'Pour les professionnels souhaitant travailler au Canada',
                      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                      title: "Visa d'Études",
                      description: 'Pour les étudiants internationaux',
                      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                      title: 'Résidence Permanente',
                      description: "Pour s'établir définitivement au Canada",
                      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    }
                  ].map((visa, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      <img src={visa.image} alt={visa.title} className="w-full h-48 object-cover"/>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{visa.title}</h3>
                        <p className="text-gray-600">{visa.description}</p>
                        <button 
                          onClick={() => handleTabClick('procedures')}
                          className="mt-4 text-red-600 font-semibold hover:text-red-700"
                        >
                          En savoir plus →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Processus de Demande</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { step: 1, title: 'Évaluation', description: 'Vérifiez votre éligibilité' },
                    { step: 2, title: 'Documentation', description: 'Rassemblez vos documents' },
                    { step: 3, title: 'Soumission', description: 'Déposez votre demande' },
                    { step: 4, title: 'Suivi', description: 'Suivez votre dossier' }
                  ].map((process, index) => (
                    <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        {process.step}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-red-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-xl font-bold">Visa Canada</a>
            
            <button 
              className="md:hidden p-2 rounded-md hover:bg-red-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="hidden md:flex space-x-8">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`hover:text-gray-200 ${activeTab === item.id ? 'font-semibold' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 ${
                      activeTab === item.id ? 'bg-red-700' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">À propos</h3>
              <p className="text-gray-400">
                VisaGuide Canada vous accompagne dans votre processus d'immigration au Canada avec 
                des informations fiables et actualisées.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> Montréal, QC, Canada</p>
                <p className="flex items-center"><Phone className="w-5 h-5 mr-2" /> +2250586682267</p>
                <p className="flex items-center"><Mail className="w-5 h-5 mr-2" /> contact@visaguide.ca</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleTabClick('accueil')} className="hover:text-white">Accueil</button></li>
                <li><button onClick={() => handleTabClick('procedures')} className="hover:text-white">Services</button></li>
                <li><button onClick={() => handleTabClick('faq')} className="hover:text-white">FAQ</button></li>
                <li><button onClick={() => handleTabClick('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-red-600 transition-colors duration-300"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="hover:text-red-600 transition-colors duration-300"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="hover:text-red-600 transition-colors duration-300">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 VisaGuide Canada. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;